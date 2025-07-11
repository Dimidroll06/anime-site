require('dotenv').config();

const { createWriteStream } = require('fs');
const { sequelize, testConnection } = require('../src/lib/db');
const { Anime, Video } = require('../src/models/index');
const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');

const STATE_FILE = path.join(__dirname, 'anime-parser', 'state.json');
const COVERS_FOLDER = path.join(__dirname, 'anime-parser');
const LIMIT = 10;
const API_URL = 'https://api.yani.tv/anime';

function setupFolders() {
    if (!fs.pathExistsSync(COVERS_FOLDER)) {
        fs.mkdirSync(COVERS_FOLDER);
    }
    if (!fs.pathExistsSync(path.join(COVERS_FOLDER, 'tmp'))) {
        fs.mkdirSync(path.join(COVERS_FOLDER, 'tmp'))
    }
}

// Защита от бана. Задержка миллисекундах
function delay(min, max) {
    const pause = Math.floor(Math.random() * (max - min - 1)) + min;
    return new Promise(resolve => setTimeout(resolve, pause));
}

async function requestWithDelay(url) {
    const MIN_DELAY = 1000;
    const MAX_DELAY = 3000;

    await delay(MIN_DELAY, MAX_DELAY);
    console.log(`🌐 Запрашиваем: ${url}`);
    try {
        const response = await axios({
            method: 'get',
            url: url
        });
        return response.data;
    } catch (error) {
        console.error(`❌ Ошибка при выполнении запроса ${url}: [${error.response?.status}]`, error.message);
        if (error.response?.status === 429) {
            console.warn('⚠️ Превышен лимит запросов. Ожидаем дополнительные 10 секунд...');
            await delay(10000, 10500); // ждём дополнительно при 429 Too Many Requests
            return requestWithDelay(url); // рекурсивно повторяем
        }
        throw error;
    }
}

async function loadState() {
    if (!(await fs.pathExists(STATE_FILE))) {
        await fs.writeJSON(STATE_FILE, { lastOffset: 0 });
    }
    return fs.readJSON(STATE_FILE);
}

async function saveState(state) {
    await fs.writeJSON(STATE_FILE, state);
}

async function downloadFile(fileUrl, outputLocationPath) {
    const writer = createWriteStream(outputLocationPath);
    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then(response => {
        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;
            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
            });
        });
    });
}

async function getAnime(animeSchema) {
    const animeId = animeSchema.anime_id;
    const poster_url = `https://${animeSchema.poster.big}`;
    const poster_name = `${Date.now()}-${Math.floor(Math.random() * 1E9)}.jpg`;
    await downloadFile(poster_url, path.join(COVERS_FOLDER, 'tmp', poster_name));

    const video_url = `${API_URL}/${animeId}/videos`;
    const video_response = await requestWithDelay(video_url);
    const videoSchemas = video_response.response;
    let videos = [];

    videoSchemas.forEach(video => {
        if (video.data.player != 'Плеер Kodik') {
            videos.push({
                iframe_url: video.iframe_url,
                player: video.data.player,
                dubbing: video.data.dubbing,
                number: parseInt(video.number)
            })
        }
    });

    return {
        title: animeSchema.title,
        description: animeSchema.description,
        releaseYear: animeSchema.year,
        status: animeSchema.anime_status.alias,
        coverUrl: `/covers/${poster_name}`,
        animeUrl: animeSchema.anime_url,
        rating: animeSchema.rating.average,
        videos: videos
    };
}

async function moveCoversFromTMPFolder() {
    const tmp = path.join(COVERS_FOLDER, 'tmp');
    const files = await fs.readdir(tmp, { withFileTypes: true });

    for (const file of files) {
        if (file.isFile()) {
            const srcPath = path.join(tmp, file.name);
            const destPath = path.join(COVERS_FOLDER, file.name);

            await fs.move(srcPath, destPath, { overwrite: true });
            console.log(`Moved: ${srcPath} → ${destPath}`);
        }
    }
};

async function fetchDataAndSave() {
    setupFolders();
    try {
        let state = await loadState();
        let offset = state.lastOffset;
        let hasMore = true;

        console.log(`🔁 Начинаем с отступом ${offset}`);

        while (hasMore) {
            const url = `${API_URL}?min_rating=4&sort_forward=true&sort=id&limit=${LIMIT}&offset=${offset}`;
            console.log(`🌐 Запрос на: ${url}`);

            const response = await requestWithDelay(url);
            const items = response.response;

            if (!items.length || items.length == 0) {
                console.log('🔚 Данных для запроса больше нет.');
                hasMore = false;
                continue;
            }

            let animes = [];
            for (const item of items) {
                try {
                    animes.push(await getAnime(item));
                } catch (error) {
                    console.log(error);
                    console.log(`❌ Не удалось загрузить аниме '${item.title}' :(`);
                }
            }
            await Anime.bulkCreate(animes, {
                include: [{
                    model: Video,
                    as: 'videos'
                }]
            });
            await moveCoversFromTMPFolder();

            offset += items.length;
            state.lastOffset = offset;
            await saveState(state);

            console.log(`✅ Добавлено ${items.length} аниме. Текущий отступ: ${offset}`);
        }

        console.log('🎉 Парсинг прошел успешно.');

    } catch (error) {
        throw error;
    }
}

async function startParsing() {
    try {
        await testConnection();

        await sequelize.sync({ force: false });

        await fetchDataAndSave();
    } catch (error) {
        console.log('❌ Произошла непредвиденная ошибка:');
        console.error(error);
        await fs.rmdir(path.join(COVERS_FOLDER, 'tmp'));
        process.exit(1);
    }
}

startParsing();
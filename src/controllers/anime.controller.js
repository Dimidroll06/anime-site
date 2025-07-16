const { Anime, sequelize } = require('../models/index');

class AnimeController {

    async searchAnime(req, res) {
        try {
            const {
                q = '',
                limit = 10,
                offset = 0,
                sortField = 'id',
                sortOrder = 'ASC',
                status,
                releaseYear,
            } = req.query || {};

            const where = {};

            if (q) {
                where[sequelize.Op.or] = [
                    { title: { [sequelize.Op.Like]: `%${q}%` } },
                    { description: { [sequelize.Op.Like]: `%${q}%` } }
                ];
            }

            if (status) {
                where.status = status;
            }

            if (releaseYear) {
                where.releaseYear = releaseYear;
            }

            const order = [[sortField, sortOrder]];

            const { count, rows } = await Anime.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order,
            });

            return res.json({
                data: rows,
                total: count,
                limit: parseInt(limit),
                offset: parseInt(offset),
                totalPages: Math.ceil(count / limit)
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getAnimeById(req, res) {
        const anime = await Anime.findByPk(req.params.id);

        if (!anime) {
            return res.status(404).send({
                error: "Anime not found"
            });
        }

        res.status(200).json(user);
    }

    async getRandomAnimes(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 5;

            const animes = await Anime.aggregate('id', 'COUNT', {
                plain: false,
                order: sequelize.literal('RANDOM()'),
                limit
            });

            return res.json({
                data: animes,
                total: animes.length,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getRandomCovers(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;

            const covers = await Anime.findAll({
                attributes: ['coverUrl'],
                where: {
                    coverUrl: { [sequelize.Op.not]: null },
                },
                order: sequelize.literal('RANDOM()'),
                limit
            });

            return res.json({
                data: covers.map(c => c.coverUrl),
                total: covers.length,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

}

module.exports = new AnimeController();
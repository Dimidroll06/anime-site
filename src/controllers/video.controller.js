const { Video, Anime, sequelize } = require('../models/index');

class VideoController {

    async getAnimeEpisodesStats(req, res) {
        try {
            const { animeId } = req.params;

            const anime = await Anime.findByPk(animeId);
            if (!anime) {
                return res.status(404).json({ error: 'Аниме не найдено' });
            }

            const totalEpisodes = await Video.count({
                where: { animeId }
            });

            const players = await Video.findAll({
                attributes: ['player'],
                where: { animeId },
                group: ['player'],
                raw: true
            });

            return res.json({
                animeId,
                totalEpisodes,
                players: players.map(p => p.player)
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getEpisodePlayersAndDubbings(req, res) {
        try {
            const { animeId, number } = req.params;

            const anime = await Anime.findByPk(animeId);
            if (!anime) {
                return res.status(404).json({ error: 'Аниме не найдено' });
            }

            const videos = await Video.findAll({
                where: { animeId, number },
                attributes: ['player', 'dubbing']
            });

            if (!videos.length) {
                return res.status(404).json({ error: 'Эпизод не найден' });
            }

            return res.json({
                animeId,
                episode: number,
                videos
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

}

module.exports = new VideoController();
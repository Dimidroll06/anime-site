const express = require('express');
const router = express.Router();
const animeController = require('../controllers/anime.controller');
const videoController = require('../controllers/video.controller');

router.get('/', animeController.searchAnime);
router.get('/random', animeController.getRandomAnimes);
router.get('/random/covers', animeController.getRandomCovers);
router.get('/:animeId/episode', videoController.getAnimeEpisodesStats);
router.get('/:animeId/episode/:number', videoController.getEpisodePlayersAndDubbings);
router.get('/:id', animeController.getAnimeById);

module.exports = router;
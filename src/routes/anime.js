const express = require('express');
const router = express.Router();
const animeController = require('../controllers/anime.controller');

router.get('/', animeController.searchAnime);
router.get('/:id', animeController.getAnimeById);

module.exports = router;
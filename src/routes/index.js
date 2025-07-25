const express = require('express');
const router = express.Router();

const authRoute = require('./auth');
const userRoutre = require('./user');
const uploadsRoute = require('./uploads');
const animeRoute = require('./anime');

router.use('/auth', authRoute);
router.use('/user', userRoutre);
// router.use('/uploads', uploadsRoute);
router.use('/anime', animeRoute);

router.use('/', (req, res) => {
    res.status(404).json({
        error: 'Route undefined'
    });
});

module.exports = router;
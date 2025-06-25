const express = require('express');
const router = express.Router();

const authRoute = require('./auth');
const userRoutre = require('./user');

router.use('/auth', authRoute);
router.use('/user', userRoutre);

router.use('/', (req, res) => {
    res.status(404).json({
        error: 'Route undefined'
    });
});

module.exports = router;
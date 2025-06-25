const express = require('express');
const router = express.Router();

const authRoute = require('./auth');

router.use('/auth', authRoute);

router.use('/', (req, res) => {
    res.status(404).json({
        error: 'Route undefined'
    });
});

module.exports = router;
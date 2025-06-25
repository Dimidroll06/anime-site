const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    res.status(404).json({
        error: 'Route undefined'
    });
});

module.exports = router;
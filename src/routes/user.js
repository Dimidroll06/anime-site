const express = require('express');
const userController = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const router = express.Router();

// Чтоб работали cookie
router.post('/me', requireAuth, userController.me);

module.exports = router;

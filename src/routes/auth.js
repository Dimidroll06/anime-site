const express = require('express');
const { validateRegister, validateLogin } = require('../validators/auth.validator');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegister, authController.register);
router.post('/refresh', authController.refreshAccessToken);
router.post('/logout', authController.logout);

module.exports = router;

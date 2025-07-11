const express = require('express');
const userController = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const userValidator = require('../validators/user.validator');
const router = express.Router();

router.get('/:id', userController.getUserById);
// Чтоб работали cookie
router.post('/me', requireAuth, userController.me);
router.put('/', requireAuth, userValidator.validateEditProfile, userController.editProfile);
router.put('/password', requireAuth, userValidator.validateEditPassword, userController.changePassword);
router.delete('/', requireAuth, userController.deleteAccount);

module.exports = router;

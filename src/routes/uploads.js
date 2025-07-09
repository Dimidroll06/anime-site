const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { multerUpload, upload, UPLOADS_DIR } = require('../controllers/uploads.controller');

router.post('/', requireAuth, multerUpload.single('image'), upload);
router.get('/', express.static(UPLOADS_DIR));

module.exports = router;
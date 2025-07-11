const { User } = require('../models/index');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '..', 'view', 'avatars');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`
        cb(null, filename)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Недопустимый тип файла'), false);
    }
}

const multerUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 8 * 1024 * 1024
    }
});

class UserController {

    async me(req, res) {
        return res.status(200).json(req.user);
    }

    async getUserById(req, res) {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({
                error: "User not found"
            });
        }

        res.status(200).json(user);
    }

    async editProfile(req, res) {
        await req.user.update(req.body);
        return res.status(200).json(req.user);
    }

    async changePassword(req, res) {
        const { password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        req.user.update({
            hash: hashedPassword
        });

        res.status(200).json(req.user);
    }

    async updateProfilePicture(req, res) {
        if (!req.file) {
            return res.status(400).json({ message: 'Profile picture not present' });
        }

        if (req.user.avatarUrl != null && await fs.exists(path.join(UPLOADS_DIR, req.user.avatarUrl))) {
            await fs.remove(path.join(UPLOADS_DIR, req.user.avatarUrl));
        }

        try {
            req.user.update({
                avatarUrl: req.file.filename
            });

            res.status(200).json({ message: 'Фотография профиля обнолвена' });
        } catch (error) {
            console.error('Ошибка загрузки', error);
            res.status(500).json({ message: 'Произошла непредвиденная ошибка' });
        }
    }

    multer() {
        return multerUpload.single('image');
    }

    async deleteAccount(req, res) {
        req.user.destroy();
        res.clearCookie('refreshToken');
        res.status(204).json({
            message: 'Account was delleted successfully'
        });
    }
}

module.exports = new UserController();
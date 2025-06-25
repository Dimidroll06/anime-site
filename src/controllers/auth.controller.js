const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { accessSecret, refreshSecret } = require('../lib/config');
const { User } = require('../models/index');

class AuthController {

    async register(req, res) {
        const { username, email, password } = req.body;

        let user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            return res.status(400).json({
                error: 'User with this email already exist'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            username: username,
            email: email,
            hash: hashedPassword
        });

        res.status(201).json(user);
    }

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({
                error: 'User undefined'
            });
        }

        const isValid = await bcrypt.compare(password, user.hash);
        if (!isValid) {
            return res.status(400).json({
                error: 'Wrong password'
            });
        }

        // if (!user.emailValidated) {
        //     return res.status(401).json({
        //         error: 'Validate email'
        //     });
        // }

        const refreshToken = jwt.sign({ userId: user.id }, refreshSecret, { expiresIn: '7d' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        
        res.status(200).json({
            message: 'Authorized'
        });
    }

    async refreshAccessToken(req, res) {
        if (!req.cookies?.refreshToken) return res.status(401).json({ error: 'Refresh token not present' })
        const { refreshToken } = req.cookies;
        try {
            const { userId } = jwt.verify(refreshToken, refreshSecret);
            const user = await User.findByPk(userId);
            const accessToken = jwt.sign({ userId: user.id }, accessSecret, { expiresIn: '15m' });
            res.status(200).json({
                token: accessToken
            });
        } catch (error) {
            console.error(error)
            res.clearCookie('refreshToken');
            res.status(401).json({
                error: 'Invalid refresh token'
            });
        }
    }

    async logout(req, res) {
        res.clearCookie('refreshToken');
        res.status(200).json({
            message: 'Logged out successfully'
        });
    }

}

module.exports = new AuthController();
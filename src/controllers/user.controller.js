const { User } = require('../models/index');
const bcrypt = require('bcryptjs');

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

    async deleteAccount(req, res) {
        req.user.destroy();
        res.clearCookie('refreshToken');
        res.status(204).json({
            message: 'Account was delleted successfully'
        });
    }
}

module.exports = new UserController();
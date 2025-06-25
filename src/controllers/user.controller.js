
class UserController {
    async me(req, res) {
        return res.status(200).json(req.user);
    }
}

module.exports = new UserController();
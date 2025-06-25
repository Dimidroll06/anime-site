const { accessSecret } = require('../lib/config');
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    
    try {
        const token = authHeader.split(' ')[1];
        const userData = jwt.verify(token, accessSecret);
        const user = await User.findByPk(userData.userId);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
};

const optionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        return next();
    }
    
    try {
        const token = authHeader.split(' ')[1];
        const userData = jwt.verify(token, accessSecret);
        const user = await User.findByPk(userData.userId);
        req.user = user;
        return next();
    } catch (error) {
        req.user = null;
        return next();
    }
};

module.exports = {
    requireAuth,
    optionalAuth
};

const { accessSecret } = require('../lib/config');
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    
    try {
        const token = authHeader.split(' ')[1];
        const userData = jwt.verify(token, accessSecret);
        req.user = userData;
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
};

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        return next();
    }
    
    try {
        const token = authHeader.split(' ')[1];
        const userData = jwt.verify(token, accessSecret);
        req.user = userData;
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

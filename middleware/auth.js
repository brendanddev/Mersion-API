
// auth.js
// Middleware to authenticate user requests

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Authorization denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        logger.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'Token is not valid.' });
    }
}
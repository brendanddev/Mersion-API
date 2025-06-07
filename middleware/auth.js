
// auth.js
// Middleware to authenticate user requests
// Brendan Dileo - May 2025

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const logger = require('../utils/logger');

const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (!token) return res.status(401).json({ error: 'No token provided' });

            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            logger.error(`Authentication failed: ${error.message}`);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        logger.warn('No authorization header found');
        return res.status(401).json({ error: 'Not authorized, no token provided' });
    }
}

module.exports = auth;


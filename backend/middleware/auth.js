
// auth.js
// Middleware for authenticating a users request based on jwt
// Brendan Dileo, June 2025

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const User = require('../models/userModel');

const authenticateToken = async (req, res, next) => {

    try {
        // Extract auth header
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            logger.error('Expected authorization header!');
            return res.status(401).json({ message: 'Missing authorization!', type: 'error' });
        }

        // Extract token from header
        const token = authHeader.split(' ')[1];
        let userId;

        try {
            userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).userId;
        } catch (error) {
            logger.error('The provided token is invalid!');
            return res.status(401).json({ message: 'Invalid token!', type: 'error' });
        }

        if (!userId) return res.status(401).json({ message: 'Invalid token!', type: 'error' });

        const user = await User.findById(userId);
        if (!user) return res.status(500).json({ message: 'The user does not exist!', type: 'error' });

        req.user = user;
        next();
    } catch (error) {
        logger.error('The provided token is invalid or expired!');
        return res.status(403).json({ message: 'Invalid or expired token!' });
    }
}

module.exports = authenticateToken;
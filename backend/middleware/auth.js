
// auth.js
// Middleware for authenticating a users request based on jwt
// Brendan Dileo, June 2025

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const User = require('../models/userModel');

// Extracts and authenticates tokens in incoming requests
const authenticateToken = async (req, res, next) => {

    try {
        // Extract auth header
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            logger.error('Expected authorization header!');
            return res.status(401).json({ message: 'Missing authorization!', type: 'error' });
        }

        // Extract token from header
        const token = authHeader.split(' ')[1];
        let payload;

        // Attempts to verify the jwt token
        try {
            payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            logger.error('The provided token is invalid!');
            return res.status(401).json({ message: 'Invalid token!', type: 'error' });
        }        

        // Uses the user id from the token payload to fetch user from db
        const user = await User.findById(payload.userId);
        if (!user) return res.status(401).json({ message: 'The user does not exist!', type: 'error' });

        req.user = user;
        next();
    } catch (error) {
        logger.error('The provided token is invalid or expired!');
        return res.status(403).json({ message: 'Invalid or expired token!' });
    }
}

module.exports = authenticateToken;
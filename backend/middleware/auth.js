
// auth.js
// Middleware for authenticating a users request based on jwt
// Brendan Dileo, June 2025

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authenticateToken = (req, res, next) => {

    // Extract auth header
    const authHeader = req.headers['authorization'];

    // Extract token from header
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.error('No token was provided!');
        return res.status(401).json({ message: 'Access denied, token missing!' });
    }

    try {

    } catch (error) {
        logger.error('The provided token is invalid or expired!');
        return res.status(403).json({ message: 'Invalid or expired token!' });
    }
}

module.exports = authenticateToken;
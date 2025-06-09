
// conditionalAuth.js
// Middleware to conditionally 
// Brendan Dileo - June 2025

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const logger = require('../utils/logger');

const conditionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    let user;

    // Check for auth token in header
    if (authHeader?.startsWith('Bearer')) {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            user = await User.findById(decoded.id).select('-password');
            if (!user) throw new Error('User not found');
            req.user = user;
        } catch (error) {
            logger.error(`Authentication failed: ${error.message}`);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    // Find target user
    const userId = req.user?._id || req.query.userId || req.body.userId;
    const targetUser = userId && await User.findById(userId).select('authEnabled');

    if (targetUser?.authEnabled) {
        return res.status(401).json({ error: 'Authentication required for this user' });
    }
    next();
}

module.exports = conditionalAuth;
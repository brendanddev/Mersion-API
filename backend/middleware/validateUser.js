
// userValidator.js
// Validates incoming user data
// Brendan Dileo, June 2025

const logger = require('../utils/logger');

const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        logger.error('One of the required fields are missing!');
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }
    next();
};

module.exports = validateUser;
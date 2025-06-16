
// userValidator.js
// Validates incoming user data
// Brendan Dileo, June 2025

const logger = require('../utils/logger');
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
const emailRegex = //;
const passwordRegex = //;

const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        logger.error('One of the required fields are missing!');
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    // Validate username against regex
    if (!usernameRegex.test(username)) {
        logger.error(`Invalid username: ${username}`);
        return res.status(400).json({ message: 'Username must be 3-30 characters and only contain letters, numbers, or underscores.' });
    }

    // Validate email against regex
    
    // Validate password against regex

    next();
};

module.exports = validateUser;
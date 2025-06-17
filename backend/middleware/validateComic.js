
// comicValidator.js
// Validates incoming comic data
// Brendan Dileo, June 2025

const logger = require('../utils/logger');
const validator = require('validator');

const validateComic = (req, res, next) => {
    const { title, author, issue, volume } = req.body;
    if (!title || !author || !issue || !volume) {
        logger.error('One of the required fields are missing!');
        return res.status(400).json({ message: 'Missing required fields!' });
    }

    // Sanitize text
    title = validator.trim(title);
    title = validator.escape(title);
    author = validator.trim(author);
    author = validator.escape(author);

    // Assign back to body
    req.body.title = title;
    req.body.author = author;

    next();
};

module.exports = validateComic;
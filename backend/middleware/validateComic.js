
// comicValidator.js
// Validates incoming comic data
// Brendan Dileo, June 2025

const logger = require('../utils/logger');
const validator = require('validator');

// Validates and sanitizes a single comic object
const validateAndSanitizeComic = (comic) => {
    // Extract comic data from comic object
    const { title, author, issue, volume } = comic;
    
    // Check for required fields
    if (!title || !author || !issue || !volume) 
        return 'One or more of the required fields are missing!';

    // Sanitize text
    comic.title = validator.escape(validator.trim(title));
    comic.author = validator.escape(validator.trim(author));
    return null;
}

// Middleware to validate and sanitize incoming comic data from the request body
const validateComicMiddleware = (req, res, next) => {
    // Apply validation on request body
    const error = validateAndSanitizeComic(req.body);
    if (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Missing required fields!' });
    }
    next();
}

module.exports = { validateAndSanitizeComic, validateComicMiddleware };
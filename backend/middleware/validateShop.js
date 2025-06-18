
// validateShop.js
// Validates incoming shop related data
// Brendan Dileo, June 2025

const logger = require('../utils/logger');
const validator = require('validator');

const validateShop = (req, res, next) => {
    const { name, address, email, phone, website, notes, tags } = req.body;

    if (!name || !address) {
        logger.error('One of the required fields are missing!');
        return res.status(400).json({ message: 'Missing required fields!' });
    }

    req.body.name = validator.escape(validator.trim(name));
    req.body.address = validator.escape(validator.trim(address));

    // Sanitizing and validating optional fields
    if (email) {
        if (!validator.isEmail(email)) {
            logger.error('Invalid email format');
            return res.status(400).json({ message: 'Invalid email format' });
        }
        req.body.email = validator.normalizeEmail(email);
    }

    if (phone) {
        if (!validator.isMobilePhone(phone)) {
            logger.error('Invalid phone number format');
            return res.status(400).json({ message: 'Invalid phone number format' });
        }
        req.body.phone = validator.escape(validator.trim(phone));
    }

    if (website) {
        if (!validator.isURL(website)) {
            logger.error('Invalid website URL');
            return res.status(400).json({ message: 'Invalid website URL' });
        }
        req.body.website = validator.trim(website);
    }

    if (notes)
        req.body.notes = validator.escape(validator.trim(notes));

    if (tags) {
        if (!Array.isArray(tags)) {
            logger.error('Tags must be an array of strings');
            return res.status(400).json({ message: 'Tags must be an array of strings' });
        }
        req.body.tags = tags.map(tag => validator.escape(validator.trim(tag)));
    }
    next();
}

module.exports = validateShop;
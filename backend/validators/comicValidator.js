
// comicValidator.js
// Validates comic data before saving to the database
// Brendan Dileo - May 2025

const Joi = require('joi');

const comicSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().allow(null, ''),
    publisher: Joi.string().allow(null, ''),
    issue: Joi.number().integer().required(),
    volume: Joi.number().integer().required(),
    coverVariant: Joi.string().allow(null, ''),
    genre: Joi.string().allow(null, ''),
    releaseDate: Joi.date().iso().allow(null),
    condition: Joi.string()
        .valid('Mint', 'Near Mint', 'Very Fine', 'Fine', 'Good', 'Fair', 'Poor')
        .default('Fine'),
    isRead: Joi.boolean().default(false),
    purchasePrice: Joi.number().allow(null),
    currentValue: Joi.number().allow(null),
    notes: Joi.string().allow(null, '')
});

module.exports = comicSchema;
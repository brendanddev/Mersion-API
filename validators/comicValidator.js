
// comicValidator.js
// Validates comic data for creating or updating comics

const Joi = require('joi');

// Joi schema for validating comic data
const comicSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publisher: Joi.string().allow('', null),
    issue: Joi.number().required(),
    volume: Joi.number().required(),
    genre: Joi.string().optional(),
    releaseDate: Joi.date().optional(),
    description: Joi.string().optional()
});

module.exports = comicSchema;
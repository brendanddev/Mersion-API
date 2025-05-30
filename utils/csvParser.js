
// csvParser.js

const csv = require('csvtojson');
const logger = require('./logger');
const { parse } = require('dotenv');

const parseCsvToJson = async (csvString) => {
    try {
        if (typeof csvString !== 'string') {
            throw new Error('CSV input must be a string!');
        }
        const jsonArray = await csv({
            trim: true,
            ignoreEmpty: true,
        }).fromString(csvString);
        return jsonArray;
    } catch (error) {
        logger.error('CSV parsing failed:', error.message);
        throw new Error('CSV parsing failed');
    }
}

module.exports = parseCsvToJson;
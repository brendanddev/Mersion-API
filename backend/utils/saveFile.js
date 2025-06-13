
// saveFile.js
// Utility methods for saving comic data to a file in json or csv format
// Brendan Dileo, June 2025

// [1] https://www.geeksforgeeks.org/javascript/how-to-convert-json-object-to-csv-in-javascript/
// [2] https://www.30secondsofcode.org/js/s/json-to-file/

const logger = require('./logger');
const { writeFileSync } = require('fs');

// Convert data to pretty printed json
const toJson = (data) => {
    return JSON.stringify(data, null, 2);
}

// Converts json data to csv format
const toCsv = (data) => {
    // Check if data is an array and if it is not empty
    if (!Array.isArray(data) || data.length === 0) throw new Error('The data must be an array and cannot be empty!');

    // Extract key fields as cols from first object
    const headers = Object.keys(data[0]);
    logger.log(`Headers extracted: ${headers.join(', ')}`);

    // Combine headers into string, comma seperated
    let csvData = headers.join(',') + '\n';
    logger.log(`CSV so far:\n${csvData}`);

    // Loop over each row in the array
    data.forEach((obj, index) => {
        logger.log(`Row ${index + 1}: Processing object ${JSON.stringify(obj)}`);

        // Extract values in order of headers
        const values = headers.map(header => {
            const value = obj[header];

            // if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            //     return `${}`;
            // }
            return value;
        });

        logger.log(`Extracted values: ${values.join(',')}`);

        // Add the extracted values to csv string
        csvData += values.join(',') + '\n';
        logger.log(`CSV so far:\n${csvData}`);
    });

    logger.log('CSV Conversion Finished!');
    return csvData;
}

const saveFile = (data, fileName, format = 'json') => {
    try {
        format = format.toLowerCase();

        if (format === "json") {
            writeFileSync(`${fileName}.json`, toJson(data));
            logger.log(`Saved file as ${fileName}.json`);
        } else if (format === "csv" ) {
            writeFileSync(`${fileName}.csv`, toCsv(data));
            logger.log(`Saved file as ${fileName}.csv`);
        } else {
            throw new Error(`Unsupported file format: ${format}`);
        }
    } catch (error) {
        logger.error(`An error occurred while saving the file: ${error.message}`);
    }
}

module.exports = { toCsv, toJson, saveFile };

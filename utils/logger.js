
// logger.js
// Logger utility
// Brendan Dileo - May 2025

const chalk = require('chalk');

const getTime = () => `[${new Date().toISOString()}]`;

// Basic logging
const log = (message) => {
    console.log(`${chalk.blue(getTime())} ${chalk.green('[INFO]')} ${message}`);
};

// Warning logs
const warn = (message) => {
    console.warn(`${chalk.blue(getTime())} ${chalk.yellow('[WARN]')} ${message}`);
};

// Error logs
const error = (message) => {
    console.error(`${chalk.blue(getTime())} ${chalk.red('[ERROR]')} ${message}`);
};


module.exports = { log, warn, error };
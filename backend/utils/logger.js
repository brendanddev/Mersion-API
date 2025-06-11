
// logger.js
// Defines custom logging functions to print messages to the console
// Brendan Dileo, June 2025

const chalk = require('chalk');

const getTime = () => {
    return new Date().toISOString().replace('T', ' ').split('.')[0];
}

const log = (message) => {
    console.log(chalk.blue(`[${getTime()}] [LOG] ${message}`));
}

const warn = (message) => {
    console.warn(chalk.yellow(`[${getTime()}] [WARN] ${message}`));
}

const error = (message) => {
    console.error(chalk.red(`[${getTime()}] [ERROR] ${message}`));
}

module.exports = { log, warn, error };

// rateLimiter.js
// Middleware to limit the rate of requests made to the api from a single ip
// Brendan Dileo - June 2025

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    }
});

module.exports = limiter;


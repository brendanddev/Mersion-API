
// app.js
// Main Express application setup
// Brendan Dileo - May 2025

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middleware/rateLimiter');
const mongoSanitize = require('express-mongo-sanitize');
const comicRoutes = require('./routes/comicRoutes');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());
app.use('/api/v2/comics', comicRoutes);

// Fallback for undefined routes
app.use((req, res) => {
    logger.warn(`404 Not Found: ${req.originalUrl}`);
    res.status(404).json({ message: 'Resource not found' });
});

module.exports = app;

// server.js
// Main entry point for the server application
// Brendan Dileo - May 2025

require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/connect');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.log(`Server running at http://localhost:${PORT}`);
    });
}).catch((error) => {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
});
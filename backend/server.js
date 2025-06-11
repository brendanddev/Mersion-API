
// server.js
// Starts the http server and connects to the database
// Brendan Dileo, June 2025

require('dotenv').config();
const app = require('./app');
const logger = require('./utils/logger');
const connectDB = require('./db/connect');

const port = process.env.PORT || 5000;
logger.log(process.env.PORT);

// Connect to db first then chain since connect returns a promise
connectDB().then(() => {
    // Starts the server and listens on port
    app.listen(port, () => {
        logger.log(`Server listening at http://localhost:${port}`);
    });
}).catch((error) => {
    logger.error(`An error occurred: ${error.message}`);
});
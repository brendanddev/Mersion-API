
// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./utils/logger');

const connectDB = require('./db/connect');
const Comic = require('./models/comicModel');

// Creates the app
const app = express();
const port = process.env.PORT || 5000;

logger.log(process.env.PORT);

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Basic GET route
app.get('/', (req, res) => {
    res.send('Server up and running...');
});

// Connect to db first then chain since connect returns a promise
connectDB().then(() => {
    // Starts the server and listens on port
    app.listen(port, () => {
        logger.log(`Server listening at http://localhost:${port}`);
    });
}).catch((error) => {
    logger.error(`An error occurred: ${error.message}`);
});
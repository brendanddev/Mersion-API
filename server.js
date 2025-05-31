
// server.js

const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const logger = require('./utils/logger');
const app = require('./app');

dotenv.config();
const port = process.env.PORT || 4001;

connectDB().then(() => {
    app.listen(port, () => {
        logger.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    logger.error('Failed to connect to DB: ' + err.message);
});

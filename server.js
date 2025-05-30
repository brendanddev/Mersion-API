
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const comicRoutes = require('./routes/comicRoutes');
const connectDB = require('./db/connect');
const logger = require('./utils/logger');

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/comics', comicRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        logger.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    logger.error('Failed to connect to DB: ' + err.message);
});

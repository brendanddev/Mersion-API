
// app.js


const express = require('express');
const cors = require('cors');
import logger from './utils/logger.js';
const comicRoutes = require('./routes/comicRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/comics', comicRoutes);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Uh oh! Something went wrong!' })
});

module.exports = app;


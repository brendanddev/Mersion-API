
// app.js


const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const comicRoutes = require('./routes/comicRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/comics', comicRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Uh oh! Something went wrong!' })
});

module.exports = app;


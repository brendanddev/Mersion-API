
// app.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const comicRoutes = require('./routes/comicRoutes');

// Creates the app
const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => res.send('Server up and running...'));
app.use('/comics', comicRoutes);

module.exports = app;
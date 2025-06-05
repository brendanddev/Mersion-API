
// app.js
// Main Express application setup
// Brendan Dileo - May 2025

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;
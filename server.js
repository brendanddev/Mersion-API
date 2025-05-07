
// server.js
// Brendan Dileo, May 2025

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('better-sqlite3');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
    console.log('Request');
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
}); 

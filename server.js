
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

const db = new sqlite3(path.join(__dirname, 'mersion.db'));
console.log('Successfully Connected to SQLite Database');

db.run(`
    CREATE TABLE IF NOT EXISTS mods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
    );
`);

// Get all Mods
app.get('/api/mods', (req, res) => {
    db.all(`SELECT * FROM mods`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


// Test Route
app.get('/', (req, res) => {
    console.log('Request');
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
}); 

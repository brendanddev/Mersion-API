
// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Creates the app
const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.PORT);

// Basic middleware
app.use(cors());
app.use(express.json());

// Basic GET route
app.get('/', (req, res) => {
    res.send('Server up and running...');
});

// Starts the server and listens on port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})
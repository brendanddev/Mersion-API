
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

// GET all comics
app.get('/comics', async (req, res) => {
    try {
        const comics = await Comic.find();
        logger.log(`Comics fetched from database: ${comics.length}`);
        return res.status(200).json({ comics: comics });
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST a comic
app.post('/comics', async (req, res) => {
    const {
        title,
        author,
        issue,
        volume,
        publisher,
        releaseDate,
        rating,
        purchasePrice,
        currentValue,
        condition,
        isRead,
        genre,
        tags,
        notes
    } = req.body;

    if (!title || !author || !issue || !volume) {
        logger.error('One of the required fields are missing!');
        return res.status(400).json({ message: 'Missing fields!' });
    }

    try {
        const comic = await Comic.create({
            title: title,
            author: author,
            issue: issue,
            volume: volume,
            publisher: publisher,
            releaseDate,
            rating: rating,
            purchasePrice: purchasePrice,
            currentValue: currentValue,
            condition: condition,
            isRead: isRead,
            genre: genre,
            tags: tags,
            notes: notes
        });

        logger.log(`New comic: ${title} created successfully!`);
        return res.status(201).json({ message: 'Comic created!', comic: comic });
    } catch (error) {
        logger.error(`An error occurred while creating the comic: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// PUT to update a comic by id
app.put('/comics/:id', (req, res) => {

});

// DELETE a comic by id
app.delete('/comics/:id', (req, res) => {

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
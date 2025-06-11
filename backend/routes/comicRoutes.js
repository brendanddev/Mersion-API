
// comicRoutes.js
// Defines the comic related routes for the server
// Brendan Dileo, June 2025

const express = require('express');
const Comic = require('../models/comicModel');
const logger = require('../utils/logger');

// Creates the express router
const router = express.Router();

// GET all comics
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.put('/:id', (req, res) => {
});

// DELETE a comic by id
router.delete('/:id', (req, res) => {
});

module.exports = router;
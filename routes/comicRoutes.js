
// comicRoutes.js

const express = require('express');
const router = express.Router();
const Comic = require('../models/comicModel');
const logger = require('../utils/logger')

// GET all comics
router.get('/', async (req, res) => {
    try {
        const comics = await Comic.find();
        res.status(200).json(comics);
    } catch (error) {
        logger.error('GET /api/comics failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET a single comic by ID
router.get('/:id', async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) return res.status(404).json({ error: 'Comic not found' });
        res.status(200).json(comic);
    } catch (error) {
        logger.error(`GET /api/comics/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new comic
router.post('/', async (req, res) => {
    try {
        const { title, author, publisher, issue, volume, genre, releaseDate, description } = req.body;
        if (!title || !author) return res.status(400).json({ error: 'Title, and author are required!' });

        const newComic = new Comic({
            title,
            author,
            publisher,
            issue,
            volume,
            genre,
            releaseDate,
            description
        });

        const savedComic = await newComic.save();
        res.status(201).json(savedComic);
    } catch (error) {
        logger.error('POST /api/comics failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT update an existing comic by id
router.put('/:id', async (req, res) => {
    try {
    } catch (error) {
        logger.error(`PUT /api/comics/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE a comic by id
router.delete('/:id', async (req, res) => {
    try {
    } catch (error) {
        logger.error(`DELETE /api/comics/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
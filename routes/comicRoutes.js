
// comicRoutes.js

const express = require('express');
const router = express.Router();
const Comic = require('../models/comicModel');
const logger = require('../utils/logger');
const comicSchema = require('../validators/comicValidator');
const MAX_IMPORT_COUNT = 1000;

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
        const updatedComic = await Comic.findByIdAndUpdate( 
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedComic) return res.status(404).json({ error: 'Comic not found' });
        res.status(200).json(updatedComic);
    } catch (error) {
        logger.error(`PUT /api/comics/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE a comic by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedComic = await Comic.findByIdAndDelete(req.params.id);
        if (!deletedComic) return res.status(404).json({ error: 'Comic not found' });
        res.status(200).json({ message: 'Comic deleted successfully' });
    } catch (error) {
        logger.error(`DELETE /api/comics/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/import', async (req, res) => {
    try {
        const { format, data } = req.body;
        if (!format || !data) return res.status(400).json({ error: 'Format and data are required!' });

        let comics = [];

        if (format == 'json') {
            if (!Array.isArray(data)) {
                return res.status(400).json({ error: 'JSON data must be an array' });
            }
            comics = data;
        } else if (format == 'csv') {
            comics = 
        }


    } catch (error) {
        logger.error(`POST /api/comics/import failed: ${error.message}`);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
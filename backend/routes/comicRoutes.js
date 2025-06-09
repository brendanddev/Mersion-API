
// comicRoutes.js
// Comic related routes
// Brendan Dileo - May 2025

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Comic = require('../models/comicModel');
const comicSchema = require('../validators/comicValidator');
const logger = require('../utils/logger');
const conditionalAuth = require('../middleware/conditionalAuth');

// GET all comics
router.get('/', async (req, res) => {
    try {
        const comics = await Comic.find();
        logger.log('Fetched all comics');
        res.status(200).json(comics);
    } catch (error) {
        logger.error(`GET /api/v2/comics failed: ${error.message}`);
        console.error(`Error fetching comics: ${error.message}`);
        res.status(500).json({ message: 'Failed to retreive comics!' });
    }
});

// GET a single comic by id
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Invalid comic ID' });
        }
        const comic = await Comic.findById(req.params.id);
        if (!comic) return res.status(404).json({ error: 'Comic not found' });
        
        logger.log(`Fetched comic with ID: ${req.params.id}`);
        res.status(200).json(comic);
    } catch (error) {
        logger.error(`GET /api/v2/comics/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new comic
router.post('/', conditionalAuth, async (req, res) => {
    // Validate incoming comic data, dont stop on first error
    const { error, value } = comicSchema.validate(req.body, { abortEarly: false });

    if (error) {
        logger.warn(`Validation failed for POST /api/v2/comics: ${error.message}`);
        return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    try {
        const { title, author, publisher, issue, volume, genre, releaseDate, condition, isRead, notes } = req.body;
        if (!title || !issue || !volume) 
            return res.status(400).json({ message: 'Title, issue, and volume are required!' });

        const newComic = new Comic({
            title,
            author,
            publisher,
            issue,
            volume,
            genre,
            releaseDate,
            condition,
            isRead,
            notes
        });

        const savedComic = await newComic.save();
        logger.log(`Created new comic: ${savedComic.title}, id: ${savedComic._id}`);
        res.status(201).json(savedComic);
    } catch (error) {
        logger.error(`POST /api/v2/comics failed: ${error.message}`);
        res.status(500).json({ message: 'Failed to create comic!' });
    }
});

// POST bulk create comics in the db
router.post('/bulk', conditionalAuth, async (req, res) => {

    const comics = req.body.comics;
    if (!Array.isArray(comics) || comics.length === 0) return res.status(400).json({ message: 'No comics provided for bulk creation!' });

    const errors = [];
    const validatedComics = [];

    for (const comic of comics) {
        const { error, value } = comicSchema.validate(comic, { abortEarly: false });
        if (error) {
            errors.push({ 
                comic, 
                message: error.details.map(detail => detail.message).join(', ') });
        } else {
            validatedComics.push(value);
        }
    }

    if (errors.length > 0) {
        logger.warn(`Validation failed for bulk POST /api/v2/comics: ${errors.map(e => e.message).join('; ')}`);
        return res.status(400).json({ message: 'Validation errors', details: errors });
    }

    try {
        const insertedComics = await Comic.insertMany(validatedComics);
        logger.log(`Bulk created ${insertedComics.length} comics`);
        res.status(201).json({ message: 'Comics created successfully', comics: insertedComics });
    } catch (error) {
        logger.error(`POST /api/v2/comics/bulk failed: ${error.message}`);
        res.status(500).json({ message: 'Failed to create comics in bulk!' });
    }
});

// PUT update a comic by id
router.put('/:id', conditionalAuth, async (req, res) => {
    try {
        // Check if id is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Invalid comic ID' });
        }

        const updatedComic = await Comic.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedComic) return res.status(404).json({ error: 'Comic not found' });

        logger.log(`Updated comic with ID: ${req.params.id}`);
        res.status(200).json(updatedComic);
    } catch (error) {
        logger.error(`PUT /api/v2/comics/${req.params.id} failed: ${error.message}`);
        res.status(500).json({ message: 'Failed to update comic!' });
    }
});

// DELETE a comic by id
router.delete('/:id', conditionalAuth, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ error: 'Invalid comic ID' });
        }

        const deletedComic = await Comic.findByIdAndDelete(req.params.id);
        if (!deletedComic) return res.status(404).json({ error: 'Comic not found' });

        logger.log(`Deleted comic with ID: ${req.params.id}`);
        res.status(200).json({ message: 'Comic deleted successfully' });
    } catch (error) {
        logger.error(`DELETE /api/v2/comics/${req.params.id} failed: ${error.message}`);
        res.status(500).json({ message: 'Failed to delete comic!' });
    }
});

module.exports = router;
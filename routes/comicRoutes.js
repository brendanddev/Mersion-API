
// comicRoutes.js
// Comic related routes
// Brendan Dileo - May 2025

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comic = require('../models/comicModel');
const logger = require('../utils/logger');

// GET all comics
router.get('/', async (req, res) => {
    try {
        const comics = await Comic.find();
        logger.log('Fetched all comics');
        res.status(200).json(comics);
    } catch (error) {
        logger.error(`Error fetching comics: ${error.message}`);
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
        logger.error(`GET /api/comics/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
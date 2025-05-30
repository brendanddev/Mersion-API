
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
});

// POST a new comic
router.post('/', async (req, res) => {
});

// PUT update an existing comic by id
router.put('/:id', async (req, res) => {
});

// DELETE a comic by id
router.delete('/:id', async (req, res) => {
});


module.exports = router;
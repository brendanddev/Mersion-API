
// comicRoutes.js
// Defines the comic related routes for the server
// Brendan Dileo, June 2025

const express = require('express');
const mongoose = require('mongoose');
const Comic = require('../models/comicModel');
const logger = require('../utils/logger');
const { saveFile } = require('../utils/saveFile');
const path = require('path');

// Creates an instance of the express router
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

// GET to export comic collection to json or csv
router.get('/export', async (req, res) => {

    // Query for string params
    const { format } = req.query;
    const exportFormat = format?.toLowerCase();

    try {
        const comics = await Comic.find().lean();
        logger.log('Comics fetched from database!');
        logger.log(`Export format: ${format}`);

        // Construct file name and save the file
        const fileName = `comics_export_${Date.now()}`;
        saveFile(comics, fileName, exportFormat);

        const filePath = path.resolve(__dirname, '..', `${fileName}.${exportFormat}`);        
        return res.download(filePath, `${fileName}.${exportFormat}`);

        // Set file name, validate, save 
        // return res.status(200).json({ comics: comics });
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// GET a comic by id
router.get('/:id', async (req, res) => {
    // Extract id from request params
    const { id } = req.params;

    // Check id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.warn(`Invalid ID format: ${id}`);
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        // Find comic by id from db
        const comic = await Comic.findById(id);

        if (!comic) {
            logger.error(`Comic with id: ${id} does not exist!`);
            return res.status(404).json({ message: 'Comic does not exist!' });
        }

        logger.log(`Comic fetched from database!`);
        return res.status(200).json({ comic: comic });
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// GET comics by a filter
router.get('/filter', async (req, res) => {
    try {

    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST a comic
router.post('/', async (req, res) => {
    // Comic data in request body
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

    // Basic validation
    if (!title || !author || !issue || !volume) {
        logger.error('One of the required fields are missing!');
        return res.status(400).json({ message: 'Missing fields!' });
    }

    try {
        // Create the comic
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
router.put('/:id', async (req, res) => {
    try {
        // Shortform no reassign for every field
        const updatedComic = await Comic.findByIdAndUpdate(
            // Extracts id from url params
            // Uses 'req.body' to update only the fields sent in the request
            req.params.id,
            req.body,
            // returns the updated object and validate the fields
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedComic) {
            logger.error(`Cannot find the comic! ${error.message}`);
            return res.status(404).json({ message: 'Comic not found!' });
        }

        logger.log(`Comic Updated Successfully!`);
        return res.status(200).json({ message: 'Comic updated successfully!', comic: updatedComic });
    } catch (error) {
        logger.error(`An error occurred while updating the comic: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// DELETE a comic by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComic = await Comic.findByIdAndDelete(id);
        if (!deletedComic) return res.status(404).json({ message: 'Comic not found!' });

        logger.log(`Comic Deleted Successfully!`);
        return res.status(200).json({ message: 'Comic deleted successfully!', comic: deletedComic });
    } catch (error) {
        logger.error(`An error occurred while deleting the comic: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

module.exports = router;
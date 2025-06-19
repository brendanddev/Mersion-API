
// shopRoutes.js
// Defines the shop related routes for the server
// Brendan Dileo, June 2025

const express = require('express');
const logger = require('../utils/logger');
const Shop = require('../models/shopModel');
const validateShop = require('../middleware/validateShop');

// Create router
const router = express.Router();

// GET all shops
router.get('/', async (req, res) => {
    try {
        const shops = await Shop.find();
        logger.log(`Shops fetched from database: ${shops.length}`);
        return res.status(200).json({ shops: shops });
    } catch (error) {
            logger.error(`An error occurred: ${error.message}`);
            res.status(500).json({ message: 'Server Error!' });
    }
});

// GET to search for shops
router.get('/search', async (req, res) => {
    const { name, tags } = req.query;
    const filter = {};

    if (name) filter.name = new RegExp(name, 'i');
    if (tags) filter.tags = { $in: tags.split(', ') }

    try {
        const shops = await Shop.find(filter);
        return res.status(200).json({ shops: shops });
    } catch (error) {
        logger.error(`An error occurred while searching for the shops: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST to add a new shop
router.post('/', validateShop, async (req, res) => {
    const { name, address, email, phone, website, notes, tags } = req.body;

    try {
        const shop = await Shop.create({
            name: name,
            address: address,
            email: email,
            phone: phone,
            website: website,
            notes: notes,
            tags: tags
        });
        
        logger.log(`New Shop: ${name} created successfully!`);
        return res.status(201).json({ message: 'Shop entry created!', shop: shop });
    } catch (error) {
        logger.error(`An error occurred while creating the shop entry: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// PUT to update a shop by id
router.put('/:id', async (req, res) => {
    try {
        const updatedShop = await Shop.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedShop) {
            logger.error(`Cannot find the Shop! ${error.message}`);
            return res.status(404).json({ message: 'Shop not found!' });
        }
        
        logger.log(`Shop Updated Successfully!`);
        return res.status(200).json({ message: 'Shop updated successfully!', shop: updatedShop });
    } catch (error) {
        logger.error(`An error occurred while updating the Shop: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// DELETE to delete a shop by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShop = await Shop.findByIdAndDelete(id);
        if (!deletedShop) return res.status(404).json({ message: 'Shop not found!' });

        logger.log(`Shop Deleted Successfully!`);
        return res.status(200).json({ message: 'Shop deleted successfully!', shop: deletedShop });
    } catch (error) {
        logger.error(`An error occurred while deleting the Shop: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

module.exports = router;
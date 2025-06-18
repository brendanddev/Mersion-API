
// shopRoutes.js
// Defines the shop related routes for the server
// Brendan Dileo, June 2025

const express = require('express');
const mongoose = require('mongoose');
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
});

// DELETE to delete a shop by id
router.delete('/:id', async (req, res) => {
});
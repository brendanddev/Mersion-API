
// adminRoutes.js
// Routes for admin functionalities

const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const logger = require('../utils/logger');

const protect = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

// GET all users
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        logger.error('GET /api/admin/users failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE a user by id
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
    try {

    } catch (error) {
        logger.error(`DELETE /api/admin/users/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


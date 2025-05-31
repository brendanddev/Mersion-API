
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
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.deleteOne();
        logger.log(`User with ID ${req.params.id} deleted successfully`);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error(`DELETE /api/admin/users/${req.params.id} failed:`, error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
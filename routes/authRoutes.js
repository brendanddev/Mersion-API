
// authRoutes.js
// Handles user authentication routes
// Brendan Dileo - May 2025

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');
const logger = require('../utils/logger');

// Generates jwt token for a user
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_TOKEN, {
        expiresIn: '1d',
    });
}

// POST to register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required!' });
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: 'User already exists with this email!' });

        const newUser = await User.create({ name, email, password, role: role || 'user' });
        if (!newUser) return res.status(500).json({ error: 'Failed to create user!' });
        logger.log(`New user registered: ${newUser.email}`);

        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser),
        });
    } catch (error) {
        logger.error('POST /api/auth/register failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST to login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required!' });
        const user = await User.findOne({ email });

        if (!user || !(user.comparePassword(password)))
            return res.status(401).json({ error: 'Invalid crdentials!' });
        
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } catch (error) {
        logger.error('POST /api/auth/login failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
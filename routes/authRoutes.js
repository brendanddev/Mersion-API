

// authRoutes.js
// Handles user authentication routes
// Brendan Dileo - May 2025

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');
const logger = require('../utils/logger');
const { validateRegistration } = require('../validators/userValidator');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

// POST to register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const errors = validateRegistration({ username, email, password });
        if (errors.length > 0) return res.status(400).json({ error: errors.join(' ') });

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: 'User already exists with this email!' });

        const newUser = await User.create({ username, email, password });
        if (!newUser) return res.status(500).json({ error: 'Failed to create user!' });
        logger.log(`New user registered: ${newUser.email}`);

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: accessToken,
        });

    } catch (error) {
        logger.error('POST /api/auth/register failed:', error.message);
        console.error(`Error registering user: ${error.message}`);
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
            return res.status(401).json({ error: 'Invalid credentials!' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: accessToken,
        });
        
    } catch (error) {
        logger.error('POST /api/auth/login failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
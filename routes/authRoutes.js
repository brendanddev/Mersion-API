

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

        newUser.refreshToken = refreshToken;
        await newUser.save();

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

        user.refreshToken = refreshToken;
        await user.save();
        logger.log(`Logging ${user.email} in...`);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: accessToken,
        });

    } catch (error) {
        logger.error('POST /api/auth/login failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST to logout a user by clearing refresh token inside cookie
router.post('/logout', async (req, res) => {
    const token = req.cookies.refreshToken;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            const user = await User.findById(decoded.id);
            if (user) {
                user.refreshToken = null;
                await user.save();
                logger.log(`User ${user.email} logged out and refresh token cleared`);
            }
        } catch (error) {
            logger.error('POST /api/auth/logout failed:', error.message);
            return res.status(500).json({ error: 'Logout Failed: Invalid or expired refresh token provided.' });
        }
    }

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
    logger.log(`User logged out and refresh token cleared`);
});

// POST to refresh token by generating new access token
router.post('/refresh', async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== token) 
            return res.status(404).json({ error: 'User not found' });

        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
            maxAge: 30 * 24 * 60 * 60 * 500,
        });

        res.json({ accessToken });
        logger.log(`Access token refreshed for user: ${user.email}`);
        // res.clearCookie('refreshToken');
    } catch (error) {
        logger.error('POST /api/auth/refresh failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;


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
const RefreshToken = require('../models/refreshTokenModel');

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
        const { token: refreshToken, jti } = generateRefreshToken(newUser);

        await RefreshToken.create({ userId: newUser._id, jti });

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
        const { token: refreshToken, jti } = generateRefreshToken(user);

        await RefreshToken.create({ userId: user._id, jti });

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
            await RefreshToken.findOneAndUpdate(
                { userId: decoded.id, jti: decoded.jti },
                { revoked: true }
            );
            logger.log(`User ${decoded.id} logged out and refresh token cleared`);
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
        
        const existingToken = await RefreshToken.findOne({
            userId: decoded.id,
            jti: decoded.jti,
            revoked: false
        });

        if (!existingToken) {
            logger.error(`Refresh token for user ${decoded.id} is invalid or revoked`);
            return res.status(401).json({ error: 'Invalid or revoked refresh token' });
        }

        existingToken.revoked = true;
        await existingToken.save();

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const accessToken = generateAccessToken(user);
        const { token: newRefreshToken, jti } = generateRefreshToken(user);
        await RefreshToken.create({ userId: user._id, jti });

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

router.post('/toggle-auth', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.authEnabled = !user.authEnabled;
        await user.save();
        logger.log(`User ${user.email} authentication toggled to ${user.authEnabled}`);
        res.status(200).json({ message: `Auth protection is now ${user.authEnabled ? 'ENABLED' : 'DISABLED'}` });
    } catch (error) {
        logger.error('POST /api/auth/toggle-auth failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;
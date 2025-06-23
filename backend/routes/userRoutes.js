
// userRoutes.js
// Defines user related routes
// Brendan Dileo, June 2025

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const logger = require('../utils/logger');
const validateUser = require('../middleware/validateUser');
const authenticateToken = require('../middleware/auth');

const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const { sendAccessToken, sendRefreshToken } = require('../utils/token');
const { verify } = require('jsonwebtoken');

const { transporter, createPasswordResetUrl } = require('../utils/email');
const { passwordResetTemplate, passwordResetConfirmationTemplate } = require('../utils/email');

// Creates an instance of the express router
const router = express.Router();

// POST to register a user
router.post('/register', validateUser, async (req, res) => {
    // Extract data from request body and validate
    const { username, email, password } = req.body;

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.error(`User: ${email} already exists!`);
            return res.status(409).json({ message: 'Email already in use.' });
        }

        // Generate the salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({
            username: username,
            email: email,
            password: hash,
        });

        if (!user) {
            logger.error('An error occurred while creating the user!');
            return res.status(500).json({ message: 'An error occurred while creating the user!' });
        }
        
        logger.log(`New User: ${username} created successfully!`);

        // Generate token and include in response
        const token = generateToken(user);
        return res.status(201).json({ message: 'User created!', token });

    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST to login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        logger.error('One of the required fields are missing!');
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username: username });
        if (!user) {   
            logger.error('User not found!');
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            logger.error('Incorrect password!');
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate tokens if login successful
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();
        sendRefreshToken(res, refreshToken);

        return res.status(200).json({ accessToken, message: 'Login successful!' });

    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST to logout
router.post('/logout', (req, res) => {
    res.clearCookie('refreshtoken');
    return res.status(200).json({ message: 'Logged out successfully!', type: 'success' });
});

// POST to refresh access token using refresh token
router.post('/refresh', async (req, res) => {
    try {
        const { refreshtoken } = req.cookies;
        if (!refreshtoken) {
            logger.error('No refresh token found!');
            return res.status(401).json({ message: 'No refresh token found!', type: 'error' });
        }

        let userId;
        try {
            userId = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).userId;
        } catch (error) {
            logger.error(`Invalid refresh token: ${error.message}`);
            return res.status(401).json({ message: 'Invalid refresh token!', type: 'error' });
        }

        if (!userId) return res.status(401).json({ message: 'Invalid refresh token!', type: 'error' });

        const user = await User.findById(userId);
        if (!user) {
            logger.error(`User with ID: ${userId} does not exist!`);
            return res.status(500).json({ message: 'User does not exist!', type: 'error' });
        }

        if (user.refreshToken !== refreshtoken)
            return res.status(401).json({ message: 'Invalid refresh token!', type: 'error' });

        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();

        sendRefreshToken(res, newRefreshToken);
        logger.log('Refresh token refreshed successfully for user!');
        return res.status(200).json({ message: 'Token refreshed!', type: 'success', accessToken });

    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST to send a password reset email
router.post('/reset-password', async (req, res) => {

})


// GET to display user dashboard
router.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

module.exports = router;

// userRoutes.js
// Defines user related routes
// Brendan Dileo, June 2025

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const logger = require('../utils/logger');

// Creates an instance of the express router
const router = express.Router();

// POST to register a user
router.post('/register', async (req, res) => {
    // Extract data from request body and validate
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        logger.error('One of the required fields are missing!');
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

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
        
        logger.log(`New User: ${username} created successfully!`);
        return res.status(201).json({ message: 'User created!' });

    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// GET to login
router.get('/login', async (req, res) => {
});

// userRoutes.js
// Defines user related routes
// Brendan Dileo, June 2025

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const logger = require('../utils/logger');
const validateUser = require('../middleware/validateUser');
const generateToken = require('../utils/token');

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

        if (isMatch) {
            logger.log(`User ${username} logged in successfully!`);
            
            // Generate token and include in response
            const token = generateToken(user);
            return res.status(200).json({ message: 'Login successful!', token });
        } else {
            logger.error('Incorrect password!');
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
    } catch (error) {
        logger.error(`An error occurred: ${error.message}`);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// TODO: Logout route
router.get('/logout', (req, res) => {
    logger.log('User logged out successfully!');
    return res.status(200).json({ message: 'Logged out successfully!' });
});


module.exports = router;
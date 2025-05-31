
// authRoutes.js
// Handles user authentication routes

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
    } catch (error) {
        logger.error('POST /api/auth/register failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST to login a user
router.post('/login', async (req, res) => {
    try {
    } catch (error) {
        logger.error('POST /api/auth/login failed:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});
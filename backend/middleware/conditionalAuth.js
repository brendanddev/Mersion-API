
// conditionalAuth.js
// Middleware to conditionally 
// Brendan Dileo - June 2025

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const logger = require('../utils/logger');

const conditionalAuth = async (req, res, next) => {
    let token;
    let user;

}

module.exports = conditionalAuth;

// token.js
// Handles jwt token generation and verification
// Brendan Dileo - June 2025

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Generates jwt access token for a user
const generateAccessToken = (user) => {
    if (!user || !user._id) throw new Error('Invalid user object provided for token generation');
    
    return jwt.sign(
        { id: user._id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
}

// Generates jwt refresh token for a user
const generateRefreshToken = (user) => {
    if (!user || !user._id) throw new Error('Invalid user object provided for token generation');
    
    const jti = uuidv4();
    const token = jwt.sign(
        { id: user._id, jti },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '1d' }
    );
    return { token, jti };
}

module.exports = { generateAccessToken, generateRefreshToken };



// token.js
// Generates json web tokens for user authentication
// Brendan Dileo, June 2025

const jwt = require('jsonwebtoken');

// Generates a jwt token for a user
const generateToken = (user) => {
    // Payload data to encode inside token
    const payload = {
        userId: user._id,
        username: user.username,
    };

    // Sign the token with secret
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;
}

module.exports = generateToken;
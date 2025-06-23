
// token.js
// Generates json web tokens for user authentication
// Brendan Dileo, June 2025

const jwt = require('jsonwebtoken');

// Generates and signs the jwt access token for a user
const generateAccessToken = (user) => {
    // Payload data to encode inside token
    const payload = {
        userId: user._id,
        username: user.username,
    };

    // Sign the token with secret
    const token = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}

// Generates and signs the jwt refresh token
const generateRefreshToken = (user) => {
    const payload = { userId: user._id }

    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '2h' }
    );
}

// Sends the access token to the client
const sendAccessToken = (req, res, accessToken) => {
    res.json({
        accessToken,
        message: 'Sign in Successful!',
        type: 'success',
    });
}

// Sends the refresh token to the client
const sendRefreshToken = (res, refreshToken) => {
    res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
    });
}

// Generates the token for resetting a password
const generatePasswordResetToken = (user) => {
    const secret = user.password;
    return jwt.sign(
        { id: user._id, email: user.email },
        secret,
        { expiresIn: 10 * 60 }
    );
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    sendAccessToken,
    sendRefreshToken,
    generatePasswordResetToken,
}
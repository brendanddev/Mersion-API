
// refreshTokenModel.js
// Defines schema and model for refresh tokens in the database
// Brendan Dileo - June 2025

const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jti: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    revoked: { type: Boolean, default: false }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);

// userModel.js
// Defines the user schema and creates the model
// Brendan Dileo, June 2025

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', userSchema);
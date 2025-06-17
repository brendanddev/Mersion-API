
// shopModel.js
// Defines the shop schema for collectible shops and creates the model
// Brendan Dileo, June 2025

const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: String,
    email: String,
    website: String,
    notes: String,
    tags: [String]
});

module.exports = mongoose.model('Shop', shopSchema);

// comicModel.js
// Defines the comic schema and creates the model
// Brendan Dileo - June 2025

const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    issue: { type: Number, required: true },
    volume: { type: Number, required: true },
    publisher: String,
    coverVariant: String,
    releaseDate: Date,
    rating: { type: Number, min: 1, max: 10 },
    purchasePrice: Number,
    currentValue: Number,
    condition: {
        type: String,
        enum: ['Near Mint', 'Very Fine', 'Fine', 'Very Good', 'Good', 'Fair', 'Poor'],
        default: 'Good'
    },
    isRead: { type: Boolean, default: false },
    genre: String,
    tags: [String],
    notes: String
});

module.exports = mongoose.model('Comic', comicSchema);
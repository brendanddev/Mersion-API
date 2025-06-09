
// comicModel.js
// Defines schema and model for comics in the database
// Brendan Dileo - May 2025

const mongoose = require('mongoose');

// Comic schema definition
const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    publisher: String,
    issue: { type: Number, required: true },
    volume: { type: Number, required: true },
    coverVariant: String,
    genre: String,
    releaseDate: Date,
    condition: {
        type: String,
        enum: ['Mint', 'Near Mint', 'Very Fine', 'Fine', 'Good', 'Fair', 'Poor'],
        default: 'Fine',
    },
    isRead: { type: Boolean, default: false },
    purchasePrice: Number,
    currentValue: Number,
    notes: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Comic', comicSchema);

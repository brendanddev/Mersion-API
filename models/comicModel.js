

// comicModel.js
// Defines schema and model for comics in the database

const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    publisher: String,
    issue: Number,
    volume: Number,
    genre: String,
    releaseDate: Date,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Comic', comicSchema);


// comicModel.js
// Defines schema and model for comics in the database

const mongoose = require('mongoose');

// Comic schema definition
const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: String,
    issue: { type: Number, required: true },
    volume: { type: Number, required: true },
    genre: String,
    releaseDate: Date,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Comic', comicSchema);

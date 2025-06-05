
// connect.js
// Connects to mongodb using mongoose 
// Brendan Dileo - May 2025

const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.log('Connected to MongoDB successfully');
    } catch (error) {
        logger.error(`Failed to connect to MongoDB: ${error.message}`);
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;

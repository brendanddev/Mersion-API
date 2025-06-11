
// connect.js

const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/comicsdb');
        logger.log('Connected to MongoDB Successfully!');
    } catch (error) {
        logger.log('An error occurred while connecting to the database!', error.message);
        console.error('An error occurred!');
        process.exit(1);
    }
}


module.exports = connectDB;
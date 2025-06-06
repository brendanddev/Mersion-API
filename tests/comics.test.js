
// comics.test.js
// Uses Jest to automate testing of the comics api endpoints
// Brendan Dileo - May 2025

const request = require('supertest');
const app = require('../app');
const connectDB = require('../db/connect');
const mongoose = require('mongoose');

require('dotenv').config();

// Need to connect to db before anything else runs
beforeAll(async () => {
    await connectDB();
});

// Close the db after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});

// Test basic GET
describe('GET /api/v2/comics', () => {
    it('should return a list of comics', async () => {
        const response = await request(app).get('/api/v2/comics');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

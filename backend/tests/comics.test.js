
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

// Test basic GET and GET by id
describe('GET /api/v2/comics', () => {
    // Basic GET test
    it('should return a list of comics', async () => {
        const response = await request(app).get('/api/v2/comics');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    
    // GET by id test, expected to return a 404
    it('should return a single comic by id', async () => {
        const badId = '123456789123456789';
        const response = await request(app).get(`/api/v2/comics/${badId}`);
        expect(response.statusCode).toBe(404);
    });
});
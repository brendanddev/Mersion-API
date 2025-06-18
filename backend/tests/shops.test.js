
// shops.test.js
// Defines tests to verify shop related routes using jest and supertest.
// Brendan Dileo, June 2025

const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const Shop = require('../models/shopModel');

// Connect to db before running any tests
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/comicsdb');
});

// Close db connection after all tests have executed
afterAll(async () => {
    await mongoose.connection.close();
});

// GET tests
describe('GET /shops', () => {

    // Tests GET shops route
    test('should return a list of shops', async () => {
        
        // Sends a GET request to the /shops endpoint
        const response = await request(app).get('/shops');

        // Expect the status code response from request to be 200
        expect(response.statusCode).toBe(200);
        
        // Extract shop data from body of response
        const shops = response.body.shops;

        // Expect the response to be an array of shop objects
        expect(Array.isArray(shops)).toBe(true);

        // If more than one shop in response, confirm the first has a name property
        if (shops.length > 0) {
            expect(shops[0]).toHaveProperty('name');
        }
    });
});
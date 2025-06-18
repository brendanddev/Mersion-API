
// shops.test.js
// Defines tests to verify shop related routes using jest and supertest.
// Brendan Dileo, June 2025

const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const Shop = require('../models/shopModel');

let testId;

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

// POST test
describe('POST /shops', () => {

    // POST to create a new shop entry
    test('should create a new shop', async () => {

        // Declare test comic to be added to db
        const shop = { name: 'Test Shop', address: '123 Test Avenue' }

        // Send POST request, attach shop in body, and store response
        const response = await request(app).post('/shops').send(shop);

        // Validate response properties from request
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('shop');
        expect(response.body.shop).toHaveProperty('_id');
        expect(response.body.shop.name).toBe(shop.name);

        // Store id of newly created shop to be tested after
        testId = response.body.shop._id;
    });
});

// PUT test
describe('PUT /shops/:id', () => {

    // PUT to update an existing shop
    test('should update the shop', async () => {

        // Make sure the test id of the created shop is defined before test
        expect(testId).toBeDefined();

        // Updates to be applied in PUT
        const updates = { email: 'email@email.com' };

        // Send PUT request
        const response = await request(app)
            .put(`/shops/${testId}`)
            .send(updates);
        
        // Validate properties of response
        expect(response.statusCode).toBe(200);
        expect(response.body.shop).toHaveProperty('email', 'email@email.com');
    });
});

// DELETE test
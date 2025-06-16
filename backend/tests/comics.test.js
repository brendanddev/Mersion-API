
// comics.test.js
// Defines tests to verify the backend routes.
// Uses Jest to structure the tests and supertest to simulate http requests.
// Brendan Dileo, June 2025

const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');

const testComicId = "684a294f50c68e07bf7bcab6";
const invalidComicId = "0x0x0x0x0x0x0x0x0x0x0x0x0x0x0";

let testId;

// Connect to db before any tests
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/comicsdb');
});

afterAll(async () => {
    await mongoose.connection.close();
});

// GET tests
describe('GET /comics', () => {
    
    // Tests GET comics route
    test('should return a list of comics', async () => {
        // Sends a GET request to the /comics endpoint
        const response = await request(app).get('/comics');

        // Expect the status code to be 200
        expect(response.statusCode).toBe(200);

        // Extract comic data from body of request
        const comics = response.body.comics;
        
        // Expect the response to be array of comics
        expect(Array.isArray(comics)).toBe(true);

        if (comics.length > 0) {
            expect(comics[0]).toHaveProperty('title');
        }
    });

    // GET by id
    test('should return a single comic by id', async () => {

        const response = await request(app).get(`/comics/${testComicId}`);
        expect(response.statusCode).toBe(200);
        const comic = response.body.comic;

        // Expecting single comic object to be returned not list of them
        expect(typeof comic).toBe('object');
        expect(comic).not.toBeNull();

        // Expect to see id and title in returned comic object
        expect(comic).toHaveProperty('_id');
        expect(comic).toHaveProperty('title');
        // expect(Array.isArray(comic)).toBe(true);
    });

    // Test GET by invalid id
    test('should return an error for an invalid comic ID', async () => {
        const response = await request(app).get(`/comics/${invalidComicId}`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

});

// Basic POST test
describe('POST /comics', () => {

    // POST to create a test comic
    test('should create a new comic', async () => {

        const comic = {
            title: 'Test Comic',
            author: 'Test Author',
            issue: 100,
            volume: 100,
            condition: 'Good',
            isRead: false,
            tags: ['test', 'jest']
        };

        // Send the POST request, attach comic in body, store response
        const response = await request(app).post('/comics').send(comic);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('comic');
        expect(response.body.comic).toHaveProperty('_id');
        expect(response.body.comic.title).toBe(comic.title);

        testId = response.body.comic._id;
    });
});

// PUT test
describe('PUT /comics/:id', () => {
    test('should update the comic', async () => {
        
        // Ensure test comic id is defined
        expect(testId).toBeDefined();
        const updates = { condition: 'Near Mint', isRead: true };

        // Send PUT request
        const response = await request(app)
            .put(`/comics/${testId}`)
            .send(updates);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.comic).toHaveProperty('condition', 'Excellent');
        expect(response.body.comic).toHaveProperty('isRead', true);
    });
});

// DELETE test
describe('DELETE /comics/:id', () => {
    test('should delete the comic', async () => {
        expect(testId).toBeDefined();
        const response = await request(app).delete(`/comics/${testId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Comic deleted successfully!');
        testId = null;
    });
});
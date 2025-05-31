
// comics.test.js
// Uses Jest to automate testing of the comics api endpoints
// Brendan Dileo - May 2025

const request = require('supertest');
const app = require('../app');
const connectDB = require('../db/connect');
const mongoose = require('mongoose');

require('dotenv').config();

// Need to connect to db before
beforeAll(async () => {
    await connectDB();
});

// Close after
afterAll(async () => {
    await mongoose.connection.close();
});

// Test basic GET
describe('GET /api/comics', () => {
    it('should return a list of comics', async () => {
    const response = await request(app).get('/api/comics');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// Test GET by id
describe('GET /api/comics/:id', () => {
    // test valid comic id
    const testComicId = '683a4f80d1a628cc58400b84';
    it('should return a comic by ID', async () => {
        const response = await request(app).get(`/api/comics/${testComicId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testComicId);
    });

    // test invalid comic id
    it('should return 404 for non-existent ID', async () => {
        const badId = '00000000000000000';
        const response = await request(app).get(`/api/comics/${badId}`);
        expect(response.statusCode).toBe(404);
    });
});

// Test POST new comic and DELETE test comic
describe('POST and DELETE /api/comics', () => {
    let createdComicId;

    // Test POST to create a new comic
    it('should create a new comic', async () => {
        const newComic = {
            title: 'Test Comic',
            author: 'Test Author',
            publisher: 'Test Publisher',
            issue: 1,
            volume: 1,
            genre: 'Test Genre',
            releaseDate: '2025-05-31',
        }

        const response = await request(app).post('/api/comics').send(newComic);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Test Comic');
        createdComicId = response.body._id;
    });

    // Test DELETE to delete the created comic
    it('should delete the test comic', async () => {
        const response = await request(app).delete(`/api/comics/${createdComicId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comic deleted successfully');
    });
});

// Test POST new comic with missing fields
describe('POST /api/comics', () => {
    it('should return 400 for missing required fields', async () => {
        const incompleteComic = { title: 'Incomplete Comic' };
        const response = await request(app).post('/api/comics').send(incompleteComic);
        expect(response.statusCode).toBe(400);
    });
});

// Test PUT update comic
describe('PUT /api/comics/:id', () => {
    let testComicId;

    // Create a test comic to update before running tests
    beforeAll(async () => {
        const newComic = await request(app).post('/api/comics').send({
            title: 'Update Test Comic',
            author: 'Update Test Author',
        });
        testComicId = newComic.body._id;
    });

    // Test updating a comic
    it('should update an existing comic', async () => {
        const updatedComic = await request(app).put(`/api/comics/${testComicId}`).send({
            title: 'Updated Comic Title',
        });
        expect(updatedComic.statusCode).toBe(200);
        expect(updatedComic.body.title).toBe('Updated Comic Title');
    });

    // Test updating a non-existent comic
    it('should return 404 for a non-existent ID', async () => {
        const response = await request(app).put('/api/comics/0000000000000000000').send({ title: 'Nothing' });
        expect(response.statusCode).toBe(404);
    });

    // Clean up by deleting the test comic
    afterAll(async () => {
        await request(app).delete(`/api/comics/${testComicId}`);
    });
});

// Test GET search for comics
describe('GET /api/comics/search', () => {
});

// Test GET filter comics
describe('GET /api/comics/filter', () => {
});
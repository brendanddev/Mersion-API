
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

// comics.test.js

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
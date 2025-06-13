
// comics.test.js

const request = require('supertest');
const testComicId = "684a294f50c68e07bf7bcab6";

// GET tests
describe('GET /comics', () => {
    // Basic GET
    test('should return a list of comics', async () => {
        const response = await request('http://localhost:5000').get('/comics');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('title');
        }
    });

    // GET by id
    test('should return a single comic by id', async () => {
    });
});

// Basic POST test


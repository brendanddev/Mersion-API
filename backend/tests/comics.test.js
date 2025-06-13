
// comics.test.js
// Defines tests to verify the backend routes.
// Uses Jest to structure the tests and supertest to simulate http requests.
// Brendan Dileo, June 2025

const request = require('supertest');

const url = "http://localhost:5000";
const testComicId = "684a294f50c68e07bf7bcab6";

// GET tests
describe('GET /comics', () => {
    
    // Tests GET comics route
    test('should return a list of comics', async () => {
        // Sends a GET request to the /comics endpoint
        const response = await request(url).get('/comics');

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

        const response = await request(url).get(`/comics/${testComicId}`);
        expect(response.statusCode).toBe(200);
        const comic = response.body.comic;
        expect(Array.isArray(comic)).toBe(true);

        if (comic.length > 0) {
            expect(comic[1]).toHaveProperty('title');
        }
    });
});

// Basic POST test


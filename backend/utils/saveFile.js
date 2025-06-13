
// saveFile.js
// Utility methods for saving comic data to a file in json or csv format
// Brendan Dileo, June 2025

// [1] https://www.geeksforgeeks.org/javascript/how-to-convert-json-object-to-csv-in-javascript/

const { writeFileSync } = require('fs');

// Convert data to pretty printed json
const toJson = (data) => {
    return JSON.stringify(data, null, 2);
}

// Converts json data to csv format
const toCsv = (data) => {
}

/**
 "comics": [
    {
      "tags": [],
      "_id": "68422aa3b10114b0c5de5dcb",
      "title": "Ultimate Spider-Man: Incursion",
      "author": "Deniz Camp",
      "publisher": "Marvel Comics",
      "issue": 1,
      "volume": 1,
      "genre": "Superhero",
      "releaseDate": "2025-06-04T00:00:00.000Z",
      "condition": "Near Mint",
      "isRead": true,
      "notes": "The first issue to the new Ultimate Spider-Man Incursion series.",
      "createdAt": "2025-06-05T23:39:15.467Z",
      "updatedAt": "2025-06-05T23:39:15.467Z",
      "__v": 0
    },
 */


const saveFile = (data, fileName, format = 'json') => {
}

module.exports = { toCsv, toJson, saveFile };

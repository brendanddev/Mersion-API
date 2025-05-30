
// comicRoutes.js

const express = require('express');
const router = express.Router();
const Comic = require('../models/comicModel');
const logger = require('../utils/logger')

router.get('/', (req, res) => {
    logger.log('Server Running...');
    res.json({ message: 'Comics route working' });
});

router.post('/', (req, res) => {
    const data = req.body;
    logger.log('POST /api/comics received data: ', data);
    res.json({ message: 'POST Request Received', data});
});

module.exports = router;
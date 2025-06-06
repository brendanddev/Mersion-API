
// swagger.js
// Middleware to server the swagger docs.
// Brendan Dileo - June 2025

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../docs/swaggerOptions');
const logger = require('../utils/logger');

const setupSwaggerDocs = (app) => {
    app.use('/api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    logger.log('Swagger docs running at http://localhost:5000/api/v2/api-docs');
}

module.exports = setupSwaggerDocs;


// swaggerOptions.js
// Configures the swagger options for the api docs.
// Brendan Dileo - June 2025

const yaml = require('yamljs');
const path = require('path');\

const swaggerDoc = yaml.load(path.join(__dirname, 'swagger.yaml'));
module.exports = swaggerDoc;

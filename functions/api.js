const serverless = require('serverless-http');
const app = require('../backend/api.js');

module.exports.handler = serverless(app);

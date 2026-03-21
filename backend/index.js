const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001; // Default to 5001 as used locally

// Trust Proxy (Essential for Netlify/Render/Railway)
app.set('trust proxy', 1);

// Middleware
app.use(cors({
    origin: '*', // Dynamic permission for all domains during initial deployment
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}`);
  next();
});

const serverless = require('serverless-http');

// Routes
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Wakil AI Backend is running');
});

// For local development
if (process.env.NODE_ENV !== 'production' || !process.env.NETLIFY) {
    app.listen(PORT, () => {
      console.log(`[Wakil AI] Core Engine running on Port ${PORT}`);
      console.log(`[Wakil AI] Active Endpoint: ${process.env.AI_API_URL || 'OpenAI Default'}`);
    });
}

module.exports.handler = serverless(app);
module.exports = app; // For normal imports

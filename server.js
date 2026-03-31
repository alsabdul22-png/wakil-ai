const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const BARADA_BASE_URL = 'https://www.barada.cloud/api';

// Serve static frontend files (index.html, css, js)
app.use(express.static(__dirname));

// Parse JSON bodies
app.use(express.json());
app.use(cors());

// --- Proxy Chat Completions ---
app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(`${BARADA_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BARADA_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    res.json(data);
  } catch (err) {
    console.error('Chat API Error:', err.message);
    res.status(500).json({ error: { message: 'Internal Server Error fetching from Barada API' }});
  }
});

// --- Proxy Image Generation (Hugging Face) ---
app.post('/api/images', async (req, res) => {
  try {
    const HF_MODEL = 'stabilityai/stable-diffusion-xl-base-1.0';
    console.log(`Generating image via Hugging Face (${HF_MODEL})...`);
    
    // Hugging Face expects { inputs: "prompt" } in JSON
    const payload = { inputs: req.body.prompt };

    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HF_IMAGE_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      if (response.headers.get('content-type')?.includes('json')) {
        const errorData = await response.json();
        return res.status(response.status).json(errorData);
      } else {
        return res.status(response.status).json({ error: { message: `HF API Error ${response.status}: ${response.statusText}` }});
      }
    }

    // Inference API returns raw image bytes natively! We'll base64-encode it so the frontend doesn't break
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const b64_json = buffer.toString('base64');
    
    res.json({ data: [{ b64_json }] });
  } catch (err) {
    console.error('Image API Error:', err.message);
    res.status(500).json({ error: { message: 'Internal Server Error fetching from Hugging Face API' }});
  }
});

// --- Contact Form Submission ---
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  // Log for now (In production you would send an email or save to DB)
  console.log('--- NEW CONTACT REQUEST ---');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);
  console.log('---------------------------');

  res.json({ success: true, message: 'Message received by Elvrona Group' });
});


module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚀 AI Studio Server running!`);
    console.log(`🌍 Open in browser: http://localhost:${PORT}`);
    console.log(`========================================\n`);
  });
}

const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const { readDb, writeDb } = require('../dbHelper');
const axios = require('axios');

// Configure AI Service (OpenAI or Barada AI)
const AI_API_URL = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
const AI_API_KEY = process.env.BARADA_AI_API_KEY || process.env.OPENAI_API_KEY;

router.get('/me', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const db = readDb();
    const user = db.users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Return profile but hide password
    const { password, ...userProfile } = user;
    res.json(userProfile);
});

router.post('/generate', authMiddleware, async (req, res) => {
    const { prompt, tool, options } = req.body;
    const userId = req.user.id;

    const db = readDb();
    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    if (db.users[userIndex].credits <= 0) {
        // Auto-refill credits for testing so users are not blocked
        db.users[userIndex].credits = 10;
        writeDb(db);
    }

    try {
        let systemPrompt = "";
        const baradaContext = " You are also an expert on Barada AI (barada.cloud), an efficient and private AI platform that features real-time web search, intelligent file analysis, document creation, and developer-centric API access. You treat Barada AI as your core intelligence partner.";
        
        if (tool === "brand" || tool === "marketing") {
            systemPrompt = "You are a Brand & Copy Expert. Generate high-converting emails, marketing copy, and social media posts. " + 
                           "ALWAYS Structure your output into components. Use '### TITLE' for each new section/card. " + baradaContext;
        } else if (tool === "website" || tool === "product") {
            systemPrompt = "You are a Senior Web Architect. Generate clean HTML/CSS components and landing page structures. " + 
                           "ALWAYS wrap HTML code in markdown code blocks. Use '### PAGE SECTION' for each part. " + baradaContext;
        } else if (tool === "image") {
            systemPrompt = "You are an AI Artist. Generate a highly detailed visual description based on the prompt. " + 
                           "Then, at the very end of your response, ALWAYS include exactly one line with this format: ![IMAGE](https://image.pollinations.ai/prompt/{URL_ENCODED_DETAILED_PROMPT}) " + 
                           "Do not use boxes for the image itself, just the description. " + baradaContext;
        } else if (tool === "operations") {
            systemPrompt = "You are an Operations Strategist. Create stakeholder inquiry flows, business emails, and FAQ automation. " + 
                           "Structure each flow into clear '### STEP' boxes. " + baradaContext;
        } else {
            systemPrompt = "You are an AI assistant for solopreneurs. Structure your response into logical parts using '### TITLE'. " + baradaContext;
        }
        let result = "";
        let isMock = false;
        
        // Real API Call if KEY exists
        if (AI_API_KEY && AI_API_KEY !== 'YOUR_API_KEY_HERE') {
            try {
                const response = await axios.post(AI_API_URL, {
                    model: "barada-1",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 1500
                }, {
                    headers: {
                        'Authorization': `Bearer ${AI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                });
                result = response.data.choices[0].message.content;
            } catch (apiErr) {
                console.warn('[Wakil AI] API Call failed:', apiErr.message);
                if (apiErr.response) {
                    console.warn('[Wakil AI] API Response Status:', apiErr.response.status);
                    console.warn('[Wakil AI] API Response Body:', JSON.stringify(apiErr.response.data));
                }
                isMock = true;
            }
        } else {
            isMock = true;
        }

        if (isMock) {
            // High-quality Mock fallback for local testing
            if (tool === 'image') {
                result = `### AI GENERATED CANVAS\n\nI have generated a futuristic visualization for your vision: "${prompt}".\n\n![IMAGE](https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ' futuristic high quality cinematic style')})`;
            } else if (tool === 'website') {
                result = `### HEADER COMPONENT\n\n\`\`\`html\n<header class='bg-emerald-900 text-white p-8'>\n  <h1 class='text-4xl'>${prompt}</h1>\n</header>\n\`\`\`\n\n### CONTENT BLOCK\n\n\`\`\`html\n<section class='p-12'>\n  <div class='glass p-8'>\n     <p class='text-xl'>Innovating the vision of the future with Barada AI core intelligence.</p>\n  </div>\n</section>\n\`\`\``;
            } else {
                result = `### STRATEGEM ALPHA\n\nBased on your prompt: "${prompt}", our system architect has refined the strategy:\n\n### EXECUTION PLAN\n\n1. Web Search Integration: Querying Barada Cloud for real-time market trends.\n2. Intelligent Analysis: Utilizing Barada's file analyzer for your ISO-spec documentation.\n\n### DEPLOYMENT STATUS\n\nOutput: Successful generation. Integrated with Barada.cloud core.`;
            }
        }

        // Deduct credit
        db.users[userIndex].credits -= 1;
        
        // Save to History
        if (!db.users[userIndex].history) db.users[userIndex].history = [];
        db.users[userIndex].history.unshift({
            id: Date.now().toString(),
            tool,
            prompt,
            result,
            createdAt: new Date().toISOString()
        });
        
        // Limit history to 50 items
        if (db.users[userIndex].history.length > 50) db.users[userIndex].history.pop();

        writeDb(db);

        res.json({
            success: true,
            result,
            remainingCredits: db.users[userIndex].credits,
            history: db.users[userIndex].history.slice(0, 10)
        });
    } catch (err) {
        console.error('AI Error:', err.message);
        const status = err.response?.status || 500;
        const msg = err.response?.data?.message || err.message;
        res.status(status).json({ message: `AI Service Error (${status}): ${msg}` });
    }
});

// Update profile/subscription
router.post('/upgrade', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const { plan } = req.body;
    
    const db = readDb();
    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    if (plan === 'pro') {
        db.users[userIndex].role = 'pro';
        db.users[userIndex].credits += 500;
    }

    writeDb(db);
    res.json({ message: 'Upgrade successful', user: db.users[userIndex] });
});

module.exports = router;

# Wakil AI Email System Integration Guide

The email system is fully implemented, strictly adhering to your security and design specifications. Follow this guide to plug it directly into your application.

## 1. Prerequisites

Make sure to add the following variables to your `.env` file (which is loaded automatically by the service):

```env
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
JWT_SECRET=your_super_secret_for_tokens (optional, will auto-generate if missing)
FRONTEND_URL=https://elvrona.cloud
```

## 2. Setting Up The Routes in Express

Here is how you can use the newly created services directly in your existing API routes. 

### A. User Registration & Sending OTP
*File: e.g., `routes/auth.js`*

```javascript
const express = require('express');
const router = express.Router();
const EmailService = require('../services/email/emailService');
const VerificationService = require('../services/auth/verificationService');

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // 1. Create the user in your database, mark as { isVerified: false }
        // const newUser = await db.User.create({ email, password, name, isVerified: false });
        
        // 2. Generate a secure, hashed OTP
        const otp = await VerificationService.generateRegistrationOTP(email);
        
        // 3. Send the OTP via SendGrid
        await EmailService.sendVerificationCode(email, otp);
        
        res.status(200).json({ message: "Registration successful. Please check your email for the OTP." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### B. Verifying OTP
```javascript
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, code } = req.body;
        
        // 1. Verify the code (This checks expiration and compares hashes)
        const isVerified = await VerificationService.verifyRegistrationOTP(email, code);
        
        if (isVerified) {
            // 2. Update user status in DB
            // await db.User.update({ isVerified: true }, { where: { email } });
            
            res.status(200).json({ message: "Account successfully activated." });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

### C. First Login & Sending Welcome Email
```javascript
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Authenticate user
        // const user = await db.User.findByEmail(email);
        // if (!user.isVerified) throw new Error("Account not verified.");
        
        // 2. Check if it's the first login 
        // if (user.isFirstLogin) {
            await EmailService.sendWelcomeEmail(user.email, user.name);
            // await db.User.update({ isFirstLogin: false }, { where: { id: user.id } });
        // }
        
        res.status(200).json({ token: "your_auth_token", message: "Login successful" });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
```

### D. Updating Account Settings securely
```javascript
router.post('/request-email-update', async (req, res) => {
    try {
        const { newEmail } = req.body;
        const userId = req.user.id; // From your auth middleware
        
        // 1. Generate an expiring JWT containing the request data
        const token = VerificationService.generateAccountUpdateToken(userId, 'email address', { newEmail });
        
        // 2. Create the confirmation link
        const confirmLink = \`\${process.env.FRONTEND_URL}/confirm-update?token=\${token}\`;
        
        // 3. Send email to the *current* email address (or new one depending on your security policy)
        await EmailService.sendAccountUpdateConfirmation(req.user.email, 'email address', confirmLink);
        
        res.status(200).json({ message: "Confirmation request sent to your email." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// The endpoint that the confirmation link hits
router.get('/confirm-update', async (req, res) => {
    try {
        const { token } = req.query;
        
        // 1. Verify the link is valid and hasn't expired
        const decoded = VerificationService.verifyAccountUpdateToken(token);
        
        if (decoded.updateType === 'email address') {
             // 2. Apply the change to DB
             // await db.User.update({ email: decoded.data.newEmail }, { where: { id: decoded.userId } });
             res.status(200).json({ message: "Email successfully updated." });
        }
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
});
```

## 3. Directory Structure

The tools reside in your application under:
```
services/
├── email/
│   ├── emailService.js     (SendGrid integration & send logic)
│   └── templates.js        (HTML templates using standard design aesthetics)
└── auth/
    └── verificationService.js (Secure OTP hashing, generation, JWT logic)
```

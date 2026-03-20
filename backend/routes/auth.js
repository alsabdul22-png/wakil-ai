const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readDb, writeDb } = require('../dbHelper');

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const db = readDb();
    const userExists = db.users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        credits: 10,
        role: 'user',
        createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDb(db);

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, credits: newUser.credits }
    });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const db = readDb();
    const user = db.users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, credits: user.credits }
    });
});

module.exports = router;

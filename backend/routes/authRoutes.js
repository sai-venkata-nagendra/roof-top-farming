const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure this is the correct path
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret';

// ✅ SIGNUP Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token, userId: user._id });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// ✅ LOGIN Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials1' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials2' });

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// ✅ AUTHENTICATION MIDDLEWARE
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;  // Attach user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};


router.get('/validate-token', authenticateToken, (req, res) => {
    res.json({ valid: true, user: req.user });
});

router.get('/user-data', authenticateToken, async (req, res) => {
    try {
        const users = await User.find(); // Fetch user data
        res.json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ PROTECTED ROUTE (Example)
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;

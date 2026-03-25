const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, major } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        user = new User({ firstName, lastName, email, password, major });
        await user.save();

        res.status(201).json({ success: true, message: 'Registration successful! Proceed to login.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error during registration.' });
    }
});

// @route   POST /api/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        if (password !== user.password) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ success: true, token, user: { name: `${user.firstName} ${user.lastName}`, email: user.email, major: user.major } });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
});

module.exports = router;

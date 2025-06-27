const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Signup Route
router.post('/signup', async (req, res) => {
  console.log('✅ /api/signup route hit');
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ fullName, email, password, role: 'user' });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: 'Error saving user' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  console.log('✅ /api/login route hit');
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      fullName: user.fullName,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Login failed due to server error' });
  }
});

// ✅ Create Admin Route (one-time use)
router.get('/create-admin', async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@resolvenow.com' });
    if (existingAdmin) {
      return res.status(200).json({ message: 'Admin already exists' });
    }

    const admin = new User({
      fullName: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin user created' });
  } catch (err) {
    console.error('❌ Admin creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Test route
router.get('/test', (req, res) => {
  res.send('✅ Backend test route working!');
});

module.exports = router;
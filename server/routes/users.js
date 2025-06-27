// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
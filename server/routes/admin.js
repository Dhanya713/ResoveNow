// routes/admin.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Get all complaints
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    console.error('❌ Error fetching all complaints:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign agent (optional future step)
// router.put('/assign/:id', async (req, res) => { ... });

module.exports = router;
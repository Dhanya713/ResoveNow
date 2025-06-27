const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// ✅ POST /api/complaints - Submit a new complaint
router.post('/', async (req, res) => {
  const { title, description, address, fullName, email } = req.body;
  console.log('✅ /api/complaints POST route hit');
  console.log('Request body:', req.body);

  try {
    const newComplaint = new Complaint({
      title,
      description,
      address,
      fullName,
      email,
      status: 'Pending', // default status
      date: new Date()
    });

    await newComplaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (err) {
    console.error('❌ Error submitting complaint:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/complaints/:email - Get complaints by user email
router.get('/:email', async (req, res) => {
  try {
    const complaints = await Complaint.find({ email: req.params.email });
    res.json(complaints);
  } catch (err) {
    console.error('❌ Error fetching complaints:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/complaints - Get all complaints (admin)
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    console.error('❌ Error fetching all complaints:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ PUT /api/complaints/:id/status - Update complaint status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;

  if (!['Pending', 'Resolved'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ message: 'Status updated successfully', complaint });
  } catch (err) {
    console.error('❌ Error updating complaint status:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
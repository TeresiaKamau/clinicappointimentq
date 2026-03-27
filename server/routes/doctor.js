const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');

// Get All Doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add Doctor (Admin Only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
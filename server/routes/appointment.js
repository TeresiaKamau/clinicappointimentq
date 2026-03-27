const express = require('express');
const router = express.Router();
const Appointment = require('/models/Appointment');
const Doctor = require('/models/Doctor');
const User = require('/models/User');
const auth = require('../middleware/auth');
const { sendBookingEmail } = require('../utils/emailService');

// Book Appointment
router.post('/', auth, async (req, res) => {
    const { doctorId, date, time } = req.body;
    try {
        // Validate doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(400).json({ message: 'Doctor not found' });

        // Check for double booking
        const existing = await Appointment.findOne({ doctor: doctorId, date, time, status: 'pending' });
        if (existing) return res.status(400).json({ message: 'Slot already booked' });

        // Get next queue number for the day
        const todayAppointments = await Appointment.find({ date, status: { $in: ['pending', 'confirmed'] } });
        const queueNumber = todayAppointments.length + 1;

        const appointment = new Appointment({
            patient: req.user.id,
            doctor: doctorId,
            date,
            time,
            queueNumber
        });

        await appointment.save();
        
        // Populate doctor details for email
        const user = await User.findById(req.user.id);

        // Send Email
        await sendBookingEmail(user.email, doctor.name, date, time);

        res.json(appointment);
    } catch (err) {
        console.error('Appointment booking error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get My Appointments
router.get('/my', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user.id }).populate('doctor');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get All Appointments (Admin)
router.get('/all', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    try {
        const appointments = await Appointment.find().populate('doctor').populate('patient', 'name');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
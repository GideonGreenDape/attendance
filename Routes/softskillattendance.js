const softskillsAttendance = require('express').Router();
const { saveSoftskillToken } = require('../mongodb/generatesoftskill');
const { v4: uuidv4 } = require('uuid');


const EXPIRY_DURATION = 20 * 60 * 1000;


softskillsAttendance.post('/', async (req, res) => {
    // const { admin_id, password } = req.body;
    try {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + EXPIRY_DURATION);
        const token = uuidv4();

        const attendanceToken = {
            token: token,
            createdAt: now,
            expiresAt: expiresAt
        };

        const saved = await saveSoftskillToken(attendanceToken);

        if (saved) {
            res.status(201).json({
                message: 'Attendance token generated successfully',
                token: token,
                expiresAt: expiresAt
            });
        } else {
            res.status(500).json({
                message: 'Failed to generate attendance token'
            });
        }


    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ message: 'Server error' });
    }
});







module.exports = softskillsAttendance;
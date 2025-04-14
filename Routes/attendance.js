const Attendance = require('express').Router();
const AttendanceIn = require('../mongodb/attendance');



Attendance.post('/', async (req, res) => {
    const { student_id, department } = req.body;
   if (!student_id && !department) {
        return res.status(400).json({
            message: `Something went wrong sign in again`
        })
    };
    try {

        const markAttendance = await AttendanceIn(student_id, department);
        if (markAttendance) {
            console.log('Attendance marked successfully');
            res.status(200).json({ message: 'Attendance marked successfully' });
        } else {
            console.log('Failed to mark attendance');
            res.status(500).json({ message: 'Failed to mark attendance' });
        }

    } catch (error) {
        console.log('Failed to update token');
        res.status(500).json({ message: 'Failed to update token' });
    }
});


module.exports = Attendance;
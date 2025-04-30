const softskillAttendanceperformance = require('express').Router();
const {softskillsPerformance,checkTodaysoftskillsAttendance} = require('../mongodb/softskillperformance');

softskillAttendanceperformance.get('/:student_id', async (req, res) => {
    try {
        const { student_id } = req.params;
        console.log(student_id);

        if (!student_id) {
            return res.status(400).json({
                success: false,
                message: 'Student ID is required'
            });
        }

        const stats = await softskillsPerformance(student_id);
        
        return res.status(200).json({
            success: true,
            data: {
                student_id: stats.student_id,
                totalDays: stats.totalDays,
                attendanceRate: stats.attendanceRate
            }
        });

    } catch (error) {
        console.error('Error fetching attendance performance:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch attendance statistics'
        });
    }
});


softskillAttendanceperformance.get('/check/:student_id', async (req, res) => {
    try {
        const { student_id } = req.params;

        if (!student_id) {
            return res.status(400).json({
                success: false,
                message: 'Student ID is required'
            });
        }

        const todayStatus = await checkTodaysoftskillsAttendance(student_id);
        
        return res.status(200).json({
            success: true,
            data: {
                student_id: student_id,
                hasMarked: todayStatus.hasMarked,
                timestamp: todayStatus.timestamp
            }
        });

    } catch (error) {
        console.error('Error checking today attendance:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to check today attendance'
        });
    }
});




module.exports = softskillAttendanceperformance;


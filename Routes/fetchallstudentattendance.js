const {fetchAllStudentsAttendance} = require('../mongodb/fetchstudent');
const allStudentAttendanceRouter = require('express').Router();

allStudentAttendanceRouter.get('/', async (req, res) => {
    try {
        const stats = await fetchAllStudentsAttendance();
        res.status(200).json({
            success: true,
            data: {
                regularAttendance: stats.regular,
                softskillAttendance: stats.softskill
            }
        });
    } catch (error) {
        console.error('Failed to fetch attendance stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch attendance statistics'
        });
    }
});



module.exports = allStudentAttendanceRouter;
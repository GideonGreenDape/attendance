const {fetchAllStudentsAttendance} = require('../mongodb/fetchstudent');
const allStudentAttendanceRouter = require('express').Router();

allStudentAttendanceRouter.get('/', async (req, res) => {
    try {
        const stats = await fetchAllStudentsAttendance();
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            message: 'Failed to fetch attendance statistics'
        });
    }
});



module.exports = allStudentAttendanceRouter;
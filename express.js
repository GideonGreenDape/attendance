const express= require('express');
const SignupRouter= require('./Routes/signup');
const SigninRouter= require('./Routes/signin');
const Attendance = require('./Routes/attendance')
const generateAttendance = require('./Routes/generateAtt');
const ValidateToken = require('./Routes/validatetoken');
const Attendanceperformance = require('./Routes/attendanceperformance')
const allStudentAttendanceRouter = require('./Routes/fetchallstudentattendance');
const AdminlogRouter = require('./Routes/adminlog');
const softskillsAttendance = require('./Routes/softskillattendance');
const sofskillvalidate= require('./Routes/softskillvalidate')
const cors = require('cors');

const app= express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/signup', SignupRouter);
app.use('/signin', SigninRouter);
app.use('/mark/',Attendance);
app.use('/generatelink/',generateAttendance);
app.use('/softskillattendance/',softskillsAttendance);
app.use('/softskillvalidate/',sofskillvalidate);
app.use('/validatelink/',ValidateToken);
app.use('/performance',Attendanceperformance);
app.use('/fetchallstudentattendance', allStudentAttendanceRouter);
app.use('/adminlog', AdminlogRouter);




module.exports= app;
const express= require('express');
const SignupRouter= require('./Routes/signup');
const SigninRouter= require('./Routes/signin');
const Attendance = require('./Routes/attendance')
const generateAttendance = require('./Routes/generateAtt');
const AdminSignuproute= require('./Routes/adminSignupRouter')
const ValidateToken = require('./Routes/validatetoken');
const Attendanceperformance = require('./Routes/attendanceperformance')
const allStudentAttendanceRouter = require('./Routes/fetchallstudentattendance');
const AdminlogRouter = require('./Routes/adminlog');
const softskillsAttendance = require('./Routes/softskillattendance');
const sofskillvalidate= require('./Routes/softskillvalidate')
const softskillsmarks = require('./Routes/softkillmark');
const softskillAttendanceperformance= require('./Routes/softskillperformance')
const TrackRouter = require('./Routes/track');
const createAssessment= require('./Routes/createassesment')
const cors = require('cors');

const app= express();

const allowedOrigins = ['https://attendancefrontend.onrender.com']

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    origin: true, // Reflects the request origin
    credentials: true, // Allows credentials to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization'
    ],
    exposedHeaders: ['Set-Cookie']
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/signup', SignupRouter);
app.use('/signin', SigninRouter);
app.use('/mark/',Attendance);
app.use('/softskillmark/',softskillsmarks);
app.use('/generatelink/',generateAttendance);
app.use('/softskillattendance/',softskillsAttendance);
app.use('/softskillvalidate/',sofskillvalidate);
app.use('/validatelink/',ValidateToken);
app.use('/performance',Attendanceperformance);
app.use('/softskillperformance',softskillAttendanceperformance);
app.use('/fetchallstudentattendance', allStudentAttendanceRouter);
app.use('/adminlog', AdminlogRouter);
app.use('/adminsignup', AdminSignuproute);
app.use('/assessment',createAssessment);
app.use('/tracks', TrackRouter);




module.exports= app;

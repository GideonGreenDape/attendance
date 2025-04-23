const SignupRouter = require('express').Router();
const SignupConnection = require('../mongodb/signup')
const generateStudentId = require('../utility/studentIdgenerator');
const { sendWelcomeEmail } = require('../mailutility');
require('dotenv').config();

SignupRouter.post('/', async (req, res) => {
    console.log(req.body);
    const student_id = generateStudentId();
    const { firstname, lastname, password, department, email } = req.body;

    if (!firstname || !lastname || !password || !email || !department) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required details'
        });
    }

    try {
        const signup = await SignupConnection(student_id, firstname, lastname, password, department, email);
        
        if (signup) {
            // Send welcome email with sender name from env
            await sendWelcomeEmail({
                firstname,
                lastname,
                student_id,
                password,
                email,
                senderName: process.env.MAIL_SENDER_NAME
            });

            res.status(201).json({
                success: true,
                message: 'Successfully registered. Please check your email for login details.',
                student_id: student_id
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Student already exists'
            });
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
});

module.exports = SignupRouter;
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

async function sendWelcomeEmail(studentDetails) {
    const { firstname, lastname, student_id, password, email } = studentDetails;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to MVC Attendance System',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to MVC Attendance System!</h2>
                <p>Dear ${firstname} ${lastname},</p>
                
                <p>Thank you for registering with our attendance system. Your account has been successfully created.</p>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Your login credentials:</strong></p>
                    <p>Student ID: <strong>${student_id}</strong></p>
                    <p>Password: <strong>${password}</strong></p>
                </div>
                
                <p>Please keep these credentials safe and do not share them with anyone.</p>
                
                <p>Best regards,<br>MVC Admin Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
    }
}

module.exports = { sendWelcomeEmail };
const { MongoClient } = require('mongodb');
require('dotenv').config();
const formatDate= require('../utility/dategenerator')

const url = process.env.CONNECTION_URI;
const client = new MongoClient(url);
const dbName = 'MvcCohort';
const document = 'attendance';


async function AttendanceOut(student_id, department) {
    try {
        
        await client.connect();
        console.log('Attendance DB logic connected to MongoDb Database');
        const db = client.db(dbName);
        const collection = db.collection(document);
        
        // Check if the student has already signed out
        const filter = {
            student_id: student_id,
            department: department,
            Date: formatDate()
        };
        
        const updateDoc = {
            $set: {
                Sign_out: true,
                status: 'present' 
            }
        };

        const result = await collection.updateOne(filter, updateDoc);
        
        if (result.modifiedCount === 1) {
            console.log('Sign out updated successfully');
            return true;
        } else {
            console.log('No matching attendance record found');
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        await client.close();
        console.log('Attendance DB logic closed connection to MongoDb Database');
    }
}


module.exports = AttendanceOut;
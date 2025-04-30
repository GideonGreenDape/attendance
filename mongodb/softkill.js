const { MongoClient } = require('mongodb');
require('dotenv').config();
const formatDate= require('../utility/dategenerator')

const url = process.env.CONNECTION_URI;
const client = new MongoClient(url);
const dbName = 'MvcCohort';
const document = 'softskills';


async function softskillmark(student_id,department) {
    const attendanceSheet = {
        student_id: student_id,
        department: department,
        Date: formatDate(),
        Sign_in:true,
        status:'present'
    };
    try {
        await client.connect();
        console.log('Signup DB logic connected to MongoDb Database');
        const db = client.db(dbName);
        const collection = db.collection(document);
        const attendance = await collection.insertOne(attendanceSheet);
        if (attendance) {
            console.log('Attendance added successfully', attendance);
            return true;  
        }
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        await client.close();
        console.log('Signup DB logic closed connection to MongoDb Database');
    }
}


module.exports = softskillmark;
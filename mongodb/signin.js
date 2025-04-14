const { MongoClient } = require('mongodb');
require('dotenv').config()

const url = process.env.CONNECTION_URI;
const client = new MongoClient(url);
const dbName = 'MvcCohort';
const document = 'signup';


async function SigninConnection(student_id, password) {
    try {
        await client.connect();
        console.log('Signin DB logic connected to MongoDb Database');
        const db = client.db(dbName);
        const collection = db.collection(document);
        const student = await collection.findOne({ student_id: student_id, password: password });
        if (student) {
            return {
                firstname: student.firstname,
                lastname: student.lastname,
                department: student.department,
                student_id: student_id,
            };
        }
        else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        await client.close();
        console.log('Signin DB logic closed connection to MongoDb Database');
    }
}


module.exports = SigninConnection;
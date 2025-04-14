const { MongoClient } = require('mongodb');
require('dotenv').config()

const url = process.env.CONNECTION_URI;
const client = new MongoClient(url);
const dbName = 'MvcCohort';
const document = 'signup';


async function SignupConnection(student_id, firstname, lastname, password,department) {
    const student = {
        student_id: student_id,
        firstname: firstname,
        lastname: lastname,
        password: password,
        department: department
    };
    try {
        await client.connect();
        console.log('Signup DB logic connected to MongoDb Database');
        const db = client.db(dbName);
        const collection = db.collection(document);
        const existingStudent = await collection.findOne({ student_id: student_id });
        if (existingStudent) {
            console.log('student already exists');
            return false;
        }
        const result = await collection.insertOne(student);
        console.log('student added successfully', result);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        await client.close();
        console.log('Signup DB logic closed connection to MongoDb Database');
    }
}


module.exports = SignupConnection;
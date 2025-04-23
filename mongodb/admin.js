const { MongoClient } = require('mongodb');
require('dotenv').config()

const url = process.env.CONNECTION_URI;
const client = new MongoClient(url);
const dbName = 'MvcCohort';
const document = 'admin';

async function AdminSignIn(username, password) {
    try {
        await client.connect();
        console.log('Admin Signin DB logic connected to MongoDb Database');
        const db = client.db(dbName);
        const collection = db.collection(document);
        
        const admin = await collection.findOne({ 
            username: username, 
            password: password 
        });

        if (admin) {
            return {
                username: admin.username,
                role: admin.role || 'admin'
            };
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        await client.close();
        console.log('Admin Signin DB logic closed connection to MongoDb Database');
    }
}

module.exports = AdminSignIn;
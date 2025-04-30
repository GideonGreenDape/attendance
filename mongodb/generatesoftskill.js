const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.CONNECTION_URI;
const dbName = 'MvcCohort';
const document = 'softskill_token';

async function saveSoftskillToken(tokendata) {
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        console.log('Token DB logic connected to MongoDb Database');
        const db = client.db(dbName);
        const collection = db.collection(document);
        const addToken = await collection.insertOne(tokendata);
        if (addToken) {
            console.log(`Token inserted successfully`);
            return true;
        } else {
            console.log('Token not inserted..something is broken');
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        if (client) {
            await client.close();
            console.log('closed MongoDB database for adding token logic');
        }
    }
}

async function findSoftskillToken(tokenparameter) {
    let client;
    const now = new Date();
    try {
        client = new MongoClient(url);
        await client.connect();
        console.log('Find Token DB logic connected to MongoDb Database');
        const db = client.db(dbName);
        const collection = db.collection(document);
        
        const query = { token: tokenparameter };
        const token = await collection.findOne(query);
        
        if (!token) {
            console.log('Token not found');
            return 'invalid';
        }

        // Check if token has expired
        if (now > new Date(token.expiresAt)) {
            console.log('Token has expired');
            return 'expired';
        }

        console.log('Token is valid');
        return 'valid';
        
    } catch (error) {
        console.log(error);
        return 'error';
    } finally {
        if (client) {
            await client.close();
            console.log('closed MongoDB database for finding token logic');
        }
    }
}

module.exports = { saveSoftskillToken, findSoftskillToken };
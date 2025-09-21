const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.CONNECTION_URI;
const client = new MongoClient(url);
const dbName = 'MvcCohort';
const collectionName = 'signup';

// Get all unique tracks (departments)
async function getAllTracks() {
  try {
    await client.connect();
    console.log('Track DB logic connected to MongoDb Database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Distinct values of "department"
    const tracks = await collection.distinct('department');
    return tracks;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch tracks');
  } finally {
    await client.close();
    console.log('Track DB logic closed connection to MongoDb Database');
  }
}

// Get all students for a given track
async function getStudentsInTrack(trackName) {
  try {
    await client.connect();
    console.log('Track DB logic connected to MongoDb Database');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const students = await collection
      .find({ department: trackName })
      .project({ _id: 0, password: 0 }) // Hide internal fields
      .toArray();

    return students;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch students for track');
  } finally {
    await client.close();
    console.log('Track DB logic closed connection to MongoDb Database');
  }
}

module.exports = { getAllTracks, getStudentsInTrack };

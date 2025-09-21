const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const url = process.env.CONNECTION_URI;
const client = new MongoClient(url);
const dbName = 'MvcCohort';
const collectionName = 'assessments';

async function connect() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

// List all assessments
async function getAllAssessments() {
  const col = await connect();
  return col.find().toArray();
}

// Create a new assessment
async function createAssessment(data) {
  const col = await connect();
  const result = await col.insertOne(data);
  return result.insertedId;
}

// Get one assessment by ID
async function getAssessmentById(id) {
  const col = await connect();
  return col.findOne({ _id: new ObjectId(id) });
}

// Update an assessment
async function updateAssessment(id, data) {
  const col = await connect();
  const result = await col.updateOne({ _id: new ObjectId(id) }, { $set: data });
  return result.modifiedCount > 0;
}

// Delete an assessment
async function deleteAssessment(id) {
  const col = await connect();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// Get assessment results (dummy logic for now)
async function getAssessmentResults(id) {
  const col = await connect();
  const assessment = await col.findOne({ _id: new ObjectId(id) });
  return {
    assessmentId: id,
    title: assessment?.title || 'Unknown',
    completed: Math.floor(Math.random() * 100), // placeholder value
    averageScore: Math.floor(Math.random() * 100)
  };
}

module.exports = {
  getAllAssessments,
  createAssessment,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  getAssessmentResults
};

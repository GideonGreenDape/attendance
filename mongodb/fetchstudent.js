const { MongoClient } = require('mongodb');
require('dotenv').config();
const formatDate = require('../utility/dategenerator');

const url = process.env.CONNECTION_URI;
const dbName = 'MvcCohort';
const attendanceDoc = 'attendance';
const signupDoc = 'signup';

async function fetchAllStudentsAttendance() {
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        console.log('Connected to MongoDB for fetching attendance');
        
        const db = client.db(dbName);
        const collection = db.collection(attendanceDoc);

        const pipeline = [
            {
                $group: {
                    _id: {
                        student_id: "$student_id",
                        department: "$department"
                    },
                    presentDays: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "present"] }, 1, 0]
                        }
                    },
                    totalRecords: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: signupDoc,
                    localField: "_id.student_id",
                    foreignField: "student_id",
                    as: "studentInfo"
                }
            },
            {
                $unwind: "$studentInfo"
            },
            {
                $project: {
                    _id: 0,
                    student_id: "$_id.student_id",
                    firstname: "$studentInfo.firstname",
                    lastname: "$studentInfo.lastname",
                    department: "$_id.department",
                    presentDays: 1,
                    absentDays: {
                        $subtract: [60, "$presentDays"]
                    },
                    attendancePercentage: {
                        $round: [
                            {
                                $multiply: [
                                    { $divide: ["$presentDays", 60] },
                                    100
                                ]
                            },
                            2
                        ]
                    }
                }
            },
            {
                $sort: { student_id: 1 }
            }
        ];

        const results = await collection.aggregate(pipeline).toArray();
        return results;

    } catch (error) {
        console.log('Error fetching attendance:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
            console.log('Closed MongoDB connection');
        }
    }
}

module.exports = { fetchAllStudentsAttendance };
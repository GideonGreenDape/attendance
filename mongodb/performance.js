const { MongoClient } = require('mongodb');
require('dotenv').config();
const formatDate = require('../utility/dategenerator');

const url = process.env.CONNECTION_URI;
const dbName = 'MvcCohort';
const document = 'attendance';

async function Performance(student_id) {
    let client;
    try {
        // Validate student_id
        if (!student_id) {
            return {
                student_id: "Invalid ID",
                totalDays: 0,
                attendanceRate: 0
            };
        }

        client = new MongoClient(url);
        await client.connect();
        console.log('Performance DB logic connected to MongoDB Database');
        const db = client.db(dbName);
        const collection = db.collection(document);

        const today = new Date();
        const sixtyDaysAgo = new Date(today.setDate(today.getDate() - 60));

        const pipeline = [
            {
                $match: {
                    student_id: student_id, // Make sure this matches exactly
                    Date: { $gte: formatDate(sixtyDaysAgo) },
                    Sign_in: true,
                    status: 'present'
                }
            },
            {
                $group: {
                    _id: "$student_id",
                    totalDays: { $count: {} }
                }
            }
        ];

        const result = await collection.aggregate(pipeline).toArray();
        
        if (result.length === 0) {
            return {
                student_id: student_id, // Return the provided student_id
                totalDays: 0,
                attendanceRate: 0
            };
        }

        const stats = result[0];
        const attendanceRate = (stats.totalDays / 60) * 100;

        return {
            student_id: student_id, 
            totalDays: stats.totalDays,
            attendanceRate: Math.round(attendanceRate * 100) / 100
        };

    } catch (error) {
        console.error('Performance calculation error:', error);
        return {
            student_id: student_id,
            totalDays: 0,
            attendanceRate: 0,
            error: error.message
        };
    } finally {
        if (client) {
            await client.close();
            console.log('Closed MongoDB connection for performance calculation');
        }
    }
}

async function checkTodayAttendance(student_id) {
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        console.log('Connected to MongoDB for attendance check');
        const db = client.db(dbName);
        const collection = db.collection(document);

        const todayAttendance = await collection.findOne({
            student_id: student_id,
            Date: formatDate(),
            Sign_in: true,
            status: 'present'
        });

        return {
            hasMarked: !!todayAttendance,
            timestamp: todayAttendance ? todayAttendance.Date : null
        };

    } catch (error) {
        console.error('Error checking today attendance:', error);
        throw error;
    } finally {
        if (client) {
            await client.close();
            console.log('Closed MongoDB connection for attendance check');
        }
    }
}

module.exports = {
    Performance,
    checkTodayAttendance
};
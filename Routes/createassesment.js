const express = require('express');
const createAssesmentQuestion = express.Router();
const { createAssessment } = require('../mongodb/assessment');

// Helper function to validate and shape the request body
function formatAssessmentData(body) {
  // Validate required fields
  if (!body.title || !body.subject || !Array.isArray(body.questions)) {
    throw new Error('Missing required fields: title, subject, or questions');
  }

  // Map and sanitize questions
  const questions = body.questions.map((q) => ({
    questionText: q.questionText,
    options: Array.isArray(q.options) ? q.options : [],
    correctAnswer: q.correctAnswer,
    points: Number(q.points) || 1,
  }));

  // Map and sanitize assignedTo
  const assignedTo = Array.isArray(body.assignedTo)
    ? body.assignedTo.map((a) => ({
        studentId: a.studentId,
        name: a.name,
        completionStatus: a.completionStatus || 'Pending',
        score: a.score ?? null,
      }))
    : [];

  // Build resultsSummary
  const resultsSummary = body.resultsSummary || {
    totalSubmissions: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
  };

  const now = new Date();

  return {
    title: body.title,
    subject: body.subject,
    status: body.status || 'Draft', // default to Draft if not provided
    createdAt: now,
    updatedAt: now,
    questions,
    assignedTo,
    resultsSummary,
  };
}

// POST /api/assessments
createAssesmentQuestion.post('/', async (req, res) => {
  try {
    // Shape and validate incoming data
    const assessmentData = formatAssessmentData(req.body);

    // Save to DB
    const id = await createAssessment(assessmentData);

    res.status(201).json({
      message: 'Assessment created successfully',
      id,
      assessment: assessmentData,
    });
  } catch (err) {
    console.error('Create Assessment Error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;



// {
//  "title": "Algebra Fundamentals Quiz",
//  "subject": "Mathematics",
// "status": "Active",
//  "questions": [
//    {
//      "questionText": "What is 5 × 6?",
//      "options": ["28", "30", "32", "35"],
//      "correctAnswer": "30",
//     "points": 2
//    },
//    {
//      "questionText": "Simplify: 12x + 7x",
//      "options": ["19", "19x", "20x", "12x7"],
//      "correctAnswer": "19x",
//     "points": 3
//    }
//  ],
//   "assignedTo": [
//    {
//      "studentId": "stu101",
//     "name": "Jane Doe",
//      "completionStatus": "Completed",
//      "score": 85
//    },
//    {
//      "studentId": "stu102",
//      "name": "John Smith"
//    }
//  ]
// }


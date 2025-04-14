const SignupRouter = require('express').Router();
const SignupConnection = require('../mongodb/signup')
const generateStudentId = require ('../utility/studentIdgenerator');


SignupRouter.post('/',
    async (req, res) => {
        console.log(req.body);
        // Generate a unique student ID
        const student_id= generateStudentId();
        const {firstname, lastname,password,department } = req.body;
        if (!student_id && !firstname && !lastname && !password) {
            return res.status(400).send(`Please provide correct details`)
        }
        const signup = await SignupConnection(student_id, firstname, lastname,password,department);
        console.log(signup);
        if (signup) {
            res.json({
                message: `successfully registered`,
                student_id: student_id
            });
        } else {
            res.send(`student already exists`);
        }
    })



module.exports = SignupRouter;
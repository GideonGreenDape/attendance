const SigninRouter= require('express').Router();
const SigninConnection= require('../mongodb/signin')




SigninRouter.post('/', async (req,res)=>{
    const {student_id,password}= req.body;
    if(!student_id && !password){
        return res.status(400).send(`Please provide correct details`)
    };
    const signin= await SigninConnection(student_id,password);
    if (signin) {
        res.json({
            firstname: signin.firstname,
            lastname: signin.lastname,
            department: signin.department,
            student_id: student_id
        })
    }
    else{
        res.send({
            state:'details incorrect'
        })
    }
});

module.exports= SigninRouter;
const express = require('express');
const userRouter = express.Router();

const {signUp,login,getAllStudents} = require('../controllers/User');

userRouter.post(`/signup`,signUp);
userRouter.post(`/login`,login);
userRouter.get(`/getAllStudents`,getAllStudents);

const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/User');

userRouter.get(`/students`,auth,isStudent,(req,res) => {
    res.status(200).json(
        {
            success: true,
            message: `Welcome to students route`
        }
    );
});

userRouter.get(`/instructors`,auth,isInstructor,(req,res) => {
    res.status(200).json(
        {
            success: true,
            message: `Welcome to instructors route`
        }
    );
});

userRouter.get(`/admin`,auth,isAdmin,(req,res) => {
    res.status(200).json(
        {
            success: true,
            message: `Welcome to admins route`
        }
    );
});

module.exports = userRouter;
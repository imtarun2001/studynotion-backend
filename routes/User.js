const express = require('express');
const userRouter = express.Router();

const {signUp,login,getAllStudents} = require('../controllers/User');

userRouter.post(`/signup`,signUp);
userRouter.post(`/login`,login);
userRouter.get(`/getAllStudents`,getAllStudents);

const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/User');

userRouter.get(`/student-dashboard`,auth,isStudent,(req,res) => {
    const user = req.user;
    res.status(200).json(
        {
            success: true,
            data: user,
            message: `Welcome to students route`
        }
    );
});

userRouter.get(`/instructor-dashboard`,auth,isInstructor,(req,res) => {
    const user = req.user;
    res.status(200).json(
        {
            success: true,
            data: user,
            message: `Welcome to instructors route`
        }
    );
});

userRouter.get(`/admin-dashboard`,auth,isAdmin,(req,res) => {
    const user = req.user;
    res.status(200).json(
        {
            success: true,
            data: user,
            message: `Welcome to admins route`
        }
    );
});

module.exports = userRouter;
const jwt = require('jsonwebtoken');
require('dotenv').config();

//create auth middleware
exports.auth = (req,res,next) => {
    try {
        //fetch login token
        const loginToken = req.cookies.loginToken || req.headers["Authorisation"]?.replace("Bearer ","");

        //validate loginToken
        if(!loginToken) {
            return res.status(400).json(
                {
                    success: false,
                    message: `loginToken not found`
                }
            );
        }

        //verify the loginToken
        const verifiedToken = jwt.verify(loginToken,process.env.JWT_SECRET);

        //add the verifiedToken in req.user
        req.user = verifiedToken;

        //move to next middleware
        next();
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in auth`,
                message: err.message
            }
        );
    }
};

//create isStudent middleware
exports.isStudent = (req,res,next) => {
    try {
        //check whether student tries to access or not
        if(req.user.role !== "Student") {
            return res.status(401).json(
                {
                    success: false,
                    message: `This route is protected for Students only`
                }
            );
        }

        //move to next middleware
        next();
    } catch(err) {
        res.status(500).json(
                {
                    success: false,
                    data: `Error in isStudent`,
                    message: err.message
                }
            );
    }
};

//create isInstructor middleware
exports.isInstructor = (req,res,next) => {
    try {
        //check whether instructor tries to access or not
        if(req.user.role !== "Instructor") {
            return res.status(401).json(
                {
                    success: false,
                    message: `This route is protected for Instructors only`
                }
            );
        }

        //move to next middleware
        next();
    } catch(err) {
        res.status(500).json(
                {
                    success: false,
                    data: `Error in isInstructor`,
                    message: err.message
                }
            );
    }
};

//create isAdmin middleware
exports.isAdmin = (req,res,next) => {
    try {
        //check whether admin tries to access or not
        if(req.user.role !== "Admin") {
            return res.status(401).json(
                {
                    success: false,
                    message: `This route is protected for Admins only`
                }
            );
        }

        //move to next middleware
        next();
    } catch(err) {
        res.status(500).json(
                {
                    success: false,
                    data: `Error in isAdmin`,
                    message: err.message
                }
            );
    }
};
const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const AdditionalDetail = require('../models/AdditionalDetail');
const {uploadMediaToCloudinary} = require('../utils/Cloudinary');
const mailSender = require('../utils/MailSender');

//create user
exports.signUp = async (req,res) => {
    try {
        //fetch firstName,lastName,email,phoneNumber,password,confirmPassword,role from req.body
        const { firstName,lastName,email,phoneNumber,password,confirmPassword,role,otp } = req.body;

        //check whether there is any empty field
        if(!firstName|| !lastName|| !email || !password|| !confirmPassword || !otp) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Please fill all the required fields`
                }
            );
        }

        //check password and confirmPassword macthes
        if(password !== confirmPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Password must be same as Confirm Password`
                }
            );
        }

        //check user existence
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(401).json(
                {
                    success: false,
                    message: `This Email Address has already been registered with us. Please try with different Email Address`
                }
            );
        }

        //get most recent otp document
        const mostRecentOtpDocument = await Otp.findOne({email}).sort({createdAt: -1}).limit(1);

        //check mostRecentOtp.otp matches with otp fetched from req.body
        if(mostRecentOtpDocument.otp !== otp) {
            return res.status(401).json(
                {
                    success: false,
                    message: `Otp did not match`
                }
            );
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //get profile picture url
        const url = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;

        //upload media to cloudinary
        const profilePicture = await uploadMediaToCloudinary(url,'studyNotion');

        //initialize additionalDetails with null
        const additionalDetail = await AdditionalDetail.create({gender: null,dateOfBirth: null,about: null,profession: null});

        //register the user in db
        const createdUser = await User.create({firstName,lastName,email,phoneNumber,password: hashedPassword,role,profilePicture: profilePicture.secure_url,additionalDetails: additionalDetail._id});

        //update the user by pushing the new mostRecentOtpDocument to otps array
        const updatedUser = await User.findByIdAndUpdate(createdUser._id,{$push: {otps: mostRecentOtpDocument._id}},{new: true});

        //send mail
        await mailSender(updatedUser.email,`Congratulations🎉`,`Your account has been created`);

        //return response
        res.status(201).json(
            {
                success: true,
                data: updatedUser,
                message: `User Registered Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in signup`,
                message: err.message
            }
        );
    }
};

//login user
exports.login = async (req,res) => {
    try {
        //fetch email,password from req.body
        const {email,password} = req.body;

        //check whether there is any empty field
        if(!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Please fill all the required fields`
                }
            );
        }

        //check user existence
        let existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(401).json(
                {
                    success: false,
                    message: `This Email Address has not been registered with us. Please signup first`
                }
            );
        }

        //check password is correct or not
        const correctPassword = await bcrypt.compare(password,existingUser.password);
        if(!correctPassword) {
            return res.status(401).json(
                {
                    success: false,
                    message: `Password is incorrect`
                }
            );
        }

        //create payload
        const payload = {
            _id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role
        };

        //create loginToken
        const loginToken = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "24h"});

        //convert existingUser to object and add password and token to it
        existingUser.toObject();
        existingUser.password = undefined;
        existingUser.loginToken = loginToken;

        //create cookieOptions
        const cookieOptions = {httpOnly: true , expires: new Date(Date.now() + 1*24*60*60*1000)};

        //return response with cookie
        res.cookie("loginToken",loginToken,cookieOptions).status(200).json(
            {
                success: true,
                data: existingUser,
                message: `User Logged in Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in login`,
                message: err.message
            }
        );
    }
};

//controller to get all students
exports.getAllStudents = async (req,res) => {
    try {
        //get all students
        const allStudents = await User.find({role: "Student"});

        //return response
        res.status(200).json(
            {
                success: true,
                data: allStudents,
                message: `Ok`
            }
        );

    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in getAllStudents`,
                message: err.message
            }
        );
    }
};
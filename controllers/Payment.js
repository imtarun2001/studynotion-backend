const instance = require('../configs/Razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/MailSender');
const mongoose = require('mongoose');
require('dotenv').config();

exports.capturePayment = async (req,res) => {
    try {
        const {courses} = req.body;
        const userid = req.user._id;

        if(courses.length === 0) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Nothing to buy`
                }
            );
        }

        let totalAmount = 0;
        for(let courseid of courses) {
            const course = await Course.findById(courseid);
            const uid = new mongoose.Schema.Types.ObjectId(userid);
            if(course.enrolledStudents.includes(uid)) {
                return res.status(400).json(
                    {
                        success: false,
                        data: course,
                        message: `Already buyed the course`
                    }
                );
            }
            totalAmount += course.price;
        }
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Date.now().toString()
        }
        const paymentResponse = await instance.orders.create(options);
        res.status(201).json(
            {
                success: true,
                data: paymentResponse,
                message: `Order Created Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in capturePayment`,
                message: err.message
            }
        );
    }
};


exports.verifyPayment = async (req,res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = req.body?.courses;
        const userid = req.user._id;
        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Missing razorpay fields`
                }
            );
        }
        let body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
        if(expectedSignature === razorpay_signature) {
            for(let course of courses) {
                await Course.findByIdAndUpdate({_id: course._id},{$push: {enrolledStudents: userid}},{new: true});
                await User.findByIdAndUpdate(userid,{$push: {courses: course._id}},{new: true});
            }
            const student = await User.findById(userid);
            await mailSender(student.email,`Woahh!! Course(s) purchases`,`Hey ${student.firstName}, You have successfully enrolled in purchased courses`);
        }
        res.status(201).json(
            {
                success: true,
                data: courses,
                message: `Student enrolled Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in verifyPayment`,
                message: err.message
            }
        );
    }
};
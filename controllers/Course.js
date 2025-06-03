const Course = require('../models/Course');
const Category = require('../models/Category');
const { uploadMediaToCloudinary } = require('../utils/Cloudinary');
require('dotenv').config();

exports.createCourse = async (req,res) => {
    try {
        const {courseName,whatYouWillLearn,price,instructorid,categoryid} = req.body;
        const thumbnail = req.files.thumbnail;
        if(!courseName || !whatYouWillLearn || !thumbnail || !price || !instructorid || !categoryid) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Data missing`
                }
            );
        }
        const thumbnailUrl = await uploadMediaToCloudinary(null,thumbnail,'studyNotion');
        const existingCategory = await Category.findById(categoryid);
        if(!existingCategory) {
            return res.status(404).json(
                {
                    success: false,
                    message: `Category not found`
                }
            );
        }
        const course = await Course.create({courseName,whatYouWillLearn,thumbnail: thumbnailUrl.secure_url,price,instructor: instructorid,category: existingCategory._id});
        const updatedCategory = await Category.findByIdAndUpdate({_id: existingCategory._id},{$push: {courses: course._id}},{new: true}).populate("courses").exec();
        res.status(201).json(
            {
                success: true,
                data: updatedCategory,
                message: `Course Created Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in createCourse`,
                message: err.message
            }
        );
    }
};
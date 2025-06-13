const RatingAndReview = require('../models/RatingAndReview');
const User = require('../models/User');
const Course = require('../models/Course');

exports.createRatingAndReview = async (req,res) => {
    try {
        const {courseid,rating,review} = req.body;
        if(!rating || !review) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Bad request`
                }
            );
        }
        const userid = req.user._id;
        const existingUser = await User.findById(userid);
        if(!existingUser) {
            return res.status(404).json(
                {
                    success: false,
                    message: `User Not found`
                }
            );
        }
        const existingCourse = await Course.findById(courseid);
        if(!existingCourse) {
            return res.status(404).json(
                {
                    success: false,
                    message: `Course Not found`
                }
            );
        }
        const alreadyReviewed = await RatingAndReview.findOne({user: userid,course: courseid});
        if(alreadyReviewed) {
            return res.status(400).json(
                {
                    success: false,
                    message: `User already Reviewed`
                }
            );
        }
        const flooredRating = String(rating).split('.') ? Math.floor(rating) + .5 : rating;
        const ratingAndReview = await RatingAndReview.create({user: userid,course: courseid,rating: flooredRating,review});
        const updatedUser = await User.findByIdAndUpdate(userid,{$push: {ratingAndReviews: ratingAndReview._id}},{new: true});
        const updatedCourse = await Course.findByIdAndUpdate(courseid,{$push: {ratingAndReviews: ratingAndReview._id}},{new: true});
        res.status(201).json(
            {
                success: true,
                data: ratingAndReview,
                message: `Created Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in createRatingAndReview`,
                message: err.message
            }
        );
    }
};

exports.getRatingAndReviews = async (req,res) => {
    try {

    } catch(err) {

    }
};
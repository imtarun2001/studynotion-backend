const RatingAndReview = require('../models/RatingAndReview');
const User = require('../models/User');
const Course = require('../models/Course');

exports.createRatingAndReview = async (req,res) => {
    try {
        const {userid,courseid,rating,review} = req.body;
        if(!rating || !review) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Bad request`
                }
            );
        }
        const ratingAndReview = await RatingAndReview.create({user: userid,course: courseid,rating,review});
        const updatedUser = await User.findByIdAndUpdate({userid},{$push: {ratingAndReviews: ratingAndReview._id}},{new: true});
        const updatedCourse = await Course.findByIdAndUpdate({courseid},{$push: {ratingAndReviews: ratingAndReview._id}},{new: true});
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
const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            max: [5.0,"Rating must not exceed 5"],
            min: [1.0,"Rating should be atleast 1"],
        },
        review: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    const wordCount = value.trim().split(" ").length;
                    return wordCount < 400
                }
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    }
);

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema);
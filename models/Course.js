const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true
        },
        whatYouWillLearn: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Instructor"
        },
        sections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section"
            }
        ],
        category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category"
        },
        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "EnrolledStudent"
            }
        ],
        ratingAndReviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReview"
            }
        ]
    }
);

module.exports = mongoose.model("Course",courseSchema);
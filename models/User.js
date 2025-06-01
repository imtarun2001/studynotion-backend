const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["Student","Instructor","Admin"]
        },
        additionalDetails: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AdditionalDetail",
                required: true
        },
        profilePicture: {
            type: String,
            required: true
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ],
        otps: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Otp"
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }
);

module.exports = mongoose.model("User",userSchema);
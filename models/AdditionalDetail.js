const mongoose = require('mongoose');

const additionalDetailsSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            enum: ["Male","Female","Others"]
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        about: {
            type: String,
            required: true
        },
        profession: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("AdditionalDetail",additionalDetailsSchema);
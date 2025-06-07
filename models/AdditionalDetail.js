const mongoose = require('mongoose');

const additionalDetailsSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            enum: ["Male","Female","Others"]
        },
        dateOfBirth: {
            type: Date
        },
        about: {
            type: String
        },
        profession: {
            type: String
        }
    }
);

module.exports = mongoose.model("AdditionalDetail",additionalDetailsSchema);
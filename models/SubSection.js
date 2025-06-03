const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema(
    {
        subSectionName: {
            type: String,
            required: true
        },
        subSectionDesc: {
            type: String,
            required: true
        },
        subSectionThumbnailUrl: {
            type: String,
            required: true
        },
        lectureUrl: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("SubSection",subSectionSchema);
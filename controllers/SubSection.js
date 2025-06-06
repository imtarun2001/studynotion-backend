const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadMediaToCloudinary } = require('../utils/Cloudinary');

exports.createSubSection = async (req,res) => {
    try {
        const {subSectionName,subSectionDesc,duration,sectionid} = req.body;
        const subSectionThumbnail = req.files.subSectionThumbnail;
        const lecture = req.files.lecture;
        if(!subSectionName || !subSectionDesc || !duration || !subSectionThumbnail || !lecture) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Bad request`
                }
            );
        }
        const uploadedSubSectionThumbnail = await uploadMediaToCloudinary(null,subSectionThumbnail,"studyNotion");
        const uploadedLecture = await uploadMediaToCloudinary(null,lecture,"studyNotion");
        const subSection = await SubSection.create({subSectionName,subSectionDesc,duration,subSectionThumbnailUrl: uploadedSubSectionThumbnail.secure_url,lectureUrl: uploadedLecture.secure_url});
        const updatedSection = await Section.findByIdAndUpdate(sectionid,{$push: {subSections: subSection._id}},{new: true}).populate("subSections").exec();
        res.status(201).json(
            {
                success: true,
                data: updatedSection,
                message: `Created Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in createSubSection`,
                message: err.message
            }
        );
    }
};
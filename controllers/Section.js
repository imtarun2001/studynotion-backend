const Course = require('../models/Course');
const Section = require('../models/Section');

exports.createSection = async (req,res) => {
    try {
        const {courseid,sectionName} = req.body;
        if(!sectionName) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Bad request`
                }
            );
        }
        const section = await Section.create({sectionName});
        const updatedCourse = await Course.findByIdAndUpdate(courseid,{$push: {sections: section._id}},{new: true})
                                        .populate({
                                            path: "sections",
                                            populate: {
                                                path: "subSections"
                                            }
                                        }).exec();
        res.status(201).json(
            {
                success: true,
                section,
                updatedCourse,
                message: `Created Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in createSection`,
                message: err.message
            }
        );
    }
};
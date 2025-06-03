const AdditionalDetail = require('../models/AdditionalDetail');

exports.updateAdditionalDetail = async (req,res) => {
    try {
        const {gender,dateOfBirth,about,profession,additionalDetailid} = req.body;
        const additionalDetail = await AdditionalDetail.findById(additionalDetailid);
        if(!additionalDetail) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Bad request`
                }
            );
        }
        const updateAdditionalDetail = await AdditionalDetail.findByIdAndUpdate(additionalDetail._id,{gender,dateOfBirth,about,profession},{new: true});
        res.status(200).json(
            {
                success: true,
                data: updateAdditionalDetail,
                message: `Ok`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in `,
                message: err.message
            }
        );
    }
};
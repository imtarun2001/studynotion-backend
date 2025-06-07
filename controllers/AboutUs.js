const AboutUs = require('../models/AboutUs');
const mailSender = require('../utils/MailSender');

exports.createAboutUs = async (req,res) => {
    try {
        const {firstName,lastName,email,phoneNumber,message} = req.body;
        const aboutUs = await AboutUs.create({firstName,lastName,email,phoneNumber,message});
        const mailSentToStudyNotion = await mailSender(process.env.MAIL_USER,`Feedback from user`,`${firstName} having email ${email} has sent the below feedback :\n ${message}`);
        res.status(201).json(
            {
                success: true,
                data: aboutUs,
                message: `AboutUs entry Created Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in createAboutUs`,
                message: err.message
            }
        );
    }
};
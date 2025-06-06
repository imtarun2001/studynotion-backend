const User = require('../models/User');
const bcrypt = require('bcrypt');
const mailSender = require('../utils/MailSender');
const {congratulation} = require('../templates/ResetPasswordTemplate');

exports.changePassword = async (req,res) => {
    try {
        const {email,oldPassword,newPassword,confirmNewPassword} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: `User does not exist`
                }
            );
        }
        if(newPassword !== confirmNewPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: `New password and confirm new password mismatched`
                }
            );
        }
        const correctPassword = await bcrypt.compare(oldPassword,existingUser.password);
        if(!correctPassword) {
            return res.status(401).json(
                {
                    success: false,
                    message: `Incorrect old password`
                }
            );
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        const updatedUser = await User.findByIdAndUpdate(existingUser._id,{password: hashedPassword},{new: true});
        const mailBody = congratulation(updatedUser.firstName);
        await mailSender(existingUser.email,"Regarding password updation",mailBody);
        res.status(200).json(
            {
                success: true,
                data: updatedUser,
                message: `Password updated successfully`
            }
        );
    }
    catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `error in changePassword`,
                message: err.message
            }
        );
    }
};
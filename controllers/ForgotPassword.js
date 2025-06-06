const User = require('../models/User');
const mailSender = require('../utils/MailSender');
const bcrypt = require('bcrypt');

exports.forgotPasswordTokenGeneration = async (req,res) => {
    try {
        const {email} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: `User not exist`
                }
            );
        }
        const token = crypto.randomUUID();
        const updatedUser = await User.findByIdAndUpdate(existingUser._id,{tokenForResettingPassword: token,tokenExpiresIn: Date.now() + 5 * 60 * 1000},{new: true});
        const url = `http://localhost:3000/resetPassword/${token}`;
        await mailSender(email,`Regarding reset password`,`Click the link below to reset your password \n ${url}`);
        res.status(200).json(
            {
                success: true,
                data: updatedUser,
                message: `Password reset mail sent successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `error in forgotPassword`,
                message: err.message
            }
        );
    }
};

exports.resetPassword = async (req,res) => {
    try {
        const {email,newPassword,confirmNewPassword,token} = req.body;
        if(newPassword !== confirmNewPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Password mismatched`
                }
            );
        }
        const existingUser = await User.findOne({email,tokenForResettingPassword: token});
        if(!existingUser) {
            return res.status(401).json(
                {
                    success: false,
                    message: `You are not allowed to reset password of other's account`
                }
            );
        }
        if(existingUser.tokenExpiresIn < Date.now()) {
            return res.status(400).json(
                {
                    success: false,
                    message: `link had been expired`
                }
            );
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        await User.findByIdAndUpdate(existingUser._id,{password: hashedPassword},{new: true});
        await mailSender(email,`Password reset successful`,`Congratulations ${existingUser.firstName}, Your password have been updated successfully`);
        const updatedUser = await User.findOneAndUpdate({email},{tokenForResettingPassword: undefined,tokenExpiresIn: undefined},{new: true});
        res.status(200).json(
            {
                success: true,
                data: updatedUser,
                message: `Password reset successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in resetPassword`,
                message: err.message
            }
        );
    }
};
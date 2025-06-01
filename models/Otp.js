const mongoose = require('mongoose');
const otpTemplate = require('../templates/OtpTemplate');
const mailSender = require('../utils/MailSender');

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }
);

const sendVerificationMail = async (email,otp) => {
    try {
        const body = otpTemplate(otp,5);
        await mailSender(email,"OTP for sign up",body);
    } catch(err) {
        console.log(`error in sendVerificationMail`);
        console.log(err);
        process.exit(1);
    }
};

otpSchema.pre("save",async function (next) {
    try {
        await sendVerificationMail(this.email,this.otp);
        // console.log(this);
        next();
    } catch(err) {
        console.log(`error in otpSchema.pre`);
        console.log(err);
        process.exit(1);
    }
});

module.exports = mongoose.model("Otp",otpSchema);
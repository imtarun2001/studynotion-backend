const mongoose = require('mongoose');
const mailSender = require('../utils/MailSender');
const messageReceived = require('../templates/AboutUsTemplate');

const aboutUsSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    const wordCount = value.trim().split(" ").length;
                    return wordCount < 1000
                }
            }
        }
    }
);

const sendVerificationMail = async (email,userName) => {
    try {
        const body = messageReceived(userName);
        const res = await mailSender(email,`Regarding your message to studyNotion`,body);
    }
    catch(err) {
        console.log(`error in sendVerificationMail of aboutUs model : `,err);
    }
};

aboutUsSchema.post("save",async (doc) => {
    try {
        const mailsend = await sendVerificationMail(doc.email,doc.firstName);
    } catch(err) {
        console.log(`error in aboutUsSchema.post : `,err);
    }
});

module.exports = mongoose.model("AboutUs",aboutUsSchema);
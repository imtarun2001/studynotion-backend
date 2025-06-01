const nodeMailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email,subject,body) => {
    try {
        const transporter = nodeMailer.createTransport(
            {
                host: process.env.MAIL_HOST,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            }
        );
        const info = await transporter.sendMail(
            {
                from: 'StudyNotion - By 🤍 Tarun',
                to: email,
                subject: subject,
                html: body
            }
        );
        return info;
    } catch(err) {
        console.log(`error in mailSender`);
        console.log(err);
    }
};

module.exports = mailSender;
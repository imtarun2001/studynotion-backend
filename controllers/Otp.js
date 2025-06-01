const Otp = require('../models/Otp');
const otpGenerator = require('otp-generator');
const User = require('../models/User');

exports.generateOtp = async (req,res) => {
    try {
        //fetch email from req.body
        const {email} = req.body;

        //validate emptiness
        if(!email) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Please provide email`
                }
            );
        }

        //check if user already exists in db
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: `Already registered Email`
                }
            );
        }

        //create otp
        let otp = otpGenerator.generate(6,
            {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            }
        );

        //check whether same otp is present in db
        let result = await Otp.findOne({otp});
        while(result) {
            otp = otpGenerator.generate(6,
                {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false
                }
            );
            result = await Otp.findOne({otp});
        }

        //here in line 32 result is false means an unique otp has been generated so create an entry of it in otp db
        const uniqueOtp = await Otp.create({email,otp});

        //return response
        res.status(201).json(
            {
                success: true,
                data: uniqueOtp,
                message: `Otp Generated Successfully`
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                success: false,
                data: `Error in generateOtp`,
                message: err.message
            }
        );
    }
};
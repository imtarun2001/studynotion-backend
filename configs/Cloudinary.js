const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const cloudinaryConnect = () => {
    try {
        cloudinary.config(
            {
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET
            }
        );
        console.log(`Studynotion server successfully connected with Cloudinary`);
    }
    catch(err) {
        console.log(`Studynotion server failed to connect with Cloudinary`);
        console.log(err);
        process.exit(1);
    }
};

module.exports = cloudinaryConnect;
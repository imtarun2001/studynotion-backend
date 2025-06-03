const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const otpRouter = require('./routes/Otp');
const userRouter = require('./routes/User');
const categoryRouter = require('./routes/Category');
const courseRouter = require('./routes/Course');
const sectionRouter = require('./routes/Section');
const subSectionRouter = require('./routes/SubSection');
const ratingAndReviewRouter = require('./routes/RatingAndReview');
const additionalDetailRouter = require('./routes/AdditionalDetail');
const cloudinaryConnect = require('./configs/Cloudinary');
const mongodbConnect = require('./configs/MongoDB');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors("*"));
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: '/tmp'
    }
));
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server hoisted at ${PORT}`));
app.use(`/studynotion/v1`,otpRouter,userRouter,categoryRouter,courseRouter,sectionRouter,subSectionRouter,ratingAndReviewRouter,additionalDetailRouter);
cloudinaryConnect();
mongodbConnect();
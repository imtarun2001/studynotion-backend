const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const otpRouter = require('./routes/Otp');
const userRouter = require('./routes/User');
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
app.use(`/studynotion/v1`,otpRouter,userRouter);
cloudinaryConnect();
mongodbConnect();
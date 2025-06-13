const express = require('express');
const paymentRouter = express.Router();

const {capturePayment,verifyPayment} = require('../controllers/Payment');
const {auth,isStudent} = require('../middlewares/User');

paymentRouter.post(`/capturePayment`,auth,isStudent,capturePayment);
paymentRouter.post(`/verifyPayment`,auth,isStudent,verifyPayment);

module.exports = paymentRouter;
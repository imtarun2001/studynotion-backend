const express = require('express');
const forgotPasswordRouter = express.Router();

const {forgotPasswordTokenGeneration,resetPassword} = require('../controllers/ForgotPassword');

forgotPasswordRouter.put(`/forgotPasswordTokenGeneration`,forgotPasswordTokenGeneration);
forgotPasswordRouter.put(`/resetPassword`,resetPassword);

module.exports = forgotPasswordRouter;
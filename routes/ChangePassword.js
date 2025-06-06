const express = require('express');
const changePasswordRouter = express.Router();

const {changePassword} = require('../controllers/ChangePassword');

changePasswordRouter.put(`/changePassword`,changePassword);

module.exports = changePasswordRouter;
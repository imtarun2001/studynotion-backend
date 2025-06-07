const express = require('express');
const aboutUsRouter = express.Router();

const {createAboutUs} = require('../controllers/AboutUs');

aboutUsRouter.post(`/createAboutUs`,createAboutUs);

module.exports = aboutUsRouter;
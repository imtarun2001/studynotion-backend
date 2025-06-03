const express = require('express');
const courseRouter = express.Router();

const {createCourse} = require('../controllers/Course');

courseRouter.post(`/createCourse`,createCourse);

module.exports = courseRouter;
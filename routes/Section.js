const express = require('express');
const sectionRouter = express.Router();

const {createSection} = require('../controllers/Section');

sectionRouter.post(`/createSection`,createSection);

module.exports = sectionRouter;
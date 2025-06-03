const express = require('express');
const subSectionRouter = express.Router();

const {createSubSection} = require('../controllers/SubSection');

subSectionRouter.post(`/createSubSection`,createSubSection);

module.exports = subSectionRouter;
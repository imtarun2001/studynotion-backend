const express = require('express');
const additionalDetailRouter = express.Router();

const {updateAdditionalDetail} = require('../controllers/AdditionalDetail');

additionalDetailRouter.put(`/updateAdditionalDetail`,updateAdditionalDetail);

module.exports = additionalDetailRouter;
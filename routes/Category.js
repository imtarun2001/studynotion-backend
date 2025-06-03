const express = require('express');
const categoryRouter = express.Router();

const {createCategory} = require('../controllers/Category');

categoryRouter.post(`/createCategory`,createCategory);

module.exports = categoryRouter;
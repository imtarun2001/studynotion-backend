const express = require('express');
const categoryRouter = express.Router();

const {createCategory,getCategories} = require('../controllers/Category');

categoryRouter.post(`/createCategory`,createCategory);
categoryRouter.get(`/getCategories`,getCategories);

module.exports = categoryRouter;
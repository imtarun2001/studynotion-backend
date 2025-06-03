const express = require('express');
const ratingAndReviewRouter = express.Router();

const {createRatingAndReview} = require('../controllers/RatingAndReview');

ratingAndReviewRouter.post(`/createRatingAndReview`,createRatingAndReview);

module.exports = ratingAndReviewRouter;
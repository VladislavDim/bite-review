import express from 'express';
import {
    createReview,
    getAllReviews,
    getReviewsByRestaurant
}
    from '../controllers/review.controller.js';

const router = express.Router();

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/:restaurantId', getReviewsByRestaurant);

export default router;

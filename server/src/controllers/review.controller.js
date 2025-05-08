import { createReviewForRestaurant, getReviews } from '../services/review.service.js';

/**
 * POST /api/reviews
 * Create a new review for a restaurant
 */
export const createReview = async (req, res) => {
    try {
        const { restaurantId, rating, comment } = req.body;
        const userId = req.user._id;
        const review = await createReviewForRestaurant({
            restaurantId,
            userId,
            rating,
            comment,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res
            .status(error.status || 400)
            .json({ message: error.message || "Failed to create review" });
    }
};

/**
 * GET /api/reviews/:restaurantId
 * Get all reviews for a specific restaurant
 */
export const getReviewsByRestaurant = async (req, res) => {
    try {
        const reviews = await getReviews(req.params.restaurantId);
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};

/**
 * GET /api/reviews
 * Returns all reviews
 */
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await getReviews(); // no ID = fetch all
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};
import Review from '../models/review.model.js';
import Restaurant from '../models/restaurant.model.js';

/**
 * POST /api/reviews
 * Create a new review for a restaurant
 */
export const createReview = async (req, res) => {
    try {
        const { restaurant, user, rating, comment } = req.body;

        const review = await Review.create({
            restaurant,
            user,
            rating,
            comment,
        });

        const reviews = await Review.find({ restaurant });
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        const average = total / reviews.length;

        await Restaurant.findByIdAndUpdate(restaurant, {
            averageRating: average.toFixed(1),
            reviewCount: reviews.length,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to create review' });
    }
};

/**
 * GET /api/reviews/:restaurantId
 * Get all reviews for a specific restaurant
 */
export const getReviewsByRestaurant = async (req, res) => {
    try {
        const reviews = await Review.find({ restaurant: req.params.restaurantId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
};

/**
 * GET /api/reviews
 * Returns all reviews
 */
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
};
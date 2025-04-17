import Restaurant from '../models/restaurant.model.js';

/**
 * GET /api/restaurants
 * Returns all restaurants with related city and owner
 */
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
            .populate('city', 'name')
            .populate('owner', 'username');
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurants' });
    }
};

export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
            .populate('city', 'name')
            .populate('owner', 'username');

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurant' });
    }
};


/**
 * POST /api/restaurants
 * Creates a new restaurant
 */
export const createRestaurant = async (req, res) => {
    try {
        const {
            name,
            description,
            location,
            city,
            owner,
            imageUrl,
            features,
        } = req.body;

        const newRestaurant = await Restaurant.create({
            name,
            description,
            location,
            city,
            owner,
            imageUrl,
            features,
        });

        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create restaurant' });
    }
};

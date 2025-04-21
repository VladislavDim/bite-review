import Restaurant from '../models/restaurant.model.js';

/**
 * GET /api/restaurants
 * Returns all restaurants with related city and owner
 */
export const getAllRestaurants = async () => {
    const restaurants = await Restaurant.find()
        .populate('city', 'name')
        .populate('owner', 'username');

    return restaurants;
};

/**
 * GET /api/restaurants/:id
 * Returns restaurant with current id
 */
export const getRestaurantById = async (id) => {
    const restaurant = await Restaurant.findById(id)
        .populate('city', 'name')
        .populate('owner', 'username');

    return restaurant;
};

/**
 * POST /api/restaurants
 * Creates a new restaurant
 */
export const createRestaurant = async (data, userId) => {
    const {
        name,
        description,
        location,
        city,
        imageUrl,
        features,
    } = data;

    const newRestaurant = await Restaurant.create({
        name,
        description,
        location,
        city,
        owner: userId,
        imageUrl,
        features,
    });

    return newRestaurant;
};

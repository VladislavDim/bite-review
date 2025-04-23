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

/**
 * PUT /api/restaurants/:id
 * Updates restaurant if the user is the owner
 */
export const updateRestaurant = async (restaurantId, data, userId) => {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error('Restaurant not found');
    }

    // Check if current user is the owner
    if (restaurant.owner.toString() !== userId.toString()) {
        throw new Error('Not authorized to update this restaurant');
    }

    Object.assign(restaurant, data); // merge new data
    await restaurant.save();

    return restaurant;
};

/**
 * DELETE /api/restaurants/:id
 * Deletes a restaurant if the user is the owner
 */
export const deleteRestaurant = async (restaurantId, userId) => {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
        throw new Error('Restaurant not found');
    }

    if (restaurant.owner.toString() !== userId.toString()) {
        throw new Error('Not authorized to delete this restaurant');
    }

    await restaurant.deleteOne();
    return restaurant;
};
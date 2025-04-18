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

/**
 * GET /api/restaurants/:id
 * Returns restaurant with current id
 */
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
 * POST /api/restaurants/upload
 * Upload restaurant image and return imageUrl
 */
export const uploadRestaurantImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
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

/**
 * PUT /api/restaurants/:id
 * Update an existing restaurant
 */
export const updateRestaurant = async (req, res) => {
    try {
        const updated = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update restaurant' });
    }
};

/**
 * DELETE /api/restaurants/:id
 * Delete a restaurant
 */
export const deleteRestaurant = async (req, res) => {
    try {
        const deleted = await Restaurant.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete restaurant' });
    }
};

import User from '../models/user.model.js';

/**
 * GET /api/users
 * Returns all users
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('city', 'name');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

/**
 * POST /api/users
 * Creates a new user
 */
export const createUser = async (req, res) => {
    try {
        const { username, email, password, city } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const newUser = await User.create({ username, email, password, city });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user' });
    }
};

/**
 * GET /api/users/:id
 * Returns user by ID
 */
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
};
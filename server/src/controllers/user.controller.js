import {
    createUser,
    getAllUsers,
    getUserById
} from '../services/user.service.js';

/**
 * GET /api/users
 * Returns all users
 */
export const getAll = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

/**
 * POST /api/users
 * Creates a new user
 */
export const create = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user' });
    }
};

/**
 * GET /api/users/:id
 * Returns user by ID
 */
export const findById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
};
import {
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
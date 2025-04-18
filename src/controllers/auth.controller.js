import { registerUser } from '../services/auth.service.js';

/**
 * POST /api/auth/register
 * Handles user registration
 */
export const register = async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
import { registerUser, loginUser } from '../services/auth.service.js';

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

/**
 * POST /api/auth/login
 * Handles user login and returns JWT token
 */
export const login = async (req, res) => {
    try {
        const loggedInUser = await loginUser(req.body);
        res.json(loggedInUser);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
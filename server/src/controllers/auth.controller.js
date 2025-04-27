import { registerUser, loginUser } from '../services/auth.service.js';
import { blacklistToken } from '../services/tokenBlacklist.service.js';

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

/**
 * POST /api/auth/logout
 * Handles user logout
 */
export const logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.exp) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        await blacklistToken(token, new Date(decoded.exp * 1000));

        res.json({ message: 'Successfully logged out' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { isTokenBlacklisted } from '../services/tokenBlacklist.service.js'; 

/**
 * Middleware to protect routes by verifying JWT token and checking blacklist
 */
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const blacklisted = await isTokenBlacklisted(token);

        if (blacklisted) {
            return res.status(401).json({ message: 'Unauthorized - Token has been invalidated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

export default authMiddleware;

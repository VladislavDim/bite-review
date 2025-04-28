import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import BlacklistedToken from '../models/blacklistedToken.model.js';
import { generateToken } from '../utils/jwt.js';

/**
 * POST /api/auth/register
 * Registers a new user
 */
export const registerUser = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('A user with this email already exists!');
    }

    const newUser = await User.create({
        username,
        email,
        password
    });

    const token = generateToken(newUser); 

    return {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token
    };
};

/**
 * POST /api/auth/login
 * Logs in a user and returns a JWT token
 */
export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user);

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
    };
};

/**
 * POST /api/auth/logout
 * Logs out a user by blacklisting their JWT token
 */
export const logoutUser = async (token) => {
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
        throw new Error('Invalid token');
    }

    await BlacklistedToken.create({
        token,
        expiresAt: new Date(decoded.exp * 1000),
    });
};
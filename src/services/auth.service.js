import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

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

    return {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
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

    const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '2d' }
    );

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
    };
};

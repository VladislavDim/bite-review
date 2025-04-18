import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

/**
 * POST /api/auth/register
 * Registers a new user
 */
export const registerUser = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('A user with this email already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
    };
};

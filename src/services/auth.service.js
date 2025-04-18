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

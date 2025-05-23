import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import User from '../models/user.model.js';
import BlacklistedToken from '../models/blacklistedToken.model.js';
import { generateToken } from '../utils/jwt.js';
import { sendVerificationEmail } from './email.service.js';

/**
 * POST /api/auth/register
 * Registers a new user
 */
export const registerUser = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('A user with this email already exists!');
    }

    const verificationCode = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const newUser = await User.create({
        username,
        email,
        password,
        emailVerification: {
            code: verificationCode,
            expires: verificationExpires
        },
        isEmailVerified: false
    });

    await sendVerificationEmail(newUser.email, verificationCode);

    const token = generateToken(newUser);

    // return {
    //     _id: newUser._id,
    //     username: newUser.username,
    //    email: newUser.email,
    //    token
    //};

    return {
        message: 'Registration successful. Please check your email to verify your account.'
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

    if (!user.isEmailVerified) {
        throw new Error('Please verify your email before logging in');
    }

    const token = generateToken(user);

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
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

/**
 * GET /api/auth/verify-email?code=...
 * Verifies user's email using a verification code
 * Marks user as verified if code is valid and not expired
 */
export const verifyUserEmail = async (code) => {
    if (!code) {
        throw new Error('Verification code is required');
    }

    const user = await User.findOne({
        'emailVerification.code': code,
        'emailVerification.expires': { $gt: new Date() },
    });

    if (!user) {
        throw new Error('Invalid or expired verification code');
    }

    user.isEmailVerified = true;
    user.emailVerification = undefined;
    await user.save();

    return { message: 'Email verified successfully' };
};

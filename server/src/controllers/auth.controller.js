import {
    registerUser,
    loginUser,
    logoutUser,
    verifyUserEmail,
    resendVerificationCode,
    requestPasswordReset,
} from '../services/auth.service.js';

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
        await logoutUser(token);

        res.json({ message: 'Successfully logged out' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/auth/verify-email?code=...
 * Verifies user's email using the provided code
 */
export const verifyEmail = async (req, res) => {
    try {
        const result = await verifyUserEmail(req.query.code);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * POST /api/auth/resend-verification
 */
export const resendVerificationCodeHandler = async (req, res) => {
  try {
    const result = await resendVerificationCode(req.body.email);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.retryAfter ? 429 : 400).json({
      message: err.message,
      ...(err.retryAfter && { retryAfter: err.retryAfter })
    });
  }
};

/**
 * POST /api/auth/forgot-password
 * Handles password reset request and sends reset email
 */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await requestPasswordReset(email);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
};
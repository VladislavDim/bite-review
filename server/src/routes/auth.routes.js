import express from 'express';
import {
    register,
    login,
    logout,
    verifyEmail,
    resendVerificationCodeHandler
} from '../controllers/auth.controller.js';

const router = express.Router();

// Register a new user
router.post('/register', register);
// Login
router.post('/login', login);
// Logout
router.post('/logout', logout);
// Verify email
router.get('/verify-email', verifyEmail)
// Resend verification email
router.post('/resend-verification', resendVerificationCodeHandler);

export default router;
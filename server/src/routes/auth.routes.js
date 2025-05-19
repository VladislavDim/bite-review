import express from 'express';
import {
    register,
    login,
    logout
} from '../controllers/auth.controller.js';

const router = express.Router();

// Register a new user
router.post('/register', register);
// Login
router.post('/login', login);
// Logout
router.post('/logout', logout);

export default router;
import express from 'express';
import {
    getAll,
    findById,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', findById);

export default router;

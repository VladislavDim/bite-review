import express from 'express';
import {
    getAll,
    findById,
    create
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', findById);
router.post('/', create);

export default router;

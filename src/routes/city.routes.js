import express from 'express';
import { getAllCities } from '../controllers/city.controller.js';

const router = express.Router();

router.get('/', getAllCities);

export default router;
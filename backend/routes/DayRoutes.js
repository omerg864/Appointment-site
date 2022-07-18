import express from 'express';
import { protectUser } from '../middleware/AuthMiddleware.js';
import { getDay } from '../controllers/DayController.js';

const router = express.Router();


router.get('/get/:date', protectUser, getDay);

export default router;
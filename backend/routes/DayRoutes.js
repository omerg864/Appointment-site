import express from 'express';
import { protectUser, protectStaff } from '../middleware/AuthMiddleware.js';
import { getDay, getDayAppointments } from '../controllers/DayController.js';

const router = express.Router();


router.get('/get/:date', protectUser, getDay);
router.get('/getDay/:date', protectStaff, getDayAppointments);


export default router;
import express from 'express';
import { protectUser } from '../middleware/AuthMiddleware.js';
import { getAppointments } from '../controllers/AppointmentController.js';

const router = express.Router();

router.get('/get/:date', protectUser, getAppointments);


export default router;
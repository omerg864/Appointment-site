import express from 'express';
import { protectUser, protectStaff } from '../middleware/AuthMiddleware.js';
import { getDayAppointments, getFreeDayAppointments, bookAppointment, getUserAppointments,
    updateAppointment, deleteAppointment, addBreak, updateBreak, deleteBreak } from '../controllers/DayController.js';

const router = express.Router();



router.get('/getDay/:date', protectStaff, getDayAppointments);
router.get('/getFreeDay/:date', protectUser, getFreeDayAppointments);
router.post('/book', protectUser, bookAppointment);
router.get('/getMyAppointments', protectUser, getUserAppointments);
router.put('/updateAppointment', protectStaff, updateAppointment);
router.delete('/deleteAppointment', protectUser, deleteAppointment);
router.post('/addBreak', protectStaff, addBreak);
router.post('/updateBreak', protectStaff, updateBreak);
router.post('/deleteBreak', protectStaff, deleteBreak);


export default router;
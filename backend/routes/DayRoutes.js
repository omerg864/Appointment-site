import express from 'express';
import { protectUser, protectStaff } from '../middleware/AuthMiddleware.js';
import { getDayAppointments, getFreeDayAppointments, bookAppointment, getUserAppointments,
    updateAppointment, deleteAppointment, addBreak, updateBreak, deleteBreak, updateDay, deleteAppointmentStaff } from '../controllers/DayController.js';

const router = express.Router();



router.get('/getDay/:date', protectStaff, getDayAppointments);
router.get('/getFreeDay/:date', protectUser, getFreeDayAppointments);
router.post('/book', protectUser, bookAppointment);
router.get('/getMyAppointments', protectUser, getUserAppointments);
router.put('/updateAppointment', protectStaff, updateAppointment);
router.delete('/deleteAppointment/:date/:time', protectUser, deleteAppointment);
router.delete('/deleteAppointmentStaff/:date/:time', protectStaff, deleteAppointmentStaff);
router.post('/addBreak', protectStaff, addBreak);
router.put('/updateBreak', protectStaff, updateBreak);
router.delete('/deleteBreak/:date/:time', protectStaff, deleteBreak);
router.put('/updateDay/:date', protectStaff, updateDay);


export default router;
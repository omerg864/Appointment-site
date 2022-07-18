import asyncHandler from 'express-async-handler';
import Appointment from '../models/AppointmentModel.js';


const deselect = ['-password', "-OTP", "-__v", "-createdAt", "-updatedAt"];


const getAppointments = asyncHandler(async (req, res, next) => {
    const appointments = await Appointment.find({ date: req.params.date }).populate('user', ['f_name', 'l_name', 'email', 'phone', '_id']);
    res.status(200).json({
        success: true,
        appointments
    });
});


export { getAppointments };
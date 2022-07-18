import asyncHandler from 'express-async-handler';
import Day from '../models/DayModel.js';



const getDay = asyncHandler(async (req, res, next) => {
    const day = await Day.findOne({ date: req.params.date }).populate('appointments', ['user', 'time', '_id']);
    res.status(200).json({
        success: true,
        day
    });
});

const checkAppointments = async (appointments, time) => {
    appointments.forEach(appoint => {
        if (appoint.time === time) {
            return appoint;
        }
    });
    return false;
}

const getDayAppointments = asyncHandler(async (req, res, next) => {
    var day = await Day.findOne({ date: req.params.date }).populate('appointments', ['user', 'time', '_id']);
    if (!day){
        day = await Day.create({ date: req.params.date, start_time: "08:00", end_time: "20:00", interval: "30m", breaks: ["10:00", "14:00"], appointments: [] });
    }
    var Schedule = [];
    res.status(200).json({
        success: true,
        day
    });
});

export { getDay };
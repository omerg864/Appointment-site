import asyncHandler from 'express-async-handler';
import Day from '../models/DayModel.js';
import Appointment from '../models/AppointmentModel.js';



const checkAppointments = (appointments, time) => {
    let returnValue = [];
    for (let i = 0; i < appointments.length; i++) {
        if (appointments[i].time === time) {
            returnValue.push(appointments[i]);
        }
    }
    return returnValue;
}

const checkBreaks = (breaks, time) => {
    let returnValue = false;
    for (let i = 0; i < breaks.length; i++) {
        if (breaks[i] === time) {
            returnValue = true;
            break;
        }
    }
    return returnValue;
}

const checkZeroNeeded = (num) => {
    if (parseInt(num) < 10) {
        return `0${num}`;
    }
    return num;
}

const createAppointmentsList = (date, start_time, end_time, interval) => {
    let intervalMinutes;
    if (interval.includes('m')) {
        intervalMinutes = parseInt(interval.replace('m', ''));
    } else {
        intervalMinutes = parseInt(interval.replace('h', '')) * 60;
    }
    let appointments = [];
    let start_time_date = new Date(date.getDate(), date.getMonth(), date.getFullYear(), start_time.split(':')[0], start_time.split(':')[1]);
    let end_time_date = new Date(date.getDate(), date.getMonth(), date.getFullYear(), end_time.split(':')[0], end_time.split(':')[1]);
    while (start_time_date <= end_time_date) {
        appointments.push(checkZeroNeeded(start_time_date.getHours()) + ':' + checkZeroNeeded(start_time_date.getMinutes()));
        start_time_date.setMinutes(start_time_date.getMinutes() + intervalMinutes);
    }
    return appointments;
}

const calculateDay = (free_appointments, breaks, appointments, date) => {
    let schedule = [];
    free_appointments.forEach(appoint => {
        let checkAppointment = checkAppointments(appointments, appoint);
        if (checkAppointment.length > 0) {
            schedule.push(...checkAppointment);
        }
        let checkBreak = checkBreaks(breaks, appoint);
        if (checkBreak) {
            schedule.push({
                time: appoint,
                type: 'break',
                date: date,
            });
        }
        if (checkAppointment.length === 0 && !checkBreak) {
            schedule.push({
                time: appoint,
                type: 'free',
                date: date,
            });
        }
    });
    return schedule;
}

const getScheduleDay = async (req, res, next, dateFormatted) => {
    const date = new Date(parseInt(dateFormatted[2]), parseInt(dateFormatted[1]) - 1, parseInt(dateFormatted[0]) + 1);
    var day = await Day.findOne({ date: date }).populate('appointments', ['date', 'user', 'time', '_id']);
    if (!day){
        day = await Day.create({ date: date, startTime: "08:00", endTime: "20:00", interval: "30m", breaks: ["10:00", "14:00"], appointments: [] });
    }
    day = await day.populate('appointments.user', ['f_name', 'l_name', 'email', 'phone', 'staff', '_id']);
    let free_appointments = createAppointmentsList(day.date, day.startTime, day.endTime, day.interval);
    let schedule = calculateDay(free_appointments, day.breaks, day.appointments, date);
    return schedule;
}

const getUserAppointments = asyncHandler(async (req, res, next) => {
    var appointments = await Appointment.find({ user: req.user._id }).sort({date: 1, time: 1}).populate('user', ['f_name', 'l_name', 'email', 'phone', 'staff', '_id']);
    res.status(200).json({
        success: true,
        appointments
    });
});

const getDayAppointments = asyncHandler(async (req, res, next) => {
    const date = formatToDate(req.params.date);
    const dateFormatted = req.params.date.split('-');
    let schedule = await getScheduleDay(req, res, next, dateFormatted);
    res.status(200).json({
        success: true,
        day: schedule,
        date
    });
});

const getFreeDayAppointments = asyncHandler(async (req, res, next) => {
    const dateFormatted = req.params.date.split('-');
    let schedule = await getScheduleDay(req, res, next, dateFormatted);
    const date = formatToDate(req.params.date)
    let free_appointments = [];
    schedule.forEach(appoint => {
        if (appoint.type === 'free') {
            free_appointments.push(appoint.time);
        }
    });
    res.status(200).json({
        success: true,
        free_appointments,
        date
    });
});

const formatToDate = (date) => {
    const dateFormatted = date.split('-');
    return new Date(parseInt(dateFormatted[2]), parseInt(dateFormatted[1]) - 1, parseInt(dateFormatted[0]) + 1);
}

const bookAppointment = asyncHandler(async (req, res, next) => {
    const { date, time } = req.body;
    const date_ = formatToDate(date);
    var day = await Day.findOne({ date: date_ }).populate('appointments', ['user', 'time', '_id']);
    if (!day){
        day = await Day.create({ date: date_, startTime: "08:00", endTime: "20:00", interval: "30m", breaks: ["10:00", "14:00"], appointments: [] });
    }
    const appointment = await (await Appointment.create({ user: req.user.id, time: time, date: date_ })).populate('user', ['f_name', 'l_name', 'email', 'phone', 'staff', '_id']);
    day.appointments.push(appointment._id);
    await day.save();
    res.status(200).json({
        success: true,
        appointment
    });
});

const updateAppointment = asyncHandler(async (req, res, next) => {
    const { date, time, user_id, newDate, newTime, newUser } = req.body;
    const date_ = formatToDate(date);
    const newDate_ = formatToDate(newDate);
    const appointment = await Appointment.findOneAndUpdate({ user: user_id, time: time, date: date_ }, { user: newUser, time: newTime, date: newDate_ });
    res.status(200).json({
        success: true,
        appointment,
        date: date_
    });
});

const deleteAppointment = asyncHandler(async (req, res, next) => {
    const { date, time } = req.params;
    const date_ = formatToDate(date);
    var day = await Day.findOne({ date: date_ }).populate('appointments', ['user', 'time', '_id']);
    if (!day){
        res.status(400);
        throw new Error('Appointment not found');
    }
    const appointment = await Appointment.findOneAndDelete({ user: req.user.id, time: time, date: date_ });
    day.appointments = day.appointments.filter(appoint => appoint._id.toString() !== appointment._id.toString());
    await day.save();
    res.status(200).json({
        success: true,
        appointment,
        date: date_
    });
});

const addBreak = asyncHandler(async (req, res, next) => {
    const { date, time } = req.body;
    const dateFormatted = date.split('-');
    const date_ = formatToDate(date);
    var day = await Day.findOne({ date: date_ }).populate('appointments', ['user', 'time', '_id']);
    if (!day){
        day = await Day.create({ date: date_, startTime: "08:00", endTime: "20:00", interval: "30m", breaks: ["10:00", "14:00"], appointments: [] });
    }
    day.breaks.push(time);
    await day.save();
    let schedule = await getScheduleDay(req, res, next, dateFormatted);
    res.status(200).json({
        success: true,
        day: schedule,
        date: date_
    });
});

const deleteBreak = asyncHandler(async (req, res, next) => {
    const { date, time } = req.params;
    const dateFormatted = date.split('-');
    const date_ = formatToDate(date);
    var day = await Day.findOne({ date: date_ }).populate('appointments', ['user', 'time', '_id']);
    if (!day){
        day = await Day.create({ date: date_, startTime: "08:00", endTime: "20:00", interval: "30m", breaks: ["10:00", "14:00"], appointments: [] });
    }
    day.breaks = day.breaks.filter(break_ => break_ !== time);
    await day.save();
    let schedule = await getScheduleDay(req, res, next, dateFormatted);
    res.status(200).json({
        success: true,
        day: schedule,
        date: date_
    });
});

const updateBreak = asyncHandler(async (req, res, next) => {
    const { date, time, newTime } = req.body;
    const dateFormatted = date.split('-');
    const date_ = formatToDate(date);
    var day = await Day.findOne({ date: date_ }).populate('appointments', ['user', 'time', '_id']);
    if (!day){
        day = await Day.create({ date: date_, startTime: "08:00", endTime: "20:00", interval: "30m", breaks: ["10:00", "14:00"], appointments: [] });
    }
    day.breaks = day.breaks.filter(break_ => break_ !== time);
    day.breaks.push(newTime);
    await day.save();
    let schedule = await getScheduleDay(req, res, next, dateFormatted);
    res.status(200).json({
        success: true,
        day: schedule,
        date: date_
    });
});




export { getUserAppointments, getDayAppointments, getFreeDayAppointments, bookAppointment,
    updateAppointment, deleteAppointment, addBreak, deleteBreak, updateBreak };
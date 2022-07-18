import asyncHandler from 'express-async-handler';
import Day from '../models/DayModel.js';



const getDay = asyncHandler(async (req, res, next) => {
    const day = await Day.findOne({ date: req.params.date }).populate('appointments', ['user', 'time', '_id']);
    res.status(200).json({
        success: true,
        day
    });
});

const checkAppointments = (appointments, time) => {
    appointments.forEach(appoint => {
        if (appoint.time === time) {
            return appoint;
        }
    });
    return false;
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

const calculateDay = (free_appointments, breaks, appointments) => {
    let schedule = [];
    free_appointments.forEach(appoint => {
        let checkAppointment = checkAppointments(appointments, appoint);
        if (checkAppointment) {
            schedule.push({
                user: checkAppointment.user,
                time: appoint,
            });
        }
        let checkBreak = checkBreaks(breaks, appoint);
        if (checkBreak) {
            schedule.push({
                time: appoint,
                type: 'break'
            });
        }
        if (!checkAppointment && !checkBreak) {
            schedule.push({
                time: appoint,
                type: 'free'
            });
        }
    });
    return schedule;
}

const getDayAppointments = asyncHandler(async (req, res, next) => {
    const dateFormatted = req.params.date.split('-');
    const date = new Date(parseInt(dateFormatted[0]), parseInt(dateFormatted[1]) - 1, parseInt(dateFormatted[2]));
    var day = await Day.findOne({ date: date }).populate('appointments', ['user', 'time', '_id']);
    if (!day){
        day = await Day.create({ date: date, startTime: "08:00", endTime: "20:00", interval: "30m", breaks: ["10:00", "14:00"], appointments: [] });
    }
    let free_appointments = createAppointmentsList(day.date, day.startTime, day.endTime, day.interval);
    let schedule = calculateDay(free_appointments, day.breaks, day.appointments);
    res.status(200).json({
        success: true,
        schedule
    });
});

export { getDay, getDayAppointments };
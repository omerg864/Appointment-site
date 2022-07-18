import asyncHandler from 'express-async-handler';
import Settings from '../models/SettingsModel.js';



const createSettings = async () => {
    let scheduleDefaultDay = {
        start_time: "08:00",
        end_time: "20:00",
        breaks: ["10:00", "14:00"],
        interval: "30m"
    };
    let scheduleDefault = [];
    for (let i = 0; i < 7; i++) {
        scheduleDefault.push(scheduleDefaultDay);
    }
    var settings = await Settings.create({
        site_header: "Appointment Site",
        site_title: "Barber Name",
        site_description: "",
        rtl: false,
        register_code: "123456",
        schedule: scheduleDefault
    });
    console.log(settings);
    return settings;
}

const getSiteSettings = asyncHandler(async (req, res, next) => {
    var settings = await Settings.findOne();
    if (!settings){
        settings = await createSettings();
    }
    res.status(200).json({
        success: true,
        settings: {
            site_header: settings.site_header,
            site_title: settings.site_title,
            site_description: settings.site_description,
            rtl: settings.rtl,
        }
    });
});

const getManagerSettings = asyncHandler(async (req, res, next) => {
    var settings = await Settings.findOne();
    if (!settings){
        settings = await createSettings();
    }
    res.status(200).json({
        success: true,
        settings
    });
});




export { getSiteSettings, getManagerSettings };
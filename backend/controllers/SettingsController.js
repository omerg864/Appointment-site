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
        site_description: "",
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
            site_description: settings.site_description,
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

const updateSettings = asyncHandler(async (req, res, next) => {
    const { site_description, register_code, schedule } = req.body;
    var settings = await Settings.findOne();
    if (!settings){
        settings = await createSettings();
    }
    settings.site_description = site_description;
    settings.register_code = register_code;
    settings.schedule = schedule;
    await settings.save();
    res.status(200).json({
        success: true,
        settings
    });
});




export { getSiteSettings, getManagerSettings, updateSettings };
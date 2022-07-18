import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import Settings from '../models/SettingsModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const deselect = ['-password', "-OTP", "-__v", "-createdAt", "-updatedAt"];


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
    return settings;
}

const registerUser = asyncHandler(async (req, res, next) => {
    const { f_name, l_name, email, phone, password, registerCode } = req.body;
    const user = await User.findOne({ "email" : { $regex : new RegExp(email, "i") } });
    if (user) {
        res.status(400)
        throw new Error("User already exists");
    }
    var settings = await Settings.findOne();
    if (!settings){
        settings = await createSettings();
    }
    if (settings.register_code !== registerCode) {
        res.status(401)
        throw new Error("Invalid register code. can't register");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        f_name,
        l_name,
        email,
        phone,
        password: hashedPassword
    });
    res.status(201).json({
        success: true,
        user: {
            id: newUser._id,
            f_name: newUser.f_name,
            l_name: newUser.l_name,
            email: newUser.email,
            phone: newUser.phone,
        }
    });
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ "email" : { $regex : new RegExp(email, "i") } });
    if (!user) {
        res.status(400)
        throw new Error("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400)
        throw new Error("Password is incorrect");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({
        success: true,
        user: {
            token,
            id: user._id,
            f_name: user.f_name,
            l_name: user.l_name,
            email: user.email,
            phone: user.phone,
            staff: user.staff,
        }
    });
});

const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select(deselect);
    res.status(200).json({
        success: true,
        user
    });
});

const updateUser = asyncHandler(async (req, res, next) => {
    const { f_name, l_name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, {
        f_name,
        l_name,
        email,
        phone
    }, { new: true }).select(deselect);
    res.status(200).json({
        success: true,
        user
    });
});

const deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({
        success: true,
        message: "User deleted"
    });
});


export { registerUser, loginUser, getUser, updateUser, deleteUser };
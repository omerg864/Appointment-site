import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import Settings from '../models/SettingsModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Appointment from '../models/AppointmentModel.js';

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
        site_description: "",
        register_code: "123456",
        schedule: scheduleDefault
    });
    return settings;
}

const registerUser = asyncHandler(async (req, res, next) => {
    const { f_name, l_name, email, phone, password, register_code } = req.body;
    const user = await User.findOne({ "email" : { $regex : new RegExp(email, "i") } });
    if (user) {
        res.status(400)
        throw new Error("User already exists");
    }
    var settings = await Settings.findOne();
    if (!settings){
        settings = await createSettings();
    }
    if (settings.register_code !== register_code) {
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
            id: user._id,
            f_name: user.f_name,
            l_name: user.l_name,
            email: user.email,
            phone: user.phone,
            staff: user.staff,
            token,
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
    const user = await User.findById(req.user.id).select(deselect);
    if (!user.staff){
        user.f_name = f_name;
        user.l_name = l_name;
        user.email = email;
        user.phone = phone;
        await user.save();
        res.status(200).json({
            success: true,
            user: {...user._doc , token: req.token},
            staff: false
        });
    } else {
        const { _id, staff } = req.body;
        if (_id){
            const userToUpdate = await User.findById(_id).select(deselect);
            if (!userToUpdate) {
                res.status(400)
                throw new Error("User does not exist");
            }
            userToUpdate.f_name = f_name;
            userToUpdate.l_name = l_name;
            userToUpdate.email = email;
            userToUpdate.phone = phone;
            userToUpdate.staff = staff;
            await userToUpdate.save();
            res.status(200).json({
                success: true,
                user: userToUpdate,
                staff: true
            });
        } else {
            user.f_name = f_name;
            user.l_name = l_name;
            user.email = email;
            user.phone = phone;
            await user.save();
            res.status(200).json({
                success: true,
                user: {...user._doc, token: req.token},
                staff: false
            });
        }
    }
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select(deselect);
    if (!user.staff){
        res.status(401)
        throw new Error("Not Authorized");
    }
    const { id } = req.params;
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
        res.status(400)
        throw new Error("User does not exist");
    }
    const appointments = await Appointment.find({ user: userToDelete});
    console.log(appointments);
    if (appointments.length > 0){
        for (const appointment of appointments){
            await appointment.remove();
        }
    }
    await userToDelete.remove();
    res.status(200).json({
        success: true,
        message: "User deleted",
        user: userToDelete
    });
});

const updateUserPassword = asyncHandler(async (req, res, next) => {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findOne({ _id: req.user.id });
    if (user.staff) {
        const { user_id } = req.body;
        if (user_id){
            const newUser = await User.findById(user_id);
            if (!newUser) {
                res.status(400)
                throw new Error("User does not exist");
            }
            newUser.password = hashedPassword;
            await newUser.save();
            res.status(200).json({
                success: true,
            });
        } else {
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({
            success: true,
            });
        }
    } else {
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            success: true,
        });
    }
});

const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({}).select(deselect);
    res.status(200).json({
        success: true,
        users
    });
});


export { registerUser, loginUser, getUser, updateUser, deleteUser, updateUserPassword, getUsers };
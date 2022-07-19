import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import Settings from '../models/SettingsModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import e from 'express';


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
    const user = await User.findById(req.user.id).select(deselect);
    if (!user.staff){
        user.f_name = f_name;
        user.l_name = l_name;
        user.email = email;
        user.phone = phone;
        await user.save();
        res.status(200).json({
            success: true,
            user,
            staff: false
        });
    } else {
        const { user_id } = req.body;
        if (user_id){
            const userToUpdate = await User.findById(user_id).select(deselect);
            if (!userToUpdate) {
                res.status(400)
                throw new Error("User does not exist");
            }
            const { staff } = req.body;
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
                user,
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
    const { user_id } = req.params.id;
    const userToDelete = await User.findByIdAndDelete(user_id).select(deselect);
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
                user: newUser
            });
        } else {
            user.password = hashedPassword;
            res.status(200).json({
            success: true,
            user
            });
        }
    } else {
        user.password = hashedPassword;
        res.status(200).json({
            success: true,
            user
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
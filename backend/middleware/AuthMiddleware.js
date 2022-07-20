import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

const protectUser = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            req.token = token;
            next();
        } catch(error){
            console.log(error);
            res.status(401)
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token provided');
    }
})

const protectStaff = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            if (!user.staff){
                res.status(401)
                throw new Error('Not authorized');
            }
            req.user = user;
            req.token = token;
            next();
        } catch(error){
            console.log(error);
            res.status(401)
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token provided');
    }
})

export { protectUser, protectStaff };
import express from 'express';
import { registerUser, loginUser, getUser, updateUser, deleteUser, updateUserPassword, getUsers, authenticateStaff, authenticate } from '../controllers/UserController.js';
import { protectUser, protectStaff } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get', protectUser, getUser);
router.put('/updateUser', protectUser, updateUser);
router.delete('/deleteUser/:id', protectStaff, deleteUser);
router.put('/updatePassword', protectUser, updateUserPassword);
router.get('/getUsers', protectStaff, getUsers);
router.get('/authenticate', protectUser, authenticate);
router.get('/authenticateStaff', protectStaff, authenticateStaff);


export default router;
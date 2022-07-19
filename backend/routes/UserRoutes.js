import express from 'express';
import { registerUser, loginUser, getUser, updateUser, deleteUser, updateUserPassword, getUsers } from '../controllers/UserController.js';
import { protectUser, protectStaff } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protectUser, getUser);
router.put('/updateUser', protectUser, updateUser);
router.delete('/deleteUser', protectStaff, deleteUser);
router.put('/updatePassword', protectUser, updateUserPassword);
router.put('/getUsers', protectStaff, getUsers);


export default router;
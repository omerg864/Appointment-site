import express from 'express';
import { registerUser, loginUser, getUser, updateUser, deleteUser } from '../controllers/UserController.js';
import { protectUser } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protectUser, getUser);
router.put('/me', protectUser, updateUser);
router.delete('/me', protectUser, deleteUser);


export default router;
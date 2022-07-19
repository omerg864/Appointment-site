import express from 'express';
import { protectUser, protectStaff } from '../middleware/AuthMiddleware.js';
import { getSiteSettings, getManagerSettings, updateSettings } from '../controllers/SettingsController.js';


const router = express.Router();

router.get('/getSiteSettings', getSiteSettings);
router.get('/getManagerSettings', protectStaff, getManagerSettings);
router.put('/updateSettings', protectStaff, updateSettings);


export default router;
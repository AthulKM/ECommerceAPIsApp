import express from 'express';



import {
    userDetails,
    userLogin,
    userRegistration
} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import tryCatchHandler from '../middlewares/tryCatchMiddleware.js';

const router = express.Router();

router.post('/userRegistration', tryCatchHandler(userRegistration));
router.post('/userLogin', tryCatchHandler(userLogin));
router.get('/profile', authenticateToken, tryCatchHandler(userDetails));


export default router;
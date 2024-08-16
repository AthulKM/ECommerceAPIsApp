import express from 'express';



import {
    userDetails,
    userLogin,
    userRegistration
} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/userRegistration', userRegistration);
router.post('/userLogin', userLogin);
router.get('/profile', authenticateToken, userDetails);


export default router;
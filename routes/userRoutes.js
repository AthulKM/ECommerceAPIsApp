import express from 'express';



import {
    userLogin,
    userRegistration
} from '../controllers/userController.js';

const router = express.Router();

router.post('/userRegistration', userRegistration);
router.post('/userLogin', userLogin);


export default router;
import express from 'express';



import {
    userRegistration
} from '../controllers/userController.js';

const router = express.Router();

router.post('/userRegistration', userRegistration);


export default router;
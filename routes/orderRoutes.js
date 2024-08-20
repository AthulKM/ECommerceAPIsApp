import express from 'express';
import { createOrder, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import { admin, authenticateToken } from '../middlewares/authMiddleware.js';
import tryCatchHandler from '../middlewares/tryCatchMiddleware.js';

const router = express.Router();

router.post('/newOrder', authenticateToken, tryCatchHandler(createOrder));
router.get('/allOrders', authenticateToken, tryCatchHandler(getUserOrders));
router.put('/updateOrder/:id', authenticateToken, admin, tryCatchHandler(updateOrderStatus));

export default router;

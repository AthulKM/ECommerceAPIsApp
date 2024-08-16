import express from 'express';
import { createOrder, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import { admin, authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/newOrder', authenticateToken, createOrder);
router.get('/allOrders', authenticateToken, getUserOrders);
router.put('/updateOrder/:id', authenticateToken, admin, updateOrderStatus);

export default router;

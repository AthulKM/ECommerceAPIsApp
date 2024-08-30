import express from 'express';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/productController.js';
import upload from '../middlewares/multerMiddleware.js';
import { admin, authenticateToken, protect } from '../middlewares/authMiddleware.js';
import tryCatchHandler from '../middlewares/tryCatchMiddleware.js';

const router = express.Router();

router.post('/Product', authenticateToken, admin, upload.single('image'), tryCatchHandler(createProduct));

router.get('/Products', tryCatchHandler(getAllProducts))
router.get('/Product/:id', tryCatchHandler(getProductById));
router.put('/Product/:id', protect, admin, upload.single('image'), tryCatchHandler(updateProductById));
router.delete('/Product/:id', authenticateToken, admin, tryCatchHandler(deleteProductById));

export default router;
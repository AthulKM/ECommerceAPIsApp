import express from 'express';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/productController.js';
import upload from '../middlewares/multerMiddleware.js';
import { admin, authenticateToken, protect } from '../middlewares/authMiddleware.js';
import tryCatchHandler from '../middlewares/tryCatchMiddleware.js';

const router = express.Router();

router.post('/addProduct', authenticateToken, admin, upload.single('image'), tryCatchHandler(createProduct));

router.get('/allProducts', tryCatchHandler(getAllProducts))
router.get('/getOneProduct/:id', tryCatchHandler(getProductById));
router.put('/updateProduct/:id', protect, admin, upload.single('image'), tryCatchHandler(updateProductById));
router.delete('/deleteProduct/:id', authenticateToken, admin, tryCatchHandler(deleteProductById));

export default router;
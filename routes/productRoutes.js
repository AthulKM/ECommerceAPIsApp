import express from 'express';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/productController.js';
import upload from '../middlewares/multerMiddleware.js';
import { admin, authenticateToken, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/addProduct', authenticateToken, admin, upload.single('image'), createProduct);

router.get('/allProducts', getAllProducts)
router.get('/getOneProduct/:id', getProductById);
router.put('/updateProduct/:id', protect, admin, upload.single('image'), updateProductById);
router.delete('/deleteProduct/:id', authenticateToken, admin, deleteProductById);

export default router;
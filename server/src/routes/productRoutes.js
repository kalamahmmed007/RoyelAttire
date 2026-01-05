import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { productValidator, productIdValidator } from '../validators/productValidator.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', productIdValidator, validate, getProductById);

// Admin routes
router.post('/', protect, admin, productValidator, validate, createProduct);
router.put('/:id', protect, admin, productIdValidator, productValidator, validate, updateProduct);
router.delete('/:id', protect, admin, productIdValidator, validate, deleteProduct);

export default router;

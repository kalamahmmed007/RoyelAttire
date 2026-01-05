// routes/cartRoutes.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import { addToCart, updateCartItem, removeCartItem, clearCart, getCart } from '../controllers/cartController.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Get user cart
router.get('/', protect, getCart);

// Add item
router.post('/add', protect, addToCart);

// Update item quantity
router.put('/update/:id', protect, updateCartItem);

// Remove item
router.delete('/remove/:id', protect, removeCartItem);

// Clear cart
router.delete('/clear', protect, clearCart);

export default router;

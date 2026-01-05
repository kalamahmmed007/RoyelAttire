// routes/orderRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createOrderValidator, updateOrderStatusValidator, orderIdValidator } from '../validators/orderValidator.js';
import { createOrder, getOrderById, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// Create order
router.post('/', protect, createOrderValidator, validate, createOrder);

// Get order by ID
router.get('/:id', protect, orderIdValidator, validate, getOrderById);

// Update order status (admin)
router.put('/:id/status', protect, admin, orderIdValidator, updateOrderStatusValidator, validate, updateOrderStatus);

// Delete order (admin)
router.delete('/:id', protect, admin, orderIdValidator, validate, deleteOrder);

export default router;

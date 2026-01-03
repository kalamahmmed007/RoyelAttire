import express from 'express';
import {
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} from '../controllers/orderController.js';

import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import validate from '../middleware/validation.js';

import {
    createOrderValidator,
    updateOrderStatusValidator,
    orderIdValidator,
} from '../validators/orderValidator.js';

const router = express.Router();

// Create order
router.post(
    '/',
    auth,
    createOrderValidator,
    validate,
    createOrder
);

// Get order by ID
router.get(
    '/:id',
    auth,
    orderIdValidator,
    validate,
    getOrderById
);

// Update order status (admin)
router.put(
    '/:id/status',
    auth,
    admin,
    updateOrderStatusValidator,
    validate,
    updateOrderStatus
);

// Delete order
router.delete(
    '/:id',
    auth,
    admin,
    orderIdValidator,
    validate,
    deleteOrder
);

export default router;

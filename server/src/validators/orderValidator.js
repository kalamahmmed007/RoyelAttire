// validators/orderValidator.js
import { body, param } from 'express-validator';

export const createOrderValidator = [
  body('products')
    .isArray({ min: 1 }).withMessage('At least one product is required')
    .custom((arr) => arr.every(p => p.product && p.quantity))
    .withMessage('Each product must have id and quantity'),

  body('shippingAddress')
    .notEmpty().withMessage('Shipping address is required'),
];

export const updateOrderStatusValidator = [
  body('status')
    .notEmpty().withMessage('Order status is required')
    .isIn(['pending','processing','shipped','delivered','cancelled'])
    .withMessage('Invalid status'),
];

export const orderIdValidator = [
  param('id')
    .notEmpty().withMessage('Order ID is required')
    .isMongoId().withMessage('Invalid Order ID'),
];

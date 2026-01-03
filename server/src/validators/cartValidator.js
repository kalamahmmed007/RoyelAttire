import { body, param } from 'express-validator';
import { validate } from './authValidator.js';

// Add to cart validation
export const addToCartValidation = [
    body('productId')
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid product ID'),

    body('quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ min: 1, max: 99 })
        .withMessage('Quantity must be between 1 and 99')
];

// Update cart item validation
export const updateCartValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid cart item ID'),

    body('quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ min: 1, max: 99 })
        .withMessage('Quantity must be between 1 and 99')
];

// Remove from cart validation
export const removeFromCartValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid cart item ID')
];

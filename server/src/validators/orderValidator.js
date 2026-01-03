import { body, param, query } from 'express-validator';
import { validate } from './authValidator.js';

// Create order validation
export const createOrderValidation = [
    body('orderItems')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one item'),

    body('orderItems.*.product')
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid product ID'),

    body('orderItems.*.quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),

    body('orderItems.*.price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('shippingAddress')
        .notEmpty()
        .withMessage('Shipping address is required')
        .isObject()
        .withMessage('Shipping address must be an object'),

    body('shippingAddress.fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters'),

    body('shippingAddress.address')
        .trim()
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Address must be between 5 and 200 characters'),

    body('shippingAddress.city')
        .trim()
        .notEmpty()
        .withMessage('City is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('City name must be between 2 and 100 characters'),

    body('shippingAddress.state')
        .trim()
        .notEmpty()
        .withMessage('State/Province is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('State name must be between 2 and 100 characters'),

    body('shippingAddress.postalCode')
        .trim()
        .notEmpty()
        .withMessage('Postal code is required')
        .matches(/^[A-Z0-9\s-]{3,10}$/i)
        .withMessage('Invalid postal code format'),

    body('shippingAddress.country')
        .trim()
        .notEmpty()
        .withMessage('Country is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Country name must be between 2 and 100 characters'),

    body('shippingAddress.phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
        .withMessage('Invalid phone number format'),

    body('paymentMethod')
        .notEmpty()
        .withMessage('Payment method is required')
        .isIn(['card', 'paypal', 'cod'])
        .withMessage('Invalid payment method'),

    body('itemsPrice')
        .notEmpty()
        .withMessage('Items price is required')
        .isFloat({ min: 0 })
        .withMessage('Items price must be a positive number'),

    body('taxPrice')
        .notEmpty()
        .withMessage('Tax price is required')
        .isFloat({ min: 0 })
        .withMessage('Tax price must be a positive number'),

    body('shippingPrice')
        .notEmpty()
        .withMessage('Shipping price is required')
        .isFloat({ min: 0 })
        .withMessage('Shipping price must be a positive number'),

    body('totalPrice')
        .notEmpty()
        .withMessage('Total price is required')
        .isFloat({ min: 0 })
        .withMessage('Total price must be a positive number')
        .custom((value, { req }) => {
            const calculatedTotal =
                parseFloat(req.body.itemsPrice) +
                parseFloat(req.body.taxPrice) +
                parseFloat(req.body.shippingPrice);

            if (Math.abs(parseFloat(value) - calculatedTotal) > 0.01) {
                throw new Error('Total price does not match the sum of items, tax, and shipping');
            }
            return true;
        })
];

// Update order status validation
export const updateOrderStatusValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID'),

    body('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
        .withMessage('Invalid order status')
];

// Order ID validation
export const orderIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID')
];

// Order query validation
export const orderQueryValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),

    query('status')
        .optional()
        .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
        .withMessage('Invalid order status'),

    query('startDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid start date format'),

    query('endDate')
        .optional()
        .isISO8601()
        .withMessage('Invalid end date format')
        .custom((value, { req }) => {
            if (req.query.startDate && new Date(value) < new Date(req.query.startDate)) {
                throw new Error('End date must be after start date');
            }
            return true;
        })
];

// Cancel order validation
export const cancelOrderValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID'),

    body('reason')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Cancellation reason must not exceed 500 characters')
];

// Add tracking info validation
export const addTrackingValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID'),

    body('trackingNumber')
        .trim()
        .notEmpty()
        .withMessage('Tracking number is required')
        .isLength({ min: 5, max: 50 })
        .withMessage('Tracking number must be between 5 and 50 characters'),

    body('carrier')
        .trim()
        .notEmpty()
        .withMessage('Carrier name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Carrier name must be between 2 and 100 characters')
];

export { validate };
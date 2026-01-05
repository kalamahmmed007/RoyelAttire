// validators/userValidator.js
import { body, param } from 'express-validator';

export const updateProfileValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 chars')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name must contain only letters and spaces'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email')
    .normalizeEmail(),

  body('phone')
    .optional()
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .withMessage('Invalid phone number'),
];

export const userIdValidator = [
  param('id')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('Invalid User ID'),
];

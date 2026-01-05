// validators/categoryValidator.js
import { body, param } from 'express-validator';

export const createCategoryValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 chars'),

  body('description')
    .optional()
    .isLength({ max: 255 }).withMessage('Description max length is 255 chars'),
];

export const categoryIdValidator = [
  param('id')
    .notEmpty().withMessage('Category ID is required')
    .isMongoId().withMessage('Invalid Category ID'),
];

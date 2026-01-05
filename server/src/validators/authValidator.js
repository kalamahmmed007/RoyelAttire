// server/src/validators/authValidator.js
import { body } from 'express-validator';

export const registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const changePasswordValidator = [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 chars'),
];

export const forgotPasswordValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
];

export const resetPasswordValidator = [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
];

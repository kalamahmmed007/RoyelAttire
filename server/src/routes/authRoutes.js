// server/src/routes/authRoutes.js
import express from 'express';
import validate from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword
} from '../controllers/authController.js';
import {
  registerValidator,
  loginValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);
router.post('/forgot-password', forgotPasswordValidator, validate, forgotPassword);
router.put('/reset-password/:token', resetPasswordValidator, validate, resetPassword);
router.put('/change-password', protect, changePasswordValidator, validate, changePassword);

export default router;

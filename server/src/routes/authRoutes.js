import express from 'express';
import { register, login, logout, getProfile, forgotPassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { login, register } from '../controllers/authController.js';
import { loginValidator } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login, loginValidator, ValidityState,);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);
router.post('/forgot-password', forgotPassword);

export default router;
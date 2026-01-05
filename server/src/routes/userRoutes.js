import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { updateUserValidator, userIdValidator } from '../validators/userValidator.js';

const router = express.Router();

// Get all users - admin only
router.get('/', protect, admin, getAllUsers);

// Get single user
router.get('/:id', protect, admin, userIdValidator, validate, getUserById);

// Update user
router.put('/:id', protect, admin, updateUserValidator, validate, updateUser);

// Delete user
router.delete('/:id', protect, admin, userIdValidator, validate, deleteUser);

export default router;

// routes/categoryRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createCategoryValidator, categoryIdValidator } from '../validators/categoryValidator.js';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

// Public
router.get('/', getCategories);
router.get('/:id', categoryIdValidator, validate, getCategoryById);

// Admin only
router.post('/', protect, admin, createCategoryValidator, validate, createCategory);
router.put('/:id', protect, admin, categoryIdValidator, createCategoryValidator, validate, updateCategory);
router.delete('/:id', protect, admin, categoryIdValidator, validate, deleteCategory);

export default router;

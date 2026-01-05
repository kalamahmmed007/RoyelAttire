// routes/reviewRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { createReview, updateReview, deleteReview, getReviewsByProduct } from '../controllers/reviewController.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Get all reviews for a product
router.get('/product/:productId', getReviewsByProduct);

// Protected review actions
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, admin, deleteReview);

export default router;

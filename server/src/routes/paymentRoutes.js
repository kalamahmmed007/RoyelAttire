// routes/paymentRoutes.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Create Stripe payment
router.post('/create-intent', protect, createPaymentIntent);

// Stripe webhook
router.post('/webhook', handleWebhook);

export default router;

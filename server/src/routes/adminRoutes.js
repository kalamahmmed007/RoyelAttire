// routes/adminRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { getDashboardStats, getAnalytics, getAllUsers, updateUserRole } from '../controllers/adminController.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Admin protected routes
router.get('/dashboard/stats', protect, admin, getDashboardStats);
router.get('/analytics', protect, admin, getAnalytics);
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/role', protect, admin, updateUserRole);


export default router;

import express from 'express';
import { getAdminStats, getAllBookings, updateBookingStatus, getAllUsers } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes require authentication AND admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getAdminStats);
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id/status', updateBookingStatus);
router.get('/users', getAllUsers);

export default router;

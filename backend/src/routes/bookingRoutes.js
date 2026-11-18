import express from 'express';
import { createBooking, getMyTrips, getBookingByRef } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking); // Zero-trust backend validation; strictly enforces authentication
router.get('/my-trips', protect, getMyTrips);
router.get('/:reference', getBookingByRef);

export default router;

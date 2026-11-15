import express from 'express';
import { createBooking, getMyTrips, getBookingByRef } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createBooking); // Zero-trust backend validation; handles both logged-in and guest enquiry
router.get('/my-trips', protect, getMyTrips);
router.get('/:reference', getBookingByRef);

export default router;

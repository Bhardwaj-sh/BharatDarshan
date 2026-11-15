import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import State from '../models/State.js';

// @desc    Create a new booking enquiry with zero-trust server price calculation
// @route   POST /api/bookings
// @access  Public or Protected
export const createBooking = async (req, res) => {
  try {
    const {
      packageId,
      travelDate,
      travellerCount,
      leadTravellerName,
      leadTravellerEmail,
      leadTravellerPhone,
      specialRequests
    } = req.body;

    // 1. Basic field validation
    if (!packageId || !travelDate || !travellerCount || !leadTravellerName || !leadTravellerEmail || !leadTravellerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required details: package, travel date, passenger count, name, email, and phone'
      });
    }

    // 2. Validate passenger count
    const count = parseInt(travellerCount, 10);
    if (isNaN(count) || count < 1 || count > 20) {
      return res.status(400).json({
        success: false,
        message: 'Traveller count must be between 1 and 20'
      });
    }

    // 3. Validate travel date (must be in the future)
    const selectedDate = new Date(travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime()) || selectedDate <= today) {
      return res.status(400).json({
        success: false,
        message: 'Travel date must be a valid upcoming date at least 24 hours in the future'
      });
    }

    // 4. Look up package in database (Authoritative Source of Truth)
    const tourPackage = await Package.findById(packageId).populate('stateId');
    if (!tourPackage || !tourPackage.isActive) {
      return res.status(404).json({
        success: false,
        message: 'The requested tour package is not currently active or found'
      });
    }

    // 5. Calculate and Snapshot Pricing strictly on the server
    const pricePerPersonSnapshot = tourPackage.pricePerPerson;
    const totalAmountSnapshot = pricePerPersonSnapshot * count;

    // 6. Generate unique booking reference
    const statePrefix = tourPackage.stateId?.name?.slice(0, 3)?.toUpperCase() || 'IND';
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingReference = `BD-${statePrefix}-${randomSuffix}`;

    // 7. Create booking record with initial 'Pending' status
    const booking = await Booking.create({
      bookingReference,
      userId: req.user ? req.user._id : null,
      packageId: tourPackage._id,
      stateId: tourPackage.stateId._id,
      travelDate: selectedDate,
      travellerCount: count,
      pricePerPersonSnapshot,
      totalAmountSnapshot,
      leadTravellerName,
      leadTravellerEmail,
      leadTravellerPhone,
      specialRequests: specialRequests || '',
      bookingStatus: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Booking enquiry submitted successfully. Status is Pending review.',
      data: booking
    });
  } catch (error) {
    console.error('Booking Creation Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating booking enquiry'
    });
  }
};

// @desc    Get bookings for logged in user (My Trips)
// @route   GET /api/bookings/my-trips
// @access  Protected (User)
export const getMyTrips = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user._id;

    // Search by userId or email to ensure historical continuity
    const bookings = await Booking.find({
      $or: [{ userId }, { leadTravellerEmail: userEmail }]
    })
      .populate('packageId', 'packageName code durationDays durationNights coverImage')
      .populate('stateId', 'name slug capital heroImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single booking by reference code
// @route   GET /api/bookings/:reference
// @access  Public / Protected
export const getBookingByRef = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingReference: req.params.reference.toUpperCase()
    })
      .populate('packageId')
      .populate('stateId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking reference not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

import Booking from '../models/Booking.js';
import User from '../models/User.js';
import State from '../models/State.js';
import Package from '../models/Package.js';

// @desc    Get Admin Dashboard metrics
// @route   GET /api/admin/dashboard
// @access  Protected (Admin)
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStates = await State.countDocuments();
    const totalPackages = await Package.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ bookingStatus: 'Pending' });
    const confirmedBookings = await Booking.countDocuments({ bookingStatus: 'Confirmed' });
    const completedBookings = await Booking.countDocuments({ bookingStatus: 'Completed' });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStates,
        totalPackages,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all booking enquiries across all users
// @route   GET /api/admin/bookings
// @access  Protected (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.bookingStatus = status;
    }

    const bookings = await Booking.find(query)
      .populate('packageId', 'packageName code durationDays')
      .populate('stateId', 'name slug')
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

// @desc    Update booking enquiry status
// @route   PATCH /api/admin/bookings/:id/status
// @access  Protected (Admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking enquiry record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Enquiry status updated to ${status}`,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get list of registered users
// @route   GET /api/admin/users
// @access  Protected (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

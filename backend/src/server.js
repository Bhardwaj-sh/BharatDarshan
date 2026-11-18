import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Booking from './models/Booking.js';
import State from './models/State.js';
import Package from './models/Package.js';

const PORT = process.env.PORT || 5000;

// Secure Administrator Provisioning Engine
const ensureAdminUser = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin123@gmail.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin@123';

    let admin = await User.findOne({ email: adminEmail }).select('+passwordHash');
    if (!admin) {
      const passwordHash = await User.hashPassword(adminPassword);
      admin = await User.create({
        name: 'Bharat Darshan Admin',
        email: adminEmail,
        passwordHash,
        role: 'admin',
        phone: '+91 9876543210',
        status: 'active'
      });
      console.log(`[Security] Admin account provisioned: ${adminEmail}`);
    } else {
      let needsSave = false;
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        needsSave = true;
      }
      const match = await admin.comparePassword(adminPassword);
      if (!match) {
        admin.passwordHash = await User.hashPassword(adminPassword);
        needsSave = true;
      }
      if (needsSave) {
        await admin.save();
        console.log(`[Security] Admin credentials verified & updated: ${adminEmail}`);
      }
    }
  } catch (err) {
    console.warn('[Security] Could not provision admin account:', err.message);
  }
};

// Seed Initial Customer Tour Requests for Admin Visibility
const ensureSeedBookings = async () => {
  try {
    const pendingCount = await Booking.countDocuments({ bookingStatus: 'Pending' });
    if (pendingCount === 0) {
      const rajState = await State.findOne({ slug: 'rajasthan' });
      const rajPkg = rajState ? await Package.findOne({ stateId: rajState._id }) : null;
      if (rajState && rajPkg) {
        await Booking.findOneAndUpdate(
          { bookingReference: 'BD-RAJ-10824' },
          {
            bookingReference: 'BD-RAJ-10824',
            packageId: rajPkg._id,
            stateId: rajState._id,
            travelDate: new Date(Date.now() + 86400000 * 14),
            travellerCount: 2,
            pricePerPersonSnapshot: 34500,
            totalAmountSnapshot: 69000,
            leadTravellerName: 'Aarav Sharma',
            leadTravellerEmail: 'aarav@example.com',
            leadTravellerPhone: '+91 98765 01234',
            specialRequests: 'Heritage haveli with private balcony overlooking Maota Lake; vegetarian meals.',
            bookingStatus: 'Pending'
          },
          { upsert: true, new: true }
        );
        console.log('[Seed] Verified seed pending enquiry: BD-RAJ-10824');
      }

      const kerState = await State.findOne({ slug: 'kerala' });
      const kerPkg = kerState ? await Package.findOne({ stateId: kerState._id }) : null;
      if (kerState && kerPkg) {
        await Booking.findOneAndUpdate(
          { bookingReference: 'BD-KER-96297' },
          {
            bookingReference: 'BD-KER-96297',
            packageId: kerPkg._id,
            stateId: kerState._id,
            travelDate: new Date(Date.now() + 86400000 * 25),
            travellerCount: 4,
            pricePerPersonSnapshot: 28900,
            totalAmountSnapshot: 115600,
            leadTravellerName: 'Meera Nambiar',
            leadTravellerEmail: 'meera.n@example.com',
            leadTravellerPhone: '+91 98451 22334',
            specialRequests: 'Houseboat stay in Alleppey backwaters; airport pick-up in Kochi.',
            bookingStatus: 'Confirmed'
          },
          { upsert: true, new: true }
        );
        console.log('[Seed] Verified seed confirmed enquiry: BD-KER-96297');
      }
    }
  } catch (err) {
    console.warn('[Seed] Notice ensuring seed bookings:', err.message);
  }
};

// Connect to Database first, then listen
const startServer = async () => {
  try {
    await connectDB();
    await ensureAdminUser();
    await ensureSeedBookings();

    const server = app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 Bharat Darshan Server running on port ${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`===============================================`);
    });

    // Graceful Shutdown Handler
    const handleShutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Gracefully shutting down Bharat Darshan API server...`);
      server.close(async () => {
        console.log('HTTP connection pool closed.');
        try {
          await mongoose.connection.close(false);
          console.log('MongoDB Atlas connection cleanly closed.');
          process.exit(0);
        } catch (err) {
          console.error('Error during database disconnect:', err);
          process.exit(1);
        }
      });

      // Force shutdown if cleanup takes longer than 10 seconds
      setTimeout(() => {
        console.error('Forced shutdown due to timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// Global Process Exception Monitors
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';
import { connectDB } from './config/db.js';
import User from './models/User.js';

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

// Connect to Database first, then listen
const startServer = async () => {
  try {
    await connectDB();
    await ensureAdminUser();

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

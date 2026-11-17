import mongoose from 'mongoose';
import dns from 'dns';

// Ensure reliable SRV resolution on Windows for MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if custom DNS resolution is restricted
}

// Global Connection Lifecycle Monitors
mongoose.connection.on('connected', () => {
  console.log('📡 MongoDB connection established successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB runtime error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
});

/**
 * Connect to MongoDB Atlas or configured instance with production connection pool options
 */
export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bharat_darshan';
    
    console.log(`Connecting to MongoDB...`);
    const conn = await mongoose.connect(connUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

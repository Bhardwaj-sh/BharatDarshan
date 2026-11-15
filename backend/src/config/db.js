import mongoose from 'mongoose';

/**
 * Connect to MongoDB (Atlas or Local Instance)
 */
export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bharat_darshan';
    
    console.log(`Connecting to MongoDB...`);
    const conn = await mongoose.connect(connUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

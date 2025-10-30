const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debug: Log connection string (without password)
    const uriWithoutPassword = process.env.MONGODB_URI?.replace(/:[^:]*@/, ':****@') || 'Not set';
    console.log(`Attempting to connect to MongoDB: ${uriWithoutPassword}`);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    console.error('MongoDB URI:', process.env.MONGODB_URI?.replace(/:[^:]*@/, ':****@') || 'Not set');
    
    // Retry connection after 5 seconds
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
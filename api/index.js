// Vercel Serverless Function Handler
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connectDB = require('../config/database');
const seedServices = require('../utils/seedServices');

const authRoutes = require('../routes/auth');
const serviceRoutes = require('../routes/services');
const buildRoutes = require('../routes/builds');

const app = express();

// Initialize database connection once
let dbConnected = false;
const initializeDB = async () => {
  if (!dbConnected) {
    try {
      console.log('Initializing database...');
      await connectDB();
      await seedServices();
      dbConnected = true;
      console.log('✓ Database initialized');
    } catch (err) {
      console.error('Database initialization error:', err.message);
    }
  }
};

// Health check endpoint for Vercel
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: 'vercel-serverless'
  });
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://apex-client-side.vercel.app',
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/builds', buildRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Apex API Server',
    status: 'running',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Initialize database on first request
app.use((req, res, next) => {
  initializeDB().then(next);
});

module.exports = app;

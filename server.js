const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connectDB = require('./config/database');
const seedServices = require('./utils/seedServices');

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const buildRoutes = require('./routes/builds');

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/builds', buildRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedServices();
});
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

// Temporary Seed Logic to Fix Jaun Elia Section
const Shayri = require('./models/Shayri');
const seedDB = async () => {
  try {
    const count = await Shayri.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Please run: node seedDeterministic.js');
    } else {
      console.log(`Database verified. Total Shayris: ${count}`);
    }
  } catch (err) {
    console.error('Database Verification Error:', err.message);
  }
};
seedDB();

const app = express();

// CORS configuration for production readiness
const corsOptions = {
  origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'].filter(Boolean),
  credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/auth');
const shayriRoutes = require('./routes/shayri');
const favoritesRoutes = require('./routes/favorites');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/shayri', shayriRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/admin', adminRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Shayri Book API is running...');
});

// Admin Test Route
const { protect, isAdmin } = require('./middleware/authMiddleware');
app.get('/api/admin/test', protect, isAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin!', user: req.user });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { protect } = require('../middleware/authMiddleware');

// @desc Register new user
// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ 
    $or: [{ email }, { username }] 
  });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// @desc Auth user & get token
// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @desc Get user profile
// @route GET /api/auth/profile
router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;

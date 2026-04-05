const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { protect } = require('../middleware/authMiddleware');

// @desc Register new user
// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (userExists) {
      const field = userExists.email === email ? 'Email' : 'Username';
      return res.status(400).json({ message: `${field} already exists` });
    }

    // Set role to admin if it's the special email
    const role = (email.toLowerCase() === 'saizan@gmail.com') ? 'admin' : 'user';

    const user = await User.create({
      username,
      email,
      password,
      role
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
      res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Database error. Please try again later.' });
  }
});

// @desc Auth user & get token
// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Force admin role if it's the special email
      const role = (email.toLowerCase() === 'saizan@gmail.com') ? 'admin' : user.role;

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: role,
        token: generateToken(user._id, role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Database error. Please try again later.' });
  }
});

// @desc Delete user account
// @route DELETE /api/auth/delete
router.delete('/delete', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Admins should be protected from deletion if desired, but following user requirement to delete.
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User deleted and account permanently removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Account Deletion Error:', error.message);
    res.status(500).json({ message: 'Server error. Failed to delete account.' });
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

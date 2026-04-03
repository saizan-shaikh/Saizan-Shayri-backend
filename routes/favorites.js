const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Shayri = require('../models/Shayri');
const { protect } = require('../middleware/authMiddleware');

// @desc Add Shayri to favorites
// @route POST /api/favorites/add
router.post('/add', protect, async (req, res) => {
  const { shayriId } = req.body;

  const user = await User.findById(req.user._id);

  if (user.favorites.includes(shayriId)) {
    return res.status(400).json({ message: 'Already in favorites' });
  }

  user.favorites.push(shayriId);
  await user.save();

  res.status(201).json({ message: 'Added to favorites' });
});

// @desc Remove Shayri from favorites
// @route DELETE /api/favorites/remove/:id
router.delete('/remove/:id', protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  user.favorites = user.favorites.filter(
    (fav) => fav.toString() !== req.params.id
  );
  await user.save();

  res.json({ message: 'Removed from favorites' });
});

// @desc Get all favorite Shayri
// @route GET /api/favorites
router.get('/', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  res.json(user.favorites);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Shayri = require('../models/Shayri');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// @desc Add new Shayri (Public)
// @route POST /api/admin/shayri
router.post('/shayri', async (req, res) => {
  try {
    const { text, poet, category, language } = req.body;

    // Validation
    if (!text || !poet || !category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields (text, poet, category)' 
      });
    }

    const shayri = new Shayri({
      text,
      poet,
      category,
      language: language || 'roman'
    });

    const savedShayri = await shayri.save();

    res.status(201).json({
      success: true,
      message: 'Shayri added successfully',
      data: savedShayri
    });
  } catch (error) {
    console.error('Error adding shayri:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error: ' + error.message 
    });
  }
});

// @desc Update Shayri (Public)
// @route PUT /api/admin/shayri/:id
router.put('/shayri/:id', async (req, res) => {
  try {
    const { text, poet, category, language } = req.body;
    const shayri = await Shayri.findById(req.params.id);

    if (shayri) {
      shayri.text = text || shayri.text;
      shayri.poet = poet || shayri.poet;
      shayri.category = category || shayri.category;
      shayri.language = language || shayri.language;

      const updatedShayri = await shayri.save();
      res.json({
        success: true,
        message: 'Shayri updated successfully',
        data: updatedShayri
      });
    } else {
      res.status(404).json({ success: false, message: 'Shayri not found' });
    }
  } catch (error) {
    console.error('Error updating shayri:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @desc Delete Shayri (Public)
// @route DELETE /api/admin/shayri/:id
router.delete('/shayri/:id', async (req, res) => {
  try {
    const shayri = await Shayri.findById(req.params.id);

    if (shayri) {
      await Shayri.deleteOne({ _id: req.params.id });
      res.json({ success: true, message: 'Shayri removed successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Shayri not found' });
    }
  } catch (error) {
    console.error('Error deleting shayri:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;

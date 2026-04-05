const mongoose = require('mongoose');

const shayriSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  poet: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: 'roman',
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Shayri', shayriSchema);

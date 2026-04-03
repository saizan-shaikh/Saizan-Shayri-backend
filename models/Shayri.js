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
}, { timestamps: true });

module.exports = mongoose.model('Shayri', shayriSchema);

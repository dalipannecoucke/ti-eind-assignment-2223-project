const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

exports.favoriteSchema = favoriteSchema;
exports.Favorite = Favorite; 
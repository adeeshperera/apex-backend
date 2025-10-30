const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  selectedParts: [{
    partId: String,
    partName: String,
    price: Number,
  }],
  totalPrice: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Build', buildSchema);
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  date: { type: Date },
  imageUrl: { type: String },
  isApproved: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please add client name'],
    trim: true,
  },
  designation: {
    type: String,
    default: 'Homeowner',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  text: {
    type: String,
    required: [true, 'Please add testimonial text'],
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'approved', // Seeded/Admin added are approved by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);

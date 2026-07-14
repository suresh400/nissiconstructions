const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a service title'],
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a service category'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a service description'],
  },
  icon: {
    type: String,
    default: 'HardHat', // Name of Lucide icon
  },
  image: {
    type: String,
    required: [true, 'Please add a service image'],
  },
  benefits: [
    {
      type: String,
    },
  ],
  process: [
    {
      stepNumber: Number,
      title: String,
      description: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create slug from title before saving
ServiceSchema.pre('save', function (next) {
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);

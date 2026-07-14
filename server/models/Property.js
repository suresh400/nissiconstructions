const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a property title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  type: {
    type: String,
    required: [true, 'Please specify property type'],
    enum: ['Residential', 'Commercial', 'Land', 'Villa', 'Apartment'],
  },
  city: {
    type: String,
    required: [true, 'Please specify the city'],
    trim: true,
  },
  area: {
    type: String, // e.g. "1200 sq ft", "2400 sq ft"
    required: [true, 'Please specify area details'],
  },
  price: {
    type: Number,
    required: [true, 'Please specify the price in INR'],
  },
  images: [
    {
      type: String,
    },
  ],
  ownerName: {
    type: String,
    required: [true, 'Please add the contact name'],
  },
  ownerPhone: {
    type: String,
    required: [true, 'Please add the contact phone number'],
  },
  ownerEmail: {
    type: String,
    required: [true, 'Please add the contact email'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Property', PropertySchema);

const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() { return this.type !== 'newsletter'; },
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    required: function() { return this.type !== 'newsletter'; },
    trim: true,
  },
  date: {
    type: Date,
  },
  serviceType: {
    type: String,
    default: 'General Consultation',
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed'],
    default: 'pending',
  },
  type: {
    type: String,
    enum: ['booking', 'quote', 'callback', 'newsletter'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Consultation', ConsultationSchema);

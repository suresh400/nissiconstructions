const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Please add a department'],
  },
  location: {
    type: String,
    default: 'Visakhapatnam, India', // Default head office location
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time',
  },
  description: {
    type: String,
    required: [true, 'Please add job description'],
  },
  requirements: [
    {
      type: String,
    },
  ],
  applications: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      resumeUrl: {
        type: String,
        required: true,
      },
      coverLetter: {
        type: String,
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Career', CareerSchema);

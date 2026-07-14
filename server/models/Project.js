const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a project description'],
  },
  categories: [
    {
      type: String,
      enum: ['ongoing', 'completed', 'residential', 'commercial', 'villas', 'renovations'],
      required: true,
    },
  ],
  location: {
    type: String,
    required: [true, 'Please add a project location'],
  },
  costRange: {
    type: String,
    required: [true, 'Please add a project cost range'],
  },
  timeline: {
    type: String,
    required: [true, 'Please add a project timeline'],
  },
  images: [
    {
      type: String,
    },
  ],
  beforeAfter: {
    before: {
      type: String,
    },
    after: {
      type: String,
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);

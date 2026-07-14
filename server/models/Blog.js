const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a blog title'],
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  summary: {
    type: String,
    required: [true, 'Please add a summary description'],
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  category: {
    type: String,
    required: [true, 'Please specify category'],
    enum: ['Construction Tips', 'Real Estate News', 'Home Design', 'Architecture', 'Investment Guides'],
  },
  author: {
    type: String,
    default: 'Nissi Editorial',
  },
  image: {
    type: String,
    required: [true, 'Please add a cover image'],
  },
  readTime: {
    type: String, // e.g. "5 mins read"
    default: '4 mins read',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-generate slug before saving
BlogSchema.pre('save', function (next) {
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);

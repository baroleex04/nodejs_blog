const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String, required: true },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 600 },
  videoId: { type: String, required: true },
  level: { type: String },
  slug: { type: String, slug: "name" },
}, {
  timestamps: true,
});

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
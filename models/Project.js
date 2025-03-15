const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  summary: String,
  tech: Array, // Array of technologies
  screenshot: String,
  description: String,
});

module.exports = mongoose.model('Project', projectSchema);

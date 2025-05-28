const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  bio: String,
  skills: String,
  github: String,
  linkedin: String,
  resume: String
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);

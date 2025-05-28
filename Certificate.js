const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  title: String,
  issuer: String,
  file: String
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);

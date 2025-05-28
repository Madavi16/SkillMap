const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Define Mongoose Schema and Model
const projectSchema = new mongoose.Schema({
  student_id: Number,
  title: String,
  description: String,
  file_path: String,
});

const Project = mongoose.model('Project', projectSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (if needed)
app.use(express.static('public'));

// API endpoint to handle project uploads
app.post('/api/projects', upload.single('file'), async (req, res) => {
  try {
    const { student_id, title, description } = req.body;
    const file_path = req.file ? req.file.path : null;

    const newProject = new Project({
      student_id,
      title,
      description,
      file_path,
    });

    await newProject.save();
    res.status(200).json({ message: 'Project uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading project:', error);
    res.status(500).json({ error: 'Failed to upload project.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ override: true });

// Initialize express app
const app = express();

// Connect to Database
connectDB().then(async () => {
  // Auto-seed if database is empty
  try {
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Database appears to be empty. Automatically seeding initial luxury data...');
      const { exec } = require('child_process');
      exec('node seed.js', (err, stdout, stderr) => {
        if (err) {
          console.error('Failed to auto-seed database:', err);
        } else {
          console.log('Auto-seed completed successfully!');
          console.log(stdout);
        }
      });
    }
  } catch (seedErr) {
    console.error('Error during auto-seed check:', seedErr.message);
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Route Files
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Nissi Constructions API',
    status: 'Running',
    version: '1.0.0',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

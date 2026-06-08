const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

const app = express();

// =====================
// MIDDLEWARE
// =====================

// CORS: Allow requests from frontend
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// =====================
// MONGODB CONNECTION
// =====================

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error('MONGODB_URI not found in .env file');
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1); // Exit if database connection fails
    }
};

// Connect to MongoDB
connectDB();

// =====================
// API ROUTES
// =====================

// Project routes: GET all projects, POST new project
app.use('/api/projects', projectRoutes);

// Contact routes: POST contact message, GET all messages
app.use('/api/contact', contactRoutes);

// =====================
// HEALTH CHECK ENDPOINT
// =====================

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date()
    });
});

// =====================
// ERROR HANDLING
// =====================

// 404 - Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// =====================
// START SERVER
// =====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Static files served from /public\n`);
});

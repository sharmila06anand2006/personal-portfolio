const mongoose = require('mongoose');

// =====================
// CONTACT SCHEMA
// =====================

/**
 * Contact Schema for storing contact form submissions
 * 
 * Fields:
 * - name: Name of the person contacting
 * - email: Email address of the person
 * - subject: Subject of the message
 * - message: The actual message content
 * - createdAt: Automatically set timestamp when created
 */

const contactSchema = new mongoose.Schema(
    {
        // Name of the person
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters']
        },

        // Email address
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address'
            ]
        },

        // Subject of the message
        subject: {
            type: String,
            required: [true, 'Please provide a subject'],
            trim: true,
            maxlength: [100, 'Subject cannot be more than 100 characters']
        },

        // Message content
        message: {
            type: String,
            required: [true, 'Please provide a message'],
            trim: true,
            maxlength: [2000, 'Message cannot be more than 2000 characters']
        }
    },
    {
        // Automatically add createdAt timestamp
        timestamps: true
    }
);

// Create and export the model
module.exports = mongoose.model('Contact', contactSchema);

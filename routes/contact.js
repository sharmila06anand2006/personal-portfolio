const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// =====================
// POST - SUBMIT CONTACT FORM
// =====================
/**
 * POST /api/contact
 * Save a contact form submission to the database
 * 
 * Required fields in request body:
 * - name: Name of the person
 * - email: Email address
 * - subject: Subject of the message
 * - message: Message content
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // ===== VALIDATION =====
        // Check if all required fields are provided
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: name, email, subject, message'
            });
        }

        // ===== CREATE NEW CONTACT MESSAGE =====
        const newContact = new Contact({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim()
        });

        // Save to database
        const savedContact = await newContact.save();

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Message sent successfully. Thank you for contacting!',
            data: savedContact
        });

    } catch (error) {
        console.error('Error saving contact message:', error.message);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error saving contact message',
            error: error.message
        });
    }
});

// =====================
// GET ALL CONTACT MESSAGES
// =====================
/**
 * GET /api/contact
 * Fetch all contact messages from the database
 * Returns: Array of all contact messages sorted by creation date (newest first)
 */
router.get('/', async (req, res) => {
    try {
        // Find all contact messages and sort by creation date (newest first)
        const messages = await Contact.find().sort({ createdAt: -1 });

        // Send response
        res.json({
            success: true,
            count: messages.length,
            data: messages
        });

    } catch (error) {
        console.error('Error fetching contact messages:', error.message);

        res.status(500).json({
            success: false,
            message: 'Error fetching contact messages',
            error: error.message
        });
    }
});

module.exports = router;

// UPDATE message status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['unread', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        res.json({
            success: true,
            data: message,
            message: 'Message status updated successfully'
        });
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating message',
            error: error.message
        });
    }
});

// DELETE message by ID
router.delete('/:id', async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        res.json({
            success: true,
            message: 'Message deleted successfully',
            data: message
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting message',
            error: error.message
        });
    }
});

module.exports = router;

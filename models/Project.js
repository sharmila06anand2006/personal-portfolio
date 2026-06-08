const mongoose = require('mongoose');

// =====================
// PROJECT SCHEMA
// =====================

/**
 * Project Schema for storing portfolio projects
 * 
 * Fields:
 * - title: Name of the project
 * - description: Detailed description of the project
 * - technologies: Array of technologies used (e.g., JavaScript, React, MongoDB)
 * - githubLink: URL to the GitHub repository
 * - image: URL of the project image
 * - date: When the project was created/completed
 * - createdAt: Automatically set timestamp
 */

const projectSchema = new mongoose.Schema(
    {
        // Project title
        title: {
            type: String,
            required: [true, 'Please provide a project title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters']
        },

        // Project description
        description: {
            type: String,
            required: [true, 'Please provide a project description'],
            trim: true,
            maxlength: [1000, 'Description cannot be more than 1000 characters']
        },

        // Technologies used (Array)
        technologies: {
            type: [String],
            required: [true, 'Please specify technologies used'],
            validate: {
                validator: function(v) {
                    return Array.isArray(v) && v.length > 0;
                },
                message: 'At least one technology must be specified'
            }
        },

        // GitHub repository link
        githubLink: {
            type: String,
            required: [true, 'Please provide GitHub link'],
            trim: true,
            match: [
                /^https?:\/\/.+/,
                'Please provide a valid GitHub URL'
            ]
        },

        // Project image URL
        image: {
            type: String,
            required: [true, 'Please provide a project image URL'],
            trim: true
        },

        // Project date (when completed)
        date: {
            type: String,
            required: [true, 'Please provide project completion date']
        }
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true
    }
);

// Create and export the model
module.exports = mongoose.model('Project', projectSchema);

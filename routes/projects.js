const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// =====================
// GET ALL PROJECTS
// =====================
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ date: -1 });

        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error.message);

        res.status(500).json({
            success: false,
            message: 'Error fetching projects',
            error: error.message
        });
    }
});

// =====================
// CREATE NEW PROJECT
// =====================
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            technologies,
            githubLink,
            image,
            date
        } = req.body;

        if (
            !title ||
            !description ||
            !technologies ||
            !githubLink ||
            !image ||
            !date
        ) {
            return res.status(400).json({
                success: false,
                message:
                    'All fields are required: title, description, technologies, githubLink, image, date'
            });
        }

        const newProject = new Project({
            title,
            description,
            technologies,
            githubLink,
            image,
            date
        });

        const savedProject = await newProject.save();

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: savedProject
        });
    } catch (error) {
        console.error('Error creating project:', error.message);

        res.status(500).json({
            success: false,
            message: 'Error creating project',
            error: error.message
        });
    }
});

// =====================
// UPDATE PROJECT
// =====================
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        });
    } catch (error) {
        console.error('Error updating project:', error.message);

        res.status(500).json({
            success: false,
            message: 'Error updating project',
            error: error.message
        });
    }
});

// =====================
// DELETE PROJECT
// =====================
router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            message: 'Project deleted successfully',
            data: deletedProject
        });
    } catch (error) {
        console.error('Error deleting project:', error.message);

        res.status(500).json({
            success: false,
            message: 'Error deleting project',
            error: error.message
        });
    }
});

module.exports = router;
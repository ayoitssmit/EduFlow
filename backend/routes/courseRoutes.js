const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// @route   GET /api/courses
// @desc    Get all available courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        
        // If DB is empty, seed it automatically with mock data
        if (courses.length === 0) {
            const seedData = [
                { code: 'CS101', credits: 3, title: 'Introduction to Computer Science', desc: 'Fundamental concepts of programming and computer architecture.', prof: 'Dr. Alan Turing', time: 'MWF 10:00 AM', status: 'Available', seatsText: '45/50 Seats Available', colorClass: 'badge-indigo' },
                { code: 'CS202', credits: 4, title: 'Data Structures and Algorithms', desc: 'In-depth study of data storage mechanisms and algorithmic efficiency.', prof: 'Dr. Grace Hopper', time: 'TTh 1:00 PM', status: 'Warning', seatsText: '2/40 Seats Available', colorClass: 'badge-indigo' },
                { code: 'MATH210', credits: 3, title: 'Calculus II', desc: 'Advanced calculus covering integration techniques and infinite series.', prof: 'Prof. Leonhard', time: 'MW 2:00 PM', status: 'Full', seatsText: 'Waitlist', colorClass: 'badge-cyan' },
                { code: 'ENG301', credits: 3, title: 'Thermodynamics', desc: 'Principles of energy transfer, heat, and work relationships.', prof: 'Dr. Carnot', time: 'TTh 9:00 AM', status: 'Available', seatsText: '20/30 Seats Available', colorClass: 'badge-indigo' },
                { code: 'ART101', credits: 2, title: 'Modern Art History', desc: 'Exploration of artistic movements from the 20th century onwards.', prof: 'Prof. Kahlo', time: 'MW 1:00 PM', status: 'Available', seatsText: '15/20 Seats Available', colorClass: 'badge-cyan' }
            ];
            await Course.insertMany(seedData);
            return res.json(seedData);
        }

        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

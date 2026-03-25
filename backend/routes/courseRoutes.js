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
                { code: 'CS305', credits: 3, title: 'Operating Systems', desc: 'Principles of modern operating systems including processes, memory, and file management.', prof: 'Dr. Ken Thompson', time: 'MWF 2:00 PM', status: 'Available', seatsText: '30/35 Seats Available', colorClass: 'badge-indigo' },
                { code: 'CS410', credits: 4, title: 'Machine Learning', desc: 'Introduction to supervised, unsupervised learning models and neural networks.', prof: 'Dr. Andrew Ng', time: 'TTh 10:00 AM', status: 'Full', seatsText: 'Waitlist', colorClass: 'badge-indigo' },
                { code: 'MATH210', credits: 3, title: 'Calculus II', desc: 'Advanced calculus covering integration techniques and infinite series.', prof: 'Prof. Leonhard', time: 'MW 2:00 PM', status: 'Full', seatsText: 'Waitlist', colorClass: 'badge-cyan' },
                { code: 'MATH315', credits: 3, title: 'Linear Algebra', desc: 'Vectors, matrices, determinants, eigenvalues and their applications.', prof: 'Dr. Emmy Noether', time: 'MWF 11:00 AM', status: 'Available', seatsText: '25/30 Seats Available', colorClass: 'badge-cyan' },
                { code: 'ENG301', credits: 3, title: 'Thermodynamics', desc: 'Principles of energy transfer, heat, and work relationships.', prof: 'Dr. Carnot', time: 'TTh 9:00 AM', status: 'Available', seatsText: '20/30 Seats Available', colorClass: 'badge-indigo' },
                { code: 'ENG410', credits: 4, title: 'Digital Electronics', desc: 'Logic gates, Boolean algebra, combinational and sequential circuits.', prof: 'Dr. Claude Shannon', time: 'MW 3:00 PM', status: 'Warning', seatsText: '3/25 Seats Available', colorClass: 'badge-indigo' },
                { code: 'PHY201', credits: 3, title: 'Physics II - Electromagnetism', desc: 'Electric fields, magnetic forces, Maxwell equations, and optics.', prof: 'Prof. Faraday', time: 'TTh 11:00 AM', status: 'Available', seatsText: '18/35 Seats Available', colorClass: 'badge-cyan' },
                { code: 'ART101', credits: 2, title: 'Modern Art History', desc: 'Exploration of artistic movements from the 20th century onwards.', prof: 'Prof. Kahlo', time: 'MW 1:00 PM', status: 'Available', seatsText: '15/20 Seats Available', colorClass: 'badge-cyan' },
                { code: 'BUS201', credits: 3, title: 'Principles of Management', desc: 'Core managerial concepts, organizational structures, and leadership strategies.', prof: 'Dr. Drucker', time: 'MWF 9:00 AM', status: 'Available', seatsText: '40/50 Seats Available', colorClass: 'badge-cyan' },
                { code: 'BUS310', credits: 3, title: 'Marketing Fundamentals', desc: 'Market research, consumer behavior, branding and digital marketing strategies.', prof: 'Prof. Kotler', time: 'TTh 2:00 PM', status: 'Available', seatsText: '35/40 Seats Available', colorClass: 'badge-cyan' }
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

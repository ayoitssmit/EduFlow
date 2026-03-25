const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// @route   GET /api/courses
// @desc    Get all available courses
router.get('/courses', async (req, res) => {
    try {
        const allCourseData = [
            // Computer Science
            { code: 'CS101', credits: 3, title: 'Introduction to Computer Science', desc: 'Fundamental concepts of programming and computer architecture.', prof: 'Dr. Alan Turing', time: 'MWF 10:00 AM', status: 'Available', seatsText: '45/50 Seats Available', colorClass: 'badge-indigo' },
            { code: 'CS202', credits: 4, title: 'Data Structures and Algorithms', desc: 'In-depth study of data storage mechanisms and algorithmic efficiency.', prof: 'Dr. Grace Hopper', time: 'TTh 1:00 PM', status: 'Warning', seatsText: '2/40 Seats Available', colorClass: 'badge-indigo' },
            { code: 'CS305', credits: 3, title: 'Operating Systems', desc: 'Principles of modern OS including processes, memory, and file management.', prof: 'Dr. Ken Thompson', time: 'MWF 2:00 PM', status: 'Available', seatsText: '30/35 Seats Available', colorClass: 'badge-indigo' },
            { code: 'CS350', credits: 3, title: 'Computer Networks', desc: 'TCP/IP, routing algorithms, network security, and distributed systems basics.', prof: 'Dr. Vint Cerf', time: 'TTh 3:00 PM', status: 'Available', seatsText: '28/35 Seats Available', colorClass: 'badge-indigo' },
            { code: 'CS410', credits: 4, title: 'Machine Learning', desc: 'Supervised, unsupervised learning, neural networks and model evaluation.', prof: 'Dr. Andrew Ng', time: 'TTh 10:00 AM', status: 'Full', seatsText: 'Waitlist', colorClass: 'badge-indigo' },
            { code: 'CS450', credits: 3, title: 'Database Management Systems', desc: 'Relational models, SQL, normalization, indexing, and transactions.', prof: 'Dr. Edgar Codd', time: 'MWF 11:00 AM', status: 'Available', seatsText: '22/30 Seats Available', colorClass: 'badge-indigo' },
            // Mathematics
            { code: 'MATH210', credits: 3, title: 'Calculus II', desc: 'Integration techniques, infinite series, and parametric equations.', prof: 'Prof. Leonhard', time: 'MW 2:00 PM', status: 'Full', seatsText: 'Waitlist', colorClass: 'badge-cyan' },
            { code: 'MATH315', credits: 3, title: 'Linear Algebra', desc: 'Vectors, matrices, determinants, eigenvalues and their applications.', prof: 'Dr. Emmy Noether', time: 'MWF 11:00 AM', status: 'Available', seatsText: '25/30 Seats Available', colorClass: 'badge-cyan' },
            { code: 'MATH320', credits: 3, title: 'Discrete Mathematics', desc: 'Logic, set theory, graph theory, combinatorics and proof techniques.', prof: 'Dr. George Boole', time: 'TTh 9:00 AM', status: 'Available', seatsText: '20/25 Seats Available', colorClass: 'badge-cyan' },
            { code: 'MATH430', credits: 4, title: 'Differential Equations', desc: 'Ordinary and partial differential equations with engineering applications.', prof: 'Prof. Euler', time: 'MWF 9:00 AM', status: 'Warning', seatsText: '3/30 Seats Available', colorClass: 'badge-cyan' },
            // Engineering
            { code: 'ENG301', credits: 3, title: 'Thermodynamics', desc: 'Principles of energy transfer, heat, and work relationships.', prof: 'Dr. Carnot', time: 'TTh 9:00 AM', status: 'Available', seatsText: '20/30 Seats Available', colorClass: 'badge-indigo' },
            { code: 'ENG360', credits: 3, title: 'Signals and Systems', desc: 'Continuous and discrete signal analysis, Fourier transform.', prof: 'Dr. Nyquist', time: 'MWF 3:00 PM', status: 'Available', seatsText: '15/25 Seats Available', colorClass: 'badge-indigo' },
            { code: 'ENG410', credits: 4, title: 'Digital Electronics', desc: 'Logic gates, Boolean algebra, combinational and sequential circuits.', prof: 'Dr. Claude Shannon', time: 'MW 3:00 PM', status: 'Warning', seatsText: '3/25 Seats Available', colorClass: 'badge-indigo' },
            { code: 'ENG450', credits: 3, title: 'Embedded Systems', desc: 'Microcontrollers, real-time systems, sensor interfacing and firmware design.', prof: 'Dr. Bjarne', time: 'TTh 1:00 PM', status: 'Available', seatsText: '18/25 Seats Available', colorClass: 'badge-indigo' },
            // Physics
            { code: 'PHY201', credits: 3, title: 'Physics II - Electromagnetism', desc: 'Electric fields, magnetic forces, Maxwell equations, and optics.', prof: 'Prof. Faraday', time: 'TTh 11:00 AM', status: 'Available', seatsText: '18/35 Seats Available', colorClass: 'badge-cyan' },
            { code: 'PHY310', credits: 3, title: 'Quantum Mechanics', desc: 'Wave functions, Schrodinger equation, uncertainty principle and atomic models.', prof: 'Dr. Niels Bohr', time: 'MWF 1:00 PM', status: 'Available', seatsText: '20/30 Seats Available', colorClass: 'badge-cyan' },
            { code: 'PHY405', credits: 4, title: 'Classical Mechanics', desc: 'Lagrangian and Hamiltonian mechanics, rigid body dynamics.', prof: 'Dr. Newton', time: 'TTh 2:00 PM', status: 'Warning', seatsText: '2/20 Seats Available', colorClass: 'badge-cyan' },
            // Arts & Humanities
            { code: 'ART101', credits: 2, title: 'Modern Art History', desc: 'Exploration of artistic movements from the 20th century onwards.', prof: 'Prof. Kahlo', time: 'MW 1:00 PM', status: 'Available', seatsText: '15/20 Seats Available', colorClass: 'badge-cyan' },
            { code: 'ART210', credits: 2, title: 'Creative Writing', desc: 'Short fiction, poetry, and narrative structure for aspiring writers.', prof: 'Prof. Orwell', time: 'TTh 10:00 AM', status: 'Available', seatsText: '12/20 Seats Available', colorClass: 'badge-cyan' },
            { code: 'ART305', credits: 3, title: 'Ethics in Technology', desc: 'Philosophical frameworks for decision-making in AI, privacy, and digital society.', prof: 'Prof. Mill', time: 'MWF 10:00 AM', status: 'Available', seatsText: '35/40 Seats Available', colorClass: 'badge-cyan' },
            // Business
            { code: 'BUS201', credits: 3, title: 'Principles of Management', desc: 'Core managerial concepts, organizational structures, and leadership strategies.', prof: 'Dr. Drucker', time: 'MWF 9:00 AM', status: 'Available', seatsText: '40/50 Seats Available', colorClass: 'badge-cyan' },
            { code: 'BUS310', credits: 3, title: 'Marketing Fundamentals', desc: 'Market research, consumer behavior, branding and digital marketing strategies.', prof: 'Prof. Kotler', time: 'TTh 2:00 PM', status: 'Available', seatsText: '35/40 Seats Available', colorClass: 'badge-cyan' },
            { code: 'BUS401', credits: 3, title: 'Financial Accounting', desc: 'Principles of financial reporting, balance sheets, income statements.', prof: 'Dr. Smith', time: 'MWF 12:00 PM', status: 'Available', seatsText: '30/45 Seats Available', colorClass: 'badge-cyan' },
            { code: 'BUS450', credits: 3, title: 'Entrepreneurship & Innovation', desc: 'Startup frameworks, business model canvas, product-market fit.', prof: 'Prof. Blank', time: 'TTh 4:00 PM', status: 'Full', seatsText: 'Waitlist', colorClass: 'badge-cyan' },
        ];

        // Upsert each course by code so new ones are always added
        for (const courseData of allCourseData) {
            await Course.updateOne({ code: courseData.code }, { $set: courseData }, { upsert: true });
        }

        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

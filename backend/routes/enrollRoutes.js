const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');

// @route   GET /api/user/enrollments
// @desc    Get user's enrolled courses
// @access  Private
router.get('/user/enrollments', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('enrolledCourses');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.enrolledCourses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/user/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/user/enroll', auth, async (req, res) => {
    try {
        const { courseId } = req.body;
        
        // Find course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const user = await User.findById(req.user.id);

        // Check if already enrolled
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.json({ message: 'Successfully enrolled!', course });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/user/enroll/:courseId
// @desc    Drop a course
// @access  Private
router.delete('/user/enroll/:courseId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const courseId = req.params.courseId;

        // Remove from array
        user.enrolledCourses = user.enrolledCourses.filter(id => id.toString() !== courseId);
        await user.save();

        res.json({ message: 'Course dropped successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

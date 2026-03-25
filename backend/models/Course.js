const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    code: { type: String, required: true },
    credits: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    prof: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true }, // "Available", "Warning", "Full"
    seatsText: { type: String, required: true },
    colorClass: { type: String, required: true } // "badge-indigo" or "badge-cyan"
});

module.exports = mongoose.model('Course', CourseSchema);

/**
 * api.js - Simple utility wrapper simulating Backend interactions utilizing the Fetch API mechanics and JSON.
 * In Phase 3, this will be modified to hit the real Express.js endpoints instead of local mocks.
 */

const API_BASE_URL = ''; // Empty for Phase 2 as we simulate local requests

/**
 * Utility function to handle Fetch API standard responses.
 */
async function apiCall(endpoint, options = {}) {
    // Phase 2: Simulating network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulated responses based on endpoint route
    if (endpoint === '/api/login') {
        const payload = JSON.parse(options.body);
        if (payload.email.includes('student') && payload.password.length >= 8) {
            return { success: true, token: 'mock-jwt-token-123', user: { name: 'John Doe', email: payload.email } };
        }
        throw new Error('Invalid email or password. Hint: Email must include "student" and password >= 8 chars.');
    }

    if (endpoint === '/api/register') {
        return { success: true, message: 'Registration successful! Proceed to login.' };
    }

    if (endpoint === '/api/courses') {
        // Returning JSON array of available courses dynamically
        return [
            { id: 1, code: 'CS101', credits: 3, title: 'Introduction to Computer Science', desc: 'Fundamental concepts of programming and computer architecture.', prof: 'Dr. Alan Turing', time: 'MWF 10:00 AM', status: 'Available', seatsText: '45/50 Seats Available', colorClass: 'badge-indigo' },
            { id: 2, code: 'CS202', credits: 4, title: 'Data Structures and Algorithms', desc: 'In-depth study of data storage mechanisms and algorithmic efficiency.', prof: 'Dr. Grace Hopper', time: 'TTh 1:00 PM', status: 'Warning', seatsText: '2/40 Seats Available', colorClass: 'badge-indigo' },
            { id: 3, code: 'MATH210', credits: 3, title: 'Calculus II', desc: 'Advanced calculus covering integration techniques and infinite series.', prof: 'Prof. Leonhard', time: 'MW 2:00 PM', status: 'Full', seatsText: 'Waitlist', colorClass: 'badge-cyan' },
            { id: 4, code: 'ENG301', credits: 3, title: 'Thermodynamics', desc: 'Principles of energy transfer, heat, and work relationships.', prof: 'Dr. Carnot', time: 'TTh 9:00 AM', status: 'Available', seatsText: '20/30 Seats Available', colorClass: 'badge-indigo' },
            { id: 5, code: 'ART101', credits: 2, title: 'Modern Art History', desc: 'Exploration of artistic movements from the 20th century onwards.', prof: 'Prof. Kahlo', time: 'MW 1:00 PM', status: 'Available', seatsText: '15/20 Seats Available', colorClass: 'badge-cyan' }
        ];
    }

    throw new Error('404 Not Found');
}

// Global window object to expose Fetch methods
window.API = {
    get: (endpoint) => apiCall(endpoint, { method: 'GET' }),
    post: (endpoint, data) => apiCall(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

/**
 * api.js - Simple utility wrapper for communicating with the Node.js Express Backend.
 */

const API_BASE_URL = 'http://localhost:5000'; 

/**
 * Utility function to handle Fetch API standard responses.
 */
async function apiCall(endpoint, options = {}) {
    try {
        // Automatically inject token if available
        const token = localStorage.getItem('token');
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        // Parse the JSON data
        const data = await response.json();
        
        // Throw an error if the response isn't OK so the forms can catch it
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
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
    }),
    delete: (endpoint) => apiCall(endpoint, { method: 'DELETE' })
};

/**
 * dashboard.js - Handles dynamic fetching and DOM rendering of enrolled courses
 */

document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('enrolled-courses-tbody');
    const userNameElement = document.getElementById('dashboard-user-name');
    const userMajorElement = document.getElementById('dashboard-user-major');
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(userStr);
    
    if (userNameElement) userNameElement.textContent = user.name;
    if (userMajorElement) userMajorElement.textContent = user.major || 'Student';

    // Welcome message
    const welcomeHeader = document.getElementById('dashboard-welcome');
    if (welcomeHeader) welcomeHeader.textContent = `Welcome back, ${user.name.split(' ')[0]}!`;

    if (tbody) {
        loadEnrollments();
    }

    async function loadEnrollments() {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;"><i class="fas fa-spinner fa-spin text-primary"></i> Loading enrollments...</td></tr>`;

        try {
            const courses = await window.API.get('/api/user/enrollments');
            
            tbody.innerHTML = '';
            
            if (courses.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--text-muted);">You are not enrolled in any courses yet. <a href="courses.html" class="text-indigo">Browse Catalog</a></td></tr>`;
                
                // Update stats
                document.getElementById('stat-credits').textContent = '0';
                document.getElementById('stat-courses').textContent = '0';
                return;
            }

            let totalCredits = 0;

            courses.forEach(course => {
                totalCredits += course.credits;

                const tr = document.createElement('tr');
                tr.id = `row-${course._id}`;
                
                tr.innerHTML = `
                    <td><span class="badge ${course.colorClass}">${course.code}</span></td>
                    <td>${course.title}</td>
                    <td>${course.credits}</td>
                    <td>${course.prof}</td>
                    <td>${course.time}</td>
                    <td>
                        <button onclick="dropCourse('${course._id}')" id="drop-${course._id}" class="btn btn-outline btn-sm text-danger border-danger">
                            <i class="fas fa-times"></i> Drop
                        </button>
                    </td>
                `;

                tbody.appendChild(tr);
            });

            // Update stats
            document.getElementById('stat-credits').textContent = totalCredits;
            document.getElementById('stat-courses').textContent = courses.length;

        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--danger);"><i class="fas fa-exclamation-triangle"></i> Failed to load enrollments.</td></tr>`;
        }
    }
});

// Global drop function
window.dropCourse = async function (courseId) {
    if (!confirm('Are you sure you want to drop this course?')) return;

    const btn = document.getElementById(`drop-${courseId}`);
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }

    try {
        const response = await window.API.delete(`/api/user/enroll/${courseId}`);
        // Remove row from DOM
        const row = document.getElementById(`row-${courseId}`);
        if (row) row.remove();
        
        // Simple reload to recalculate stats
        window.location.reload();
    } catch (error) {
        alert(error.message);
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-times"></i> Drop';
        }
    }
};

window.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
};

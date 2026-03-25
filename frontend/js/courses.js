/**
 * courses.js - Handles dynamic fetching and DOM rendering of courses
 */

document.addEventListener('DOMContentLoaded', () => {
    const coursesGrid = document.getElementById('courses-grid');

    if (coursesGrid) {
        loadCourses();
    }

    async function loadCourses() {
        // Show loading state
        coursesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-spinner fa-spin fa-3x text-primary"></i>
                <p style="margin-top: 1rem; color: var(--text-muted);">Fetching available courses...</p>
            </div>
        `;

        try {
            // Use Fetch API wrapper
            const courses = await window.API.get('/api/courses');
            
            // Clear grid and render courses dynamically via DOM API
            coursesGrid.innerHTML = '';
            
            if (courses.length === 0) {
                coursesGrid.innerHTML = '<p>No courses found for the current term.</p>';
                return;
            }

            courses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course-card glass-card';
                
                // Color mapping logic
                let footerClass = 'text-success';
                let btnHtml = `<a href="login.html" class="btn btn-primary btn-sm">Log in to Enroll</a>`;
                
                // If user is logged in
                const isLoggedIn = localStorage.getItem('token') !== null;
                if (isLoggedIn) {
                    btnHtml = `<button onclick="enrollCourse('${course._id}')" class="btn btn-primary btn-sm" id="btn-${course._id}">Enroll</button>`;
                }

                if (course.status === 'Warning') footerClass = 'text-warning';
                if (course.status === 'Full') {
                    footerClass = 'text-danger';
                    if (isLoggedIn) {
                        btnHtml = `<button onclick="enrollCourse('${course._id}')" class="btn btn-outline btn-sm" id="btn-${course._id}">Waitlist</button>`;
                    } else {
                        btnHtml = `<a href="login.html" class="btn btn-outline btn-sm">Log in to Waitlist</a>`;
                    }
                }

                // Injecting HTML through DOM
                card.innerHTML = `
                    <div class="course-header">
                        <span class="course-code badge ${course.colorClass}">${course.code}</span>
                        <span class="course-credits">${course.credits} Credits</span>
                    </div>
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-desc">${course.desc}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-user-tie"></i> ${course.prof}</span>
                        <span><i class="fas fa-clock"></i> ${course.time}</span>
                    </div>
                    <div class="course-footer">
                        <span class="seats ${footerClass}">${course.seatsText}</span>
                        ${btnHtml}
                    </div>
                `;

                coursesGrid.appendChild(card);
            });

        } catch (error) {
            coursesGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--danger);">
                    <i class="fas fa-exclamation-triangle fa-2x"></i>
                    <p>Failed to load courses. Please try again later.</p>
                </div>
            `;
        }
    }
});

// Global function since it's called from inline HTML
window.enrollCourse = async function (courseId) {
    const btn = document.getElementById(`btn-${courseId}`);
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }

    try {
        const response = await window.API.post('/api/user/enroll', { courseId });
        alert(response.message);
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Enrolled';
            btn.classList.add('bg-success');
        }
    } catch (error) {
        alert(error.message);
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Enroll';
        }
    }
};

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
                let btnHtml = `<a href="login.html" class="btn btn-primary btn-sm">Enroll</a>`;
                
                if (course.status === 'Warning') footerClass = 'text-warning';
                if (course.status === 'Full') {
                    footerClass = 'text-danger';
                    btnHtml = `<a href="login.html" class="btn btn-outline btn-sm">Join Waitlist</a>`;
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

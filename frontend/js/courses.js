/**
 * courses.js - Handles dynamic fetching, filtering, and DOM rendering of courses
 */

let allCourses = []; // Store for filtering

document.addEventListener('DOMContentLoaded', () => {
    const coursesGrid = document.getElementById('courses-grid');
    const isLoggedIn = localStorage.getItem('token') !== null;

    // Update Navbar based on login state
    const navList = document.getElementById('nav-list-courses');
    if (navList) {
        const authItems = isLoggedIn
            ? `<li class="nav-item"><a href="dashboard.html" class="btn btn-outline">My Dashboard</a></li>
               <li class="nav-item"><button onclick="logoutCourses()" class="btn btn-primary" style="cursor:pointer;">Log Out</button></li>`
            : `<li class="nav-item"><a href="login.html" class="btn btn-outline">Log In</a></li>
               <li class="nav-item"><a href="register.html" class="btn btn-primary">Register</a></li>`;
        navList.insertAdjacentHTML('beforeend', authItems);
    }

    if (coursesGrid) {
        loadCourses();
    }

    // Live filter wiring
    const filterSearch = document.getElementById('filter-search');
    const filterDept = document.getElementById('filter-dept');
    const filterStatus = document.getElementById('filter-status');
    const filterCredits = document.getElementById('filter-credits');
    const resetBtn = document.getElementById('reset-filters');

    [filterSearch, filterDept, filterStatus, filterCredits].forEach(el => {
        if (el) el.addEventListener('input', applyFilters);
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (filterSearch) filterSearch.value = '';
            if (filterDept) filterDept.value = '';
            if (filterStatus) filterStatus.value = '';
            if (filterCredits) filterCredits.value = '';
            applyFilters();
        });
    }

    function applyFilters() {
        const search = (filterSearch?.value || '').toLowerCase();
        const dept = (filterDept?.value || '').toLowerCase();
        const status = (filterStatus?.value || '');
        const credits = filterCredits?.value || '';

        const filtered = allCourses.filter(course => {
            const matchSearch = !search || course.title.toLowerCase().includes(search) || course.code.toLowerCase().includes(search);
            const matchDept = !dept || course.code.toLowerCase().startsWith(dept.substring(0, 2));
            const matchStatus = !status || course.status === status;
            const matchCredits = !credits || String(course.credits) === credits;
            return matchSearch && matchDept && matchStatus && matchCredits;
        });

        renderCourses(filtered);
        const countEl = document.getElementById('filter-count');
        if (countEl) countEl.textContent = `${filtered.length} course${filtered.length !== 1 ? 's' : ''} found`;
    }

    async function loadCourses() {
        coursesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-spinner fa-spin fa-3x" style="color:var(--primary)"></i>
                <p style="margin-top: 1rem; color: var(--text-muted);">Fetching available courses...</p>
            </div>
        `;

        try {
            const courses = await window.API.get('/api/courses');
            allCourses = courses;

            const countEl = document.getElementById('filter-count');
            if (countEl) countEl.textContent = `${courses.length} courses found`;

            if (courses.length === 0) {
                coursesGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center;">No courses found for the current term.</p>';
                return;
            }

            renderCourses(courses);
        } catch (error) {
            coursesGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--danger);">
                    <i class="fas fa-exclamation-triangle fa-2x"></i>
                    <p>Failed to load courses. Is the backend running?</p>
                </div>
            `;
        }
    }

    function renderCourses(courses) {
        coursesGrid.innerHTML = '';

        if (courses.length === 0) {
            coursesGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:2rem;">No courses match your filters.</p>`;
            return;
        }

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card glass-card';

            let footerClass = 'text-success';
            let btnHtml = isLoggedIn
                ? `<button onclick="enrollCourse('${course._id}', this)" class="btn btn-primary btn-sm" id="btn-${course._id}">Enroll</button>`
                : `<a href="login.html" class="btn btn-primary btn-sm">Log in to Enroll</a>`;

            if (course.status === 'Warning') footerClass = 'text-warning';
            if (course.status === 'Full') {
                footerClass = 'text-danger';
                btnHtml = isLoggedIn
                    ? `<button onclick="enrollCourse('${course._id}', this)" class="btn btn-outline btn-sm" id="btn-${course._id}">Waitlist</button>`
                    : `<a href="login.html" class="btn btn-outline btn-sm">Log in to Waitlist</a>`;
            }

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
    }
});

window.logoutCourses = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
};

window.enrollCourse = async function (courseId, btn) {
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
    try {
        const response = await window.API.post('/api/user/enroll', { courseId });
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Enrolled';
            btn.style.backgroundColor = 'var(--success)';
            btn.style.borderColor = 'var(--success)';
            btn.style.color = 'white';
        }
    } catch (error) {
        alert(error.message);
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Enroll';
        }
    }
};

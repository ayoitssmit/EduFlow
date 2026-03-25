/**
 * auth.js - Handles DOM interactions for Registration and Login Forms.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Utility to show messages
    const showMessage = (msg, type, container) => {
        let msgBox = document.getElementById('form-messages');
        if (!msgBox) {
            msgBox = document.createElement('div');
            msgBox.id = 'form-messages';
            msgBox.style.padding = '10px';
            msgBox.style.borderRadius = '5px';
            msgBox.style.marginBottom = '1rem';
            msgBox.style.textAlign = 'center';
            msgBox.style.fontWeight = '500';
            container.insertBefore(msgBox, container.firstChild);
        }
        msgBox.textContent = msg;
        msgBox.style.backgroundColor = type === 'error' ? 'var(--danger-light)' : 'var(--success-light)';
        msgBox.style.color = type === 'error' ? 'var(--danger)' : 'var(--success)';
        
        // Auto remove message after 5 seconds
        setTimeout(() => {
            if (msgBox) msgBox.remove();
        }, 5000);
    };

    // --- Login Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent standard POST
            
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            const btn = loginForm.querySelector('button[type="submit"]');

            // DOM Validation
            if (!email.includes('@')) {
                showMessage('Please enter a valid email address.', 'error', loginForm);
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';

            try {
                // Fetch API exchange
                const response = await window.API.post('/api/login', { email, password });
                
                if (response.success) {
                    showMessage('Login Success! Redirecting...', 'success', loginForm);
                    // Simulate redirect
                    setTimeout(() => window.location.href = 'dashboard.html', 1500);
                }
            } catch (error) {
                showMessage(error.message, 'error', loginForm);
                btn.disabled = false;
                btn.innerHTML = 'Log In';
            }
        });
    }

    // --- Registration Logic ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent standard POST

            const firstName = registerForm.firstName.value;
            const lastName = registerForm.lastName.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;
            const btn = registerForm.querySelector('button[type="submit"]');

            // DOM Validation
            if (password !== confirmPassword) {
                showMessage('Passwords do not match.', 'error', registerForm);
                return;
            }
            if (password.length < 8) {
                showMessage('Password must be at least 8 characters long.', 'error', registerForm);
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';

            try {
                // Fetch API exchange
                const response = await window.API.post('/api/register', { firstName, lastName, email, password });
                if (response.success) {
                    showMessage(response.message, 'success', registerForm);
                    registerForm.reset();
                    // Simulate redirect
                    setTimeout(() => window.location.href = 'login.html', 2000);
                }
            } catch (error) {
                showMessage('Registration failed.', 'error', registerForm);
                btn.disabled = false;
                btn.innerHTML = 'Register';
            }
        });
    }
});

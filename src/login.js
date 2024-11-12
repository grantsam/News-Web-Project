// Sample user data - in real application, this would be handled by backend
const sampleUsers = [
    {
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User'
    },
    {
        email: 'user@example.com',
        password: 'user123',
        role: 'user',
        name: 'Regular User'
    }
];

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate password
function validatePassword(password) {
    return password.length >= 6; // Minimum 6 characters
}

// Function to show alerts
function showAlert(message, type = 'danger') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-5`;
    alertDiv.role = 'alert';
    alertDiv.style.zIndex = '1050';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    console.log('Login attempt'); // Debug log

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate inputs
    if (!email || !password) {
        showAlert('Please fill in all fields');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address');
        return;
    }

    if (!validatePassword(password)) {
        showAlert('Password must be at least 6 characters long');
        return;
    }

    // Check credentials
    const user = sampleUsers.find(u => u.email === email && u.password === password);

    if (user) {
        // Store user info (but not password)
        const userInfo = {
            email: user.email,
            role: user.role,
            name: user.name
        };

        // Store in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(userInfo));

        // If remember me is checked, store email in local storage
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        showAlert('Login successful! Redirecting...', 'success');

        // Redirect after short delay using window.location.replace
        setTimeout(() => {
            try {
                window.location.replace('/src/index.html');
            } catch (error) {
                console.error('Redirect error:', error);
                // Fallback redirect
                window.location.href = '/src/login.html';
            }
        }, 1500);
    } else {
        showAlert('Invalid email or password');
    }
}

// Function to handle forgot password
function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    if (!email) {
        showAlert('Please enter your email address');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address');
        return;
    }

    showAlert('Password reset link has been sent to your email', 'success');
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded'); // Debug log

    // Check if user is already logged in
    const loggedInUser = sessionStorage.getItem('currentUser');
    if (loggedInUser) {
        window.location.href = 'index.html';
    }

    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }

    // Add form submit event listener
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log('Login form found'); // Debug log
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.error('Login form not found'); // Debug log
    }

    // Add forgot password link event listener
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
    }

    // Real-time validation
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailInput?.addEventListener('input', function () {
        if (this.value && !validateEmail(this.value)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });

    passwordInput?.addEventListener('input', function () {
        if (this.value && !validatePassword(this.value)) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }
    });
});

// Efek fade out saat tautan di halaman diklik
document.body.addEventListener('click', (event) => {
    const target = event.target;
    const linkTarget = target.closest('a'); // Cari tautan terdekat jika ada

    if (linkTarget && linkTarget.getAttribute('href')) {
        event.preventDefault(); // Mencegah navigasi langsung

        document.body.classList.add('fade-out'); // Mulai efek fade out
        
        // Navigasi ke tautan setelah efek transisi
        setTimeout(() => {
            window.location.href = linkTarget.getAttribute('href');
        }, 500); // Sesuaikan durasi dengan `transition` CSS
    }
});

// Handle search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('form.d-flex');
    const searchInput = searchForm.querySelector('input[type="search"]');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Here you would typically make an API call or redirect to search results
            console.log(`Searching for: ${searchTerm}`);
        }
    });
});

// Handle newsletter subscription
const newsletterForm = document.querySelector('.footer .input-group');
const emailInput = newsletterForm.querySelector('input[type="email"]');
const subscribeButton = newsletterForm.querySelector('button');

subscribeButton.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (validateEmail(email)) {
        subscribeNewsletter(email);
    } else {
        showNotification('Please enter a valid email address', 'error');
    }
});

// Email validation helper
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Newsletter subscription handler
function subscribeNewsletter(email) {
    // Here you would typically make an API call to subscribe the user
    console.log(`Subscribing email: ${email}`);
    showNotification('Thank you for subscribing!', 'success');
    emailInput.value = '';
}

// Notification system
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: '1000',
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
        color: 'white',
        opacity: '0',
        transition: 'opacity 0.3s ease-in'
    });
    
    // Show and hide notification
    setTimeout(() => notification.style.opacity = '1', 100);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle trending topics hover effects
const trendingItems = document.querySelectorAll('.hastag');
trendingItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
}); 

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = "↑";
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.style.position = 'fixed';
scrollToTopBtn.style.bottom = '20px';
scrollToTopBtn.style.right = '20px';
scrollToTopBtn.style.display = 'none';
scrollToTopBtn.style.padding = '10px';
scrollToTopBtn.style.border = 'none';
scrollToTopBtn.style.borderRadius = '5px';
scrollToTopBtn.style.backgroundColor = '#0d6efd';
scrollToTopBtn.style.color = '#fff';
scrollToTopBtn.style.cursor = 'pointer';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fungsi untuk menangani fade in saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Reset classes
    document.body.classList.remove('fade-out');
    
    // Tambahkan class fade-in ke body
    setTimeout(() => {
        document.body.classList.add('fade-in');
    }, 100);

    // Animate containers
    setTimeout(() => {
        document.querySelectorAll('.container, .footer, .container-main, .container-side').forEach(el => {
            el.classList.add('visible');
        });
    }, 300);

    // Animate sitemap items dengan delay bertahap
    document.querySelectorAll('.news-card, .news-image, .side-bar-news, .popular-news, .popular-item-sidebar, .side-bar-item, .news-image-sidebar, .login-card, .login-title, #loginForm').forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, 500 + (index * 100));
    });
});

// Modifikasi event listener untuk link clicks
document.body.addEventListener('click', (event) => {
    const target = event.target;
    const linkTarget = target.closest('a');

    if (linkTarget && linkTarget.getAttribute('href')) {
        event.preventDefault();
        
        // Fade out effect
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');

        // Fade out containers dengan arah yang sama
        document.querySelectorAll('.container, .footer, .container-main, .container-side').forEach(el => {
            el.style.transform = 'translateY(20px)';
            el.style.opacity = '0';
        });

        // Fade out sitemap items dengan delay bertahap
        document.querySelectorAll('.news-card, .news-image, .side-bar-news, .popular-news, .popular-item-sidebar, .side-bar-item, .news-image-sidebar, .login-card, .login-title, #loginForm').forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('visible');
            }, index * 50);
        });

        // Navigate setelah animasi selesai
        setTimeout(() => {
            window.location.href = linkTarget.getAttribute('href');
        }, 800);
    }
});

// Handle browser back button
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Reset semua classes
        document.body.classList.remove('fade-out');
        
        // Mulai animasi fade in
        setTimeout(() => {
            document.body.classList.add('fade-in');
            document.querySelectorAll('.container, .footer').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    }
});

// Tambahkan class fade-out saat unload
window.addEventListener('beforeunload', () => {
    document.body.classList.add('fade-out');
});

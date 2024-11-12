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
        document.querySelectorAll('.container, .footer').forEach(el => {
            el.classList.add('visible');
        });
    }, 300);

    // Animate sitemap items dengan delay bertahap
    document.querySelectorAll('.container-sitemap .popular-item').forEach((item, index) => {
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
        document.querySelectorAll('.container, .footer').forEach(el => {
            el.style.transform = 'translateY(20px)';
            el.style.opacity = '0';
        });

        // Fade out sitemap items dengan delay bertahap
        document.querySelectorAll('.container-sitemap .popular-item').forEach((item, index) => {
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


// Modifikasi event listener untuk link clicks
document.body.addEventListener('click', (event) => {
    const target = event.target;
    const linkTarget = target.closest('a');

    if (linkTarget && linkTarget.getAttribute('href')) {
        event.preventDefault();

        // Tambahkan fade-out class ke body
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');

        // Fade out containers
        document.querySelectorAll('.container, .footer').forEach(el => {
            el.classList.remove('visible');
        });

        // Navigate setelah animasi selesai
        setTimeout(() => {
            window.location.href = linkTarget.getAttribute('href');
        }, 800); // Sesuaikan dengan durasi transisi
    }
});

// Handle browser back button
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Halaman di-cache, tambahkan fade-in
        document.body.classList.remove('fade-out');
        setTimeout(() => {
            document.body.classList.add('fade-in');
        }, 100);
    }
});

// Tambahkan class fade-out saat unload
window.addEventListener('beforeunload', () => {
    document.body.classList.add('fade-out');
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
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
        document.querySelectorAll('.container, .footer, .col-lg-8,.col-lg-4').forEach(el => {
            el.classList.add('visible');
        });
    }, 300);

    // Animate sitemap items dengan delay bertahap
    document.querySelectorAll('.news-title,.news-image,.carousel.slide,.carousel-item,.popular-news,.side-bar-news,.trend,.news-card-sub,.caros').forEach((item, index) => {
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
        document.querySelectorAll('.container, .footer, .col-lg-8,.col-lg-4').forEach(el => {
            el.style.transform = 'translateY(20px)';
            el.style.opacity = '0';
        });

        // Fade out sitemap items dengan delay bertahap
        document.querySelectorAll('.news-title,.news-image,.carousel.slide,.carousel-item,.popular-news,.side-bar-news,.trend,.news-card-sub,.caros').forEach((item, index) => {
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

// Carousel Auto-Slide with Animation
const carouselElement = document.querySelector('#newsCarousel');
const carouselInstance = new bootstrap.Carousel(carouselElement, {
    interval: false // Disable automatic cycling by Bootstrap
});

// Function to automatically slide to the next item
function nextSlide() {
    carouselInstance.next(); // Use Bootstrap's next method to go to the next slide
}

// Auto slide every 3 seconds
setInterval(nextSlide, 3000);

// Initial display of the first slide
carouselInstance.to(0); // Set the initial slide to the first one


// Efek fade in saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('fade-out'); // Pastikan halaman tampil penuh saat dimuat
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



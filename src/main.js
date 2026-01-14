import './style.css'

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.skill-category, .project-card, .service-item, .about-text').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    el.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
    observer.observe(el);
});

// Class to trigger animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.padding = '1.5rem 5%';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Contact Form and Popup Logic
const contactForm = document.querySelector('.contact-form');
const hiddenIframe = document.querySelector('#hidden_iframe');
const popup = document.querySelector('#popup');
const closePopupBtn = document.querySelector('#close-popup');

let submitted = false;

if (contactForm) {
    contactForm.addEventListener('submit', () => {
        submitted = true;
    });
}

if (hiddenIframe) {
    hiddenIframe.addEventListener('load', () => {
        if (submitted) {
            popup.classList.add('show');
            if (contactForm) contactForm.reset();
            submitted = false;
        }
    });
}

if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
        popup.classList.remove('show');
    });
}

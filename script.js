/* ============================================
   ANTI-GRAVITY SPACE EXPLORATION - JAVASCRIPT
   SkillCraft Internship Task 01
   ============================================ */

// Wait for the page to fully load before running scripts
document.addEventListener('DOMContentLoaded', function () {

    // ---------- Get DOM elements ----------
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');

    // ---------- 1. Navbar scroll effect ----------
    // Adds a dark glassmorphism background when user scrolls down
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleNavbarScroll);

    // Run once on page load in case page is refreshed mid-scroll
    handleNavbarScroll();


    // ---------- 2. Active navigation link highlighting ----------
    // Highlights the nav link that matches the section currently in view
    function highlightActiveLink() {
        let currentSection = '';

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            // Check if scroll position is within this section
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active class on nav links
        navLinks.forEach(function (link) {
            link.classList.remove('active');

            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);


    // ---------- 3. Smooth scrolling for nav links ----------
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll smoothly to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu after clicking a link
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            }
        });
    });


    // ---------- 4. Mobile menu toggle ----------
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
    });


    // ---------- 5. Contact form handling ----------
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation check
        if (name && email && message) {
            // Show a success message (no backend — just a demo)
            contactForm.innerHTML = '<p class="form-success">Thank you, ' + name + '! Your message has been sent. We will get back to you soon.</p>';
        }
    });


    // ---------- 6. Fade-in animation on scroll ----------
    // Adds a subtle reveal effect as sections come into view
    const observerOptions = {
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply initial hidden state and observe each section
    sections.forEach(function (section) {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(section);
        }
    });

});

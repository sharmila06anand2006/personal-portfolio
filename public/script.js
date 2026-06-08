// =====================================================
// PERSONAL PORTFOLIO - BACKEND INTEGRATION SCRIPT
// =====================================================

// API Base URL - Change this if your backend is on a different server
const API_BASE_URL = 'http://localhost:5000/api';

// =====================================================
// 1. LOAD PROJECTS FROM DATABASE
// =====================================================

/**
 * Fetch all projects from the backend API and display them
 * GET /api/projects
 */
async function loadProjectsFromDB() {
    try {
        console.log('📥 Fetching projects from database...');
        
        // Fetch all projects from API
        const response = await fetch(`${API_BASE_URL}/projects`);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();

        console.log('✅ Projects loaded:', data.count, 'projects found');

        // Display projects on the page
        if (data.success && data.data && data.data.length > 0) {
            displayProjects(data.data);
        } else {
            console.warn('⚠️ No projects found in database');
        }

    } catch (error) {
        console.error('❌ Error loading projects:', error);
    }
}

/**
 * Display projects in the projects grid
 * @param {Array} projects - Array of project objects from database
 */
function displayProjects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.warn('⚠️ .projects-grid element not found');
        return;
    }

    // Clear existing projects
    projectsGrid.innerHTML = '';

    // Create HTML for each project
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Build technologies string
        const techTags = project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        // Build project HTML
        projectCard.innerHTML = `
            <div class="project-image">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : '<i class="fas fa-project-diagram"></i>'}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                ${project.githubLink ? `
                    <div style="margin-top: 1rem;">
                        <a href="${project.githubLink}" target="_blank" class="btn btn-secondary" style="display: inline-block;">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                    </div>
                ` : ''}
                ${project.date ? `<small style="display: block; margin-top: 0.5rem; color: #666;">Date: ${project.date}</small>` : ''}
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });

    console.log('✅ Projects displayed successfully');
}

// =====================================================
// 2. CONTACT FORM SUBMISSION
// =====================================================

/**
 * Initialize contact form submission handler
 * POST /api/contact
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
        console.warn('⚠️ Contact form not found (ID: contactForm)');
        return;
    }

    // Add submit event listener
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // ===== GET FORM DATA =====
        const formData = new FormData(contactForm);
        
        const name = formData.get('name')?.trim() || 
                     document.querySelector('input[placeholder*="Name"]')?.value.trim();
        const email = formData.get('email')?.trim() || 
                      document.querySelector('input[placeholder*="Email"]')?.value.trim();
        const subject = formData.get('subject')?.trim() || 
                        document.querySelector('input[placeholder*="Subject"]')?.value.trim();
        const message = formData.get('message')?.trim() || 
                        document.querySelector('textarea')?.value.trim();

        // ===== VALIDATE FORM =====
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // ===== PREPARE FOR SUBMISSION =====
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Sending...';

        // ===== SUBMIT TO BACKEND =====
        try {
            console.log('📤 Sending contact message...');

            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                })
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Message sent successfully');
                showMessage('✅ Thank you! Your message has been sent successfully. I will get back to you soon!', 'success');
                contactForm.reset();
            } else {
                console.error('❌ Server error:', data.message);
                showMessage('❌ Error: ' + (data.message || 'Failed to send message'), 'error');
            }

        } catch (error) {
            console.error('❌ Error sending message:', error);
            showMessage('❌ Error sending message. Please try again or contact me directly.', 'error');

        } finally {
            // ===== RESTORE BUTTON =====
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    console.log('✅ Contact form initialized');
}

/**
 * Show success/error messages to user
 * @param {string} message - Message text to display
 * @param {string} type - 'success' or 'error'
 */
function showMessage(message, type = 'success') {
    // Remove existing message if any
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = `form-message form-message-${type}`;
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
    `;

    // Insert message after form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.parentElement.insertBefore(msgDiv, contactForm.nextSibling);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        msgDiv.remove();
    }, 5000);
}

// =====================================================
// 3. TYPING ANIMATION
// =====================================================

const typingTexts = [
    "Electronics & Communication Engineer",
    "IoT Developer",
    "AI/ML Enthusiast",
    "Java Programmer",
    "Embedded Systems Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent = currentText.substring(0, charIndex);

    let nextTimeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        nextTimeout = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        nextTimeout = 500;
    }

    setTimeout(type, nextTimeout);
}

// =====================================================
// 4. SMOOTH SCROLLING & NAVIGATION
// =====================================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Add smooth scroll behavior to nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// =====================================================
// 5. MOBILE MENU TOGGLE
// =====================================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// =====================================================
// 6. SCROLL TO TOP BUTTON
// =====================================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =====================================================
// 7. INTERSECTION OBSERVER FOR ANIMATIONS
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.project-card, .achievement-card, .cert-card, .skill-category, .timeline-item, .internship-card').forEach(el => {
    observer.observe(el);
});

// =====================================================
// 8. PARALLAX EFFECT
// =====================================================

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        heroSection.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

// =====================================================
// 9. BUTTON PROCESSING STATE
// =====================================================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('processing')) {
            e.preventDefault();
            return;
        }
        this.classList.add('processing');
        setTimeout(() => this.classList.remove('processing'), 1000);
    });
});

// =====================================================
// 10. INITIALIZATION ON PAGE LOAD
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Personal Portfolio...');

    // Start typing animation
    type();

    // Load projects from database
    loadProjectsFromDB();

    // Initialize contact form
    initializeContactForm();

    console.log('✅ Portfolio initialized successfully');
});
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Add active state persistence
window.addEventListener('load', () => {
    const currentUrl = window.location.hash;
    if (currentUrl) {
        const link = document.querySelector(`a[href="${currentUrl}"]`);
        if (link) {
            link.classList.add('active');
        }
    }
});

// ==================== Dark Mode (Optional - Can be extended) ====================
// Check user's system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// ==================== Initialize ====================
console.log('Portfolio loaded successfully!');
console.log('Welcome to Sharmila A\\'s Portfolio');
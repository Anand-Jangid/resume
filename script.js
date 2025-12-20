// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }

    // Add animation effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// Smooth scroll for anchor links (if any are added)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add click-to-copy functionality for email
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.textContent.trim();

        // Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Show feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Email copied!';
            this.style.color = '#10b981';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
            // Fallback: open mailto link
            window.location.href = this.href;
        });
    });
}

// Add click-to-copy functionality for phone number
const phoneLink = document.querySelector('a[href^="tel:"]');
if (phoneLink) {
    phoneLink.addEventListener('click', function(e) {
        e.preventDefault();
        const phone = this.textContent.trim();

        // Copy to clipboard
        navigator.clipboard.writeText(phone).then(() => {
            // Show feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Phone copied!';
            this.style.color = '#10b981';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy phone:', err);
            // Fallback: open tel link
            window.location.href = this.href;
        });
    });
}

// Add keyboard navigation for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Print functionality
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i>';
    printBtn.className = 'print-button';
    printBtn.setAttribute('aria-label', 'Print resume');
    printBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 5rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        box-shadow: var(--shadow-lg);
        transition: var(--transition);
        z-index: 1000;
    `;

    printBtn.addEventListener('click', () => {
        window.print();
    });

    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--secondary-color)';
    });

    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--primary-color)';
    });

    document.body.appendChild(printBtn);
}

// Add print button on desktop
if (window.innerWidth > 768) {
    addPrintButton();
}

// Typing effect for name (optional - commented out by default)
/*
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const nameElement = document.querySelector('.name');
//     const originalText = nameElement.textContent;
//     typeEffect(nameElement, originalText, 100);
// });
*/

// Add Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        document.body.style.animation = 'rainbow 2s linear infinite';

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);

        konamiCode = [];
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console message for developers
console.log('%cHey there! 👋', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cLooking for a skilled developer? Contact me!', 'font-size: 14px; color: #6b7280;');
console.log('%cEmail: jangidme88@gmail.com', 'font-size: 12px; color: #2563eb;');
console.log('%cGitHub: github.com/Anand-Jangid', 'font-size: 12px; color: #2563eb;');

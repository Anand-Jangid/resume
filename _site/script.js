// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~`';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff9f';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

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

    // Add animation effect with glow
    themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
    themeToggle.style.boxShadow = '0 0 40px rgba(0, 255, 159, 0.8)';
    setTimeout(() => {
        themeToggle.style.transform = '';
        themeToggle.style.boxShadow = '';
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

// Contact links work normally - no preventDefault
// Email and phone links will open mail client or dialer
// External links (GitHub, LinkedIn, LeetCode) will open in new tab

// Add keyboard navigation for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Download functionality
function addDownloadButton() {
    const downloadBtn = document.createElement('button');
    downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
    downloadBtn.className = 'download-button';
    downloadBtn.setAttribute('aria-label', 'Download resume');
    downloadBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 6.5rem;
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

    downloadBtn.addEventListener('click', () => {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = 'anand_resume.pdf';
        link.download = 'anand_jangid.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    downloadBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--secondary-color)';
    });

    downloadBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--primary-color)';
    });

    document.body.appendChild(downloadBtn);
}

// Add download button on desktop
if (window.innerWidth > 768) {
    addDownloadButton();
}


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

// Console message for developers (Cyberpunk style)
const consoleStyle = {
    title: 'font-size: 24px; font-weight: bold; color: #00ff9f; text-shadow: 0 0 10px #00ff9f;',
    subtitle: 'font-size: 16px; color: #00d4ff; font-weight: 600;',
    text: 'font-size: 14px; color: #a0aec0;',
    highlight: 'font-size: 14px; color: #00ff9f; font-weight: bold;'
};

console.log('%c┌─────────────────────────────────────────┐', consoleStyle.highlight);
console.log('%c│  🚀 WELCOME TO THE MATRIX, DEVELOPER!  │', consoleStyle.title);
console.log('%c└─────────────────────────────────────────┘', consoleStyle.highlight);
console.log('%c\n💼 Anand Jangid - Full Stack Developer', consoleStyle.subtitle);
console.log('%c\n📧 Email: jangidme88@gmail.com', consoleStyle.text);
console.log('%c🐙 GitHub: github.com/Anand-Jangid', consoleStyle.text);
console.log('%c💻 Skills: Node.js | Java | Flutter | PostgreSQL', consoleStyle.text);
console.log('%c\n✨ Looking to collaborate? Let\'s build something amazing!', consoleStyle.highlight);
console.log('%c\n🎮 Easter Egg: Try the Konami Code!', consoleStyle.text);

// Cursor Particle Trail Effect
let particles = [];

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        particles.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 5 + 2,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            life: 100
        });
    }

    // Limit particles
    if (particles.length > 50) {
        particles.shift();
    }
});

function drawParticles() {
    particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life--;

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();

// Typing Effect for Terminal Text
const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
    const originalText = '$ whoami';
    typedTextElement.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            typedTextElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 500);
}

// Add glitch effect on random intervals
setInterval(() => {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement && Math.random() > 0.95) {
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = 'glitch-text 5s infinite';
        }, 10);
    }
}, 3000);

// Skill Tag Click Effect - Show Code Snippet
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        const skill = this.textContent;
        const codeSnippets = {
            'JavaScript': 'const awesome = true;',
            'Node.js': 'app.listen(3000, () => console.log("🚀"));',
            'Java': 'System.out.println("Hello, World!");',
            'PostgreSQL': 'SELECT * FROM developers WHERE skill = "awesome";',
            'Flutter': 'runApp(MyAwesomeApp());',
            'Docker': 'docker run -d -p 3000:3000 my-app',
            'Git & GitHub': 'git commit -m "feat: added coolness"'
        };

        if (codeSnippets[skill]) {
            const snippet = document.createElement('div');
            snippet.textContent = codeSnippets[skill];
            snippet.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(10, 14, 39, 0.95);
                color: #00ff9f;
                padding: 2rem;
                border-radius: 10px;
                border: 2px solid #00ff9f;
                box-shadow: 0 0 30px rgba(0, 255, 159, 0.5);
                font-family: 'Courier New', monospace;
                font-size: 1.2rem;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;
            document.body.appendChild(snippet);

            setTimeout(() => {
                snippet.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => snippet.remove(), 300);
            }, 2000);
        }
    });
});

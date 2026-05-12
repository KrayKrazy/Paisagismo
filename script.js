// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, .magnetic-btn, .magnetic-link');

document.addEventListener('mousemove', (e) => {
    // Update cursor position directly for fast response
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Smooth follow for the larger circle
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

// Magnetic Buttons and Hover States
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });
    
    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        // Reset transform if it was a magnetic button
        if(link.classList.contains('magnetic-btn')) {
            link.style.transform = '';
        }
    });

    // Magnetic pull effect
    if(link.classList.contains('magnetic-btn')) {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the button slightly towards the cursor
            link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
    }
});

// 3D Tilt Effect for Premium Cards (Vanilla JS)
const initTilt = () => {
    // Disable on mobile/touch devices
    if(window.innerWidth <= 768) return;

    const tiltElements = document.querySelectorAll('.tilt-card, .tilt-card-heavy');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const isHeavy = el.classList.contains('tilt-card-heavy');
            const intensity = isHeavy ? 15 : 7; // Max rotation degrees
            
            const rotateX = ((y - centerY) / centerY) * -intensity; 
            const rotateY = ((x - centerX) / centerX) * intensity;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Dynamic lighting/glare on the card
            const glare = el.querySelector('.card-glow');
            if(glare) {
                glare.style.transform = `translate(${x - rect.width/2}px, ${y - rect.height/2}px)`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            const glare = el.querySelector('.card-glow');
            if(glare) glare.style.transform = `translate(-50%, -50%)`;
        });
    });
};

initTilt();
window.addEventListener('resize', initTilt);

// Parallax Scroll Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero Background Parallax
    const heroBg = document.querySelector('.hero-bg img');
    if(heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
    }
    
    // Organic Blobs Parallax
    const blobs = document.querySelectorAll('.bg-blob');
    blobs.forEach((blob, index) => {
        const speed = index % 2 === 0 ? 0.15 : -0.1;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Navigation Scroll State
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

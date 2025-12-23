// HEADER SCROLL EFFECT
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// SMOOTH SCROLLING FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// REVEAL ANIMATION ON SCROLL (STAGGERED)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a small delay for staggered effect if multiple items are intersecting
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// TARGET ELEMENTS FOR REVEAL
document.querySelectorAll('.section, .skill-card, .contact-card, .container h2').forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
});

// ADD REVEAL STYLES DYNAMICALLY
const style = document.createElement('style');
style.innerHTML = `
    .reveal-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// MOUSE MOVE EFFECT FOR HERO IMAGE (3D TILT)
const heroImage = document.querySelector('.main-png');
if (heroImage) {
    const container = document.querySelector('.hero-image');
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        heroImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    container.addEventListener('mouseleave', () => {
        heroImage.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
}

// LOGO CLICK SCROLL TO TOP
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

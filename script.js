/* ==========================================
   VENKATESWARLU KAMBHAMPATI PORTFOLIO — script.js
   Custom cursor, animations, interactions
========================================== */

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth trail with RAF
function animateTrail() {
  trailX += (mouseX - trailX) * 0.32;
  trailY += (mouseY - trailY) * 0.32;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Click effect
document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));

// Hover: interactive elements
const hoverTargets = [
  'a', 'button', '.skill-card', '.project-card', '.stat-card',
  '.contact-item', '.nav-link', '.btn', '.edu-card', '.highlight-item'
].join(', ');

document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    cursorTrail.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    cursorTrail.classList.remove('hovering');
  });
});

// ---- Glowing Background on skill card hover ----
const glowEl = document.createElement('div');
glowEl.className = 'glow-hover-effect';
document.body.appendChild(glowEl);

document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    glowEl.style.opacity = '1';
  });
  card.addEventListener('mousemove', (e) => {
    glowEl.style.left = e.clientX + 'px';
    glowEl.style.top  = e.clientY + 'px';
  });
  card.addEventListener('mouseleave', () => {
    glowEl.style.opacity = '0';
  });
});

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNavLink();
});

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when link clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---- Active nav link highlight ----
const sections = document.querySelectorAll('section[id]');
function highlightNavLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ---- Reveal on scroll ----
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .stat-card, .edu-card, .contact-item, .contact-form, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for siblings
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 0.07) + 's';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));



// ---- Parallax orbs on mouse move ----
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 10;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px) scale(1)`;
  });
});

// Profile image — static, no tilt effect

// ---- Smooth reveal for hero on load ----
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Dynamic footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

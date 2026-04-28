/* ==================== CURSEUR PERSONNALISÉ ==================== */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

function initCursor() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.style.cursor = 'auto';
    document.querySelectorAll('a, button, .btn-send, .nav-link, input, textarea, .interactive').forEach(el => el.style.cursor = 'pointer');
    return;
  }
  cursor.style.display = 'block';
  follower.style.display = 'block';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    cursorX += (mouseX - cursorX) * 0.15; cursorY += (mouseY - cursorY) * 0.15;
    follower.style.left = cursorX + 'px'; follower.style.top = cursorY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const interactiveSelectors = 'a, button, .btn-send, .nav-link, input, textarea, .skill-tags span, .project-item, .interactive, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursor.classList.add('hover');
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') cursor.classList.add('text');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) cursor.classList.remove('hover', 'text');
  });
  document.addEventListener('mousedown', (e) => {
    cursor.classList.add('click');
    const ripple = document.createElement('span');
    ripple.className = 'cursor-ripple';
    ripple.style.left = e.clientX + 'px'; ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
  document.addEventListener('mouseup', () => cursor.classList.remove('click'));
}

/* ==================== SCROLL REVEAL ==================== */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ==================== PARALLAXE 3D ==================== */
function initCodeParallax() {
  document.addEventListener('mousemove', (e) => {
    const windows = document.querySelectorAll('.code-window');
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    windows.forEach(win => {
      const rect = win.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) win.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
  });
}

/* ==================== NAVBAR SCROLL ==================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
}

/* ==================== SMOOTH SCROLL ==================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ==================== INIT ==================== */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollReveal();
  initCodeParallax();
  initNavbarScroll();
  initSmoothScroll();
  console.log('%c✨ Portfolio chargé avec succès', 'color: #64ffda; font-weight: bold;');
});
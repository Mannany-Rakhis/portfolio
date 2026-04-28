const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

function initCursor() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.style.cursor = 'auto';
    document.querySelectorAll('a, button, .btn-send, input, textarea, .interactive').forEach(el => el.style.cursor = 'pointer');
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

  const interactiveSelectors = 'a, button, .btn-send, input, textarea, .skill-tags span, .project-item, .interactive, [role="button"]';
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

function initSidebarNav() {
  const sections = document.querySelectorAll('section, header');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === id) link.classList.add('active');
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-100px 0px -60% 0px' });

  sections.forEach(section => observer.observe(section));

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.section;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initCodeParallax() {
  document.addEventListener('mousemove', (e) => {
    const windows = document.querySelectorAll('.code-window');
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    windows.forEach(win => {
      const rect = win.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        win.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initSidebarNav();
  initScrollReveal();
  initCodeParallax();
  console.log('%c✨ Portfolio chargé avec succès', 'color: #64ffda; font-weight: bold;');
});
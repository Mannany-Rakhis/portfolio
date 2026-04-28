/* ==================== CURSEUR PERSONNALISÉ ==================== */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

// Variables de position
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Initialisation du curseur
function initCursor() {
  // Désactiver sur mobile/tactile
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.style.cursor = 'auto';
    document.querySelectorAll('a, button, .btn-send, .nav-link, .code-link-wrapper, input, textarea, .skill-tags span, .project-item, .interactive').forEach(el => {
      el.style.cursor = 'pointer';
    });
    return;
  }

  // Afficher les curseurs
  cursor.style.display = 'block';
  follower.style.display = 'block';

  // Suivi de la souris
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Curseur principal suit instantanément
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Animation fluide du follower (effet de traînée)
  function animateFollower() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    follower.style.left = cursorX + 'px';
    follower.style.top = cursorY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // États interactifs
  const interactiveSelectors = 'a, button, .btn-send, .nav-link, .code-link-wrapper, input, textarea, .skill-tags span, .project-item, .interactive, [role="button"]';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(interactiveSelectors);
    if (target) {
      cursor.classList.add('hover');
      // Détection champ texte
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        cursor.classList.add('text');
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(interactiveSelectors);
    if (target) {
      cursor.classList.remove('hover', 'text');
    }
  });

  // Effet de clic avec ripple
  document.addEventListener('mousedown', (e) => {
    cursor.classList.add('click');
    
    // Créer l'effet ripple
    createRipple(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
  });
}

// Fonction pour créer l'effet ripple
function createRipple(x, y) {
  const ripple = document.createElement('span');
  ripple.className = 'cursor-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  
  // Nettoyer après l'animation
  setTimeout(() => ripple.remove(), 600);
}

/* ==================== ANIMATION SCROLL REVEAL ==================== */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optionnel : arrêter d'observer après activation
        // observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ==================== PARALLAXE 3D CODE WINDOWS ==================== */
function initCodeParallax() {
  document.addEventListener('mousemove', (e) => {
    const windows = document.querySelectorAll('.code-window');
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    
    windows.forEach(win => {
      // Appliquer seulement si la fenêtre est visible à l'écran
      const rect = win.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        win.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
      }
    });
  });

  // Reset transform au scroll pour éviter les artefacts
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.code-window').forEach(win => {
      const rect = win.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        win.style.transform = '';
      }
    });
  });
}

/* ==================== NAVBAR SCROLL EFFECT ==================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==================== SMOOTH SCROLL POUR LIENS ANCRE ==================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
}

/* ==================== FORMULAIRE CONTACT - FEEDBACK ==================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // Laisser Formspree gérer la soumission, mais ajouter un feedback visuel
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'Envoi en cours...';
    btn.disabled = true;
    
    // Reset après 3 secondes (Formspree redirige normalement)
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

/* ==================== INITIALISATION GLOBALE ==================== */
function init() {
  initCursor();
  initScrollReveal();
  initCodeParallax();
  initNavbarScroll();
  initSmoothScroll();
  initContactForm();
  
  console.log('%c✨ Portfolio chargé avec succès', 'color: #64ffda; font-weight: bold;');
}

// Lancer au chargement du DOM
document.addEventListener('DOMContentLoaded', init);

// Gestion du redimensionnement pour réinitialiser le parallaxe
window.addEventListener('resize', () => {
  document.querySelectorAll('.code-window').forEach(win => {
    win.style.transform = '';
  });
});
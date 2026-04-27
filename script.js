const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.display = 'block';
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (window.innerWidth > 1000) {
  document.addEventListener('mousemove', (e) => {
    const windows = document.querySelectorAll('.code-window');
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    windows.forEach(win => {
      win.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  });
}

const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Feedback UX formulaire de contact
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    const originalText = btn.innerText;
    btn.innerText = 'Envoi en cours...';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      status.textContent = ' Message envoyé avec succès !';
      status.className = 'form-status success';
      form.reset();
      btn.innerText = originalText;
      btn.style.opacity = '1';
      setTimeout(() => { status.textContent = ''; }, 4000);
    }, 1500);
  });
}
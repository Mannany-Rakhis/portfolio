// Curseur Personnalisé
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Animation Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Parallaxe 3D sur les fenêtres de code
document.addEventListener('mousemove', (e) => {
    const windows = document.querySelectorAll('.code-window');
    const x = (window.innerWidth / 2 - e.pageX) / 45;
    const y = (window.innerHeight / 2 - e.pageY) / 45;
    
    windows.forEach(win => {
        win.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
});
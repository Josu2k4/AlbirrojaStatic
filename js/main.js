/**
 * main.js — La Albirroja
 * Interactividad: menú móvil, animaciones de entrada, timeline
 */

/* =============================================
   MENÚ HAMBURGUESA (navegación mobile)
   ============================================= */
const navToggle = document.querySelector('.nav-toggle');
const mainNav   = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    // Accesibilidad: actualizar aria-expanded
    navToggle.setAttribute('aria-expanded', isOpen.toString());
    navToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
  });

  // Cerrar menú al hacer click en un enlace
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.innerHTML = '&#9776;';
    });
  });
}

/* =============================================
   ANIMACIÓN DE ENTRADA (Intersection Observer)
   Elementos aparecen suavemente al hacer scroll
   ============================================= */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Dejar de observar una vez visible para performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplicar a tarjetas (sin timeline para carga instantánea)
document.querySelectorAll('.stat-card, .jugador-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
  observer.observe(el);
});
// Clase CSS para hacer visibles los elementos
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);

/* =============================================
   RESALTAR SECCIÓN ACTIVA EN EL MENÚ
   ============================================= */
const sections = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.main-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// Estilos del link activo
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .main-nav a.active {
      color: var(--color-blanco);
    }
    .main-nav a.active::after {
      width: 100%;
    }
  </style>
`);

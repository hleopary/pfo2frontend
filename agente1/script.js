(function () {
  'use strict';

  const header = document.querySelector('[data-header]');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden', !isOpen);
    iconClose.classList.toggle('hidden', isOpen);
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  }

  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFieldError(fieldName, show) {
    const input = document.getElementById(fieldName);
    const error = document.querySelector('[data-error-for="' + fieldName + '"]');
    if (input) input.classList.toggle('invalid', show);
    if (error) error.classList.toggle('hidden', !show);
  }

  function validateForm() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    let valid = true;

    showFieldError('nombre', !nombre);
    if (!nombre) valid = false;

    showFieldError('email', !isValidEmail(email));
    if (!isValidEmail(email)) valid = false;

    showFieldError('mensaje', !mensaje);
    if (!mensaje) valid = false;

    return valid;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  menuToggle.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  ['nombre', 'email', 'mensaje'].forEach(function (fieldName) {
    const input = document.getElementById(fieldName);
    if (input) {
      input.addEventListener('input', function () {
        showFieldError(fieldName, false);
        formSuccess.classList.add('hidden');
      });
    }
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    setTimeout(function () {
      formSuccess.classList.remove('hidden');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';

      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
  });
})();

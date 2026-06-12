/* =====================================================================
   Rolande Solomons — Portfolio
   script.js
   Handles: typing effect, navbar, mobile menu, scroll reveal,
            back-to-top button, contact form, footer year.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------
     1. Animated typing effect in the hero
     Edit the words below to change the rotating job titles.
  ------------------------------------------------------------------- */
  const phrases = [
    'Software Developer',
    'AR & Interactive Systems Developer',
    'Computer Science Graduate',
    'Game & UI Developer',
  ];
  const typedEl = document.getElementById('typed');
  let pIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const current = phrases[pIndex];
    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    typedEl.textContent = current.substring(0, charIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === current.length) {
      delay = 1700;            // pause at full word
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
      delay = 350;
    }
    setTimeout(type, delay);
  }
  if (typedEl) type();

  /* -------------------------------------------------------------------
     2. Navbar background on scroll
  ------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const toTop = document.getElementById('toTop');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 30);
    toTop.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* -------------------------------------------------------------------
     3. Mobile menu toggle
  ------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  // Close menu when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = navToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });

  /* -------------------------------------------------------------------
     4. Scroll reveal using IntersectionObserver
  ------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  /* -------------------------------------------------------------------
     5. Back-to-top button
  ------------------------------------------------------------------- */
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------------------------
     6. Contact form (front-end demo only)
     This does NOT send email yet. To make it real, sign up for a free
     service such as Formspree (https://formspree.io) and either:
       - point the <form> action at your Formspree endpoint, or
       - use fetch() to POST the data inside this handler.
  ------------------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      note.textContent = 'Please fill in all fields.';
      note.className = 'form-note error';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = 'Please enter a valid email address.';
      note.className = 'form-note error';
      return;
    }

    // Success (demo). Replace this with a real submission when ready.
    note.textContent = `Thanks ${name}! Your message looks good. (Hook up Formspree to actually send it.)`;
    note.className = 'form-note success';
    form.reset();
  });

  /* -------------------------------------------------------------------
     7. Auto-update footer year
  ------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});

/* =====================================================================
   Rolande Solomons — Portfolio
   script.js
   Handles: XP/scroll bar, navbar, mobile menu, scroll reveal,
            animated player-stat bars, contact form, back-to-top,
            footer year, + a little Konami-code easter egg.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------
     1. XP / scroll progress bar + navbar + back-to-top
  ------------------------------------------------------------------- */
  const xpFill = document.getElementById('xpFill');
  const navbar = document.getElementById('navbar');
  const toTop  = document.getElementById('toTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    xpFill.style.width = pct + '%';

    navbar.classList.toggle('scrolled', scrollTop > 30);
    toTop.classList.toggle('show', scrollTop > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* -------------------------------------------------------------------
     2. Mobile menu toggle
  ------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = navToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });

  /* -------------------------------------------------------------------
     3. Scroll reveal (IntersectionObserver)
  ------------------------------------------------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* -------------------------------------------------------------------
     4. Animate the player-stat bars when they scroll into view
     (the fill % comes from each <i data-level="NN">)
  ------------------------------------------------------------------- */
  const statBars = document.querySelectorAll('.bar i');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level') || 80;
        entry.target.style.width = level + '%';
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statBars.forEach(bar => statObserver.observe(bar));

  /* -------------------------------------------------------------------
     5. Contact form (front-end demo only)
     To actually send email, sign up at https://formspree.io and either
     set the <form action="..."> to your endpoint, or POST with fetch()
     inside this handler.
  ------------------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      note.textContent = '⚠ PLEASE FILL IN ALL FIELDS';
      note.className = 'form-note error';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = '⚠ ENTER A VALID EMAIL';
      note.className = 'form-note error';
      return;
    }
    note.textContent = '★ MESSAGE READY! (CONNECT FORMSPREE TO SEND)';
    note.className = 'form-note success';
    form.reset();
  });

  /* -------------------------------------------------------------------
     6. Footer year
  ------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------------------
     7. Fun: blinking "PRESS START" also reacts to a click
  ------------------------------------------------------------------- */
  const pressStart = document.getElementById('pressStart');
  if (pressStart) {
    pressStart.addEventListener('click', () => {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
    pressStart.style.cursor = 'pointer';
  }

  /* -------------------------------------------------------------------
     8. Easter egg: Konami code (↑ ↑ ↓ ↓ ← → ← → B A)
     Triggers a quick confetti-ish sparkle burst. Just for fun — delete
     this whole block if you don't want it.
  ------------------------------------------------------------------- */
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let kPos = 0;
  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kPos = (key === konami[kPos]) ? kPos + 1 : 0;
    if (kPos === konami.length) {
      kPos = 0;
      partyTime();
    }
  });

  function partyTime() {
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.textContent = ['✦','★','♥','✿'][i % 4];
      s.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-20px;
        font-size:${12 + Math.random()*18}px;color:hsl(${320 + Math.random()*30},80%,70%);
        pointer-events:none;z-index:999;transition:transform 2.2s ease-in,opacity 2.2s;`;
      document.body.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translateY(105vh) rotate(${Math.random()*720}deg)`;
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 2400);
    }
  }

});

// ─── NAV SCROLL ─────────────────────────────────
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ─── MOBILE MENU ────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const closeNav  = document.getElementById('closeNav');
  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  closeNav.addEventListener('click', () => mobileNav.classList.remove('open'));
  function closeMobileNav() { mobileNav.classList.remove('open'); }

  // ─── SCROLL REVEAL ──────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // ─── BOOKING FORM ───────────────────────────────
  function handleBooking(e) {
    e.preventDefault();
    document.querySelector('.booking-form').style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';
  }

  // ─── CONTACT FORM ───────────────────────────────
  function handleContact(e) {
    e.preventDefault();
    document.querySelector('.contact-form').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
  }

  // ─── DATE DEFAULTS ──────────────────────────────
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const after    = new Date(today); after.setDate(after.getDate() + 3);
  const fmt = d => d.toISOString().split('T')[0];
  const ci = document.getElementById('checkin');
  const co = document.getElementById('checkout');
  if (ci) { ci.value = fmt(tomorrow); ci.min = fmt(tomorrow); }
  if (co) { co.value = fmt(after);    co.min = fmt(after); }
  if (ci) ci.addEventListener('change', () => {
    const sel = new Date(ci.value); sel.setDate(sel.getDate() + 2);
    co.min = ci.value; if (co.value <= ci.value) co.value = fmt(sel);
  });

  // ─── SMOOTH ANCHOR OFFSET ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
  
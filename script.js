// ─── EMAILJS INIT ────────────────────────────────
emailjs.init('x9FsMiWX5CmgK1QHN');

// ─── RECAPTCHA SITE KEY ──────────────────────────
const SITE_KEY = '6LeASqUsAAAAAHrsoNvT_93vz3xdl3QckMp-thcy';

// ─── NAV SCROLL ─────────────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── MOBILE MENU ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeNav  = document.getElementById('closeNav');
hamburger.addEventListener('click', () => {
  mobileNav.classList.add('open');
  hamburger.classList.add('open');
});

closeNav.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
});
function closeMobileNav() { 
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
}

// ─── SCROLL REVEAL ──────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ─── BOOKING FORM ───────────────────────────────
function handleBooking(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  emailjs.sendForm('service_kkm5llu', 'template_6nwqdkk', form)
    .then(() => {
      form.style.display = 'none';
      document.getElementById('bookingSuccess').style.display = 'block';
    })
    .catch((error) => {
      alert('Something went wrong. Please try again.');
      btn.textContent = 'Send Booking Request →';
      btn.disabled = false;
      console.error(error);
    });
}

// ─── CONTACT FORM ───────────────────────────────
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  emailjs.sendForm('service_kkm5llu', 'template_bwtyifq', form)
    .then(() => {
      form.style.display = 'none';
      document.getElementById('contactSuccess').style.display = 'block';
    })
    .catch((error) => {
      alert('Something went wrong. Please try again.');
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      console.error(error);
    });
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

// ─── ROOM SLIDERS ───────────────────────────────
function initSliders() {
  document.querySelectorAll('.room-slider').forEach(slider => {
    const slides = slider.querySelector('.room-slides');
    const imgs = slides.querySelectorAll('img');
    const dotsContainer = slider.querySelector('.slide-dots');
    let current = 0;

    imgs.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = (index + imgs.length) % imgs.length;
      slides.style.transform = `translateX(-${current * 100}%)`;
      dotsContainer.querySelectorAll('.slide-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    slider.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
    slider.querySelector('.next').addEventListener('click', () => goTo(current + 1));

    let startX = 0;
    slides.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    slides.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
    });
  });
}

initSliders();
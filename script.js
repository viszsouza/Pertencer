/* ================================================
   PERTENCER — Centro de Neurodesenvolvimento
   script.js
================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Menu ────────────────────────────── */
  const burger   = document.getElementById('burger');
  const mob      = document.getElementById('mobMenu');
  const overlay  = document.getElementById('mobOverlay');
  const closeBtn = document.getElementById('closeMenu');

  const openMob  = () => { mob.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMob = () => { mob.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };

  burger?.addEventListener('click', openMob);
  overlay?.addEventListener('click', closeMob);
  closeBtn?.addEventListener('click', closeMob);
  mob?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

  /* ── Header scroll ──────────────────────────── */
  const hdr = document.getElementById('header');
  window.addEventListener('scroll', () => {
    hdr?.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── Scroll reveal ──────────────────────────── */
  const rvEls = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    rvEls.forEach(el => io.observe(el));
  } else {
    rvEls.forEach(el => el.classList.add('in'));
  }

  /* ── FAQ Accordion ──────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling?.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        btn.classList.add('open');
        btn.nextElementSibling?.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Smooth scroll ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Active nav link on scroll ──────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li a');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) link.style.color = 'var(--pink)';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => navObs.observe(s));

  /* ── Contact form → WhatsApp ────────────────── */
  document.getElementById('cForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('f-nome')?.value.trim() || '';
    const tel  = document.getElementById('f-tel')?.value.trim()  || '';
    const esp  = document.getElementById('f-esp')?.value         || '';
    const msg  = document.getElementById('f-msg')?.value.trim()  || '';
    let txt = `Olá, Pertencer! Meu nome é *${nome}* (tel: ${tel}).`;
    if (esp) txt += ` Interesse em: *${esp}*.`;
    if (msg) txt += ` ${msg}`;
    window.open(`https://wa.me/5521977027638?text=${encodeURIComponent(txt)}`, '_blank');
  });

  /* ── Phone mask ─────────────────────────────── */
  document.getElementById('f-tel')?.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if      (v.length <= 2) v = v.replace(/(\d{0,2})/, '($1');
    else if (v.length <= 7) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    else                    v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    this.value = v;
  });

});

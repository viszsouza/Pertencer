// ── Mobile menu ──────────────────────────────
const burger = document.getElementById('burger');
const mob = document.getElementById('mobMenu');
const overlay = document.getElementById('mobOverlay');
const closeBtn = document.getElementById('closeMenu');

function openMob() { mob.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMob() { mob.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }

burger.addEventListener('click', openMob);
overlay.addEventListener('click', closeMob);
closeBtn.addEventListener('click', closeMob);
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

// ── Header scroll ────────────────────────────
const hdr = document.getElementById('header');
window.addEventListener('scroll', () => {
    hdr.classList.toggle('scrolled', window.scrollY > 30);
});

// ── Reveal on scroll ─────────────────────────
const rvEls = document.querySelectorAll('.rv');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
}, { threshold: 0.12 });
rvEls.forEach(el => io.observe(el));

// ── FAQ accordion ────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const isOpen = btn.classList.contains('open');
        document.querySelectorAll('.faq-q').forEach(b => {
            b.classList.remove('open');
            b.nextElementSibling.classList.remove('open');
            b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            btn.classList.add('open');
            btn.nextElementSibling.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

// ── Contact form → WhatsApp ──────────────────
document.getElementById('cForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('f-nome').value.trim();
    const tel = document.getElementById('f-tel').value.trim();
    const esp = document.getElementById('f-esp').value;
    const msg = document.getElementById('f-msg').value.trim();
    let txt = `Olá, Pertencer! Meu nome é *${nome}* (tel: ${tel}).`;
    if (esp) txt += ` Tenho interesse em: *${esp}*.`;
    if (msg) txt += ` ${msg}`;
    window.open(`https://wa.me/5521977027638?text=${encodeURIComponent(txt)}`, '_blank');
});

// ── Phone mask ───────────────────────────────
document.getElementById('f-tel').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length <= 2) v = v.replace(/(\d{0,2})/, '($1');
    else if (v.length <= 7) v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    else v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    this.value = v;
});
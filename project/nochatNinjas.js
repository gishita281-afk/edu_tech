/* ==============================
   BioShield AI — Custom Script
   (Requires AOS, GSAP, ScrollTrigger,
   and Chart.js to be loaded first)
============================== */

document.addEventListener('DOMContentLoaded', () => {

  AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  gsap.registerPlugin(ScrollTrigger);

  /* Nav shrink on scroll */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('shadow-2xl');
    else nav.classList.remove('shadow-2xl');
  });

  /* Mobile menu */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
  }));

  /* Typing effect for tagline */
  const tagline = "Behavior is the strongest password.";
  const typedEl = document.getElementById('typedTagline');
  let ti = 0;
  function typeTagline() {
    if (ti <= tagline.length) {
      typedEl.textContent = tagline.slice(0, ti);
      typedEl.classList.add('typed-cursor');
      ti++;
      setTimeout(typeTagline, 55);
    }
  }
  typeTagline();

  /* Counter animation using GSAP + Intersection Observer */
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const decimals = (el.dataset.counter.split('.')[1] || '').length;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = obj.val.toFixed(decimals) + suffix; },
        });
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  /* Accordion */
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Demo log simulation */
  const demoLog = document.getElementById('demoLog');
  const logLines = [
    ['> capturing mouse trajectory...', 'text-slate-400'],
    ['> keystroke cadence: stable', 'text-cyan'],
    ['> reaction time: 214ms (baseline: 208ms)', 'text-slate-400'],
    ['> aim variance: within profile bounds', 'text-okgreen'],
    ['> weapon-switch pattern: matched', 'text-okgreen'],
    ['> camera movement: consistent', 'text-cyan'],
    ['> cross-checking behavioral profile...', 'text-slate-400'],
    ['> deviation score: 2.1% (LOW)', 'text-okgreen'],
    ['> verdict: VERIFIED PLAYER', 'text-neon font-semibold'],
  ];
  let logIndex = 0;
  function pushLog() {
    if (logIndex >= logLines.length) { logIndex = 0; demoLog.innerHTML = ''; }
    const [text, cls] = logLines[logIndex];
    const line = document.createElement('div');
    line.className = cls;
    line.textContent = text;
    demoLog.appendChild(line);
    if (demoLog.children.length > 9) demoLog.removeChild(demoLog.firstChild);
    logIndex++;
    setTimeout(pushLog, 1400);
  }
  pushLog();

  /* Contact form (demo only — no backend wired up) */
  const contactForm = document.getElementById('contactForm');
  const sendBtnText = document.getElementById('sendBtnText');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendBtnText.textContent = 'Message Sent ✓';
      setTimeout(() => {
        sendBtnText.textContent = 'Send Message';
        contactForm.reset();
      }, 2200);
    });
  }

  /* Chart.js global defaults */
  Chart.defaults.color = '#94A3B8';
  Chart.defaults.font.family = 'JetBrains Mono';
  Chart.defaults.borderColor = 'rgba(148,163,184,0.08)';

  const gridOpts = { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { font: { size: 10 } } };

  new Chart(document.getElementById('riskChart'), {
    type: 'line',
    data: {
      labels: ['0m','5m','10m','15m','20m','25m','30m','35m','40m'],
      datasets: [{
        label: 'Risk Score',
        data: [8,10,9,14,11,13,10,12,12],
        borderColor: '#34D399',
        backgroundColor: 'rgba(52,211,153,0.12)',
        fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: gridOpts, y: { ...gridOpts, min:0, max: 100 } } }
  });

  new Chart(document.getElementById('mouseChart'), {
    type: 'line',
    data: {
      labels: Array.from({length:12}, (_,i)=>i),
      datasets: [{
        label: 'Mouse Variance',
        data: [22,30,26,40,35,50,44,38,42,36,46,40],
        borderColor: '#38BDF8',
        backgroundColor: 'rgba(56,189,248,0.12)',
        fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2,
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: gridOpts, y: gridOpts } }
  });

  new Chart(document.getElementById('reactionChart'), {
    type: 'bar',
    data: {
      labels: ['1','2','3','4','5','6','7','8'],
      datasets: [{
        label: 'Reaction (ms)',
        data: [210,198,224,205,190,215,208,202],
        backgroundColor: '#A855F7',
        borderRadius: 6,
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: gridOpts, y: gridOpts } }
  });

  new Chart(document.getElementById('aimChart'), {
    type: 'radar',
    data: {
      labels: ['Precision','Consistency','Flick','Tracking','Recoil Ctrl','Reaction'],
      datasets: [{
        label: 'Aim Profile',
        data: [88,92,80,85,90,87],
        borderColor: '#22D3EE',
        backgroundColor: 'rgba(34,211,238,0.18)',
        pointBackgroundColor: '#22D3EE',
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } },
      scales: { r: { angleLines: { color: 'rgba(148,163,184,0.1)' }, grid: { color: 'rgba(148,163,184,0.1)' }, pointLabels: { font: { size: 9 } }, ticks: { display:false } } } }
  });

  new Chart(document.getElementById('timelineChart'), {
    type: 'line',
    data: {
      labels: Array.from({length: 20}, (_,i)=>i*2 + 'm'),
      datasets: [
        { label: 'Verified', data: [95,94,96,95,93,95,96,94,95,93,94,95,96,94,95,93,94,95,96,95], borderColor: '#34D399', borderWidth:2, pointRadius:0, tension:.4 },
        { label: 'Risk', data: [8,9,8,10,9,11,10,9,12,11,10,9,11,12,10,9,8,10,11,10], borderColor: '#FB7185', borderWidth:2, pointRadius:0, tension:.4 },
      ]
    },
    options: { responsive: true, plugins: { legend: { labels: { boxWidth: 12, font: { size: 10 } } } }, scales: { x: gridOpts, y: gridOpts } }
  });

});
/* =========================================================
   Akshara Kumari — Portfolio interactions (vanilla JS)
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------------- Project data (from GitHub) ---------------- */
  const GH = 'https://github.com/aksharaagarwal21/';
  const PROJECTS = [
    { t: 'PostureVision', d: 'AI workout coach in the browser: MediaPipe pose tracking with 3D joint angles counts reps, flags form mistakes with red marks and a voice coach, across 16 exercises.', tags: ['MediaPipe', 'Computer Vision', 'React'], cat: ['ai', 'web'], repo: 'PostureVision', live: 'https://aksharaagarwal21.github.io/PostureVision/', c: 'var(--sun)' },
    { t: 'Bloodwing', d: 'Mental-health care platform with role-based dashboards and a RAG chatbot (Llama 3 via Groq) that detects crisis messages.', tags: ['RAG', 'Llama 3', 'Groq', 'React'], cat: ['ai', 'web'], repo: 'Mental-Health-Care-Web', live: 'https://bloodwing-mentalcare.vercel.app/', c: 'var(--pink)' },
    { t: 'PAC-Lab', d: 'Gamified virtual ML lab: 10 interactive experiments from preprocessing to perceptrons, with progress tracking and a faculty dashboard.', tags: ['EdTech', 'ML', 'React'], cat: ['ai', 'web'], repo: 'Pac-lab---Gamified-Virtual-Machine-Learning', live: 'https://pac-lab-steel.vercel.app/', c: 'var(--violet)' },
    { t: 'Mental Health Knowledge Companion', d: 'Multi-persona AI chat built on LangChain and Groq, with Supabase pgvector retrieval and a Next.js frontend.', tags: ['LangChain', 'pgvector', 'Next.js'], cat: ['ai'], repo: 'OS-MHKC-Monorepo', c: 'var(--violet)' },
    { t: 'FraudShield AI', d: 'Credit-card fraud detection dashboard with a transaction-graph view, fraud alerts and ML vs GNN model comparison.', tags: ['GNN', 'ML', 'Dashboards'], cat: ['ai'], repo: 'Smart-Credit-Card-Fraud-Detection', c: 'var(--coral)' },
    { t: 'WasteVision AI', d: 'Six-class waste classifier on a MobileNetV2 CNN, with webcam or image input and a live Socket.IO dashboard.', tags: ['TensorFlow', 'CNN', 'Socket.IO'], cat: ['ai'], repo: 'wastevision-ai', c: 'var(--mint)' },
    { t: 'Smart Attendance · Face Analytics', d: 'Face-recognition attendance with OpenCV and Flask: webcam check-in, liveness check, employee records and analytics.', tags: ['OpenCV', 'Flask'], cat: ['ai'], repo: 'AI-Powered-Smart-Attendance-System-Using-Face-Analytics', c: 'var(--violet)' },
    { t: 'MineSafe AI', d: 'Mining-safety intelligence: sensor anomaly detection, forecasting and risk prediction with scikit-learn, Flask and React.', tags: ['Anomaly Detection', 'Forecasting'], cat: ['ai', 'iot'], repo: 'MineSafe-AI-Proactive-Safety-Intelligence', c: 'var(--coral)' },
    { t: 'JobPortal', d: 'Full-stack job portal for candidates, recruiters and admins: Spring Boot with JWT auth and JPA search, MySQL and React.', tags: ['Spring Boot', 'JWT', 'React'], cat: ['web'], repo: 'JobPortal', c: 'var(--coral)' },
    { t: 'RFID Smart Campus', d: 'Attendance, exams, mess, hostel and security over RFID scans. Express, MongoDB and Socket.IO, with role-based dashboards.', tags: ['Express', 'MongoDB', 'Socket.IO'], cat: ['web', 'iot'], repo: 'RFIDManagement', live: 'https://frontendddd-seven.vercel.app', c: 'var(--mint)' },
    { t: 'Smart Home Monitor', d: 'ESP32 smart-home simulator: temperature, light and motion sensors driving lights, relay and buzzer, with the Arduino code.', tags: ['ESP32', 'Arduino', 'IoT'], cat: ['iot'], repo: 'Smart-home-automation-monitor', live: 'https://smart-home-automation-monitor.vercel.app', c: 'var(--sun)' },
    { t: 'BlogSpace', d: 'Full-stack blogging platform: Express and MongoDB REST API with JWT and Google OAuth, posts, comments, likes and dashboards.', tags: ['MERN', 'OAuth'], cat: ['web'], repo: 'blogspace-1', live: 'https://blogspace-1-one.vercel.app', c: 'var(--violet)' },
    { t: 'University ERP', d: 'Student and faculty portals for attendance, marks, timetables and fees. React, an Express REST API and MySQL.', tags: ['React', 'Express', 'MySQL'], cat: ['web'], repo: 'University_erp_System', c: 'var(--mint)' },
    { t: 'TACFUSION', d: 'Multi-sensor image fusion prototype: simulated thermal, IR and SAR views fused with PCA, Laplacian and wavelet methods.', tags: ['Image Fusion', 'CV'], cat: ['ai'], repo: 'TACFUSION', c: 'var(--pink)' },
    { t: 'EcoSoil AI', d: 'Soil-health analysis with scikit-learn: health scoring, nutrient classification and crop recommendation in a Flask dashboard.', tags: ['scikit-learn', 'Flask'], cat: ['ai'], repo: 'EcoSoil-AI', c: 'var(--mint)' },
    { t: 'CarbonIQ', d: 'Carbon-footprint estimator: a gradient-boosting model over 12 lifestyle factors with personalised tips. Flask and Chart.js.', tags: ['Gradient Boosting', 'Chart.js'], cat: ['ai'], repo: 'CarbonIQ', c: 'var(--sun)' },
    { t: 'IoT Weather Monitor', d: 'Real-time weather dashboard for simulated IoT sensors: Socket.IO streaming, aggregation algorithms and alerts.', tags: ['Socket.IO', 'IoT'], cat: ['iot'], repo: 'IoT-Weather-Monitoring-System', c: 'var(--violet)' },
    { t: 'Pathfinder AI', d: 'Interactive pathfinding visualiser: BFS, DFS, A*, Dijkstra, bidirectional and greedy best-first search on a grid.', tags: ['Algorithms', 'Visualisation'], cat: ['web'], repo: 'Pathfinder-AI', c: 'var(--coral)' },
    { t: 'SkillForge', d: 'Skill-assessment and learning platform UI with courses, timed assessments and certificates. React and TypeScript.', tags: ['React', 'TypeScript'], cat: ['web'], repo: 'Learningapp_UI', live: 'https://learningapp-ui.vercel.app', c: 'var(--mint)' },
    { t: 'EduConnect', d: 'Learning app with study materials, quizzes, progress tracking, a leaderboard and Hindi/Telugu language support.', tags: ['React', 'TypeScript', 'i18n'], cat: ['web'], repo: 'EduConnect', live: 'https://edu-connect-amber-nine.vercel.app', c: 'var(--violet)' },
    { t: 'RailMedic', d: 'Frontend prototype for rail medical-emergency response with patient, doctor, staff and admin dashboards.', tags: ['React', 'Health-tech'], cat: ['web'], repo: 'Medical-care-System', live: 'https://medical-care-system-ruddy.vercel.app', c: 'var(--coral)' },
    { t: 'IGNISIA 2025', d: 'Event site for a GeeksforGeeks SRMIST placement and DSA workshop, with countdown, speakers and timeline.', tags: ['Community', 'React'], cat: ['web'], repo: 'Event2-Frontend', live: 'https://event2-frontend.vercel.app', c: 'var(--mint)' },
    { t: 'Java Verse', d: 'Website for a coding event, built with React, Vite, Tailwind CSS and Framer Motion.', tags: ['Framer Motion', 'Tailwind'], cat: ['web'], repo: 'Event-Frontend', live: 'https://event-frontend-six-zeta.vercel.app', c: 'var(--sun)' },
    { t: 'Water Remediation Risk', d: 'Water-contamination risk assessment: plume transport modelling, exposure dose and hazard/cancer risk. Flask and SQLite.', tags: ['Flask', 'Modelling'], cat: ['ai'], repo: 'Water-Remediation-Risk-Assessment-System', c: 'var(--violet)' },
    { t: 'Spendly', d: 'Expense tracker with transactions, budgets and bill reminders. Flask, MySQL and JWT auth.', tags: ['Flask', 'MySQL', 'JWT'], cat: ['web'], repo: 'expense-tracker', c: 'var(--pink)' },
    { t: 'LibraVault', d: 'Digital library management with role-based access for books and members. React, Express, Sequelize and MySQL.', tags: ['Sequelize', 'MySQL'], cat: ['web'], repo: 'Digital-library-system', c: 'var(--coral)' }
  ];
  const CAT_LABEL = { ai: 'AI / ML', web: 'Full-Stack', iot: 'IoT & Systems' };

  /* ---------------- Smooth scroll (Lenis) ---------------- */
  let lenis = null;
  function initLenis() {
    if (reduceMotion || typeof window.Lenis !== 'function') return;
    lenis = new window.Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  function scrollToTarget(target, offset = 0) {
    const el = typeof target === 'string' ? $(target) : target;
    const y = typeof target === 'number' ? target : (el ? el.getBoundingClientRect().top + window.scrollY - offset : 0);
    if (lenis) lenis.scrollTo(y, { duration: 1.3 });
    else window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /* ---------------- Split text ---------------- */
  function splitText() {
    $$('[data-split]').forEach(el => {
      const txt = el.textContent;
      el.textContent = '';
      el.style.setProperty('--n', txt.length);
      [...txt].forEach((ch, i) => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.style.setProperty('--ci', i);
        s.textContent = ch;
        el.appendChild(s);
      });
    });
  }

  /* ---------------- Preloader ---------------- */
  function preloader(done) {
    const pre = $('.preloader');
    if (!pre || reduceMotion) { pre && pre.classList.add('is-gone'); done(); return; }
    const count = $('[data-count]', pre);
    const start = performance.now();
    const dur = 1300;
    const tick = now => {
      const p = clamp((now - start) / dur, 0, 1);
      count.textContent = Math.round((1 - Math.pow(1 - p, 3)) * 100);
      if (p < 1) requestAnimationFrame(tick);
      else {
        pre.classList.add('is-done');
        setTimeout(done, 450);
        setTimeout(() => pre.classList.add('is-gone'), 1400);
      }
    };
    requestAnimationFrame(tick);
  }

  /* ---------------- Cursor ---------------- */
  function initCursor() {
    if (!finePointer || reduceMotion) return;
    const c = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; c.classList.remove('is-hidden'); }, { passive: true });
    document.addEventListener('mouseleave', () => c.classList.add('is-hidden'));
    const loop = () => {
      rx = lerp(rx, mx, .18); ry = lerp(ry, my, .18);
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('mouseover', e => {
      const lab = e.target.closest('[data-cursor]');
      const hov = e.target.closest('a, button, [data-tilt], input, textarea, label');
      if (lab) { label.textContent = lab.dataset.cursor; c.classList.add('is-label'); c.classList.remove('is-hover'); }
      else { c.classList.remove('is-label'); c.classList.toggle('is-hover', !!hov); }
    });
  }

  /* ---------------- Magnetic buttons ---------------- */
  function initMagnetic() {
    if (!finePointer || reduceMotion) return;
    $$('.magnetic').forEach(el => {
      const strength = el.classList.contains('btn') ? .28 : .4;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------------- Spotlight cards ---------------- */
  function initSpotlight() {
    document.addEventListener('pointermove', e => {
      const card = e.target.closest('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------------- Tilt ---------------- */
  function bindTilt(el, max = 8) {
    if (!finePointer || reduceMotion) return;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-6px) ${el.classList.contains('polaroid') ? 'rotate(0deg) scale(1.04)' : ''}`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  }

  /* ---------------- Nav ---------------- */
  function initNav() {
    const nav = $('[data-nav]');
    const pill = $('.nav__pill');
    const links = $$('[data-link]');
    let lastY = scrollY;

    const movePill = a => {
      if (!a) { pill.style.opacity = 0; return; }
      pill.style.opacity = 1;
      pill.style.width = a.offsetWidth + 'px';
      pill.style.transform = `translateX(${a.offsetLeft}px)`;
    };

    const onScroll = () => {
      const y = scrollY;
      nav.classList.toggle('is-scrolled', y > 20);
      const menuOpen = $('[data-mmenu]').classList.contains('is-open');
      if (!menuOpen) nav.classList.toggle('is-hidden', y > lastY && y > 500);
      lastY = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // active section
    const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
          movePill(links.find(a => a.classList.contains('is-active')));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
    $('#home') && new IntersectionObserver(([en]) => { if (en.isIntersecting) { links.forEach(a => a.classList.remove('is-active')); movePill(null); } }, { rootMargin: '-45% 0px -50% 0px' }).observe($('#home'));
    addEventListener('resize', () => movePill(links.find(a => a.classList.contains('is-active'))));

    // anchor links -> smooth scroll
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2 || !$(id)) return;
      e.preventDefault();
      closeMenu();
      scrollToTarget(id === '#home' ? 0 : id, id === '#work' ? 0 : 90);
      history.replaceState(null, '', id);
    });

    // mobile menu
    const mm = $('[data-mmenu]');
    function openMenu() { mm.classList.add('is-open'); mm.setAttribute('aria-hidden', 'false'); lenis && lenis.stop(); document.body.style.overflow = 'hidden'; }
    function closeMenu() { if (!mm.classList.contains('is-open')) return; mm.classList.remove('is-open'); mm.setAttribute('aria-hidden', 'true'); lenis && lenis.start(); document.body.style.overflow = ''; }
    $('[data-menu-open]').addEventListener('click', openMenu);
    $('[data-menu-close]').addEventListener('click', closeMenu);
    addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------------- Scroll progress + to-top ring ---------------- */
  function initProgress() {
    const bar = $('.scroll-progress span');
    const toTop = $('.to-top');
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      bar.style.transform = `scaleX(${p})`;
      toTop && toTop.style.setProperty('--sp', p.toFixed(3));
    };
    addEventListener('scroll', on, { passive: true });
    on();
  }

  /* ---------------- Theme toggle (with circular reveal) ---------------- */
  function initTheme() {
    const btn = $('[data-theme-toggle]');
    const meta = $('meta[name="theme-color"]');
    const apply = t => {
      root.setAttribute('data-theme', t);
      try { localStorage.setItem('ak-theme', t); } catch (e) {}
      meta && meta.setAttribute('content', t === 'dark' ? '#13102B' : '#FFF7EE');
    };
    meta && meta.setAttribute('content', root.dataset.theme === 'dark' ? '#13102B' : '#FFF7EE');
    window.__toggleTheme = (x, y) => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      if (!document.startViewTransition || reduceMotion) { apply(next); return; }
      x = x ?? innerWidth - 60; y = y ?? 40;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const vt = document.startViewTransition(() => apply(next));
      vt.ready.then(() => {
        root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(.77,0,.175,1)', pseudoElement: '::view-transition-new(root)' });
      }).catch(() => {});
    };
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      window.__toggleTheme(r.left + r.width / 2, r.top + r.height / 2);
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        // stagger siblings that enter together
        const sibs = el.parentElement ? $$(':scope > [data-reveal]', el.parentElement) : [];
        const idx = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = `${Math.min(idx, 6) * 70}ms`;
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(el => io.observe(el));
  }

  /* ---------------- Counters ---------------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const dur = 1800, start = performance.now();
    const fmt = v => dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN');
    if (reduceMotion) { el.textContent = fmt(target); return; }
    const step = now => {
      const p = clamp((now - start) / dur, 0, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function initCounters() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { animateCounter(en.target); io.unobserve(en.target); } });
    }, { threshold: .6 });
    $$('[data-counter]').forEach(el => io.observe(el));

    // CGPA ring
    const ringIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const ring = en.target;
        const pct = parseFloat(ring.dataset.ring) / parseFloat(ring.dataset.max);
        const fg = $('.ring__fg', ring);
        const C = 2 * Math.PI * 52;
        fg.style.strokeDashoffset = (C * (1 - pct)).toFixed(1);
        ringIO.unobserve(ring);
      });
    }, { threshold: .5 });
    $$('[data-ring]').forEach(r => ringIO.observe(r));
  }

  /* ---------------- Role rotator ---------------- */
  function initRotator() {
    const words = $$('.rotator__word');
    if (words.length < 2) return;
    const rot = $('.rotator');
    // size container to widest word to prevent layout jump
    const fit = () => { rot.style.width = Math.max(...words.map(w => w.scrollWidth)) + 'px'; };
    fit(); addEventListener('resize', fit);
    document.fonts && document.fonts.ready.then(fit);
    if (reduceMotion) return;
    let i = 0;
    setInterval(() => {
      const cur = words[i];
      i = (i + 1) % words.length;
      const nxt = words[i];
      cur.classList.remove('is-active'); cur.classList.add('is-leaving');
      nxt.classList.remove('is-leaving');
      // reset below, then activate
      nxt.style.transition = 'none'; nxt.style.transform = 'translateY(110%)'; void nxt.offsetWidth;
      nxt.style.transition = ''; nxt.style.transform = '';
      nxt.classList.add('is-active');
      setTimeout(() => cur.classList.remove('is-leaving'), 700);
    }, 2400);
  }

  /* ---------------- Hero: dot field canvas + parallax ---------------- */
  function initHero() {
    const hero = $('.hero');
    const cv = $('.hero__dots');
    if (!cv || !hero) return;
    const ctx = cv.getContext('2d');
    let W, H, dpr, dots = [], mouse = { x: -9999, y: -9999 }, visible = true;
    const GAP = 30;

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < H; y += GAP) for (let x = GAP / 2; x < W; x += GAP) dots.push({ x, y, ox: x, oy: y });
    };
    resize(); addEventListener('resize', resize);

    hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); }).observe(hero);

    let colInk, colHot;
    const readColors = () => { const s = getComputedStyle(root); colInk = s.getPropertyValue('--ink').trim(); colHot = s.getPropertyValue('--violet').trim(); };
    readColors();
    new MutationObserver(readColors).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    let running = false;
    function loop() {
      if (running) return; running = true;
      const frame = () => {
        if (!visible) { running = false; return; }
        ctx.clearRect(0, 0, W, H);
        const R = 130;
        for (const d of dots) {
          const dx = d.ox - mouse.x, dy = d.oy - mouse.y, dist = Math.hypot(dx, dy);
          let tx = d.ox, ty = d.oy, s = 1.1, a = .13, hot = false;
          if (dist < R && !reduceMotion) {
            const f = 1 - dist / R;
            tx += (dx / (dist || 1)) * f * 18; ty += (dy / (dist || 1)) * f * 18;
            s = 1.1 + f * 2.4; a = .13 + f * .7; hot = true;
          }
          d.x = lerp(d.x, tx, .15); d.y = lerp(d.y, ty, .15);
          ctx.globalAlpha = a;
          ctx.fillStyle = hot ? colHot : colInk;
          ctx.beginPath(); ctx.arc(d.x, d.y, s, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(frame);
      };
      frame();
    }
    loop();

    // parallax layers
    if (!finePointer || reduceMotion) return;
    const layers = $$('[data-depth]');
    hero.addEventListener('mousemove', e => {
      const px = e.clientX / innerWidth - .5, py = e.clientY / innerHeight - .5;
      layers.forEach(l => {
        const d = parseFloat(l.dataset.depth);
        l.style.transform = `translate3d(${-px * d * 40}px, ${-py * d * 40}px, 0)`;
      });
    });
  }

  /* ---------------- About: scroll-linked word reveal ---------------- */
  function initWords() {
    const el = $('[data-words]');
    if (!el) return;
    const HL = ['builder', 'Jharkhand', 'Computer', 'Science', 'Big', 'Data', 'Analytics'];
    const HL2 = ['model', 'API', 'dashboard'];
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => {
      const clean = w.replace(/[^A-Za-z]/g, '');
      const cls = HL.includes(clean) ? ' hl' : HL2.includes(clean) ? ' hl2' : '';
      return `<span class="w${cls}">${w}</span>`;
    }).join(' ');
    const spans = $$('.w', el);
    if (reduceMotion) { spans.forEach(s => s.classList.add('on')); return; }
    const on = () => {
      const r = el.getBoundingClientRect();
      const start = innerHeight * .85, end = innerHeight * .35;
      const p = clamp((start - r.top) / (start - end + r.height * .6), 0, 1);
      const n = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle('on', i < n));
    };
    addEventListener('scroll', on, { passive: true }); on();
  }

  /* ---------------- Timeline fill ---------------- */
  function initTimeline() {
    const tl = $('[data-timeline]');
    if (!tl) return;
    const fill = $('.timeline__fill', tl);
    const on = () => {
      const r = tl.getBoundingClientRect();
      const p = clamp((innerHeight * .6 - r.top) / r.height, 0, 1);
      fill.style.transform = `scaleY(${p})`;
    };
    addEventListener('scroll', on, { passive: true }); on();
  }

  /* ---------------- Horizontal selected-work ---------------- */
  function initHScroll() {
    const sec = $('[data-hscroll]');
    if (!sec) return;
    const track = $('[data-hs-track]', sec);
    const panels = $$('.panel', track);
    const cur = $('[data-hs-current]'), tot = $('[data-hs-total]'), bar = $('[data-hs-bar]');
    tot.textContent = String(panels.length).padStart(2, '0');
    sec.style.setProperty('--panels', panels.length);
    const mq = window.matchMedia('(min-width: 1000px)');
    let enabled = false;

    const setActive = i => {
      panels.forEach((p, k) => p.classList.toggle('is-active', k === i));
      panels[i] && panels[i].classList.add('is-seen');
      cur.textContent = String(i + 1).padStart(2, '0');
    };

    const update = () => {
      if (!enabled) return;
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - innerHeight;
      const p = clamp(-r.top / total, 0, 1);
      const maxX = track.scrollWidth - innerWidth;
      track.style.transform = `translate3d(${-p * maxX}px,0,0)`;
      bar.style.transform = `scaleX(${p})`;
      setActive(Math.round(p * (panels.length - 1)));
    };

    const enable = () => {
      enabled = mq.matches && !reduceMotion;
      root.classList.toggle('hs-on', enabled);
      if (!enabled) { track.style.transform = ''; }
      update();
    };
    enable();
    mq.addEventListener ? mq.addEventListener('change', enable) : mq.addListener(enable);
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);

    const goTo = i => {
      i = clamp(i, 0, panels.length - 1);
      const top = sec.getBoundingClientRect().top + scrollY;
      const total = sec.offsetHeight - innerHeight;
      scrollToTarget(top + total * (i / (panels.length - 1)) + 2);
    };
    const idx = () => parseInt(cur.textContent, 10) - 1;
    $('[data-hs-prev]').addEventListener('click', () => goTo(idx() - 1));
    $('[data-hs-next]').addEventListener('click', () => goTo(idx() + 1));

    // mobile: mark panels as seen/active on view
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting && !enabled) { en.target.classList.add('is-seen', 'is-active'); } });
    }, { threshold: .35 });
    panels.forEach(p => io.observe(p));
  }

  /* ---------------- SeatSync live seat map ---------------- */
  function initSeats() {
    const grid = $('[data-seats]');
    if (!grid) return;
    const N = 12 * 6;
    const seats = [];
    for (let i = 0; i < N; i++) {
      const s = document.createElement('span');
      s.className = 'seat' + (Math.random() < .3 ? ' taken' : '');
      grid.appendChild(s); seats.push(s);
    }
    if (reduceMotion) return;
    let visible = false;
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(grid);
    setInterval(() => {
      if (!visible) return;
      const free = seats.filter(s => !s.classList.contains('taken') && !s.classList.contains('lock'));
      const taken = seats.filter(s => s.classList.contains('taken'));
      if (free.length < 12 && taken.length) { taken.slice(0, 6).forEach(s => s.classList.remove('taken')); }
      const s = free[Math.floor(Math.random() * free.length)];
      if (!s) return;
      s.classList.add('lock');
      setTimeout(() => { s.classList.remove('lock'); s.classList.add('taken'); }, 700);
    }, 520);
  }

  /* ---------------- Projects grid ---------------- */
  function initProjects() {
    const grid = $('[data-projects]');
    if (!grid) return;
    const moreBtn = $('[data-more]');
    let filter = 'all', showAll = false;
    const LIMIT = 9;

    const card = (p, k) => {
      const primary = p.cat[0];
      return `<article class="pcard" style="--c:${p.c};--k:${k}" data-tilt>
        <div class="pcard__top">
          <span class="pcard__cat">${p.cat.map(c => CAT_LABEL[c]).join(' · ')}</span>
          ${p.live ? '<span class="pcard__live">live</span>' : ''}
        </div>
        <h3>${p.t}</h3>
        <p>${p.d}</p>
        <div class="chips">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="pcard__links">
          <a href="${GH + p.repo}" target="_blank" rel="noopener" aria-label="${p.t} source code on GitHub"><svg><use href="#i-github"/></svg> Code</a>
          ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" aria-label="${p.t} live demo"><svg><use href="#i-arrow"/></svg> Live demo</a>` : ''}
        </div>
      </article>`;
    };

    const render = () => {
      const list = PROJECTS.filter(p => filter === 'all' ? true : filter === 'live' ? !!p.live : p.cat.includes(filter));
      const shown = showAll ? list : list.slice(0, LIMIT);
      grid.innerHTML = shown.map(card).join('');
      moreBtn.style.display = list.length > LIMIT ? '' : 'none';
      moreBtn.textContent = showAll ? 'Show fewer' : `Show all ${list.length} projects`;
      $$('.pcard', grid).forEach(el => bindTilt(el, 7));
    };

    $$('.filter').forEach(b => b.addEventListener('click', () => {
      $$('.filter').forEach(x => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
      filter = b.dataset.filter; showAll = false; render();
    }));
    moreBtn.addEventListener('click', () => {
      const wasAll = showAll;
      showAll = !showAll; render();
      if (wasAll) scrollToTarget('#projects', 90);
    });
    render();
  }

  /* ---------------- Resume dropdown ---------------- */
  function initResume() {
    const wrap = $('.resume-drop');
    if (!wrap) return;
    const btn = $('[data-resume-toggle]', wrap);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', () => { wrap.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); });
  }

  /* ---------------- Lightbox ---------------- */
  function initLightbox() {
    const lb = $('[data-lightbox-root]');
    const img = $('img', lb), cap = $('figcaption', lb);
    let lastFocus = null;
    const open = (src, caption) => {
      lastFocus = document.activeElement;
      img.src = src; img.alt = caption; cap.textContent = caption;
      lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
      lenis && lenis.stop();
      $('[data-lightbox-close]', lb).focus();
    };
    const close = () => {
      lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true');
      lenis && lenis.start();
      lastFocus && lastFocus.focus();
    };
    $$('[data-lightbox]').forEach(b => b.addEventListener('click', () => open(b.dataset.lightbox, b.dataset.caption)));
    lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('[data-lightbox-close]')) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('is-open')) close(); });
  }

  /* ---------------- Toast + copy email ---------------- */
  let toastT;
  function toast(msg) {
    const t = $('[data-toast]');
    t.textContent = msg; t.classList.add('is-show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-show'), 2200);
  }
  async function copyText(txt) {
    try { await navigator.clipboard.writeText(txt); toast('Email copied — talk soon! ✨'); }
    catch (e) { window.location.href = 'mailto:' + txt; }
  }
  function initCopy() {
    $$('[data-copy]').forEach(b => b.addEventListener('click', () => copyText(b.dataset.copy)));
  }

  /* ---------------- Contact form -> mailto ---------------- */
  function initForm() {
    const f = $('[data-contact-form]');
    if (!f) return;
    f.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(f);
      const subject = `${d.get('topic')} — from ${d.get('name')}`;
      const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`;
      window.location.href = `mailto:aksharakumari1208@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast('Opening your email app…');
    });
  }

  /* ---------------- Command palette ---------------- */
  function initPalette() {
    const pal = $('[data-palette]');
    const input = $('[data-palette-input]');
    const list = $('[data-palette-list]');
    const go = id => () => scrollToTarget(id === '#home' ? 0 : id, id === '#work' ? 0 : 90);
    const dl = href => () => { const a = document.createElement('a'); a.href = href; a.download = ''; document.body.appendChild(a); a.click(); a.remove(); };
    const ext = href => () => window.open(href, '_blank', 'noopener');
    const CMDS = [
      { l: 'Home', k: 'section', i: '⌂', a: go('#home') },
      { l: 'About me', k: 'section', i: '☺', a: go('#about') },
      { l: 'Experience', k: 'section', i: '◆', a: go('#experience') },
      { l: 'Selected work', k: 'section', i: '★', a: go('#work') },
      { l: 'All projects', k: 'section', i: '▦', a: go('#projects') },
      { l: 'Skills & toolbox', k: 'section', i: '⚙', a: go('#skills') },
      { l: 'Education', k: 'section', i: '🎓', a: go('#education') },
      { l: 'Awards', k: 'section', i: '🏆', a: go('#awards') },
      { l: 'Leadership', k: 'section', i: '♥', a: go('#leadership') },
      { l: 'Contact', k: 'section', i: '✉', a: go('#contact') },
      { l: 'Copy email address', k: 'action', i: '⧉', a: () => copyText('aksharakumari1208@gmail.com') },
      { l: 'Download AI/ML résumé', k: 'file', i: '↓', a: dl('assets/docs/Akshara_Kumari_Resume_AIML.pdf') },
      { l: 'Download Full-Stack résumé', k: 'file', i: '↓', a: dl('assets/docs/Akshara_Kumari_Resume_FullStack.pdf') },
      { l: 'Toggle light / dark theme', k: 'action', i: '◐', a: () => window.__toggleTheme() },
      { l: 'Open GitHub', k: 'link', i: '↗', a: ext('https://github.com/aksharaagarwal21') },
      { l: 'Open LinkedIn', k: 'link', i: '↗', a: ext('https://www.linkedin.com/in/akshara-kumari-bb38b535b') },
      { l: 'Open LeetCode', k: 'link', i: '↗', a: ext('https://leetcode.com/u/Aksharakumari2024/') }
    ];
    let items = CMDS, sel = 0, lastFocus = null;

    const render = () => {
      if (!items.length) { list.innerHTML = '<li class="palette__empty">No matches — try "resume" or "work"</li>'; return; }
      list.innerHTML = items.map((c, i) => `<li role="option" data-i="${i}" class="${i === sel ? 'is-sel' : ''}" aria-selected="${i === sel}"><span class="pi">${c.i}</span>${c.l}<small>${c.k}</small></li>`).join('');
      const s = $('.is-sel', list); s && s.scrollIntoView({ block: 'nearest' });
    };
    const open = () => {
      lastFocus = document.activeElement;
      pal.classList.add('is-open'); pal.setAttribute('aria-hidden', 'false');
      input.value = ''; items = CMDS; sel = 0; render();
      lenis && lenis.stop();
      setTimeout(() => input.focus(), 50);
    };
    const close = () => {
      pal.classList.remove('is-open'); pal.setAttribute('aria-hidden', 'true');
      lenis && lenis.start();
      lastFocus && lastFocus.focus && lastFocus.focus();
    };
    const run = i => { const c = items[i]; if (!c) return; close(); setTimeout(c.a, 60); };

    $$('[data-palette-open]').forEach(b => b.addEventListener('click', open));
    pal.addEventListener('click', e => { if (e.target === pal) close(); const li = e.target.closest('li[data-i]'); if (li) run(+li.dataset.i); });
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim().replace('resume', 'résumé');
      items = CMDS.filter(c => (c.l + ' ' + c.k).toLowerCase().includes(q)); sel = 0; render();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(items.length, 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + items.length) % Math.max(items.length, 1); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
    });
    addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.classList.contains('is-open') ? close() : open(); }
      else if (e.key === 'Escape' && pal.classList.contains('is-open')) close();
    });
  }

  /* ---------------- Leadership photo parallax ---------------- */
  function initParallaxImg() {
    if (reduceMotion) return;
    const items = $$('[data-speed]');
    const on = () => items.forEach(el => {
      const r = el.getBoundingClientRect();
      const img = $('img', el);
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.transform = `translate3d(0, ${-8 + p * -parseFloat(el.dataset.speed) * 100}%, 0)`;
    });
    addEventListener('scroll', on, { passive: true }); on();
  }

  /* ---------------- Live GitHub repo count ---------------- */
  function initGitHub() {
    const el = $('[data-gh-repos]');
    if (!el || !window.fetch) return;
    fetch('https://api.github.com/users/aksharaagarwal21', { headers: { Accept: 'application/vnd.github+json' } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d && d.public_repos) el.dataset.counter = d.public_repos; })
      .catch(() => {});
  }

  /* ---------------- Footer clock + year ---------------- */
  function initClock() {
    const c = $('[data-clock]'), y = $('[data-year]');
    y && (y.textContent = new Date().getFullYear());
    if (!c) return;
    const fmt = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
    const t = () => { c.textContent = fmt.format(new Date()); };
    t(); setInterval(t, 15000);
  }

  /* ---------------- Boot ---------------- */
  splitText();
  initGitHub();

  const boot = () => {
    initLenis();
    initNav();
    initTheme();
    initCursor();
    initSpotlight();
    initProgress();
    initRotator();
    initHero();
    initWords();
    initTimeline();
    initHScroll();
    initSeats();
    initProjects();
    initResume();
    initLightbox();
    initCopy();
    initForm();
    initPalette();
    initParallaxImg();
    initClock();
    initMagnetic();
    $$('.polaroid[data-tilt]').forEach(el => bindTilt(el, 10));

    preloader(() => {
      root.classList.add('is-loaded');
      initReveal();
      initCounters();
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

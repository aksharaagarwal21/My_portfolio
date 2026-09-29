/* =========================================================
   Akshara Kumari — world.js
   GSAP + ScrollTrigger + Lenis + SplitType, with graceful
   fallbacks when a CDN is blocked or motion is reduced.
   ========================================================= */
(() => {
  'use strict';

  const S = window.SITE;
  const G = window.GH_SNAPSHOT || { repos: [], days: [], commits: [], langs: [], total: 0, stars: 0 };
  const html = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const isDesk = () => innerWidth >= 900;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const FX = hasGSAP && !reduce;
  if (FX) { html.classList.add('fx'); gsap.registerPlugin(ScrollTrigger); }
  if (!isDesk()) html.classList.add('snap');
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad2 = n => String(n).padStart(2, '0');
  function onView(el, cb, margin = '0px') {
    if (!el) return;
    new IntersectionObserver(([e]) => cb(e.isIntersecting), { rootMargin: margin }).observe(el);
  }

  /* ---------------- smooth scroll ---------------- */
  let lenis = null;
  function initLenis() {
    if (!FX || !window.Lenis) return;
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const stopScroll = () => { lenis ? lenis.stop() : (document.body.style.overflow = 'hidden'); };
  const startScroll = () => { lenis ? lenis.start() : (document.body.style.overflow = ''); };

  /* page transition: horizontal wipe → jump → wipe out */
  const wipe = $('[data-wipe]');
  function go(target) {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    const dest = el.id === 'intro' ? 0 : el.getBoundingClientRect().top + scrollY;
    if (reduce || !wipe.animate) { window.scrollTo(0, dest); return; }
    wipe.style.transformOrigin = 'left';
    wipe.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 420, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }).onfinish = () => {
      if (lenis) lenis.scrollTo(dest, { immediate: true, force: true }); else window.scrollTo(0, dest);
      if (hasGSAP) ScrollTrigger.update();
      wipe.style.transformOrigin = 'right';
      wipe.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: 520, delay: 60, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' });
    };
  }

  /* ================= LOADER ================= */
  function loader(done) {
    const L = $('[data-loader]');
    if (!L) return done();
    if (reduce) { L.remove(); return done(); }
    stopScroll();
    const flash = $('[data-flash]', L), log = $('[data-log]', L), count = $('[data-count]', L);
    const pics = ['seatsync-events', 'presenting', 'paclab-d', 'bloodwing-d', 'd-labsign', 'smarthome-d', 'bookstore', 'ignisia-d', 'seatsync-admin-overview', 'techtalk', 'rfid-d', 'poster-aimatch'];
    const codes = [
      '$ git commit -m "' + ((G.commits[0] || {}).m || 'ship it') + '"',
      '@Version\nprivate Long version;\n// two people, one seat, one winner',
      'docker compose up -d\n✓ postgres  ✓ ollama  ✓ n8n',
      'model = LGBMRegressor(objective="quantile", alpha=0.9)',
      '$ vercel --prod\n✓ deployed · pac-lab-steel.vercel.app'
    ];
    const frames = [];
    pics.forEach((p, i) => {
      const im = new Image(); im.src = `assets/w/${p}.webp`; im.alt = ''; flash.appendChild(im); frames.push(im);
      if (i % 3 === 1) { const pre = document.createElement('pre'); pre.textContent = codes[(i / 3 | 0) % codes.length]; flash.appendChild(pre); frames.push(pre); }
    });
    const lines = ['INITIALIZING PORTFOLIO', 'LOADING PROJECTS', 'LOADING IDEAS', 'READY.'];
    const steps = [0, 17, 38, 61, 84, 100];
    let f = 0;
    const flashT = setInterval(() => { frames.forEach(x => x.classList.remove('on')); frames[f++ % frames.length].classList.add('on'); }, 85);
    let s = 0;
    const stepT = setInterval(() => {
      s++;
      count.textContent = pad2(steps[Math.min(s, 5)]);
      const want = Math.min(lines.length, Math.ceil((s / 5) * lines.length));
      while (log.children.length < want) { const p = document.createElement('p'); p.textContent = lines[log.children.length]; log.appendChild(p); }
      if (s >= 5) { clearInterval(stepT); setTimeout(finish, 320); }
    }, 330);
    function finish() {
      clearInterval(flashT);
      const seam = $('.loader__seam', L);
      [flash, log, count].forEach(el => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }));
      seam.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 380, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }).onfinish = () => {
        L.classList.add('is-done');
        seam.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
        const e = { duration: 1000, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' };
        $('.loader__half--top', L).animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], e);
        $('.loader__half--bot', L).animate([{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }], e).onfinish = () => L.remove();
        startScroll();
        done();
      };
    }
  }

  /* ================= CURSOR + FOLLOW ================= */
  const LABELS = { view: 'VIEW →', open: 'OPEN ↗', code: 'CODE ↗', drag: 'DRAG ↔' };
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, vx: 0 };
  addEventListener('pointermove', e => { mouse.vx = e.clientX - mouse.x; mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  const follow = (() => {
    const el = $('[data-follow]'), img = $('[data-follow-img]');
    let x = mouse.x, y = mouse.y, rot = 0, on = false, run = false;
    const loop = () => {
      x = lerp(x, mouse.x, .12); y = lerp(y, mouse.y, .12);
      rot = lerp(rot, clamp(mouse.vx * .6, -14, 14), .08); mouse.vx *= .9;
      el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`;
      if (on || Math.abs(rot) > .1) requestAnimationFrame(loop); else run = false;
    };
    return {
      show(src) { if (!fine || !el) return; if (img.getAttribute('src') !== src) img.src = src; on = true; el.classList.add('is-on'); if (!run) { run = true; x = mouse.x; y = mouse.y; loop(); } },
      hide() { if (!el) return; on = false; el.classList.remove('is-on'); }
    };
  })();

  function initCursor() {
    if (!fine || reduce) return;
    const c = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('[data-cursor-label]');
    let rx = mouse.x, ry = mouse.y;
    (function loop() {
      rx = lerp(rx, mouse.x, .2); ry = lerp(ry, mouse.y, .2);
      dot.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerover', e => {
      const lab = e.target.closest('[data-cursor]');
      if (lab && LABELS[lab.dataset.cursor]) { label.textContent = LABELS[lab.dataset.cursor]; c.classList.add('is-label'); c.classList.remove('is-link'); return; }
      c.classList.remove('is-label');
      c.classList.toggle('is-link', !!e.target.closest('a, button, input, .node, .cell, .tl__top, .hw, .wtile, [data-exp]'));
    });
    addEventListener('pointerdown', () => c.classList.add('is-down'));
    addEventListener('pointerup', () => c.classList.remove('is-down'));
  }

  function initMagnetic() {
    if (!fine || reduce) return;
    $$('.magnetic').forEach(el => {
      el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ================= NAV / MENU / RAIL ================= */
  function initNav() {
    const nav = $('[data-nav]');
    const onScroll = () => nav.classList.toggle('is-float', scrollY > 80);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    const btn = $('[data-menu-btn]'), menu = $('[data-menu]');
    const setMenu = open => { html.classList.toggle('menu-open', open); btn.setAttribute('aria-expanded', open); menu.setAttribute('aria-hidden', !open); open ? stopScroll() : startScroll(); };
    btn.addEventListener('click', () => setMenu(!html.classList.contains('menu-open')));

    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2 || !$(id)) return;
      e.preventDefault();
      if (html.classList.contains('menu-open')) setMenu(false);
      go(id);
    });

    // rail
    const items = $$('.rail li');
    const fill = $('[data-rail-fill]');
    const byKey = {};
    items.forEach(li => byKey[li.dataset.sec] = li);
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      items.forEach(li => li.classList.remove('is-on'));
      const li = byKey[e.target.dataset.section]; li && li.classList.add('is-on');
    }), { rootMargin: '-50% 0px -50% 0px' });
    $$('[data-section]').forEach(s => io.observe(s));
    const prog = () => { const m = document.documentElement.scrollHeight - innerHeight; fill && (fill.style.transform = `scaleY(${m > 0 ? scrollY / m : 0})`); };
    addEventListener('scroll', prog, { passive: true }); prog();
  }

  /* ================= HERO ================= */
  const PHOTOS = [
    { src: 'assets/w/portrait-cutout.webp', fig: 'FIG. 01 — PROFESSIONAL', pos: '50% 18%' },
    { src: 'assets/w/d-bookstore-face.webp', fig: 'FIG. 02 — CASUAL', pos: '50% 30%' },
    { src: 'assets/w/d-pitch.webp', fig: 'FIG. 03 — MID-PITCH', pos: '40% 30%' },
    { src: 'assets/w/techtalk.webp', fig: 'FIG. 04 — THE STACK SLIDE', pos: '50% 40%' }
  ];
  let slices = [];
  function buildSlices() {
    const wrap = $('[data-slices]');
    const n = isDesk() ? 9 : 7;
    wrap.innerHTML = '';
    slices = [];
    for (let i = 0; i < n; i++) {
      const s = document.createElement('div');
      s.className = 'slice'; s.style.setProperty('--i', i); s.style.setProperty('--n', n);
      s.innerHTML = `<img class="a" src="${PHOTOS[0].src}" alt="" style="object-position:${PHOTOS[0].pos}"><img class="b" alt="">`;
      wrap.appendChild(s); slices.push(s);
    }
    const pf = $('[data-portrait]'); pf.setAttribute('aria-label', 'Portraits of Akshara Kumari'); pf.dataset.lb = 'assets/w/portrait.webp'; pf.dataset.cap = PHOTOS[0].fig;
  }

  let photoIdx = 0, shuffling = false;
  function shufflePhoto(next) {
    if (shuffling) return;
    shuffling = true;
    photoIdx = next ?? (photoIdx + 1) % PHOTOS.length;
    const P = PHOTOS[photoIdx];
    $('[data-fig]').textContent = P.fig;
    const pf = $('[data-portrait]'); pf.dataset.lb = P.src === PHOTOS[0].src ? 'assets/w/portrait.webp' : P.src; pf.dataset.cap = P.fig;
    let left = slices.length;
    slices.forEach((s, i) => {
      const a = $('.a', s), b = $('.b', s);
      b.src = P.src; b.style.objectPosition = P.pos;
      const from = i % 2 ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)';
      const fin = () => { a.src = P.src; a.style.objectPosition = P.pos; b.style.clipPath = 'inset(100% 0 0 0)'; if (--left === 0) shuffling = false; };
      if (reduce || !b.animate) { fin(); return; }
      b.animate([{ clipPath: from, transform: 'scale(1.15)' }, { clipPath: 'inset(0 0 0% 0)', transform: 'scale(1)' }],
        { duration: 750, delay: i * 45, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' }).onfinish = function () { fin(); this.cancel(); };
    });
  }

  function spotlight(idx) {
    const n = slices.length;
    slices.forEach((s, i) => {
      const d = idx == null ? 0 : Math.abs(i - idx);
      s.classList.toggle('dim', d > 1.5);
      s.classList.toggle('mid', d > .5 && d <= 1.5);
    });
    return n;
  }

  function initHero() {
    buildSlices();
    const portrait = $('[data-portrait]');
    const hero = $('#intro');
    let hoverPortrait = false, shuffleT = null, sweepT = null;

    // swap words
    const words = $$('[data-swap] > span');
    let w = 0;
    setInterval(() => {
      if (reduce) return;
      const cur = words[w]; w = (w + 1) % words.length; const nx = words[w];
      cur.classList.remove('is-on'); cur.classList.add('is-out');
      nx.style.transition = 'none'; nx.classList.remove('is-out'); void nx.offsetWidth; nx.style.transition = '';
      nx.classList.add('is-on');
      setTimeout(() => cur.classList.remove('is-out'), 1000);
    }, 2300);

    // intersection list
    const li = $$('[data-intersect] li');
    let k = 0;
    setInterval(() => { li.forEach(x => x.classList.remove('is-on')); li[k++ % li.length].classList.add('is-on'); }, 900);

    // spotlight + parallax
    const centre = () => Math.floor(slices.length / 2);
    const setFromX = x => {
      const r = portrait.getBoundingClientRect();
      const t = clamp((x - r.left) / r.width, -0.3, 1.3);
      spotlight(clamp(Math.round(t * (slices.length - 1)), -2, slices.length + 1));
    };
    if (fine) {
      hero.addEventListener('pointermove', e => {
        if (!hoverPortrait) setFromX(e.clientX);
        if (reduce || !FX) return;
        const px = e.clientX / innerWidth - .5, py = e.clientY / innerHeight - .5;
        $$('[data-depth]', hero).forEach(el => gsap.to(el, { x: px * 60 * +el.dataset.depth, y: py * 40 * +el.dataset.depth, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }));
      });
      hero.addEventListener('pointerleave', () => spotlight(centre()));
      portrait.addEventListener('pointerenter', () => {
        hoverPortrait = true; spotlight(null); shufflePhoto();
        shuffleT = setInterval(() => shufflePhoto(), 1700);
      });
      portrait.addEventListener('pointerleave', () => {
        hoverPortrait = false; clearInterval(shuffleT);
        setTimeout(() => { if (!hoverPortrait && photoIdx !== 0) shufflePhoto(0); }, 300);
      });
    } else {
      // touch: tap shuffles, spotlight sweeps on its own
      portrait.addEventListener('click', () => shufflePhoto());
      let sx = 0, dir = 1;
      sweepT = setInterval(() => { sx += dir; if (sx >= slices.length - 1 || sx <= 0) dir *= -1; spotlight(sx); }, 700);
    }
    return { reveal: () => heroIntro(centre) };
  }

  function heroIntro(centre) {
    if (!FX) { spotlight(centre()); return; }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.fromTo('.hero__word, .hero__slash', { y: 0, yPercent: 105 }, { y: 0, yPercent: 0, duration: 1.4, stagger: .08 }, 0)
      .fromTo(slices, { yPercent: i => (i % 2 ? -110 : 110), opacity: 1 }, { yPercent: 0, duration: 1.3, stagger: { each: .05, from: 'center' } }, .1)
      .fromTo('[data-portrait]', { '--gap': '0px' }, { '--gap': isDesk() ? '10px' : '6px', duration: 1.2, ease: 'power3.inOut' }, 1.2)
      .add(() => spotlight(centre()), 1.5)
      .fromTo('[data-hero-meta]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: .1 }, .8)
      .fromTo('.nav', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 }, .9);

    // scroll: layers leave at different speeds
    gsap.to('.hero__line--1', { yPercent: -60, ease: 'none', scrollTrigger: { trigger: '#intro', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__line--2', { yPercent: 80, ease: 'none', scrollTrigger: { trigger: '#intro', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.portrait__slices', { yPercent: -18, scale: .92, ease: 'none', scrollTrigger: { trigger: '#intro', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ================= 01 REELS ================= */
  function reelVisual(v) {
    if (v.type === 'img') return `<div class="rframe__media${v.contain ? ' contain' : ''}"><img src="${v.src}" alt="" loading="lazy" style="object-position:${v.pos || '50% 50%'}"></div>`;
    if (v.type === 'flow') {
      const nodes = ['<b>trigger</b> · schedule / Google Drive', '<b>n8n</b> · fetch images + captions', '<b>process</b> · merge &amp; format', '<b>ollama</b> · local 7B–8B model', '<b>postgres</b> · persist + log', '<b>publish</b> · Instagram / LinkedIn queue'];
      return `<div class="rframe__media"><div class="vflow">${nodes.map((n, k) => `<div class="vflow__n pulse" style="--k:${k}">${n}</div>`).join('')}</div></div>`;
    }
    if (v.type === 'log') {
      const pick = G.commits.filter(c => /deploy|docker|vercel|railway|ci|cron|build|mailpit|smtp|test|stats/i.test(c.m)).slice(0, 9);
      return `<div class="rframe__media"><div class="vlog"><p class="dim">$ git log --grep ship</p>${pick.map(c => `<p><span>${c.d.slice(5, 10)}</span><i>●</i>${esc(c.m)}</p>`).join('')}</div></div>`;
    }
    return '';
  }

  function initReels() {
    const stage = $('[data-reels]'), dots = $('[data-reel-dots]');
    const n = S.stories.length;
    stage.innerHTML = S.stories.map((s, i) => `
      <article class="reel" data-reel="${i}">
        <div class="reel__txt">
          <p class="reel__idx">${pad2(i + 1)} / ${pad2(n)}</p>
          <h3 class="reel__key">${s.key.map(k => `<span>${k}</span>`).join('')}</h3>
          <p class="reel__desc">${esc(s.desc)}</p>
          <div class="reel__meta"><span>TAG <b>${s.tag}</b></span><span>YEAR <b>${s.year}</b></span><span>TECH <b>${s.tech}</b></span></div>
        </div>
        <div class="rframe" aria-hidden="true">
          <div class="rframe__bars">${S.stories.map((_, k) => `<i class="${k < i ? 'done' : k === i ? 'now' : ''}"><b></b></i>`).join('')}</div>
          <div class="rframe__top"><span class="av"></span>akshara · ${s.year}</div>
          ${reelVisual(s.visual)}
          <div class="rframe__cap"><b>#${s.tag.split(' · ')[0].toLowerCase().replace(/[^a-z0-9]+/g, '')}</b> ${s.tech}</div>
        </div>
      </article>`).join('');
    dots.innerHTML = S.stories.map((_, i) => `<li>${pad2(i + 1)}</li>`).join('');
    const slides = $$('.reel', stage), dotEls = $$('li', dots);
    let active = -1;
    const setActive = i => {
      if (i === active) return; active = i;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
      dotEls.forEach((d, k) => d.classList.toggle('is-on', k === i));
    };
    setActive(0);

    if (FX) {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        gsap.set(slides.slice(1), { yPercent: 100 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-reels-pin]', start: 'top top', end: () => '+=' + innerHeight * (n - 1) * 0.9,
            pin: true, scrub: .7, anticipatePin: 1,
            snap: { snapTo: 1 / (n - 1), duration: { min: .25, max: .7 }, delay: .05, ease: 'power2.inOut' },
            onUpdate: self => setActive(Math.round(self.progress * (n - 1)))
          }
        });
        for (let i = 1; i < n; i++) {
          const prev = slides[i - 1], cur = slides[i];
          tl.to($('.rframe__media', prev), { scale: 1.18, ease: 'none', duration: 1 }, i - 1)
            .to($('.reel__txt', prev), { yPercent: -18, opacity: 0, ease: 'none', duration: .6 }, i - 1)
            .fromTo(cur, { yPercent: 100 }, { yPercent: 0, ease: 'none', duration: 1 }, i - 1)
            .fromTo($('.rframe__media', cur), { scale: 1.4 }, { scale: 1, ease: 'none', duration: 1 }, i - 1)
            .fromTo($$('.reel__key span, .reel__desc, .reel__meta, .reel__idx', cur), { y: 90, opacity: 0 }, { y: 0, opacity: 1, stagger: .07, ease: 'none', duration: .45 }, i - 1 + .45);
        }
        return () => gsap.set(slides, { clearProps: 'all' });
      });
    }
    // mobile / non-FX: observe
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && (!FX || !isDesk())) setActive(+e.target.dataset.reel); }), { threshold: .55 });
    slides.forEach(s => io.observe(s));
  }

  /* ================= VELOCITY MARQUEE ================= */
  function initMarquee() {
    const track = $('[data-vmarq]');
    if (!track) return;
    let x = 0, dir = -1, vel = 0, lastY = scrollY, visible = false, half = 0;
    const measure = () => { half = track.scrollWidth / 2; };
    measure(); addEventListener('resize', measure);
    document.fonts && document.fonts.ready.then(measure);
    onView(track, v => { visible = v; if (v) loop(); });
    let running = false;
    function loop() {
      if (running) return; running = true;
      (function f() {
        const y = scrollY, dy = y - lastY; lastY = y;
        if (dy !== 0) dir = dy > 0 ? -1 : 1;
        vel = lerp(vel, Math.min(Math.abs(dy), 80), .1);
        if (!reduce) x += dir * (1.1 + vel * .45);
        if (x <= -half) x += half; if (x > 0) x -= half;
        track.style.transform = `translate3d(${x}px,0,0) skewX(${dir * -Math.min(vel * .25, 10)}deg)`;
        if (visible) requestAnimationFrame(f); else running = false;
      })();
    }
  }

  /* ================= LIFE BEYOND THE CODE ================= */
  function initLife() {
    // 01 polaroids
    const stage = $('[data-polas-stage]');
    const rots = [-7, 5, -3, 8, -10];
    const targets = isDesk()
      ? [[-30, -26, -12], [28, -24, 9], [-24, 24, 7], [30, 22, -8], [0, 0, 2]]
      : [[-18, -30, -8], [18, -16, 7], [-16, 4, 5], [16, 20, -6], [0, 34, 2]];
    stage.innerHTML = S.polaroids.map((p, i) => `
      <figure class="pola" style="z-index:${10 - i}" data-cursor="open" data-lb="${p.src}" data-cap="${esc(p.cap)}">
        <img src="${p.src}" alt="${esc(p.cap)}" loading="lazy">
        <figcaption>${esc(p.cap)}<small>IMG_${pad2(i + 1)}</small></figcaption>
      </figure>`).join('');
    const polas = $$('.pola', stage);
    polas.forEach((p, i) => { p.style.transform = `translate(-50%,-50%) rotate(${rots[i]}deg)`; });
    if (FX) {
      polas.forEach((p, i) => {
        const [tx, ty, tr] = targets[i];
        gsap.fromTo(p, { xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: rots[i] },
          { x: () => innerWidth * tx / 100, y: () => innerHeight * ty / 100, rotation: tr, ease: 'none',
            scrollTrigger: { trigger: stage, start: 'top 75%', end: 'bottom 45%', scrub: .8, invalidateOnRefresh: true } });
      });
    } else {
      polas.forEach((p, i) => { const [tx, ty, tr] = targets[i]; p.style.transform = `translate(calc(-50% + ${tx}vw), calc(-50% + ${ty}vh)) rotate(${tr}deg)`; });
    }

    // 02 film strip
    const strip = $('[data-film-strip]');
    strip.innerHTML = S.film.map((f, i) => `
      <figure class="frame" data-cursor="open" data-lb="${f.src}" data-cap="${esc(f.cap)}">
        <img src="${f.src}" alt="${esc(f.cap)}" loading="lazy">
        <figcaption><b>${String(i + 1).padStart(3, '0')}</b><span>${esc(f.cap)}</span></figcaption>
      </figure>`).join('');
    if (FX) {
      gsap.fromTo(strip, { x: () => innerWidth * .1 }, { x: () => -(strip.scrollWidth - innerWidth * .9), ease: 'none',
        scrollTrigger: { trigger: '[data-film]', start: 'top bottom', end: 'bottom top', scrub: .6, invalidateOnRefresh: true } });
    } else { $('[data-film]').style.overflowX = 'auto'; }

    // 03 hover words
    const list = $('[data-hwords]');
    list.innerHTML = S.hoverWords.map(h => `
      <li><div class="hw" data-src="${h.src}">
        <img class="hw__img" src="${h.src}" alt="" loading="lazy">
        <span class="hw__w">${h.w}</span><span class="hw__n">${esc(h.note)}</span>
      </div></li>`).join('');
    if (fine) $$('.hw', list).forEach(h => {
      h.addEventListener('pointerenter', () => follow.show(h.dataset.src));
      h.addEventListener('pointerleave', () => follow.hide());
    });

    // 04 scatter
    const sc = $('[data-scatter]');
    S.scatter.forEach(p => {
      const el = document.createElement('figure');
      el.className = 'sc' + (p.z < 2 ? ' sc--back' : '');
      el.style.cssText = `left:${p.x}%;top:${p.y}%;width:${isDesk() ? p.w : p.w * 1.8}vw;z-index:${p.z};transform:rotate(${p.r}deg)`;
      el.innerHTML = `<img src="${p.src}" alt="" loading="lazy">`;
      el.dataset.cursor = 'open'; el.dataset.lb = p.src; el.dataset.cap = 'Life beyond the code';
      sc.appendChild(el);
      if (FX) gsap.fromTo(el, { y: 260 * p.d, rotation: p.r - 10 * p.d, scale: .9 },
        { y: -320 * p.d, rotation: p.r + 10 * p.d, scale: 1 + p.d * .08, ease: 'none', scrollTrigger: { trigger: sc, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    if (FX) gsap.fromTo('.scatter__type', { scale: .85, opacity: .3 }, { scale: 1.05, opacity: 1, ease: 'none', scrollTrigger: { trigger: sc, start: 'top bottom', end: 'center center', scrub: true } });

    // 05 scroll zoom
    if (FX) {
      const z = $('[data-zoom]'), frame = $('[data-zoom-frame]');
      const tl = gsap.timeline({ scrollTrigger: { trigger: z, start: 'top top', end: 'bottom bottom', scrub: .6 } });
      tl.fromTo(frame, { clipPath: 'inset(34% 38% 34% 38% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.inOut', duration: .45 }, 0)
        .fromTo($('img', frame), { scale: 1.35 }, { scale: 1, ease: 'none', duration: .45 }, 0)
        .to(frame, { '--zdim': .62, duration: .15 }, .42)
        .to('[data-zoom-text] span', { opacity: 1, y: 0, stagger: .08, duration: .2 }, .48)
        .to('[data-zoom-text] span', { opacity: 0, y: -40, stagger: .04, duration: .12 }, .86)
        .to(frame, { opacity: .15, scale: .96, duration: .14 }, .86);
    }
  }

  /* ================= 02 ROWS ================= */
  const rowProjects = () => S.projects.filter(p => p.row);
  function splitChars(text) {
    return text.split(' ').map(w => `<span class="wd">${[...w].map(c => `<span class="ch">${esc(c)}</span>`).join('')}</span>`).join('<span class="sp"> </span>');
  }
  function initRows() {
    const ol = $('[data-rows]');
    const rows = rowProjects();
    ol.innerHTML = rows.map((p, i) => `
      <li class="row" data-row="${p.id}">
        <div class="row__main" data-cursor="view" role="button" tabindex="0" aria-label="${esc(p.title)} — ${p.case ? 'open case study' : 'open in reel mode'}">
          <span class="row__idx">${pad2(i + 1)}</span>
          <h3 class="row__title">${splitChars(p.title)}</h3>
          <div class="row__info"><p>${esc(p.line)}</p><span class="mono">${p.stack.slice(0, 4).join(' · ')}</span></div>
          <span class="row__year">${p.year}</span>
          <img class="row__thumb" src="${p.img}" alt="" loading="lazy">
        </div>
        <div class="row__links">
          <a href="${p.gh}" target="_blank" rel="noopener" class="u-link" data-cursor="code">GITHUB ↗</a>
          ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="u-link" data-cursor="open">LIVE DEMO ↗</a>` : ''}
          ${p.case ? `<a href="${p.case}" class="u-link">CASE STUDY →</a>` : `<button class="u-link" data-open-reel="${p.id}">REEL →</button>`}
          <span class="row__cat">${p.cat.toUpperCase()}</span>
        </div>
      </li>`).join('');

    $$('.row', ol).forEach(row => {
      const p = S.projects.find(x => x.id === row.dataset.row);
      const main = $('.row__main', row);
      const chars = $$('.row__title .ch', row);
      const activate = () => p.case ? go(p.case) : openReel(p.id);
      main.addEventListener('click', activate);
      main.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
      if (!fine) return;
      main.addEventListener('pointerenter', () => follow.show(p.img));
      main.addEventListener('pointerleave', () => { follow.hide(); chars.forEach(c => { c.style.transform = ''; }); });
      main.addEventListener('pointermove', e => {
        if (reduce) return;
        chars.forEach(c => {
          const r = c.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const f = Math.exp(-(dx * dx) / (2 * 110 * 110));
          c.style.transform = `translateY(${-f * 14}px) scaleY(${1 + f * .22}) skewX(${clamp(-dx * .04, -8, 8) * f}deg)`;
          c.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)';
        });
      });
    });
    ol.addEventListener('click', e => { const b = e.target.closest('[data-open-reel]'); if (b) openReel(b.dataset.openReel); });
    if (FX) $$('.row', ol).forEach(r => gsap.from(r, { opacity: 0, y: 60, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: r, start: 'top 92%' } }));
  }

  /* ================= FEATURED LAYERS ================= */
  function initFeatured() {
    const feats = $$('.feat');
    if (!FX) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      feats.forEach(f => {
        $$('.layer', f).forEach(l => gsap.to(l, { yPercent: +l.dataset.speed, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } }));
        gsap.from($('.feat__title', f), { yPercent: 40, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 75%' } });
      });
    });
    if (!fine) return;
    $$('.layer').forEach(l => {
      let drag = null;
      l.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, ox: gsap.getProperty(l, 'x'), oy: gsap.getProperty(l, 'y') }; l.setPointerCapture(e.pointerId); l.style.zIndex = 20; });
      l.addEventListener('pointermove', e => {
        if (drag) { gsap.to(l, { x: drag.ox + (e.clientX - drag.x) * .6, y: drag.oy + (e.clientY - drag.y) * .6, duration: .3, ease: 'power3.out', overwrite: 'auto' }); return; }
        const r = l.getBoundingClientRect();
        gsap.to(l, { rotationY: ((e.clientX - r.left) / r.width - .5) * 10, rotationX: -((e.clientY - r.top) / r.height - .5) * 8, transformPerspective: 1000, duration: .6, ease: 'power3.out' });
      });
      const end = () => { if (!drag) return; drag = null; gsap.to(l, { x: 0, y: 0, duration: 1.4, ease: 'elastic.out(1, .45)' }); l.style.zIndex = ''; };
      l.addEventListener('pointerup', end); l.addEventListener('pointercancel', end);
      l.addEventListener('pointerleave', () => { if (!drag) gsap.to(l, { rotationY: 0, rotationX: 0, duration: .8, ease: 'power3.out' }); });
    });
  }

  /* ================= 03 CONSTELLATION ================= */
  function initConstellation() {
    const box = $('[data-constel]'), svg = $('[data-constel-svg]'), panel = $('[data-constel-panel]');
    const names = Object.keys(S.tech);
    const BIG = ['Python', 'Java', 'React', 'Spring Boot', 'LLMs', 'Machine Learning', 'Docker', 'Agents'];
    // jittered grid layout (deterministic)
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const cols = box.clientWidth < 600 ? 3 : box.clientWidth < 1000 ? 4 : 6, rowsN = Math.ceil(names.length / cols);
    const nodes = names.map((name, i) => {
      const c = i % cols, r = (i / cols) | 0;
      const bx = (c + .5 + (rnd() - .5) * .55 + (r % 2 ? .25 : -.1)) / cols;
      const by = (r + .5 + (rnd() - .5) * .5) / rowsN;
      const el = document.createElement('button');
      el.className = 'node' + (BIG.includes(name) ? ' big' : ''); el.textContent = name; el.type = 'button';
      box.appendChild(el);
      return { name, el, bx: clamp(bx, cols === 3 ? .16 : .06, cols === 3 ? .84 : .94), by: clamp(by * .86 + .04, .05, .82), d: .4 + rnd() * 1.2, ph: rnd() * 6.28, x: 0, y: 0 };
    });
    // neighbour edges
    const edges = [];
    nodes.forEach((a, i) => {
      const near = nodes.map((b, j) => ({ j, d: Math.hypot(a.bx - b.bx, (a.by - b.by) * .6) })).filter(o => o.j !== i).sort((p, q) => p.d - q.d).slice(0, 2);
      near.forEach(o => { if (!edges.some(e => (e[0] === o.j && e[1] === i))) edges.push([i, o.j]); });
    });
    svg.innerHTML = edges.map(() => '<line/>').join('');
    const lines = $$('line', svg);
    let hot = [], pnodes = [], active = null;

    let W = 0, H = 0, mx = .5, my = .5, visible = false;
    const size = () => { W = box.clientWidth; H = box.clientHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H}`); };
    size(); addEventListener('resize', size);
    box.addEventListener('pointermove', e => { const r = box.getBoundingClientRect(); mx = (e.clientX - r.left) / W; my = (e.clientY - r.top) / H; });

    function select(n) {
      active = n;
      box.classList.toggle('has-on', !!n);
      nodes.forEach(o => o.el.classList.toggle('is-on', o === n));
      pnodes.forEach(p => p.el.remove()); hot.forEach(h => h.remove()); pnodes = []; hot = [];
      if (!n) { panel.innerHTML = '<p class="dim">SELECT A NODE</p>'; return; }
      const list = S.tech[n.name];
      panel.innerHTML = `<h4>${esc(n.name)}</h4><p class="dim">USED IN</p><ul>${list.map(p => `<li>${esc(p)}</li>`).join('')}</ul>`;
      list.forEach((p, k) => {
        const el = document.createElement('span'); el.className = 'pnode'; el.textContent = p; box.appendChild(el);
        const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line'); ln.setAttribute('class', 'hot'); svg.appendChild(ln);
        const ang = -Math.PI / 2 + (k - (list.length - 1) / 2) * .62 + (n.bx > .5 ? Math.PI : 0) * 0;
        pnodes.push({ el, ang, k, n: list.length }); hot.push(ln);
        requestAnimationFrame(() => el.classList.add('is-on'));
      });
    }
    nodes.forEach(n => {
      n.el.addEventListener('pointerenter', () => { if (fine) select(n); });
      n.el.addEventListener('focus', () => select(n));
      n.el.addEventListener('click', () => select(active === n ? null : n));
    });
    box.addEventListener('pointerleave', () => { if (fine) select(null); });

    const tick = t => {
      nodes.forEach(n => {
        const ox = reduce ? 0 : Math.sin(t / 1800 + n.ph) * 6 - (mx - .5) * 40 * n.d;
        const oy = reduce ? 0 : Math.cos(t / 2100 + n.ph) * 5 - (my - .5) * 30 * n.d;
        n.x = n.bx * W + ox; n.y = n.by * H + oy;
        n.el.style.left = n.x + 'px'; n.el.style.top = n.y + 'px';
      });
      edges.forEach((e, i) => { const a = nodes[e[0]], b = nodes[e[1]]; const l = lines[i]; l.setAttribute('x1', a.x); l.setAttribute('y1', a.y); l.setAttribute('x2', b.x); l.setAttribute('y2', b.y); });
      if (active) {
        const R = Math.min(170, W * .22);
        const dirUp = active.y > H * .45 ? -1 : 1;
        pnodes.forEach((p, i) => {
          const spread = Math.min(1.9, .55 * p.n);
          const a = (dirUp < 0 ? -Math.PI / 2 : Math.PI / 2) + (p.n > 1 ? (p.k / (p.n - 1) - .5) * spread * 2 : 0);
          const x = clamp(active.x + Math.cos(a) * R * 1.25, 90, W - 90), y = clamp(active.y + Math.sin(a) * R, 24, H - 24);
          p.el.style.left = x + 'px'; p.el.style.top = y + 'px';
          const l = hot[i]; l.setAttribute('x1', active.x); l.setAttribute('y1', active.y); l.setAttribute('x2', x); l.setAttribute('y2', y);
        });
      }
      if (visible) requestAnimationFrame(tick);
    };
    onView(box, v => { const was = visible; visible = v; if (v && !was) requestAnimationFrame(tick); });
  }

  /* ================= 04 GITHUB ================= */
  function levelOf(c) { return c === 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 10 ? 3 : 4; }
  const LANG_COL = { JavaScript: '#C8FF3E', Python: '#5EE7F0', Java: '#8B7CFF', TypeScript: '#C4C7CC', CSS: '#6d6d68', HTML: '#FF8A5B', 'Jupyter Notebook': '#F7C948' };
  function renderGhStats(data) {
    const live = data.repos.filter(r => r.h).length;
    $('[data-gh-stats]').innerHTML = [
      [data.total, 'contributions · 12 mo'], [data.repos.length, 'public repos'], [data.stars, 'stars'], [live, 'live deployments']
    ].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
    const tot = data.langs.reduce((a, [, c]) => a + c, 0) || 1;
    $('[data-langs]').innerHTML = `<p class="mono dim">PRIMARY LANGUAGE BY REPO</p>
      <div class="lbar">${data.langs.map(([l, c]) => `<span style="width:${c / tot * 100}%;background:${LANG_COL[l] || '#3a3a38'}" title="${l} ${c}"></span>`).join('')}</div>
      <div class="lleg">${data.langs.map(([l, c]) => `<span><i style="background:${LANG_COL[l] || '#3a3a38'}"></i>${l} ${c}</span>`).join('')}</div>`;
  }
  function renderCells(days) {
    const box = $('[data-cells]');
    if (!days.length) return;
    const first = new Date(days[0][0] + 'T00:00:00');
    const lead = first.getDay();
    let h = '';
    for (let i = 0; i < lead; i++) h += '<i class="cell" style="visibility:hidden"></i>';
    days.forEach(([d, c]) => { h += `<i class="cell" data-l="${levelOf(c)}" data-d="${d}" data-c="${c}"></i>`; });
    box.innerHTML = h;
    box.style.gridTemplateColumns = `repeat(${Math.ceil((days.length + lead) / 7)}, 1fr)`;
  }
  function initGitHub() {
    renderGhStats(G);
    renderCells(G.days);
    // tooltip
    const cal = $('.gh__cal'), tip = $('[data-cell-tip]');
    const byDate = {};
    G.commits.forEach(c => { const d = c.d.slice(0, 10); (byDate[d] = byDate[d] || []).push(c); });
    cal.addEventListener('pointerover', e => {
      const c = e.target.closest('.cell[data-d]');
      if (!c) { tip.classList.remove('is-on'); return; }
      const d = c.dataset.d, n = +c.dataset.c, cm = byDate[d] || [];
      const nice = new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      tip.innerHTML = `<b>${nice}</b> · ${n} contribution${n === 1 ? '' : 's'}${cm.slice(0, 3).map(x => `<br><span class="dim">${esc(x.r)}</span> — ${esc(x.m)}`).join('')}`;
      const r = c.getBoundingClientRect(), cr = cal.getBoundingClientRect();
      tip.style.left = clamp(r.left - cr.left - 100, 0, cr.width - 260) + 'px';
      tip.style.top = (r.top - cr.top - tip.offsetHeight - 10) + 'px';
      tip.classList.add('is-on');
    });
    cal.addEventListener('pointerleave', () => tip.classList.remove('is-on'));

    // commits list
    $('[data-commits]').innerHTML = G.commits.slice(0, 8).map(c => `<li><span>${new Date(c.d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span><p><em>${esc(c.r.replace(/---.*/, '').replace(/-/g, ' '))}</em> · ${esc(c.m)}</p></li>`).join('');

    // terminal
    const out = $('[data-term-out]');
    const months = {};
    G.days.forEach(([d, c]) => { const k = d.slice(0, 7); months[k] = (months[k] || 0) + c; });
    const mKeys = Object.keys(months).slice(-12);
    const max = Math.max(1, ...mKeys.map(k => months[k]));
    const blocks = '▁▂▃▄▅▆▇█';
    const spark = mKeys.map(k => months[k] === 0 ? '·' : blocks[Math.min(7, Math.round(months[k] / max * 7))]).join(' ');
    const mLabel = mKeys.map(k => new Date(k + '-01').toLocaleDateString('en', { month: 'short' })[0]).join(' ');
    const recent = [...G.repos].sort((a, b) => b.c.localeCompare(a.c)).slice(0, 5);
    const script = [
      ['$ ', 'whoami'], ['', 'Akshara Kumari'],
      ['$ ', 'current-focus'], ['', 'AI + Agents + Full Stack + DevOps'],
      ['$ ', 'github --activity'], ['', spark], ['k', mLabel], ['', `${G.total} contributions in the last 12 months`],
      ['$ ', 'repos --newest 5'], ...recent.map(r => ['', `${r.n.padEnd(34).slice(0, 34)} ${(r.l || '—')}`]),
      ['$ ', 'echo $STATUS'], ['', 'open to AI/ML & SDE opportunities ●']
    ];
    let started = false;
    onView(out, v => {
      if (!v || started) return; started = true;
      if (reduce) { out.innerHTML = script.map(([p, t]) => p ? `<span class="p">${p}</span><span class="c">${esc(t)}</span>` : `<span class="${p === 'k' ? 'k' : ''}">${esc(t)}</span>`).join('\n'); return; }
      let li = 0;
      const next = () => {
        if (li >= script.length) { out.insertAdjacentHTML('beforeend', '<span class="p">$ </span><span class="caret"></span>'); return; }
        const [p, t] = script[li++];
        if (p === '$ ') {
          const line = document.createElement('span'); out.appendChild(line);
          line.innerHTML = '<span class="p">$ </span><span class="c"></span>';
          const c = $('.c', line); let i = 0;
          const type = () => { c.textContent = t.slice(0, ++i); if (i < t.length) setTimeout(type, 28 + Math.random() * 40); else { out.appendChild(document.createTextNode('\n')); setTimeout(next, 220); } };
          type();
        } else {
          const s = document.createElement('span'); if (p === 'k') s.className = 'k'; s.textContent = t + '\n'; out.appendChild(s);
          setTimeout(next, 60);
        }
      };
      next();
    }, '-15% 0px');

    if (FX) {
      ScrollTrigger.create({ trigger: '[data-cells]', start: 'top 85%', once: true, onEnter: () => gsap.from('[data-cells] .cell', { scale: 0, opacity: 0, duration: .5, ease: 'back.out(2)', stagger: { each: .0025, from: 'start' } }) });
    }

    // live refresh (silent; keeps the snapshot if anything fails)
    Promise.allSettled([
      fetch('https://github-contributions-api.jogruber.de/v4/aksharaagarwal21?y=last').then(r => r.ok ? r.json() : Promise.reject()),
      fetch('https://api.github.com/users/aksharaagarwal21/repos?per_page=100').then(r => r.ok ? r.json() : Promise.reject())
    ]).then(([c, r]) => {
      let changed = false;
      if (c.status === 'fulfilled' && c.value.contributions) {
        G.days = c.value.contributions.map(d => [d.date, d.count]); G.total = c.value.total.lastYear; renderCells(G.days); changed = true;
      }
      if (r.status === 'fulfilled' && Array.isArray(r.value)) {
        const repos = r.value.filter(x => x.name !== 'aksharaagarwal21').map(x => ({ n: x.name, l: x.language, s: x.stargazers_count, c: x.created_at.slice(0, 10), h: x.homepage || '' }));
        const counts = {}; repos.forEach(x => { const k = x.l || 'Other'; counts[k] = (counts[k] || 0) + 1; });
        G.repos = repos; G.stars = repos.reduce((a, x) => a + x.s, 0); G.langs = Object.entries(counts).sort((a, b) => b[1] - a[1]); changed = true;
      }
      if (changed) { renderGhStats(G); $('[data-gh-src]').textContent = 'live'; $('[data-gh-src]').classList.add('acid'); }
    });
  }

  /* ================= 05 ABOUT ================= */
  function initAbout() {
    const lines = $$('[data-aline]'), photos = $$('.about__photos .ap');
    if (!FX) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const parts = lines.map(l => {
        if (window.SplitType) { const st = new SplitType(l, { types: 'words' }); return st.words; }
        return [l];
      });
      gsap.set(lines, { opacity: 1 });
      parts.forEach(ws => gsap.set(ws, { yPercent: 120, opacity: 0, rotate: 4 }));
      const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-about-pin]', start: 'top top', end: '+=260%', pin: true, scrub: .7 } });
      parts.forEach((ws, i) => {
        const at = i * 1.2;
        tl.to(ws, { yPercent: 0, opacity: 1, rotate: 0, stagger: .05, duration: .5, ease: 'power3.out' }, at)
          .fromTo(photos[i], { opacity: 0, scale: 1.25, y: 80 }, { opacity: .9, scale: 1, y: 0, duration: .7, ease: 'power2.out' }, at);
        if (i < parts.length - 1) tl.to(ws, { yPercent: -120, opacity: 0, stagger: .03, duration: .4, ease: 'power2.in' }, at + .85)
          .to(photos[i], { opacity: .12, y: -60, duration: .5 }, at + .85);
      });
      tl.to({}, { duration: .4 });
      return () => { parts.forEach(ws => gsap.set(ws, { clearProps: 'all' })); if (window.SplitType) lines.forEach(l => SplitType.revert(l)); };
    });
    mm.add('(max-width: 899px)', () => {
      lines.forEach(l => gsap.from(l, { opacity: 0, y: 50, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 85%' } }));
    });
  }

  function initTimeline() {
    const box = $('[data-timeline]');
    box.innerHTML = S.timeline.map((t, i) => `
      <div class="tl__row" data-tl>
        <div class="tl__top" role="button" tabindex="0" aria-expanded="false">
          <span class="tl__year">${t.year}</span>
          <div><h3 class="tl__title">${t.title}</h3><p class="tl__lead">${esc(t.lead)}</p></div>
          <span class="tl__plus">+</span>
        </div>
        <div class="tl__more"><div class="tl__inner"><div class="tl__body">
          <div class="tl__items">${t.items.map(([k, v]) => `<span data-k="${k}">${esc(v)}</span>`).join('')}</div>
          <div class="tl__photos">${t.photos.map((p, k) => `<img src="${p}" alt="" loading="lazy" style="--r:${[-4, 3, -2][k % 3]}deg" data-cursor="open" data-lb="${p}" data-cap="${t.year}">`).join('')}</div>
        </div></div></div>
      </div>`).join('');
    $$('[data-tl]', box).forEach(row => {
      const top = $('.tl__top', row);
      const set = o => { row.classList.toggle('is-open', o); top.setAttribute('aria-expanded', o); };
      if (fine) { row.addEventListener('pointerenter', () => set(true)); row.addEventListener('pointerleave', () => set(false)); }
      top.addEventListener('click', () => set(!row.classList.contains('is-open')));
      top.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(!row.classList.contains('is-open')); } });
    });
  }

  /* ================= WALL ================= */
  function initWall() {
    const view = $('[data-wall]'), plane = $('[data-wall-plane]');
    const T = isDesk() ? 260 : 190, C = 6, items = S.wall, R = Math.ceil(items.length / C);
    const BW = C * T, BH = R * T;
    let copiesX, copiesY;
    const build = () => {
      copiesX = Math.ceil(view.clientWidth / BW) + 1; copiesY = Math.ceil(view.clientHeight / BH) + 1;
      let h = '';
      for (let cy = 0; cy < copiesY; cy++) for (let cx = 0; cx < copiesX; cx++) items.forEach((it, i) => {
        const x = cx * BW + (i % C) * T + ((i / C | 0) % 2 ? T / 2 : 0), y = cy * BH + (i / C | 0) * T;
        h += `<div class="wtile" style="left:${x}px;top:${y}px;width:${T}px;height:${T}px" ${it.t === 'img' ? `data-cursor="open" data-lb="${it.src}" data-cap="${esc(it.cap)}"` : ''}>
          <div class="wtile__in">${it.t === 'img' ? `<img src="${it.src}" alt="${esc(it.cap)}" loading="lazy">` : `<b${it.big.length > 5 ? ' class="long"' : ''}>${esc(it.big)}</b>`}<p>${esc(it.cap)}</p></div></div>`;
      });
      plane.innerHTML = h;
    };
    build();
    let ox = 0, oy = 0, vx = -.5, vy = -.2, tx = -.5, ty = -.2, frozen = false, visible = false;
    view.addEventListener('pointermove', e => {
      const r = view.getBoundingClientRect();
      tx = -((e.clientX - r.left) / r.width - .5) * 5; ty = -((e.clientY - r.top) / r.height - .5) * 3.5;
      frozen = !!e.target.closest('.wtile');
    });
    view.addEventListener('pointerleave', () => { tx = -.5; ty = -.2; frozen = false; });
    const tick = () => {
      const k = frozen ? 0 : 1;
      vx = lerp(vx, tx * k, .05); vy = lerp(vy, ty * k, .05);
      if (!reduce) { ox += vx; oy += vy; }
      ox = ((ox % BW) - BW) % BW; oy = ((oy % BH) - BH) % BH;
      plane.style.transform = `translate3d(${ox}px,${oy}px,0)`;
      if (visible) requestAnimationFrame(tick);
    };
    onView(view, v => { const was = visible; visible = v; if (v && !was) tick(); });
  }

  /* ================= 06 LAB ================= */
  function sizeCanvas(cv) {
    const dpr = Math.min(devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
    cv.width = r.width * dpr; cv.height = r.height * dpr;
    const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: r.width, h: r.height };
  }
  function runWhenVisible(el, frame) {
    let vis = false, run = false;
    const loop = t => { if (!vis) { run = false; return; } frame(t); requestAnimationFrame(loop); };
    onView(el, v => { vis = v; if (v && !run) { run = true; requestAnimationFrame(loop); } });
  }

  function labParticles(root) {
    const cv = $('canvas', root);
    let { ctx, w, h } = sizeCanvas(cv);
    const words = ['AK', 'AI', '</>', '9.94', 'BUILD'];
    let wi = 0, pts = [], m = { x: -999, y: -999 };
    function sample(word) {
      const W2 = Math.floor(w), H2 = Math.floor(h);
      const off = document.createElement('canvas'); off.width = W2; off.height = H2;
      const o = off.getContext('2d');
      o.fillStyle = '#fff'; o.textAlign = 'center'; o.textBaseline = 'middle';
      let fs = Math.min(h * .62, w / (word.length * .62));
      o.font = `600 ${fs}px "Clash Display", "Space Grotesk", sans-serif`;
      o.fillText(word, w / 2, h / 2 - 16);
      const data = o.getImageData(0, 0, W2, H2).data, out = [];
      const step = Math.max(4, Math.round(Math.sqrt(w * h / 2600)));
      for (let y = 0; y < H2; y += step) for (let x = 0; x < W2; x += step) if (data[(y * W2 + x) * 4 + 3] > 128) out.push([x, y]);
      return out;
    }
    function morph() {
      const targets = sample(words[wi]);
      while (pts.length < targets.length) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, hx: 0, hy: 0, g: Math.random() < .14 });
      pts.length = targets.length;
      pts.forEach((p, i) => { p.hx = targets[i][0]; p.hy = targets[i][1]; });
    }
    morph();
    root.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; });
    root.addEventListener('pointerleave', () => { m.x = m.y = -999; });
    root.addEventListener('click', () => { wi = (wi + 1) % words.length; pts.forEach(p => { p.vx += (Math.random() - .5) * 20; p.vy += (Math.random() - .5) * 20; }); morph(); });
    addEventListener('resize', () => { ({ ctx, w, h } = sizeCanvas(cv)); morph(); });
    runWhenVisible(root, () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const dx = p.x - m.x, dy = p.y - m.y, d2 = dx * dx + dy * dy;
        if (d2 < 9000) { const f = (9000 - d2) / 9000 * 2.4; const d = Math.sqrt(d2) || 1; p.vx += dx / d * f; p.vy += dy / d * f; }
        p.vx += (p.hx - p.x) * .02; p.vy += (p.hy - p.y) * .02;
        p.vx *= .86; p.vy *= .86; p.x += p.vx; p.y += p.vy;
        ctx.fillStyle = p.g ? '#C8FF3E' : 'rgba(237,237,232,.85)';
        ctx.fillRect(p.x, p.y, 2, 2);
      }
    });
  }

  function labTerminal(root) {
    const out = $('[data-mterm-out]', root), input = $('input', root);
    const hist = []; let hi = 0;
    const print = (t, cls = '') => { const s = document.createElement('div'); if (cls) s.className = cls; s.textContent = t; out.appendChild(s); out.scrollTop = out.scrollHeight; };
    const C = {
      help: () => 'commands: whoami · projects · stack · github · cgpa · contact · resume · reel · dev · date · clear · sudo hire',
      whoami: () => 'Akshara Kumari — CSE × Big Data Analytics @ SRM IST. builds AI systems and the products around them.',
      projects: () => rowProjects().map((p, i) => `${pad2(i + 1)}  ${p.title.padEnd(22)} ${p.year}`).join('\n') + '\n→ type "reel" for the reel viewer',
      stack: () => 'python · java · spring boot · react · next.js · fastapi · tensorflow · pytorch · langchain · docker · postgres · kafka',
      github: () => `${G.repos.length} public repos · ${G.total} contributions (12 mo) · ${G.stars} stars\nhttps://github.com/aksharaagarwal21`,
      cgpa: () => '9.94 / 10 — and a ₹76,875 performance scholarship',
      contact: () => 'aksharakumari1208@gmail.com · linkedin.com/in/akshara-kumari-bb38b535b',
      resume: () => { window.open('assets/docs/Akshara_Kumari_Resume_AIML.pdf', '_blank'); return 'opening résumé…'; },
      reel: () => { setTimeout(() => openReel(), 200); return 'opening reel mode…'; },
      dev: () => { toggleDev(); return html.classList.contains('dev') ? 'dev mode: on' : 'dev mode: off'; },
      date: () => new Date().toString(),
      clear: () => { out.innerHTML = ''; return null; },
      'sudo hire': () => { setTimeout(() => { location.href = 'mailto:aksharakumari1208@gmail.com?subject=Let%27s%20talk'; }, 700); return '[sudo] permission granted ✓ opening mail…'; },
      sudo: () => 'usage: sudo hire',
      ls: () => 'about/  work/  lab/  contact/  secrets.txt',
      'cat secrets.txt': () => '↑ ↑ ↓ ↓ ← → ← → B A'
    };
    print('akshara-os v2026 — type "help"', 'dim');
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') { if (hi > 0) input.value = hist[--hi]; e.preventDefault(); return; }
      if (e.key === 'ArrowDown') { input.value = hi < hist.length - 1 ? hist[++hi] : (hi = hist.length, ''); e.preventDefault(); return; }
      if (e.key !== 'Enter') return;
      const cmd = input.value.trim().toLowerCase().replace(/^sudo hire-akshara$/, 'sudo hire'); input.value = '';
      if (!cmd) return;
      hist.push(cmd); hi = hist.length;
      print('› ' + cmd, 'p');
      const fn = C[cmd]; const res = fn ? fn() : `command not found: ${cmd} — try "help"`;
      if (res) print(res);
    });
    root.addEventListener('click', () => input.focus({ preventScroll: true }));
  }

  function labGravity(root) {
    const cv = $('canvas', root);
    let { ctx, w, h } = sizeCanvas(cv);
    const labels = ['python', 'java', 'react', 'docker', 'llms', 'kafka', 'rag', 'sql', 'spring', 'ml', 'git', 'agents', 'next.js', 'linux'];
    const bodies = labels.map((l, i) => ({ l, r: 22 + l.length * 3.2, x: 40 + (i * 57) % (w - 80), y: -40 - i * 40, vx: (Math.random() - .5) * 4, vy: 0, acid: i % 4 === 0 }));
    let grab = null, last = null;
    const pos = e => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    cv.addEventListener('pointerdown', e => { const p = pos(e); grab = bodies.find(b => Math.hypot(b.x - p.x, b.y - p.y) < b.r); if (grab) { cv.setPointerCapture(e.pointerId); last = p; } });
    cv.addEventListener('pointermove', e => { if (!grab) return; const p = pos(e); grab.vx = p.x - last.x; grab.vy = p.y - last.y; grab.x = p.x; grab.y = p.y; last = p; });
    const drop = () => { grab = null; }; cv.addEventListener('pointerup', drop); cv.addEventListener('pointercancel', drop);
    cv.style.touchAction = 'none';
    addEventListener('resize', () => ({ ctx, w, h } = sizeCanvas(cv)));
    const floor = () => h - 42;
    runWhenVisible(root, () => {
      ctx.clearRect(0, 0, w, h);
      bodies.forEach(b => {
        if (b !== grab) { b.vy += .45; b.vx *= .995; b.x += b.vx; b.y += b.vy; }
        if (b.y + b.r > floor()) { b.y = floor() - b.r; b.vy *= -.45; b.vx *= .92; }
        if (b.x - b.r < 0) { b.x = b.r; b.vx *= -.6; } if (b.x + b.r > w) { b.x = w - b.r; b.vx *= -.6; }
      });
      for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i], b = bodies[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, min = a.r + b.r;
        if (d < min) { const o = (min - d) / 2, nx = dx / d, ny = dy / d; if (a !== grab) { a.x -= nx * o; a.y -= ny * o; } if (b !== grab) { b.x += nx * o; b.y += ny * o; } const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny; if (rv < 0) { const imp = -rv * .8; a.vx -= imp * nx / 2; a.vy -= imp * ny / 2; b.vx += imp * nx / 2; b.vy += imp * ny / 2; } }
      }
      bodies.forEach(b => {
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283);
        ctx.fillStyle = b.acid ? '#C8FF3E' : '#141414'; ctx.fill();
        ctx.strokeStyle = b.acid ? '#C8FF3E' : 'rgba(237,237,232,.25)'; ctx.stroke();
        ctx.fillStyle = b.acid ? '#050505' : '#EDEDE8'; ctx.font = '500 11px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(b.l, b.x, b.y);
      });
    });
  }

  function labNN(root) {
    const cv = $('canvas', root);
    let { ctx, w, h } = sizeCanvas(cv);
    const layers = [4, 6, 6, 3], outs = ['ship', 'learn', 'repeat'];
    let nodes = [], edges = [], pulses = [], hover = null;
    const layout = () => {
      nodes = []; edges = [];
      layers.forEach((n, li) => { for (let i = 0; i < n; i++) nodes.push({ li, i, x: 40 + li * (w - 110) / (layers.length - 1), y: (h - 42) / 2 + (i - (n - 1) / 2) * Math.min(46, (h - 90) / n), a: 0 }); });
      nodes.forEach(a => nodes.forEach(b => { if (b.li === a.li + 1) edges.push({ a, b, wt: Math.random() }); }));
    };
    layout();
    const fire = () => nodes.filter(n => n.li === 0).forEach(n => { n.a = 1; edges.filter(e => e.a === n).forEach(e => { if (Math.random() < .7) pulses.push({ e, t: 0 }); }); });
    root.addEventListener('click', fire);
    cv.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; hover = nodes.find(n => Math.hypot(n.x - x, n.y - y) < 14) || null; });
    addEventListener('resize', () => { ({ ctx, w, h } = sizeCanvas(cv)); layout(); });
    let lastFire = 0;
    runWhenVisible(root, t => {
      if (t - lastFire > 2600) { fire(); lastFire = t; }
      ctx.clearRect(0, 0, w, h);
      edges.forEach(e => { const on = hover && (e.a === hover || e.b === hover); ctx.strokeStyle = on ? 'rgba(200,255,62,.6)' : `rgba(237,237,232,${.04 + e.wt * .08})`; ctx.lineWidth = on ? 1.4 : 1; ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y); ctx.stroke(); });
      pulses = pulses.filter(p => {
        p.t += .035;
        const x = lerp(p.e.a.x, p.e.b.x, p.t), y = lerp(p.e.a.y, p.e.b.y, p.t);
        ctx.fillStyle = '#C8FF3E'; ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 6.283); ctx.fill();
        if (p.t >= 1) { const b = p.e.b; b.a = 1; if (b.li < layers.length - 1 && !p.done) edges.filter(e => e.a === b).forEach(e => { if (Math.random() < .35) pulses.push({ e, t: 0 }); }); return false; }
        return true;
      });
      nodes.forEach(n => {
        n.a *= .94;
        ctx.beginPath(); ctx.arc(n.x, n.y, 7, 0, 6.283);
        ctx.fillStyle = `rgba(200,255,62,${n.a})`; ctx.fill();
        ctx.strokeStyle = n === hover ? '#C8FF3E' : 'rgba(237,237,232,.4)'; ctx.stroke();
        if (n.li === layers.length - 1) { ctx.fillStyle = 'rgba(237,237,232,.7)'; ctx.font = '11px "JetBrains Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(outs[n.i], n.x + 14, n.y + 4); }
      });
    });
  }

  function labGenType(root) {
    const box = $('[data-gtype]', root), input = $('input', root);
    let chars = [];
    const build = () => { box.innerHTML = [...(input.value || 'build')].map(c => `<span>${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join(''); chars = $$('span', box); };
    build(); input.addEventListener('input', build);
    let m = null;
    root.addEventListener('pointermove', e => { m = { x: e.clientX, y: e.clientY }; });
    root.addEventListener('pointerleave', () => { m = null; });
    runWhenVisible(root, t => {
      chars.forEach((c, i) => {
        let f = 0, dx = 0;
        if (m) { const r = c.getBoundingClientRect(); dx = m.x - (r.left + r.width / 2); const dy = m.y - (r.top + r.height / 2); f = Math.exp(-(dx * dx + dy * dy) / (2 * 70 * 70)); }
        const wave = reduce ? 0 : Math.sin(t / 500 + i * .6) * 4;
        c.style.transform = `translateY(${wave - f * 20}px) scaleY(${1 + f * .9}) scaleX(${1 - f * .25}) skewX(${clamp(dx * -.15, -18, 18) * f}deg)`;
        c.style.color = f > .45 ? '#C8FF3E' : '';
      });
    });
  }

  function labCube(root) {
    const obj = $('.cube3d__obj', root), stage = $('[data-cube]', root);
    let rx = -18, ry = 30, vx = 0, vy = .25, drag = null;
    stage.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; stage.setPointerCapture(e.pointerId); });
    stage.addEventListener('pointermove', e => { if (!drag) return; vy = (e.clientX - drag.x) * .35; vx = -(e.clientY - drag.y) * .35; drag = { x: e.clientX, y: e.clientY }; });
    const end = () => { drag = null; }; stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
    runWhenVisible(root, () => {
      if (!drag) { vx *= .95; vy = lerp(vy, reduce ? 0 : .25, .02); }
      rx = clamp(rx + vx, -80, 80); ry += vy;
      obj.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  }

  function initLab() {
    const map = { particles: labParticles, terminal: labTerminal, gravity: labGravity, nn: labNN, gentype: labGenType, cube: labCube };
    $$('[data-exp]').forEach(el => {
      let started = false;
      onView(el, v => { if (v && !started) { started = true; try { map[el.dataset.exp](el); } catch (e) { console.warn('lab', el.dataset.exp, e); } } }, '200px');
    });
  }

  /* ================= 07 CONTACT ================= */
  function initContact() {
    const big = $('[data-push]');
    // split text nodes into chars, preserving inner spans
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...n.textContent].forEach(c => { if (!c.trim()) { frag.appendChild(document.createTextNode(c)); return; } const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; frag.appendChild(s); });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(big);
    const chars = $$('.ch', big).map(el => ({ el, x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 }));
    if (FX) gsap.from(chars.map(c => c.el), { yPercent: 110, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .03, scrollTrigger: { trigger: big, start: 'top 80%' } });
    if (!fine || reduce) return;
    const sec = $('#contact');
    let m = null, visible = false;
    sec.addEventListener('pointermove', e => { m = { x: e.clientX, y: e.clientY }; });
    sec.addEventListener('pointerleave', () => { m = null; });
    const tick = () => {
      chars.forEach(c => {
        c.tx = c.ty = c.tr = 0;
        if (m) {
          const r = c.el.getBoundingClientRect();
          const cx = r.left + r.width / 2 - c.x, cy = r.top + r.height / 2 - c.y;
          const dx = cx - m.x, dy = cy - m.y, d = Math.hypot(dx, dy), R = 220;
          if (d < R) { const f = (1 - d / R) ** 2; c.tx = dx / (d || 1) * f * 60; c.ty = dy / (d || 1) * f * 60; c.tr = dx * f * .08; }
        }
        c.x = lerp(c.x, c.tx, .12); c.y = lerp(c.y, c.ty, .12); c.r = lerp(c.r, c.tr, .12);
        c.el.style.transform = `translate(${c.x}px, ${c.y}px) rotate(${c.r}deg)`;
      });
      if (visible) requestAnimationFrame(tick);
    };
    onView(sec, v => { const was = visible; visible = v; if (v && !was) tick(); });
  }

  /* ================= REEL MODE ================= */
  let reelIndex = {};
  function initReelMode() {
    const box = $('[data-rmode]'), sc = $('[data-rmode-scroller]');
    const list = S.projects;
    $('[data-rmode-tot]').textContent = pad2(list.length);
    sc.innerHTML = list.map((p, i) => {
      reelIndex[p.id] = i;
      const img = p.mob || p.img, wide = !p.mob && /poster|stockout/.test(p.img);
      return `<section class="rm" data-i="${i}">
        <div class="rm__bg" style="background-image:url(${p.img})"></div>
        <div class="rm__text">
          <p class="mono acid">${pad2(i + 1)} · ${p.cat.toUpperCase()} · ${p.year}</p>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.line)}</p>
          <div class="rm__links"><a href="${p.gh}" target="_blank" rel="noopener" class="u-link">GITHUB ↗</a>${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="u-link">LIVE ↗</a>` : ''}</div>
        </div>
        <div class="rm__phone"><img src="${img}" alt="${esc(p.title)} screenshot" loading="lazy" class="${wide ? 'wide' : ''}"></div>
        <div class="rm__tags">${p.stack.map(t => `<span>${esc(t.toUpperCase())}</span>`).join('')}</div>
      </section>`;
    }).join('');
    const items = $$('.rm', sc);
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); $('[data-rmode-cur]').textContent = pad2(+e.target.dataset.i + 1); } else e.target.classList.remove('is-in'); }), { root: sc, threshold: .6 });
    items.forEach(it => io.observe(it));
    $('[data-rmode-close]').addEventListener('click', closeReel);
    $('[data-reelmode-open]').addEventListener('click', e => {
      const r = e.currentTarget.getBoundingClientRect();
      box.style.setProperty('--ox', clamp(r.left + r.width / 2, 0, innerWidth) + 'px'); box.style.setProperty('--oy', clamp(r.top + r.height / 2, 0, innerHeight) + 'px');
      openReel();
    });
    addEventListener('keydown', e => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeReel();
      if (['ArrowDown', 'j', 'PageDown'].includes(e.key)) { e.preventDefault(); sc.scrollBy({ top: sc.clientHeight, behavior: 'smooth' }); }
      if (['ArrowUp', 'k', 'PageUp'].includes(e.key)) { e.preventDefault(); sc.scrollBy({ top: -sc.clientHeight, behavior: 'smooth' }); }
    });
  }
  function openReel(id) {
    const box = $('[data-rmode]'), sc = $('[data-rmode-scroller]');
    const i = id != null && reelIndex[id] != null ? reelIndex[id] : 0;
    box.classList.add('is-open'); box.setAttribute('aria-hidden', 'false');
    stopScroll(); document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { sc.scrollTop = i * sc.clientHeight; $('[data-rmode-close]').focus({ preventScroll: true }); });
    follow.hide();
  }
  function closeReel() {
    const box = $('[data-rmode]');
    box.classList.remove('is-open'); box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; startScroll();
  }

  /* ================= LIGHTBOX ================= */
  function initLightbox() {
    const lb = $('[data-lbox]'), img = $('img', lb), cap = $('p', lb);
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-lb]');
      if (!t || e.target.closest('[data-rmode]')) return;
      if (!fine && t.matches('[data-portrait]')) return;
      img.src = t.dataset.lb; img.alt = t.dataset.cap || ''; cap.textContent = t.dataset.cap || '';
      lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); stopScroll();
    });
    const close = () => { if (!lb.classList.contains('is-open')) return; lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); startScroll(); };
    lb.addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ================= FOOTER ================= */
  function initFooter() {
    const clock = $('[data-clock]'), yr = $('[data-year]'), st = $('[data-status]');
    yr.textContent = new Date().getFullYear();
    const fmt = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
    setInterval(() => { clock.textContent = fmt.format(new Date()); }, 1000);
    clock.textContent = fmt.format(new Date());
    const glyphs = '!<>-_\\/[]{}—=+*^?#01';
    let si = 0;
    setInterval(() => {
      si = (si + 1 + Math.floor(Math.random() * (S.statuses.length - 1))) % S.statuses.length;
      const target = S.statuses[si];
      if (reduce) { st.textContent = target; return; }
      let f = 0; const total = 18;
      const scr = () => { st.textContent = [...target].map((c, i) => i < (f / total) * target.length ? c : (c === ' ' ? ' ' : glyphs[Math.random() * glyphs.length | 0])).join(''); if (++f <= total) requestAnimationFrame(scr); };
      scr();
    }, 3600);
  }

  /* ================= SPLIT HEADINGS ================= */
  function initHeadings() {
    $$('[data-split-lines]').forEach(h => {
      h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map(part => `<span class="mask" style="display:block"><span class="ln" style="display:block">${part}</span></span>`).join('');
      if (FX) gsap.fromTo($$('.ln', h), { yPercent: 110 }, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
  }

  /* ================= EASTER EGGS ================= */
  function toggleDev(force) {
    const on = force ?? !html.classList.contains('dev');
    html.classList.toggle('dev', on);
  }
  function initEggs() {
    const K = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    let k = 0, buf = '';
    addEventListener('keydown', e => {
      if (e.target.closest && e.target.closest('input, textarea')) return;
      const key = e.key.toLowerCase();
      if (key === 'escape' && html.classList.contains('dev')) toggleDev(false);
      k = key === K[k] ? k + 1 : (key === K[0] ? 1 : 0);
      if (k === K.length) { k = 0; toggleDev(); }
      if (e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-12);
        const cmds = { '/projects': () => openReel(), '/github': () => go('#github'), '/about': () => go('#about'), '/lab': () => go('#lab'), '/contact': () => go('#contact'), '/work': () => go('#work') };
        for (const c in cmds) if (buf.endsWith(c)) { buf = ''; cmds[c](); break; }
      }
    });
  }

  /* ================= BOOT ================= */
  const boot = () => {
    initLenis();
    initCursor();
    initNav();
    const hero = initHero();
    initReels();
    initMarquee();
    initLife();
    initRows();
    initFeatured();
    initConstellation();
    initGitHub();
    initAbout();
    initTimeline();
    initWall();
    initLab();
    initContact();
    initReelMode();
    initLightbox();
    initFooter();
    initHeadings();
    initEggs();
    initMagnetic();
    window.scrollTo(0, 0);
    loader(() => { hero.reveal(); if (hasGSAP) ScrollTrigger.refresh(); });
    addEventListener('load', () => hasGSAP && ScrollTrigger.refresh());
    document.fonts && document.fonts.ready.then(() => hasGSAP && ScrollTrigger.refresh());
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

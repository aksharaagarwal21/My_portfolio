/* =========================================================
   Akshara Kumari — portfolio script
   Theme, navigation, scroll effects and small interactions.
   ========================================================= */
(() => {
  const root = document.documentElement;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const header = $('[data-header]');
  const nav = $('[data-nav]');
  const toggle = $('[data-nav-toggle]');
  const resume = $('[data-resume]');

  /* ---------- theme ---------- */
  $('[data-theme-toggle]').addEventListener('click', () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    root.classList.add('is-theming');
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
    setTimeout(() => root.classList.remove('is-theming'), 500);
  });

  /* ---------- mobile menu ---------- */
  const setMenu = open => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

  /* ---------- résumé menu: close on outside click or Escape ---------- */
  document.addEventListener('click', e => {
    if (resume.open && !resume.contains(e.target)) resume.open = false;
    if (header.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    resume.open = false;
    setMenu(false);
  });

  /* ---------- copy email ---------- */
  const copy = $('[data-copy]');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copy.dataset.copy); } catch (e) { return; }
    copy.classList.add('is-copied');
    setTimeout(() => copy.classList.remove('is-copied'), 2000);
  });

  /* ---------- footer year ---------- */
  $('[data-year]').textContent = new Date().getFullYear();

  /* ---------- scroll: header, progress bar, experience timeline ---------- */
  const progress = $('[data-progress]');
  const timeline = $('[data-timeline]');
  const tlItems = $$('.tl-item', timeline);
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = window.scrollY;
    const max = root.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 16);
    progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

    const mark = window.innerHeight * .6;
    const box = timeline.getBoundingClientRect();
    timeline.style.setProperty('--fill', Math.min(1, Math.max(0, (mark - box.top) / box.height)).toFixed(4));
    tlItems.forEach(item => item.classList.toggle('is-on', item.getBoundingClientRect().top + 40 < mark));
  };
  const requestScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  };
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll);
  onScroll();

  /* ---------- rotating words in the hero ---------- */
  const words = $$('[data-rotator] > span');
  if (!reduceMotion && words.length > 1) {
    let index = 0;
    setInterval(() => {
      const current = words[index];
      index = (index + 1) % words.length;
      const next = words[index];
      current.classList.replace('is-active', 'is-leaving');
      next.classList.remove('is-leaving');
      next.classList.add('is-active');
      setTimeout(() => current.classList.remove('is-leaving'), 700);
    }, 2600);
  }

  /* ---------- count-up stats ---------- */
  const countUp = el => {
    const target = el.dataset.count;
    const end = parseFloat(target);
    const decimals = (target.split('.')[1] || '').length;
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / 1600);
      el.textContent = (end * (1 - Math.pow(1 - t, 4))).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!reduceMotion) {
    const counters = $$('[data-count]');
    counters.forEach(el => { el.textContent = '0'; });
    setTimeout(() => counters.forEach(countUp), 850);
  }

  /* ---------- cursor spotlight and screenshot tilt (mouse only) ---------- */
  if (finePointer) {
    $$('.spot').forEach(el => el.addEventListener('pointermove', e => {
      const box = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - box.left}px`);
      el.style.setProperty('--my', `${e.clientY - box.top}px`);
    }));
  }
  if (finePointer && !reduceMotion) {
    $$('[data-tilt]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const box = el.getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width - .5;
        const y = (e.clientY - box.top) / box.height - .5;
        el.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
      });
      el.addEventListener('pointerleave', () => {
        el.style.removeProperty('--rx');
        el.style.removeProperty('--ry');
      });
    });
  }

  const reveals = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  /* ---------- reveal on scroll, staggered per batch ---------- */
  const show = new IntersectionObserver((entries, observer) => {
    let order = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty('--delay', `${order++ * 90}ms`);
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => show.observe(el));

  /* ---------- active nav link with sliding indicator ---------- */
  const indicator = $('[data-indicator]');
  const links = $$('a[href^="#"]', nav);
  let active = null;
  const moveIndicator = () => {
    if (!active) { indicator.classList.remove('is-on'); return; }
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.transform = `translateX(${active.offsetLeft}px)`;
    indicator.classList.add('is-on');
  };
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      active = links.find(a => a.hash === `#${entry.target.id}`) || null;
      links.forEach(a => a.classList.toggle('is-active', a === active));
      moveIndicator();
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  [$('#top'), ...links.map(a => $(a.hash))].forEach(section => { if (section) spy.observe(section); });
  window.addEventListener('resize', moveIndicator);
})();

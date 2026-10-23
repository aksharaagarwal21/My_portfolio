/* =========================================================
   Akshara Kumari — portfolio script
   Mobile menu, active nav link, section fade-in, résumé menu.
   ========================================================= */
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const resume = document.querySelector('[data-resume]');

  /* ---------- mobile menu ---------- */
  const setMenu = open => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

  /* ---------- header border once the page scrolls ---------- */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- résumé menu: close on outside click or Escape ---------- */
  document.addEventListener('click', e => {
    if (resume.open && !resume.contains(e.target)) resume.open = false;
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    resume.open = false;
    setMenu(false);
  });

  /* ---------- footer year ---------- */
  document.querySelector('[data-year]').textContent = new Date().getFullYear();

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  /* ---------- highlight the nav link for the section in view ---------- */
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.toggle('is-active', a.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => {
    const section = document.querySelector(a.hash);
    if (section) spy.observe(section);
  });

  /* ---------- fade sections in once ---------- */
  const show = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  reveals.forEach(el => show.observe(el));
})();

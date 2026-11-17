// Pablo Campayo Viñes · web personal
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* idioma */
  const btn = $('#lang');
  function setLang(l) {
    root.lang = l;
    if (btn) { btn.textContent = l === 'en' ? 'Español' : 'English'; btn.lang = l === 'en' ? 'es' : 'en'; }
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  let saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved || (/^(es|ca|gl|eu)/i.test(navigator.language || 'es') ? 'es' : 'en'));
  btn && btn.addEventListener('click', () => setLang(root.lang === 'en' ? 'es' : 'en'));

  /* borde de la barra al bajar */
  const bar = $('.bar');
  const onScroll = () => bar && bar.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* retraso escalonado dentro de una misma rejilla */
  $$('.skills, .projects, .feat, .big-steps, .cv, .two, .others').forEach(g =>
    $$(':scope > .rv', g).forEach((el, i) => el.style.setProperty('--d', (i % 6) * 0.08 + 's')));

  /* aparición al hacer scroll */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('on'); io.unobserve(e.target);
  }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach(el => calm ? el.classList.add('on') : io.observe(el));

  /* mapa del recorrido: se dibuja una vez al cargar */
  $$('.route .trip').forEach(p => { if (p.getTotalLength) { const l = Math.ceil(p.getTotalLength()); p.style.strokeDasharray = l; p.style.strokeDashoffset = calm ? 0 : l; } });
  requestAnimationFrame(() => $$('.route').forEach(r => r.classList.add('go')));

  /* guías desplegables */
  $$('details.guide').forEach(d => {
    const sum = $('summary', d), box = $('.in', d);
    sum.addEventListener('click', e => {
      if (calm) return;
      e.preventDefault();
      if (d.open) {
        box.animate([{ height: box.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 280, easing: 'ease-in' }).onfinish = () => d.open = false;
      } else {
        d.open = true;
        box.animate([{ height: '0px', opacity: 0 }, { height: box.offsetHeight + 'px', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.2,.75,.2,1)' });
      }
    });
  });

  /* menú e índice que marcan la sección actual */
  const links = $$('.nav a[href^="#"], .toc a[href^="#"]');
  const targets = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  if (targets.length) {
    const spy = () => {
      let cur = null;
      targets.forEach(t => { if (t.getBoundingClientRect().top < innerHeight * .35) cur = t.id; });
      links.forEach(a => a.getAttribute('href') === '#' + cur ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
    };
    addEventListener('scroll', spy, { passive: true }); spy();
  }

  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();

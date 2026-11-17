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
    document.dispatchEvent(new Event('langchange'));
  }
  let saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved || (/^(es|ca|gl|eu)/i.test(navigator.language || 'es') ? 'es' : 'en'));
  btn && btn.addEventListener('click', () => setLang(root.lang === 'en' ? 'es' : 'en'));

  /* barra con sombra al bajar */
  const bar = $('.bar');
  const onScroll = () => bar && bar.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* aparición al hacer scroll (y disparadores de animaciones) */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('on');
    if (e.target.dataset.count) count(e.target);
    io.unobserve(e.target);
  }), { threshold: .18, rootMargin: '0px 0px -40px 0px' });
  $$('.rv, .route, .langs, [data-count]').forEach(el => calm ? (el.classList.add('on'), el.dataset.count && count(el, true)) : io.observe(el));

  /* contadores */
  function count(el, now) {
    const to = +el.dataset.count, out = $('b', el) || el;
    if (now) { out.textContent = to + (el.dataset.suf || ''); return; }
    const t0 = performance.now(), d = 1300;
    (function step(t) {
      const k = Math.min(1, (t - t0) / d), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
      out.textContent = v + (el.dataset.suf || '');
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* barras de idiomas en cascada */
  $$('.langs').forEach(box => $$('.bars i.f', box).forEach((b, i) => b.style.transitionDelay = (i * 0.06) + 's'));

  /* línea de la experiencia que se va llenando */
  const tl = $('.timeline'), fill = tl && $('.fill', tl);
  if (fill) {
    const upd = () => {
      const r = tl.getBoundingClientRect(), h = tl.offsetHeight - 16;
      const p = Math.max(0, Math.min(1, (innerHeight * .7 - r.top) / h));
      fill.style.height = (calm ? h : p * h) + 'px';
    };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  /* mapa del recorrido */
  $$('.route .trip').forEach(p => { if (p.getTotalLength) { const l = Math.ceil(p.getTotalLength()); p.style.strokeDasharray = l; p.style.strokeDashoffset = calm ? 0 : l; } });

  /* tarjeta de código que se escribe sola */
  const pre = $('#typed');
  if (pre) {
    const src = { es: pre.dataset.es, en: pre.dataset.en };
    let timer;
    const paint = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/(\/\/[^\n]*)|("[^"\n]*"?)|\b(class|const|new|return)\b/g,
        (m, c, str, k) => `<span class="${c ? 'c' : str ? 's' : 'k'}">${m}</span>`);
    const type = () => {
      clearTimeout(timer);
      const txt = src[root.lang] || src.es;
      if (calm) { pre.innerHTML = paint(txt); return; }
      let i = 0;
      (function tick() {
        i += txt[i] === ' ' ? 2 : 1;
        pre.innerHTML = paint(txt.slice(0, i)) + '<span class="caret"></span>';
        if (i < txt.length) timer = setTimeout(tick, txt[i - 1] === '\n' ? 180 : 28);
      })();
    };
    document.addEventListener('langchange', type); setTimeout(type, 500);
  }

  /* guías desplegables con animación */
  $$('details.guide').forEach(d => {
    const sum = $('summary', d), box = $('.in', d);
    sum.addEventListener('click', e => {
      if (calm) return;
      e.preventDefault();
      if (d.open) {
        const a = box.animate([{ height: box.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'ease-in' });
        a.onfinish = () => d.open = false;
      } else {
        d.open = true;
        const h = box.offsetHeight;
        box.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
      }
    });
  });

  /* menú y índice que marcan dónde estás */
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

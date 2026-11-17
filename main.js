/*! Pablo Campayo Viñes · web personal · © 2026 */
(() => {
  'use strict';
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // ------------------------------------------------------------ idiomas
  // El español sale del propio HTML; aquí sólo va la traducción al inglés.
  const EN = {
    'skip': 'Skip to content',
    'nav.about': 'About', 'nav.exp': 'Experience', 'nav.edu': 'Education', 'nav.proj': 'Projects', 'nav.skills': 'Skills', 'nav.contact': 'Contact',
    'hero.badge': 'Looking for an Erasmus+ internship', 'hero.hi': "Hi, I'm",
    'hero.lead': "<b>Cross-Platform Application Development</b> student and <b>Microcomputer Systems and Networks</b> technician. I like building things that really work: from a real-time game server to a WordPress website.",
    'hero.cta1': 'See projects', 'hero.f1': 'Torrent, Valencia (Spain)', 'hero.f2': 'DAM · IES Abastos', 'hero.f3': 'ES · CA · EN B2 · FR A2',
    'about.t': 'About me',
    'about.p1': 'I combine two worlds: <mark>systems and networks</mark>, where I learned to build, repair and configure, and <mark>software development</mark>, where I am now learning to design and code complete applications.',
    'about.p2': "I'm motivated, curious and a quick learner. I enjoy solving problems and working as part of a team, and I'm looking for an <b>Erasmus+ internship</b> where I can apply what I've learned, gain real experience in a professional environment and keep growing as a developer.",
    'about.n1': 'vocational degrees (EQF 4 & 5)', 'about.n2': 'work experiences', 'about.n3': 'languages', 'about.n4': 'tests in my biggest project',
    'exp.t': 'Experience',
    'exp.1.r': 'Web developer', 'exp.1.p': 'Athens, Greece',
    'exp.1.a': 'Designed and developed a fully functional <b>WordPress</b> website, including content structure, theme customisation and plugin configuration.',
    'exp.1.b': 'Developed an <b>interactive chatbot</b> to automate user queries and improve the user experience.',
    'exp.2.r': 'ICT technician',
    'exp.2.a': '<b>Preventive and corrective</b> maintenance of computer equipment.', 'exp.2.b': '<b>Technical support</b> for users and incident resolution.', 'exp.2.c': 'Designed and developed a <b>WordPress</b> website.',
    'exp.3.r': 'Crew member (trainer)', 'exp.3.d': '12/2025 – present',
    'exp.3.a': 'Customer service, order running, desserts and drinks, and dining-area care.', 'exp.3.b': 'Teamwork in a fast-paced environment, prioritising tasks.',
    'tag.intl': 'International environment', 'tag.support': 'Support', 'tag.team': 'Teamwork', 'tag.client': 'Customer service',
    'edu.t': 'Education',
    'edu.1.t': 'Higher Vocational Degree in Cross-Platform Application Development', 'edu.1.d': '2025 – present',
    'edu.1.a': 'Java & OOP', 'edu.1.b': 'Databases (SQL)', 'edu.1.c': 'Desktop & mobile apps', 'edu.1.d2': 'User interfaces', 'edu.1.e': 'Data access', 'edu.1.f': 'Testing & deployment', 'edu.1.g': 'Version control',
    'edu.2.t': 'Intermediate Vocational Degree in Microcomputer Systems and Networks',
    'edu.2.a': 'Hardware assembly & repair', 'edu.2.b': 'Windows & Linux', 'edu.2.c': 'Networks & troubleshooting', 'edu.2.d': 'Network services & servers', 'edu.2.e': 'IT security basics', 'edu.2.f': 'Technical support',
    'edu.3.d': 'Cisco Networking Academy', 'edu.4.t': 'Compulsory Secondary Education',
    'proj.t': 'Projects', 'proj.star': '⭐ Featured project',
    'proj.ew': 'A 3D multiplayer egg shooter for the browser, built from scratch. Authoritative server with anti-cheat, A* bots, PostgreSQL accounts and a version that runs with no server at all.',
    'proj.m': 'maps', 'proj.w': 'weapons', 'proj.md': 'modes', 'proj.ts': 'tests', 'proj.play': '▶ Play online', 'proj.docs': 'Guide & docs', 'proj.code': 'Code',
    'proj.ch': 'Champions League simulator: teams, transfers, line-ups and knockout rounds, with a layered architecture and a graphical interface.',
    'proj.ods': 'Web platform with educational mini-games about the UN Sustainable Development Goals.',
    'proj.tr.t': 'Treasure Hunt', 'proj.tr': 'Console adventure with randomly generated maps and a guaranteed path to the treasure.',
    'proj.ah.t': 'Football Hangman', 'proj.ah': 'Classic console hangman with legendary football players.',
    'proj.ar.t': 'Christmas Tree', 'proj.ar': 'Interactive console tree with ANSI colours, random lights and presents.',
    'proj.more.t': 'All my repositories', 'proj.more': 'Class exercises, Git with IntelliJ and more.',
    'sk.t': 'Skills', 'sk.1': 'Programming', 'sk.oop': 'OOP', 'sk.3': 'Data', 'sk.db': 'Database design', 'sk.4': 'Systems & networks', 'sk.hw': 'Hardware', 'sk.sec': 'Security basics',
    'sk.soft': 'What I bring to a team', 'sk.s1': 'Problem solving', 'sk.s2': 'Quick learner', 'sk.s3': 'Teamwork', 'sk.s4': 'Prioritising tasks', 'sk.s5': 'Professional with clients', 'sk.s6': 'International experience',
    'lang.t': 'Languages', 'lang.es': 'Spanish', 'lang.va': 'Catalan (Valencian)', 'lang.en': 'English', 'lang.fr': 'French', 'lang.native': 'Native', 'lang.native2': 'Native', 'lang.nat': 'Native',
    'ct.t': "Let's talk", 'ct.p': "I'm looking for an Erasmus+ internship as a developer. If my profile fits your team, find me on GitHub.",
    'ft': 'Handmade with HTML, CSS and JavaScript · no templates', 'ft.top': 'Top ↑',
  };
  const ROLES = {
    es: ['Estudiante de DAM ☕', 'Técnico en Sistemas y Redes 🖧', 'Creador de EGG WARS 🥚', 'Buscando prácticas Erasmus+ ✈️'],
    en: ['Cross-platform dev student ☕', 'Systems & networks technician 🖧', 'Creator of EGG WARS 🥚', 'Looking for an Erasmus+ internship ✈️'],
  };
  const ES = {};
  $$('[data-i18n]').forEach(el => { ES[el.dataset.i18n] = el.innerHTML; });
  const TITLE = { es: document.title, en: 'Pablo Campayo Viñes · Cross-Platform Developer' };
  let lang = 'es';
  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    const dict = l === 'en' ? EN : ES;
    $$('[data-i18n]').forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    document.title = TITLE[l];
    try { localStorage.setItem('lang', l); } catch (e) {}
    restartTyping();
  }
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  const initial = saved || (/^es|^ca/i.test(navigator.language || 'es') ? 'es' : 'en');
  $('#lang').addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

  // ------------------------------------------------------------ texto que se escribe solo
  const typed = $('#typed');
  let tTimer = null;
  function restartTyping() {
    clearTimeout(tTimer);
    const roles = ROLES[lang];
    if (reduce) { typed.textContent = roles[0]; return; }
    let i = 0, j = 0, del = false;
    const step = () => {
      const w = roles[i];
      typed.textContent = w.slice(0, j);
      if (!del && j < w.length) { j++; tTimer = setTimeout(step, 55); }
      else if (!del) { del = true; tTimer = setTimeout(step, 1600); }
      else if (j > 0) { j--; tTimer = setTimeout(step, 28); }
      else { del = false; i = (i + 1) % roles.length; tTimer = setTimeout(step, 300); }
    };
    step();
  }
  setLang(initial);

  // ------------------------------------------------------------ niveles de idioma
  $$('.cefr').forEach(c => { const lv = +c.dataset.lv; c.innerHTML = Array.from({ length: 7 }, (_, k) => `<i data-k="${k}"></i>`).join(''); c.dataset.target = lv; });
  function fillCefr(c) { [...c.children].forEach((i, k) => setTimeout(() => i.classList.toggle('on', k < +c.dataset.target), reduce ? 0 : k * 110)); }

  // ------------------------------------------------------------ aparición y contadores
  function countUp(el) {
    const to = +el.dataset.to; if (reduce) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1100 + Math.min(to, 300) * 3;
    const tick = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.count').forEach(countUp);
    e.target.querySelectorAll('.cefr').forEach(fillCefr);
    io.unobserve(e.target);
  }), { threshold: .12, rootMargin: '0px 0px -30px 0px' });
  $$('.nums,.projects,.skills,.edu,.timeline,.cta,.facts').forEach(g => [...g.children].forEach((c, i) => { if (c.classList.contains('rv')) c.style.setProperty('--d', i * 0.08 + 's'); }));
  $$('.hero .rv').forEach((c, i) => c.style.setProperty('--d', i * 0.09 + 's'));
  $$('.rv').forEach(el => io.observe(el));

  // ------------------------------------------------------------ cabecera, progreso, menú
  const top = $('#top'), prog = $('#progress'), links = $$('.nav a'), secs = links.map(a => $(a.getAttribute('href')));
  let tick = false;
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    top.classList.toggle('sc', y > 20);
    prog.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    let act = -1; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 160) act = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === act));
    tick = false;
  }
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  const burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', () => { const o = !nav.classList.contains('open'); nav.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); });
  links.forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));
  addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.focus(); } });

  // ------------------------------------------------------------ galería de EGG WARS
  const imgs = $$('#slides img'), dots = $('#dots');
  let cur = 0, sTimer = null;
  imgs.forEach((im, i) => { const b = document.createElement('button'); b.setAttribute('aria-label', im.alt); b.setAttribute('role', 'tab'); b.addEventListener('click', () => { show(i); auto(); }); dots.appendChild(b); });
  function show(i) { cur = i; imgs.forEach((im, k) => im.classList.toggle('on', k === i)); [...dots.children].forEach((d, k) => { d.classList.toggle('on', k === i); d.setAttribute('aria-selected', k === i); }); }
  function auto() { clearInterval(sTimer); if (!reduce) sTimer = setInterval(() => show((cur + 1) % imgs.length), 3800); }
  show(0); auto();

  // ------------------------------------------------------------ brillo que sigue al ratón
  const glow = $('#glow');
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    let gx = 0, gy = 0, raf = 0;
    addEventListener('pointermove', e => { gx = e.clientX; gy = e.clientY; glow.style.opacity = 1; if (!raf) raf = requestAnimationFrame(() => { glow.style.transform = `translate(${gx}px,${gy}px)`; raf = 0; }); }, { passive: true });
    document.addEventListener('pointerleave', () => { glow.style.opacity = 0; });
  }
})();

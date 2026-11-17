// Pablo Campayo Viñes — web personal
(() => {
  'use strict';
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

  // El recorrido del mapa se ajusta a su longitud real
  const trip = $('.route .trip');
  if (trip && trip.getTotalLength) {
    const len = Math.ceil(trip.getTotalLength());
    trip.style.strokeDasharray = len;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) trip.style.strokeDashoffset = len;
  }

  // Idioma: el español sale del HTML; aquí sólo va el inglés
  const EN = {
    'skip': 'Skip to content',
    'nav.work': 'Work', 'nav.proj': 'Projects', 'nav.edu': 'Education', 'nav.contact': 'Contact',
    'hero.p1': "I'm from Torrent, near Valencia (Spain). I started out building and repairing computers in a Systems and Networks course, and now I study Cross-Platform Application Development at IES Abastos.",
    'hero.p2': 'I like understanding how things work on the inside, whether that is a network, a database or a game server.',
    'map.ath': 'Mar 2025', 'map.rib': 'Apr 2025', 'map.val': 'Sep 2025',
    'map.cap': 'From Torrent to Athens and back: where I have studied and worked over the last few years.',
    'work.t': 'Work',
    'work.3.d': '2025 to now', 'work.3.r': 'Crew member and trainer',
    'work.3.p': 'Customer service, orders, desserts and drinks. You learn to prioritise when everything happens at once.',
    'work.2.r': 'IT technician',
    'work.2.p': 'Preventive and corrective maintenance of the computers, support for users when something broke, and a new company website built with WordPress.',
    'work.1.w': 'Athens, Greece', 'work.1.r': 'Web developer',
    'work.1.p': 'A month working in Greece. I built a complete WordPress website (structure, theme and plugins) and a chatbot that answered the most common user questions.',
    'proj.t': 'Projects',
    'proj.ew': 'A 3D browser shooter where the players are eggs. I started it so my classmates and I could play over the school network, and it ended up with an online server, accounts, bots and sixteen maps.',
    'proj.play': 'Play', 'proj.guide': 'Game guide', 'proj.code': 'Code',
    'proj.ch': 'A Champions League simulator in Java: teams, transfers, line-ups and knockout rounds. Split into layers (model, interface and data) and tested with JUnit.',
    'proj.ods': 'A cross-module school project: a website with mini-games about the UN Sustainable Development Goals.',
    'proj.cons.t': 'Console games',
    'proj.cons': 'Exercises that got out of hand: a <a href="https://github.com/campayoo/JuegoDelTesoro" target="_blank" rel="noopener">treasure hunt</a> with random maps, a <a href="https://github.com/campayoo/AhorcadoJugadores" target="_blank" rel="noopener">football hangman</a> and a <a href="https://github.com/campayoo/ArbolNavidad" target="_blank" rel="noopener">Christmas tree</a> with terminal colours.',
    'edu.t': 'Education',
    'edu.1.d': '2025 to now', 'edu.1.t': 'Cross-Platform Application Development', 'edu.1.r': 'Higher vocational degree, IES Abastos (Valencia)',
    'edu.1.p': 'Java and object-oriented programming, SQL databases, web development, desktop and mobile apps, data access, ERP and CRM.',
    'edu.2.t': 'Microcomputer Systems and Networks', 'edu.2.r': 'Intermediate vocational degree, IES Serra Perenxisa (Torrent)',
    'edu.2.p': 'Building and repairing computers, Windows and Linux, networks and servers, basic security and support. I also completed Cisco CCNA 1.',
    'sk.t': 'What I work with',
    'sk.p': 'Java, JavaScript, HTML and CSS, SQL (MySQL and PostgreSQL), Node.js, WordPress, Git, Windows and Linux, Cisco Packet Tracer. Currently learning TypeScript and React.',
    'lang.t': 'Languages', 'lang.p': 'Spanish and Valencian (Catalan) are my native languages. English B2, French A2.',
    'ct.t': "Let's talk", 'ct.p': "I'm finishing my degree and open to internships, in Spain or abroad. GitHub is where you'll find me most.",
    'ft': 'Handmade with HTML, CSS and a little JavaScript.',
  };
  const ES = {};
  $$('[data-i18n]').forEach(el => { ES[el.dataset.i18n] = el.innerHTML; });
  const btn = $('#lang');
  let lang = 'es';
  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    const dict = l === 'en' ? EN : ES;
    $$('[data-i18n]').forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    btn.textContent = l === 'en' ? 'Español' : 'English';
    btn.lang = l === 'en' ? 'es' : 'en';
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved || (/^(es|ca|gl|eu)/i.test(navigator.language || 'es') ? 'es' : 'en'));
  btn.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

  // Marca en el menú la sección que se está leyendo
  const links = $$('.bar nav a'), secs = links.map(a => $(a.getAttribute('href')));
  let ticking = false;
  const spy = () => {
    let act = -1;
    secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .35) act = i; });
    links.forEach((a, i) => { if (i === act) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
  spy();
})();

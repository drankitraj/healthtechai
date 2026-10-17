(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Scroll progress, dock visibility, nav shadow */
  var bar = $('.progress'), dock = $('.dock'), hero = $('#top');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      if (bar) bar.style.transform = 'scaleX(' + p + ')';
      if (dock && hero) dock.classList.toggle('show', h.scrollTop > hero.offsetHeight * 0.6);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Reveal on scroll */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  /* Count-up on hero readouts */
  var counters = $$('[data-count]');
  function fmt(n) { return n.toLocaleString('en-GB'); }
  function run(el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(Math.round(end * eased)) + (k === 1 ? suffix : '');
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* Pointer glow on dark sections (hover-capable devices only) */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    $$('.glow').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, { passive: true });
    });
  }

  /* Active nav link */
  var links = $$('.nav a.link');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* Mobile menu */
  var btn = $('.menu-btn'), menu = $('#menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Menu';
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) btn.click();
    });
  }

  /* Experience: expand / collapse all */
  var xp = $$('.xp details');
  var ex = $('#expand'), co2 = $('#collapse');
  if (ex) ex.addEventListener('click', function () { xp.forEach(function (d) { d.open = true; }); });
  if (co2) co2.addEventListener('click', function () { xp.forEach(function (d) { d.open = false; }); });
})();

/* MOONWIRE — site scripts */
(function () {
  'use strict';

  // Replace with the real ticketing URL (Eventbrite, DICE, etc.)
  var TICKETING_URL = '[TICKETING LINK]';

  var doc = document.documentElement;
  doc.classList.add('js');

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var mobileBar = document.querySelector('.mobile-bar');
  var mq = window.matchMedia('(min-width: 1024px)');

  /* Header + mobile bar on scroll */
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 20);
    if (mobileBar) mobileBar.classList.toggle('is-visible', y > 420);
    if (y < 300) document.querySelectorAll('.nav-list a.is-active').forEach(function (a) { a.classList.remove('is-active'); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('no-scroll', open);
    if (open) {
      var first = nav.querySelector('a');
      if (first) first.focus();
    }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
      // Keep focus inside the open menu
      if (e.key === 'Tab' && nav.classList.contains('is-open')) {
        var items = [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll('a')));
        var firstEl = items[0], lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    });
    mq.addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  }

  /* Active nav link */
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var map = {};
    navLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          navLinks.forEach(function (a) { a.classList.remove('is-active'); });
          map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* Reveal on scroll */
  var revealTargets = document.querySelectorAll('.section-head, .event-card, .exp-card, .stats, .package, .form-wrap, .tile, .p-card, .faq-list details, .visit-info, .map-frame, .gl-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target;
          el.classList.add('is-in');
          io.unobserve(el);
          setTimeout(function () { el.style.transitionDelay = ''; el.classList.remove('reveal', 'is-in'); }, 1100);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* Countdown */
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.getAttribute('data-countdown')).getTime();
    var live = document.querySelector('.countdown-live');
    var units = {
      d: cd.querySelector('[data-unit="d"]'),
      h: cd.querySelector('[data-unit="h"]'),
      m: cd.querySelector('[data-unit="m"]'),
      s: cd.querySelector('[data-unit="s"]')
    };
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) {
        cd.hidden = true;
        if (live) live.hidden = false;
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      units.d.textContent = pad(Math.floor(s / 86400));
      units.h.textContent = pad(Math.floor((s % 86400) / 3600));
      units.m.textContent = pad(Math.floor((s % 3600) / 60));
      units.s.textContent = pad(s % 60);
    };
    var timer = setInterval(tick, 1000);
    tick();
  }

  /* Toast */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 3800);
  }

  /* Ticket links */
  var ticketReady = TICKETING_URL.indexOf('[') === -1;
  document.querySelectorAll('[data-ticket-link]').forEach(function (a) {
    if (ticketReady) {
      a.href = TICKETING_URL;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        toast('Tickets go live soon. Join the guest list for presale access.');
      });
    }
  });

  /* Package buttons preselect the form */
  var pkgSelect = document.getElementById('vip-package');
  document.querySelectorAll('[data-package]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!pkgSelect) return;
      var name = btn.getAttribute('data-package');
      Array.prototype.forEach.call(pkgSelect.options, function (o) {
        if (o.text.indexOf(name) === 0) pkgSelect.value = o.value;
      });
    });
  });

  /* Min date for reservations = today */
  var dateInput = document.getElementById('vip-date');
  if (dateInput) {
    var t = new Date();
    dateInput.min = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
  }

  /* Forms: Formspree when configured, mailto fallback otherwise */
  document.querySelectorAll('.js-form').forEach(function (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = null;
      form.querySelectorAll('[required]').forEach(function (f) {
        var ok = f.checkValidity();
        f.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !invalid) invalid = f;
      });
      if (invalid) {
        status.textContent = 'Please complete the highlighted fields.';
        status.classList.add('is-error');
        invalid.focus();
        return;
      }
      status.classList.remove('is-error');

      var data = new FormData(form);
      var endpoint = form.getAttribute('action') || '';
      if (endpoint.indexOf('[') !== -1 || !window.fetch) {
        var lines = [];
        data.forEach(function (v, k) { lines.push(k + ': ' + v); });
        var href = 'mailto:' + form.getAttribute('data-mailto') +
          '?subject=' + encodeURIComponent(form.getAttribute('data-subject') || 'Website inquiry') +
          '&body=' + encodeURIComponent(lines.join('\n'));
        status.textContent = 'Opening your email app to send your request...';
        window.location.href = href;
        return;
      }

      status.textContent = 'Sending...';
      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('fail');
          form.reset();
          status.textContent = form.classList.contains('gl-form')
            ? "You're on the list. Watch your inbox."
            : 'Request received. A VIP host will reach out shortly.';
        })
        .catch(function () {
          status.textContent = 'Something went wrong. Please call (213) 555-0187.';
          status.classList.add('is-error');
        });
    });
  });

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

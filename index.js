/* ===================================
   PGD Architects — Interactive Script
   =================================== */

(function () {
  'use strict';

  /* ---------- DOM refs ---------- */
  const header     = document.getElementById('site-header');
  const navLinks   = document.getElementById('nav-links');
  const hamburger  = document.getElementById('hamburger');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards      = document.querySelectorAll('.portfolio-card');
  const reveals    = document.querySelectorAll('.reveal');
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links > a');

  /* ---------- Sticky header ---------- */
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightNav();
    revealOnScroll();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav highlight ---------- */
  function highlightNav() {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;
    reveals.forEach(function (el) {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('visible');
      }
    });
  }

  /* ---------- Hamburger ---------- */
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click (mobile)
  navAnchors.forEach(function (a) {
    a.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Portfolio filter ---------- */
  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Toggle active state
      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          // Re-trigger animation
          card.classList.remove('visible');
          void card.offsetWidth;            // reflow
          card.classList.add('visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Contact form → mailto redirect ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = (document.getElementById('c-name')    || {}).value || '';
      var email   = (document.getElementById('c-email')   || {}).value || '';
      var subject = (document.getElementById('c-subject') || {}).value || 'Project Enquiry';
      var message = (document.getElementById('c-message') || {}).value || '';

      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      var mailto = 'mailto:pgdarchitects@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body='    + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  /* ---------- Smooth scroll for CTA pill ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();

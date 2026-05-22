/**
 * Portfolio — Interaction Layer
 *
 * Two motion systems:
 * 1. Hover transforms (project items, links — CSS-only)
 * 2. Cursor-aware glow (full page)
 *
 * Everything degrades gracefully:
 * - No JS → all content visible
 * - prefers-reduced-motion → cursor glow disabled
 */

(function () {
  'use strict';

  // Easter egg
  console.log(
    '%c Ready Player One. ',
    'background: #c9f06b; color: #0a0a0a; padding: 4px 8px; border-radius: 2px; font-family: monospace;'
  );

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // ========================================
  // Navigation scroll state
  // ========================================

  var nav = document.getElementById('nav');
  var hero = document.getElementById('hero');

  if (nav && hero) {
    function updateNavState() {
      var heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom <= 0) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    updateNavState();

    var navTicking = false;
    window.addEventListener('scroll', function () {
      if (!navTicking) {
        requestAnimationFrame(function () {
          updateNavState();
          navTicking = false;
        });
        navTicking = true;
      }
    }, { passive: true });
  }

  // ========================================
  // Motion System 2: Global cursor glow
  // ========================================

  if (!prefersReducedMotion) {
    document.addEventListener('mousemove', function (e) {
      document.body.style.setProperty('--cursor-x', e.clientX + 'px');
      document.body.style.setProperty('--cursor-y', e.clientY + 'px');
    });
  }

})();

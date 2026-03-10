/**
 * MulaStar - Make Money Online
 * Interactive functionality for navigation, FAQ accordion, and smooth scroll
 */

(function () {
  'use strict';

  // ========== Mobile Navigation Toggle ==========
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('visible');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when clicking a link (for mobile)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 768) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('visible');
          document.body.style.overflow = '';
        }
      });
    });

    // Close menu on resize if viewport becomes larger
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  }

  // ========== FAQ Accordion ==========
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function () {
        const wasExpanded = this.getAttribute('aria-expanded') === 'true';

        // Close all other FAQ items
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (wasExpanded) {
          item.classList.remove('active');
          question.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // ========== Smooth Scroll for Anchor Links ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== Header Scroll Effect (Optional - subtle shadow on scroll) ==========
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '';
      }
      lastScroll = currentScroll;
    });
  }

  // ========== Agency Tabs ==========
  const agencyTabs = document.querySelectorAll('.agency-tab');
  const agencyPanels = document.querySelectorAll('.agency-panel');

  agencyTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = this.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetId);

      if (!targetPanel) return;

      // Update tabs
      agencyTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Update panels
      agencyPanels.forEach(function (panel) {
        panel.classList.remove('active');
      });
      targetPanel.classList.add('active');
    });
  });

})();

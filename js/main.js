/* ============================================
   SECOND SON PRODUCTIONS — Cultural Institution Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     NAVIGATION — Mobile Toggle
     ============================================ */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksMobile = document.querySelector('.nav-links-mobile');
  if (navToggle && navLinksMobile) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'mobile-nav');
    navLinksMobile.id = 'mobile-nav';

    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksMobile.classList.toggle('open');
      const isOpen = navLinksMobile.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinksMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close mobile nav on resize to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navLinksMobile.classList.contains('open')) {
          navToggle.classList.remove('active');
          navLinksMobile.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }, 100);
    }, { passive: true });
  }

  // Set active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath.includes('/artists/') && href === '/artists/')) {
      link.classList.add('active');
    }
    if ((currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '') && (href === '/' || href === 'index.html' || href === './index.html')) {
      link.classList.add('active');
    }
  });

  /* ============================================
     REVEAL — IntersectionObserver + Scroll Fallback
     ============================================ */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Fallback: catch elements that were scrolled past too fast
    const revealFallback = () => {
      const pending = document.querySelectorAll('.reveal:not(.visible)');
      pending.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
          revealObserver.unobserve(el);
        } else if (rect.bottom < 0) {
          el.classList.add('visible');
          revealObserver.unobserve(el);
        }
      });
    };

    let fallbackTimer;
    window.addEventListener('scroll', () => {
      clearTimeout(fallbackTimer);
      fallbackTimer = setTimeout(revealFallback, 100);
    }, { passive: true });
  }

  /* ============================================
     ARTIST PAGE TABS
     ============================================ */
  const tabButtons = document.querySelectorAll('.artist-tab');
  const tabContents = document.querySelectorAll('.artist-tab-content');

  if (tabButtons.length > 0) {
    // Set up ARIA roles
    const tabList = document.querySelector('.artist-tabs-inner');
    if (tabList) tabList.setAttribute('role', 'tablist');

    tabButtons.forEach(btn => {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
      const target = btn.dataset.tab;
      btn.setAttribute('aria-controls', target);
    });

    tabContents.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      const matchingTab = document.querySelector(`.artist-tab[data-tab="${panel.id}"]`);
      if (matchingTab) panel.setAttribute('aria-labelledby', matchingTab.id || panel.id + '-tab');
    });

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetContent = document.getElementById(target);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  /* ============================================
     BANDSINTOWN — Tour Dates API
     ============================================ */
  const tourContainer = document.querySelector('.tour-dates-container');
  if (tourContainer) {
    const artistName = tourContainer.dataset.bitArtist;
    const appId = tourContainer.dataset.bitAppid;
    const encodedArtist = encodeURIComponent(artistName);

    fetch(`https://rest.bandsintown.com/artists/${encodedArtist}/events?app_id=${appId}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(events => {
        if (!events || events.length === 0) {
          tourContainer.innerHTML = `
            <div class="no-dates-message">
              <p>No upcoming dates at this time.</p>
              <p>Check <a href="https://www.bandsintown.com/a/1/events" target="_blank">Bandsintown</a> for updates.</p>
            </div>`;
          return;
        }

        const html = events.map(event => {
          const date = new Date(event.datetime);
          const day = date.getDate();
          const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
          const venue = event.venue.name;
          const city = event.venue.city;
          const region = event.venue.region || event.venue.country;
          const ticketUrl = event.offers && event.offers.length > 0 ? event.offers[0].url : event.url;

          return `
            <div class="tour-date">
              <div>
                <span class="tour-date-day">${day}</span>
                <span class="tour-date-month">${month}</span>
              </div>
              <div class="tour-date-info">
                <h4>${venue}</h4>
                <p>${city}, ${region}</p>
              </div>
              <a href="${ticketUrl}" target="_blank" class="btn tour-date-link">Tickets <span class="btn-arrow">&rarr;</span></a>
            </div>`;
        }).join('');

        tourContainer.innerHTML = html;
      })
      .catch(() => {
        tourContainer.innerHTML = `
          <div class="no-dates-message">
            <p>Unable to load tour dates right now.</p>
            <p>Check <a href="https://www.bandsintown.com/a/1/events" target="_blank">Bandsintown</a> for the latest schedule.</p>
          </div>`;
      });
  }

  /* ============================================
     SMOOTH ANCHOR SCROLLING
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============================================
     FORM HANDLING
     ============================================ */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn, .btn-primary');
      if (!btn) return;
      const originalHTML = btn.innerHTML;
      btn.innerHTML = 'Message Sent';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 3000);
    });
  }

});

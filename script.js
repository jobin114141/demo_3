document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Effect on Scroll (triggers after passing the hero section)
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('#hero');

  // Automatically mark navbar as loaded after 2.5s initial entrance completes
  setTimeout(() => {
    if (navbar) navbar.classList.add('loaded');
  }, 2500);

  window.addEventListener('scroll', () => {
    if (navbar && !navbar.classList.contains('loaded')) {
      navbar.classList.add('loaded');
    }
    const heroHeight = heroSection ? heroSection.offsetHeight - 80 : 400;
    if (window.scrollY >= heroHeight) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // 3. Category Filter Tabs for Expeditions
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.grid-cards .card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.5s ease forward';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Video Modal Handler
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalOverlay = document.getElementById('videoModal');

  if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  }

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // 5. Booking Form Submission with Toast Feedback
  const bookingForm = document.getElementById('bookingForm');
  const toast = document.getElementById('toast');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const destination = document.getElementById('destSelect').value;
      const date = document.getElementById('dateInput').value;

      showToast(`🏄 Reserve request received for ${destination || 'your retreat'}! Our guide will contact you shortly.`);
      bookingForm.reset();
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 6. Number Counter Animation for Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = (Math.round(count * 10) / 10) + suffix;
          setTimeout(updateCount, 25);
        } else {
          stat.innerText = target + suffix;
        }
      };
      updateCount();
    });
  }

  // Trigger counters when stats section enters viewport
  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          runCounters();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // 7. Overview Section Sequential Scroll Animation
  const overviewSection = document.querySelector('.overview-section');
  if (overviewSection) {
    const triggerOverviewAnimation = () => {
      const rect = overviewSection.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom >= 0) {
        overviewSection.classList.add('animated');
      }
    };

    const overviewObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          overviewSection.classList.add('animated');
          overviewObserver.unobserve(overviewSection);
        }
      });
    }, { threshold: 0.05 });

    overviewObserver.observe(overviewSection);
    // Initial check in case section is already in viewport on load
    triggerOverviewAnimation();
  }

  // 8. Level Cards Selection Handler
  const levelCards = document.querySelectorAll('.level-card');
  levelCards.forEach(card => {
    card.addEventListener('click', () => {
      const isSelected = card.classList.contains('selected');
      levelCards.forEach(c => c.classList.remove('selected'));
      if (!isSelected) {
        card.classList.add('selected');
      }
    });
  });

  // 9. Levels Section Sequential Scroll Animation (triggers ONLY when user scrolls to section)
  const levelsSection = document.querySelector('.levels-section');
  if (levelsSection) {
    const levelsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          levelsSection.classList.add('animated');
          levelsObserver.unobserve(levelsSection);
        }
      });
    }, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    });

    levelsObserver.observe(levelsSection);
  }
});

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

  // 10. Stay Section Accordion Toggle Handler
  const accordionItems = document.querySelectorAll('.stay-accordion .accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        accordionItems.forEach(i => {
          i.classList.remove('active');
          const btnIcon = i.querySelector('.accordion-toggle-btn i');
          if (btnIcon) {
            btnIcon.classList.remove('fa-chevron-up');
            btnIcon.classList.add('fa-chevron-down');
          }
        });

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
          const icon = item.querySelector('.accordion-toggle-btn i');
          if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          }
        }
      });
    }
  });

  // 11. Stay Section Sequential Scroll Animation (triggers ONLY when user scrolls to section)
  const staySection = document.querySelector('.stay-section');
  if (staySection) {
    const stayObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          staySection.classList.add('animated');
          stayObserver.unobserve(staySection);
        }
      });
    }, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    });

    stayObserver.observe(staySection);
  }

  // 12. Experience Section Scroll Animation
  const experienceSection = document.querySelector('.experience-section');
  if (experienceSection) {
    const expObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          experienceSection.classList.add('animated');
          expObserver.unobserve(experienceSection);
        }
      });
    }, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    });

    expObserver.observe(experienceSection);
  }


  // 13. Direct Scroll Fading for Top Cards in Experience Section (body, soul, mind)
  const expCards = document.querySelectorAll('.exp-card');
  if (expCards.length > 0) {
    const handleCardsScroll = () => {
      expCards.forEach((card, index) => {
        if (index < expCards.length - 1) { // 0: for body, 1: for soul, 2: for mind
          const rect = card.getBoundingClientRect();
          const fadeStart = 420;
          const fadeEnd = 180;

          if (rect.bottom < fadeStart) {
            const progress = Math.max(0, Math.min(1, (rect.bottom - fadeEnd) / (fadeStart - fadeEnd)));
            card.style.opacity = progress.toFixed(2);
          } else {
            card.style.opacity = '1';
          }
        }
      });
    };

    window.addEventListener('scroll', handleCardsScroll, { passive: true });
    handleCardsScroll();
  }
  // 14. Native Sticky Pinning for Experience Left Column
  // (Left column stays pinned at top: 75px until Card 4 reaches position)

  // ==========================================================================
  // 16. Guaranteed 60fps Scroll-Driven Parallax Zoom for Ready CTA Image & Text
  // ==========================================================================
  const readySection = document.querySelector('.ready-cta-section');
  const readyBgImg = document.querySelector('.ready-bg-img');
  const readyContent = document.querySelector('.ready-content');

  if (readySection && readyBgImg && readyContent) {
    const handleReadyScroll = () => {
      const rect = readySection.getBoundingClientRect();
      const windowH = window.innerHeight;

      // When section is anywhere in viewport
      if (rect.bottom > 0 && rect.top < windowH) {
        const totalDist = windowH + rect.height;
        const currentDist = windowH - rect.top;
        const progress = Math.max(0, Math.min(1, currentDist / totalDist));

        // Background Image zooms gently from 1.00x to 1.15x on scroll
        const imgScale = (1.00 + (progress * 0.15)).toFixed(3);
        readyBgImg.style.transform = `scale(${imgScale})`;

        // Foreground Text shrinks smaller from 1.10x down to 0.86x as you scroll down
        const textScale = (1.10 - (progress * 0.24)).toFixed(3);
        const textY = (-15 + (progress * 30)).toFixed(1);
        readyContent.style.transform = `translateY(${textY}px) scale(${textScale})`;
      }
    };

    window.addEventListener('scroll', handleReadyScroll, { passive: true });
    handleReadyScroll();
  }

  // ==========================================================================
  // 17. Interactive Program Itinerary with Floating Card & Accordion
  // ==========================================================================
  const programData = [
    {
      day: "Day 1",
      title: "Arrival & Meet the Crew",
      image: "images/day1.jpg",
      description: "Welcome to Bali! Today is all about settling in and getting to know your new crew. We'll pick you up from the airport (flights usually arrive throughout the day), get you settled into the villa, and ease into island time. No pressure, no rush — just introductions, cold drinks by the pool, and a relaxed dinner together. By the end of the night, it'll feel like you've known these people forever.",
      timetable: [
        { time: "14:00 – 16:00", activity: "Airport Transfer & Villa Check-in" },
        { time: "16:30 – 18:00", activity: "Welcome Refreshments & Villa Orientation" },
        { time: "18:30 – 21:00", activity: "Poolside Cocktails & Sunset Crew Dinner" }
      ]
    },
    {
      day: "Day 2",
      title: "First Waves & Island Vibes",
      image: "images/day2.jpg",
      description: "Morning ocean safety & surfing technique briefing at Batu Bolong beach followed by your first guided session with 1-on-1 coaching feedback. Afternoon video breakdown at the villa, followed by golden hour beach club social with resident DJs.",
      timetable: [
        { time: "07:00 – 08:00", activity: "Healthy Tropical Breakfast at Villa" },
        { time: "08:30 – 11:30", activity: "Surf Assessment & First Guided Session" },
        { time: "15:00 – 16:30", activity: "Video Analysis & Technique Workshop" },
        { time: "17:30 – 20:00", activity: "Sunset Drinks & Music at Beach Club" }
      ]
    },
    {
      day: "Day 3",
      title: "Surf Progress & Beach Club",
      image: "images/day3.jpg",
      description: "Early morning dawn patrol to catch glass-calm condition breaks. Focus on pop-up mechanics, angling takeoffs, and wave selection analyzed through 4K drone footage. Relax by the oceanfront pool in the afternoon.",
      timetable: [
        { time: "06:30 – 09:30", activity: "Dawn Patrol Surf Session & Drone Shoot" },
        { time: "10:30 – 12:00", activity: "Post-Surf Brunch & 4K Drone Review" },
        { time: "14:00 – 18:00", activity: "Free Time, Massage & Oceanfront Pool Relax" }
      ]
    },
    {
      day: "Day 4",
      title: "Temple Visit & Culture Day",
      image: "images/day4.jpg",
      description: "Mid-week active body recovery day! Journey to the famous cliffside Uluwatu Temple, participate in a traditional water blessing ceremony, and enjoy fresh seafood dinner by the ocean.",
      timetable: [
        { time: "09:00 – 12:00", activity: "Guided Visit to Uluwatu Ocean Temple" },
        { time: "13:00 – 15:00", activity: "Traditional Balinese Water Purification Ceremony" },
        { time: "18:00 – 21:00", activity: "Cliffside Sunset Seafood Dinner" }
      ]
    },
    {
      day: "Day 5",
      title: "Surf & Waterfall Adventure",
      image: "images/day5.jpg",
      description: "Speedboat boat trip to a secret island reef break with pristine green waves. Afternoon jungle trek to swim beneath secret waterfalls and explore night markets.",
      timetable: [
        { time: "06:00 – 12:00", activity: "Outer Island Speedboat Surf Excursion" },
        { time: "14:00 – 17:00", activity: "Jungle Waterfall Trek & Natural Pool Swim" },
        { time: "18:30 – 21:00", activity: "Canggu Night Market Culinary Tour" }
      ]
    },
    {
      day: "Day 6",
      title: "Surf & Spa Day",
      image: "images/day6.jpg",
      description: "Final surf coaching session to lock in your technique and record souvenir photo moments. Afternoon deep tissue massage & ice bath, followed by a beachfront bonfire party.",
      timetable: [
        { time: "07:30 – 10:30", activity: "Final Progress Surf & Photo Session" },
        { time: "14:00 – 16:30", activity: "Ice Bath Recovery & Deep Tissue Surf Massage" },
        { time: "18:00 – 22:00", activity: "Farewell Beachfront Bonfire Celebration" }
      ]
    }
  ];

  const programList = document.getElementById('programList');
  const programSection = document.getElementById('program');
  const floatingCard = document.getElementById('programFloatingCard');
  const imgLayer1 = document.getElementById('programFloatingImg1');
  const imgLayer2 = document.getElementById('programFloatingImg2');

  if (programList && programSection && floatingCard && imgLayer1 && imgLayer2) {
    // Preload Images into cache memory to ensure zero delay or flickering
    const preloadedImages = {};
    programData.forEach(item => {
      const img = new Image();
      img.src = item.image;
      preloadedImages[item.image] = img;
    });

    // Render Rows Dynamically
    programList.innerHTML = programData.map((item, index) => `
      <div class="program-row" data-index="${index}">
        <div class="program-row-main">
          <div class="program-row-info">
            <span class="program-day">${item.day}</span>
            <h3 class="program-row-title">${item.title}</h3>
          </div>
          <button class="program-arrow-btn" aria-label="Toggle details for ${item.day}">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        <div class="program-accordion-content">
          <div class="program-accordion-inner">
            <div class="program-expanded-layout">
              
              <!-- Column 1: Tabs Nav -->
              <div class="program-col-tabs">
                <button class="program-tab-btn active" data-tab="desc">Description</button>
                <button class="program-tab-btn" data-tab="timetable">Timetable</button>
              </div>

              <!-- Column 2: Middle Content (Text + Join The Camp button at bottom-left) -->
              <div class="program-col-content">
                <div class="program-tab-panels">
                  <!-- Description Panel -->
                  <div class="program-panel panel-desc active">
                    <p class="program-desc-text">${item.description}</p>
                    <a href="#apply" class="btn-join-camp-expanded">
                      <span>Join The Camp</span>
                      <span class="arrow-circle-up"><i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>

                  <!-- Timetable Panel -->
                  <div class="program-panel panel-timetable">
                    <ul class="program-timetable-list">
                      ${item.timetable.map(t => `
                        <li>
                          <span class="time-col">${t.time}</span>
                          <span class="activity-col">${t.activity}</span>
                        </li>
                      `).join('')}
                    </ul>
                    <a href="#apply" class="btn-join-camp-expanded">
                      <span>Join The Camp</span>
                      <span class="arrow-circle-up"><i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Column 3: Clean Rounded Day Photo -->
              <div class="program-col-media">
                <img src="${item.image}" alt="${item.title} Preview" class="program-expanded-img">
              </div>

            </div>
          </div>
        </div>
        <div class="program-divider"></div>
      </div>
    `).join('');

    const rows = programList.querySelectorAll('.program-row');

    // Tab Switcher & Accordion Logic
    rows.forEach(row => {
      const main = row.querySelector('.program-row-main');
      const accordion = row.querySelector('.program-accordion-content');
      const tabBtns = row.querySelectorAll('.program-tab-btn');
      const panelDesc = row.querySelector('.panel-desc');
      const panelTimetable = row.querySelector('.panel-timetable');

      // Tab switcher event listeners
      tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetTab = btn.getAttribute('data-tab');

          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          if (targetTab === 'desc') {
            panelTimetable.classList.remove('active');
            panelDesc.classList.add('active');
          } else {
            panelDesc.classList.remove('active');
            panelTimetable.classList.add('active');
          }

          // Recalculate accordion scrollHeight for smooth tab switching
          accordion.style.maxHeight = accordion.scrollHeight + 'px';
        });
      });

      // Accordion Toggle Behavior (Only 1 item open at a time)
      main.addEventListener('click', () => {
        const isActive = row.classList.contains('active');

        // Close all other rows
        rows.forEach(r => {
          if (r !== row) {
            r.classList.remove('active');
            const otherAccordion = r.querySelector('.program-accordion-content');
            if (otherAccordion) {
              otherAccordion.style.maxHeight = '0px';
            }
          }
        });

        // Toggle current row
        if (isActive) {
          row.classList.remove('active');
          accordion.style.maxHeight = '0px';
          programSection.classList.remove('has-open-row');
        } else {
          row.classList.add('active');
          accordion.style.maxHeight = accordion.scrollHeight + 'px';
          programSection.classList.add('has-open-row');
          floatingCard.classList.remove('active'); // Hide popup hover image immediately on open
        }
      });
    });

    // Hover Preview Logic: only active when NO row is expanded
    let activeLayer = imgLayer1;
    let inactiveLayer = imgLayer2;
    let currentImageSrc = '';

    rows.forEach(row => {
      const index = parseInt(row.getAttribute('data-index'), 10);
      const dataItem = programData[index];

      row.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return;
        // Do not display popup hover image if any accordion item is currently open
        if (programSection.classList.contains('has-open-row')) {
          floatingCard.classList.remove('active');
          return;
        }

        floatingCard.classList.add('active');

        if (currentImageSrc !== dataItem.image) {
          currentImageSrc = dataItem.image;

          activeLayer.classList.remove('active-layer');

          setTimeout(() => {
            inactiveLayer.src = dataItem.image;
            inactiveLayer.classList.add('active-layer');

            const temp = activeLayer;
            activeLayer = inactiveLayer;
            inactiveLayer = temp;
          }, 120);
        }
      });
    });

    // Hide floating image card when cursor leaves section
    programSection.addEventListener('mouseleave', () => {
      floatingCard.classList.remove('active');
    });
  }
});

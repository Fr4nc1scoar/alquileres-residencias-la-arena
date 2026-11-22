// Main Interactive Application Logic - Modular Luxury Real Estate Experience
(function () {
  'use strict';

  // 1. Initial State & Configuration
  const defaultState = {
    status: 'available', // 'available' | 'reserved' | 'occupied'
    priceLow: 80,
    priceHigh: 130,
    priceFixed: 900,
    deposit: 1800,
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    phone1: '584143336722',
    phone1Display: '0414-3336722',
    phone2: '584123598243',
    phone2Display: '0412-3598243',
    wifiNetwork: 'Emi',
    wifiPass: 'Emi.4624',
    wifiContract: '1047992',
    wifiOwner: 'Yuleidys Deluques (V-20.537.753)',
    bancoNombre: 'Banesco',
    bancoCuenta: '0134-0221-3722-1100-7330',
    bancoTitular: 'RESIDENCIA LA ARENA',
    bancoRif: 'J-30257327-0'
  };

  // Load state from URL parameters or localStorage
  function getState() {
    const urlParams = new URLSearchParams(window.location.search);
    const saved = localStorage.getItem('arena_apto_config');
    let state = { ...defaultState };

    if (saved) {
      try {
        state = { ...state, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Error parsing local config', e);
      }
    }

    if (urlParams.has('status')) state.status = urlParams.get('status');
    if (urlParams.has('low')) state.priceLow = parseFloat(urlParams.get('low')) || state.priceLow;
    if (urlParams.has('high')) state.priceHigh = parseFloat(urlParams.get('high')) || state.priceHigh;
    if (urlParams.has('fixed')) state.priceFixed = parseFloat(urlParams.get('fixed')) || state.priceFixed;

    return state;
  }

  let appState = getState();

  // DOM Elements
  const statusBadge = document.getElementById('status-badge');
  const statusText = document.getElementById('status-text');
  const priceLowEl = document.getElementById('price-low-display');
  const priceHighEl = document.getElementById('price-high-display');
  const priceFixedEl = document.getElementById('price-fixed-display');
  const priceFixedDepositEl = document.getElementById('price-fixed-deposit');
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');

  // Sticky Card & Calculator Elements
  const calcNights = document.getElementById('calc-nights');
  const calcSeason = document.getElementById('calc-season');
  const calcGuests = document.getElementById('calc-guests');
  const calcSubtotal = document.getElementById('calc-subtotal');
  const calcNightsCount = document.getElementById('calc-nights-count');
  const calcRatePerNight = document.getElementById('calc-rate-per-night');
  const btnBookVacationWa = document.getElementById('btn-book-vacation-wa');
  const btnBookFixedWa = document.getElementById('btn-book-fixed-wa');

  // Sticky widget tabs
  const stickyTabVac = document.getElementById('sticky-tab-vac');
  const stickyTabFix = document.getElementById('sticky-tab-fix');
  const stickyContentVac = document.getElementById('sticky-content-vac');
  const stickyContentFix = document.getElementById('sticky-content-fix');

  // Lightbox Elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxClose = document.getElementById('lightbox-close');

  // Admin Modal Elements
  const adminModal = document.getElementById('admin-modal');
  const btnOpenAdmin = document.getElementById('btn-open-admin');
  const btnCloseAdmin = document.getElementById('btn-close-admin');
  const formAdmin = document.getElementById('form-admin');
  const adminStatus = document.getElementById('admin-status');
  const adminLow = document.getElementById('admin-price-low');
  const adminHigh = document.getElementById('admin-price-high');
  const adminFixed = document.getElementById('admin-price-fixed');
  const btnCopyShareLink = document.getElementById('btn-copy-share-link');

  let currentCategory = 'todos';
  let filteredImages = [...APARTMENT_IMAGES];
  let currentLightboxIndex = 0;

  // Initialize UI with State
  function renderState() {
    // Status Badge
    if (statusBadge && statusText) {
      statusBadge.className = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all';
      if (appState.status === 'available') {
        statusBadge.classList.add('bg-emerald-500/15', 'text-emerald-700', 'border', 'border-emerald-500/30', 'pulse-available');
        statusText.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1"></span> Disponible para Reservas';
      } else if (appState.status === 'reserved') {
        statusBadge.classList.add('bg-amber-500/15', 'text-amber-800', 'border', 'border-amber-500/30');
        statusText.innerHTML = '🟡 Reserva en Proceso / Consultar';
      } else {
        statusBadge.classList.add('bg-rose-500/15', 'text-rose-800', 'border', 'border-rose-500/30');
        statusText.innerHTML = '🔴 Ocupado Actualmente / Consultar Próxima Fecha';
      }
    }

    // Pricing
    if (priceLowEl) priceLowEl.textContent = `$${appState.priceLow}`;
    if (priceHighEl) priceHighEl.textContent = `$${appState.priceHigh}`;
    if (priceFixedEl) priceFixedEl.textContent = `$${appState.priceFixed}`;
    if (priceFixedDepositEl) priceFixedDepositEl.textContent = `$${appState.priceFixed * 2}`;

    // Mobile sticky bar price
    const mobilePriceDisplay = document.getElementById('mobile-price-display');
    if (mobilePriceDisplay) {
      mobilePriceDisplay.textContent = `$${appState.priceLow} - $${appState.priceHigh}/noche | $${appState.priceFixed}/mes`;
    }

    // Update Calculator
    updateCalculator();
  }

  // 2. Calculator Logic
  function updateCalculator() {
    if (!calcNights || !calcSeason || !calcSubtotal) return;
    
    const nights = parseInt(calcNights.value, 10) || 1;
    const isHigh = calcSeason.value === 'high';
    const rate = isHigh ? appState.priceHigh : appState.priceLow;
    const total = nights * rate;

    calcSubtotal.textContent = `$${total.toLocaleString('en-US')}`;
    if (calcNightsCount) calcNightsCount.textContent = `${nights} ${nights === 1 ? 'noche' : 'noches'}`;
    if (calcRatePerNight) calcRatePerNight.textContent = `$${rate}/noche (${isHigh ? 'Temporada Alta' : 'Temporada Baja'})`;

    // Update WhatsApp link for vacation booking
    if (btnBookVacationWa) {
      const guests = calcGuests ? calcGuests.value : '2-4';
      const seasonText = isHigh ? 'Temporada Alta' : 'Temporada Baja';
      const message = `¡Hola! Vi el apartamento en Res. La Arena en Playa Moreno (Pampatar).\n\nEstoy interesado en una reserva VACACIONAL:\n• Noches: ${nights}\n• Temporada: ${seasonText} ($${rate}/noche)\n• Huéspedes: ${guests} personas\n• Estimado total: $${total}\n\n¿Tienen disponibilidad en estas fechas?`;
      btnBookVacationWa.href = `https://wa.me/${appState.phone1}?text=${encodeURIComponent(message)}`;
    }
  }

  // Events
  if (calcNights) calcNights.addEventListener('input', updateCalculator);
  if (calcSeason) calcSeason.addEventListener('change', updateCalculator);
  if (calcGuests) calcGuests.addEventListener('change', updateCalculator);

  // Setup Fixed Rental WhatsApp Button
  if (btnBookFixedWa) {
    const fixedMessage = `¡Hola! Vi el apartamento en Res. La Arena (Playa Moreno, Pampatar).\n\nEstoy muy interesado en el ALQUILER FIJO ($${appState.priceFixed}/mes con condominio incluido).\n\nQuisiera coordinar una visita y conocer los recaudos para el contrato de 6 meses renovable. ¡Muchas gracias!`;
    btnBookFixedWa.href = `https://wa.me/${appState.phone1}?text=${encodeURIComponent(fixedMessage)}`;
  }

  // Sticky Widget Tab Switcher (Vacacional vs Fijo inside the card)
  if (stickyTabVac && stickyTabFix && stickyContentVac && stickyContentFix) {
    stickyTabVac.addEventListener('click', () => {
      stickyTabVac.classList.add('bg-sky-600', 'text-white', 'shadow-sm');
      stickyTabVac.classList.remove('bg-transparent', 'text-slate-600');
      stickyTabFix.classList.remove('bg-sky-600', 'text-white', 'shadow-sm');
      stickyTabFix.classList.add('bg-transparent', 'text-slate-600');
      stickyContentVac.classList.remove('hidden');
      stickyContentFix.classList.add('hidden');
    });

    stickyTabFix.addEventListener('click', () => {
      stickyTabFix.classList.add('bg-sky-600', 'text-white', 'shadow-sm');
      stickyTabFix.classList.remove('bg-transparent', 'text-slate-600');
      stickyTabVac.classList.remove('bg-sky-600', 'text-white', 'shadow-sm');
      stickyTabVac.classList.add('bg-transparent', 'text-slate-600');
      stickyContentFix.classList.remove('hidden');
      stickyContentVac.classList.add('hidden');
    });
  }

  // 3. Uniform Gallery & Filter Logic (NO WHITE VOIDS)
  function renderGallery(cat = 'todos') {
    if (!galleryGrid) return;
    currentCategory = cat;

    if (cat === 'todos') {
      filteredImages = [...APARTMENT_IMAGES];
    } else {
      filteredImages = APARTMENT_IMAGES.filter(img => img.category === cat);
    }

    galleryGrid.innerHTML = '';

    filteredImages.forEach((img, idx) => {
      const card = document.createElement('div');
      card.className = 'gallery-card group';
      
      card.innerHTML = `
        <img 
          src="${img.file}" 
          alt="${img.title}" 
          loading="lazy" 
        />
        <div class="gallery-card-overlay">
          <span class="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/90 backdrop-blur-sm self-start mb-1 text-white">
            ${formatCategory(img.category)}
          </span>
          <h4 class="font-serif text-base sm:text-lg font-bold leading-snug group-hover:text-sky-200 transition-colors">${img.title}</h4>
          <p class="text-xs text-slate-200 line-clamp-1 mt-0.5">${img.caption}</p>
        </div>

        <div class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="fa-solid fa-expand text-xs"></i>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(idx);
      });

      galleryGrid.appendChild(card);
    });
  }

  function formatCategory(cat) {
    const map = {
      vistas: 'Vista al Mar',
      social: 'Áreas Sociales',
      cocina: 'Cocina & Isla',
      habitaciones: 'Habitaciones',
      banos: 'Baños',
      servicios: 'Servicios',
      normas: 'Reglamentos',
      resumen: 'Resumen'
    };
    return map[cat] || cat;
  }

  // Filter Buttons
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => {
        b.classList.remove('bg-sky-600', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-100');
      });
      btn.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-100');
      btn.classList.add('bg-sky-600', 'text-white', 'shadow-md');

      const category = btn.getAttribute('data-filter');
      renderGallery(category);
    });
  });

  // 4. Lightbox Modal
  window.openLightboxBySrc = function (fileSrc) {
    const index = APARTMENT_IMAGES.findIndex(img => img.file === fileSrc);
    if (index !== -1) {
      filteredImages = [...APARTMENT_IMAGES];
      openLightbox(index);
    }
  };

  function openLightbox(index) {
    if (!lightbox || !filteredImages[index]) return;
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  window.openLightbox = openLightbox;

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const img = filteredImages[currentLightboxIndex];
    if (!img) return;

    if (lightboxImg) {
      lightboxImg.src = img.file;
      lightboxImg.alt = img.title;
    }
    if (lightboxTitle) lightboxTitle.textContent = img.title;
    if (lightboxCaption) lightboxCaption.textContent = img.caption;
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${filteredImages.length}`;
  }

  function prevLightbox() {
    if (currentLightboxIndex > 0) {
      currentLightboxIndex--;
    } else {
      currentLightboxIndex = filteredImages.length - 1;
    }
    updateLightboxContent();
  }

  function nextLightbox() {
    if (currentLightboxIndex < filteredImages.length - 1) {
      currentLightboxIndex++;
    } else {
      currentLightboxIndex = 0;
    }
    updateLightboxContent();
  }

  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.id === 'lightbox-container') {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });

  // 5. Toast System
  window.showToast = function (message, duration = 3000) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-2xl border border-slate-700';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 text-base"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  // 6. Copy to Clipboard Utilities
  window.copyText = function (text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(successMsg || '¡Copiado al portapapeles!');
    }).catch(err => {
      console.error('Failed to copy text', err);
      window.showToast('No se pudo copiar automáticamente');
    });
  };

  // 7. Modular Navigation Pill Highlights on Scroll
  const subnavLinks = document.querySelectorAll('.subnav-pill');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      subnavLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('subnav-active');
        } else {
          link.classList.remove('subnav-active');
        }
      });
    }
  });

  // 8. Admin Drawer / Modal Logic
  if (btnOpenAdmin && adminModal) {
    btnOpenAdmin.addEventListener('click', () => {
      adminStatus.value = appState.status;
      adminLow.value = appState.priceLow;
      adminHigh.value = appState.priceHigh;
      adminFixed.value = appState.priceFixed;
      adminModal.classList.remove('hidden');
    });
  }

  if (btnCloseAdmin && adminModal) {
    btnCloseAdmin.addEventListener('click', () => {
      adminModal.classList.add('hidden');
    });
  }

  if (formAdmin) {
    formAdmin.addEventListener('submit', (e) => {
      e.preventDefault();
      appState.status = adminStatus.value;
      appState.priceLow = parseFloat(adminLow.value) || 80;
      appState.priceHigh = parseFloat(adminHigh.value) || 130;
      appState.priceFixed = parseFloat(adminFixed.value) || 900;
      appState.deposit = appState.priceFixed * 2;

      localStorage.setItem('arena_apto_config', JSON.stringify(appState));
      renderState();
      adminModal.classList.add('hidden');
      window.showToast('Configuración actualizada correctamente');
    });
  }

  if (btnCopyShareLink) {
    btnCopyShareLink.addEventListener('click', () => {
      const baseUrl = window.location.origin + window.location.pathname;
      const shareUrl = `${baseUrl}?status=${appState.status}&low=${appState.priceLow}&high=${appState.priceHigh}&fixed=${appState.priceFixed}`;
      window.copyText(shareUrl, '¡Enlace personalizado copiado! Listo para enviar por WhatsApp');
    });
  }

  // Share via Web Share API
  const btnWebShare = document.getElementById('btn-web-share');
  if (btnWebShare) {
    btnWebShare.addEventListener('click', () => {
      const shareData = {
        title: 'Apartamento de Lujo Frente al Mar | Res. La Arena - Playa Moreno',
        text: 'Mira este hermoso apartamento de 3 habitaciones frente al mar en Pampatar, Isla de Margarita. Alquiler Vacacional y Fijo:',
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        window.copyText(window.location.href, '¡Enlace copiado para compartir!');
      }
    });
  }

  // 9. Initial Load
  renderState();
  renderGallery('todos');

})();

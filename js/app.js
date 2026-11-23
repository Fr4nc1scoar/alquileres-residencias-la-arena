// Modular Luxury Real Estate Application Logic
(function () {
  'use strict';

  // State Management (Fixed official pricing - Locked for clients)
  const appState = {
    status: 'available', // 'available' | 'reserved' | 'occupied'
    priceLow: 80,
    priceHigh: 120, // Actualizado a $120/noche para temporada alta
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
    wifiOwner: 'Yuleidys Deluques (V-20.537.753)'
  };

  // Elements
  const heroStatusBadge = document.getElementById('hero-status-badge');
  const heroStatusText = document.getElementById('hero-status-text');
  const priceLowDisplay = document.getElementById('price-low-display');
  const priceHighDisplay = document.getElementById('price-high-display');
  const priceFixedDisplay = document.getElementById('price-fixed-display');
  const priceFixedDeposit = document.getElementById('price-fixed-deposit');
  const mobilePriceDisplay = document.getElementById('mobile-price-display');

  // Calculator Elements
  const calcNights = document.getElementById('calc-nights');
  const calcSeason = document.getElementById('calc-season');
  const calcGuests = document.getElementById('calc-guests');
  const calcSubtotal = document.getElementById('calc-subtotal');
  const calcNightsCount = document.getElementById('calc-nights-count');
  const calcRatePerNight = document.getElementById('calc-rate-per-night');
  const btnBookVacationWa = document.getElementById('btn-book-vacation-wa');
  const btnBookFixedWa = document.getElementById('btn-book-fixed-wa');

  // Modular Tabs Elements
  const tabBtns = document.querySelectorAll('.tab-module-btn');
  const moduleViews = document.querySelectorAll('.module-view');

  // Gallery & Lightbox Elements
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxClose = document.getElementById('lightbox-close');

  let currentCategory = 'todos';
  let filteredImages = [...APARTMENT_IMAGES];
  let currentLightboxIndex = 0;

  // 1. Render UI State
  function renderState() {
    if (heroStatusBadge && heroStatusText) {
      if (appState.status === 'available') {
        heroStatusBadge.className = 'inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wide backdrop-blur-md bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-md pulse-available whitespace-nowrap';
        heroStatusText.innerHTML = '<span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1"></span>Disponible<span class="hidden sm:inline"> para Reservas</span>';
      } else if (appState.status === 'reserved') {
        heroStatusBadge.className = 'inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wide backdrop-blur-md bg-amber-500/30 text-amber-200 border border-amber-400/50 shadow-md whitespace-nowrap';
        heroStatusText.innerHTML = '🟡 En Proceso<span class="hidden sm:inline"> / Consultar</span>';
      } else {
        heroStatusBadge.className = 'inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wide backdrop-blur-md bg-rose-500/30 text-rose-200 border border-rose-400/50 shadow-md whitespace-nowrap';
        heroStatusText.innerHTML = '🔴 Ocupado<span class="hidden sm:inline"> / Consultar Fechas</span>';
      }
    }

    if (priceLowDisplay) priceLowDisplay.textContent = `$${appState.priceLow}`;
    if (priceHighDisplay) priceHighDisplay.textContent = `$${appState.priceHigh}`;
    if (priceFixedDisplay) priceFixedDisplay.textContent = `$${appState.priceFixed}`;
    if (priceFixedDeposit) priceFixedDeposit.textContent = `$${appState.priceFixed * 2}`;
    if (mobilePriceDisplay) {
      mobilePriceDisplay.textContent = `$${appState.priceLow}-$${appState.priceHigh}/noche | $${appState.priceFixed}/mes`;
    }

    updateCalculator();
  }

  // 2. Calculator
  function updateCalculator() {
    if (!calcNights || !calcSeason || !calcSubtotal) return;

    const nights = parseInt(calcNights.value, 10) || 1;
    const isHigh = calcSeason.value === 'high';
    const rate = isHigh ? appState.priceHigh : appState.priceLow;
    const total = nights * rate;

    calcSubtotal.textContent = `$${total.toLocaleString('en-US')}`;
    if (calcNightsCount) calcNightsCount.textContent = `${nights} ${nights === 1 ? 'noche' : 'noches'}`;
    if (calcRatePerNight) calcRatePerNight.textContent = `$${rate}/noche (${isHigh ? 'Temporada Alta' : 'Temporada Baja'})`;

    if (btnBookVacationWa) {
      const guests = calcGuests ? calcGuests.value : '2-4';
      const seasonText = isHigh ? 'Temporada Alta' : 'Temporada Baja';
      const msg = `¡Hola! Vi el apartamento en Res. La Arena en Playa Moreno (Pampatar).\n\nEstoy interesado en una reserva VACACIONAL:\n• Noches: ${nights}\n• Temporada: ${seasonText} ($${rate}/noche)\n• Huéspedes: ${guests} personas\n• Presupuesto estimado: $${total}\n\n¿Tienen disponibilidad para esas fechas?`;
      btnBookVacationWa.href = `https://wa.me/${appState.phone1}?text=${encodeURIComponent(msg)}`;
    }

    if (btnBookFixedWa) {
      const fixedMsg = `¡Hola! Vi el apartamento en Res. La Arena (Playa Moreno, Pampatar).\n\nEstoy muy interesado en el ALQUILER FIJO ($${appState.priceFixed}/mes con condominio incluido).\n\nQuisiera coordinar una visita y conocer los requisitos del contrato de 6 meses renovable. ¡Muchas gracias!`;
      btnBookFixedWa.href = `https://wa.me/${appState.phone1}?text=${encodeURIComponent(fixedMsg)}`;
    }
  }

  if (calcNights) calcNights.addEventListener('input', updateCalculator);
  if (calcSeason) calcSeason.addEventListener('change', updateCalculator);
  if (calcGuests) calcGuests.addEventListener('change', updateCalculator);

  // 3. Modular Navigation Controller (Directorio visual sin scroll lateral)
  const moduleOrder = ['vacacional', 'fijo', 'fotos', 'ambientes', 'wifi', 'normas', 'ubicacion'];

  const moduleTitles = {
    vacacional: '🌴 Alquiler Vacacional ($80 - $120/noche)',
    fijo: '🏢 Alquiler Fijo ($900/mes canon)',
    fotos: '📸 Galería Fotográfica (21 Fotos HD)',
    ambientes: '🛋️ Ambientes & Espacios del Apartamento',
    wifi: '📶 Portal WiFi DATALINK (Red Emi & QR)',
    normas: '📜 Normas del Edificio, Piscina y Condominio',
    ubicacion: '📍 Ubicación & Entorno (Playa Moreno, Pampatar)',
    todos: '📋 Recorrido Completo (Todos los Módulos)'
  };

  window.switchModule = function (targetId, shouldScroll = true) {
    const isAll = targetId === 'todos';

    // Show/hide modules
    moduleViews.forEach(view => {
      if (isAll || view.id === `mod-${targetId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update active cards in the visual grid
    const moduleCards = document.querySelectorAll('[data-module-card]');
    moduleCards.forEach(card => {
      const cardTarget = card.getAttribute('data-module-card');
      if (isAll || cardTarget === targetId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Update mode buttons (Por Módulo vs Ver Todo)
    const btnModeSingle = document.getElementById('btn-mode-single');
    const btnModeAll = document.getElementById('btn-mode-all');
    if (btnModeSingle && btnModeAll) {
      if (isAll) {
        btnModeAll.classList.add('active');
        btnModeSingle.classList.remove('active');
      } else {
        btnModeSingle.classList.add('active');
        btnModeAll.classList.remove('active');
      }
    }

    // Update current module header bar
    const currentModuleTitle = document.getElementById('current-module-title');
    if (currentModuleTitle) {
      currentModuleTitle.textContent = moduleTitles[targetId] || 'Módulo de Consulta';
    }

    // Update URL hash
    if (history.replaceState) {
      history.replaceState(null, null, `#${targetId}`);
    }

    // Smooth scroll to active module section
    if (shouldScroll) {
      const anchor = document.getElementById('active-module-anchor');
      if (anchor) {
        const topOffset = anchor.getBoundingClientRect().top + window.pageYOffset - 75;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
  };

  window.navigateModule = function (direction) {
    const current = window.location.hash.replace('#', '') || 'vacacional';
    let idx = moduleOrder.indexOf(current);
    if (idx === -1) idx = 0;
    if (direction === 'next') {
      idx = (idx + 1) % moduleOrder.length;
    } else if (direction === 'prev') {
      idx = (idx - 1 + moduleOrder.length) % moduleOrder.length;
    }
    window.switchModule(moduleOrder[idx]);
  };

  window.scrollToMenu = function () {
    const menu = document.getElementById('modulos-directorio');
    if (menu) {
      const topOffset = menu.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Check URL hash on load
  function initHashModule() {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['vacacional', 'fijo', 'fotos', 'ambientes', 'wifi', 'normas', 'ubicacion', 'todos'].includes(hash)) {
      window.switchModule(hash, false);
    }
  }

  // 4. Uniform Gallery (Zero white spaces)
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
        <img src="${img.file}" alt="${img.title}" loading="lazy" />
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

  // 5. Lightbox
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
    currentLightboxIndex = (currentLightboxIndex > 0) ? currentLightboxIndex - 1 : filteredImages.length - 1;
    updateLightboxContent();
  }

  function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex < filteredImages.length - 1) ? currentLightboxIndex + 1 : 0;
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

  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });

  // 6. Copy Utilities & Toasts
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

  window.copyText = function (text, successMsg) {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(successMsg || '¡Copiado al portapapeles!');
    }).catch(() => {
      window.showToast('No se pudo copiar automáticamente');
    });
  };

  // 7. Web Share
  const btnWebShare = document.getElementById('btn-web-share');
  if (btnWebShare) {
    btnWebShare.addEventListener('click', () => {
      const shareData = {
        title: 'Apartamento de Lujo Frente al Mar | Res. La Arena - Playa Moreno',
        text: 'Mira este hermoso apartamento de 3 habitaciones frente al mar en Pampatar, Margarita:',
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        window.copyText(window.location.href, '¡Enlace copiado para compartir!');
      }
    });
  }

  // 8. Panoramic Hero Carousel (6 horizontal 4:3 photos, uncropped)
  const heroSlides = [
    { src: 'images/vista-panoramica-mar.jpg', title: 'Vista Panorámica al Mar Caribe' },
    { src: 'images/vista-general-social.jpg', title: 'Área Social Integrada' },
    { src: 'images/sala-estar.jpg', title: 'Sala de Estar Confortable' },
    { src: 'images/habitacion-principal.jpg', title: 'Suite Principal Matrimonial' },
    { src: 'images/habitacion-2.jpg', title: 'Habitación Secundaria (2 Camas)' },
    { src: 'images/vista-mar-tibisay.jpg', title: 'Vista al Mar y Playa Moreno' }
  ];
  let heroSlideIndex = 0;

  function renderHeroSlide() {
    const imgEl = document.getElementById('hero-carousel-img');
    const captionEl = document.getElementById('hero-carousel-caption');
    const counterEl = document.getElementById('hero-carousel-counter');
    if (!imgEl) return;
    const slide = heroSlides[heroSlideIndex];
    imgEl.style.opacity = '0.6';
    setTimeout(() => {
      imgEl.src = slide.src;
      imgEl.alt = slide.title;
      if (captionEl) {
        captionEl.innerHTML = `<i class="fa-solid fa-camera text-sky-400 shrink-0"></i><span class="truncate">${slide.title}</span>`;
      }
      if (counterEl) {
        counterEl.textContent = `${heroSlideIndex + 1} / ${heroSlides.length}`;
      }
      imgEl.style.opacity = '1';
    }, 100);
  }

  window.heroCarouselStep = function (delta) {
    heroSlideIndex = (heroSlideIndex + delta + heroSlides.length) % heroSlides.length;
    renderHeroSlide();
  };

  window.openHeroLightbox = function () {
    if (typeof window.openLightboxBySrc === 'function') {
      window.openLightboxBySrc(heroSlides[heroSlideIndex].src);
    }
  };

  // Touch swipe on Hero Carousel
  const heroImgEl = document.getElementById('hero-carousel-img');
  if (heroImgEl) {
    let touchStartX = 0;
    heroImgEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    heroImgEl.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 40) {
        window.heroCarouselStep(diff < 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  // 9. Init
  renderState();
  renderGallery('todos');
  initHashModule();

})();

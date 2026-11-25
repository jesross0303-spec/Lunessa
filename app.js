/**
 * ============================================================================
 * BEAUTE - Software CRM & E-Commerce Catálogo
 * Directora Técnica: Jesmary Rossell
 * Teléfono / WhatsApp: +57 3134880917
 * Paleta de Marca: #010101 (Onyx) | #2596be (Cyan Dermo) | #D4AF37 (Oro Real)
 * ============================================================================
 */

// Estado global de la aplicación
const APP_STATE = {
  activeView: 'store', // 'store' o 'crm'
  crmTab: 'dashboard',  // 'dashboard', 'clients', 'orders', 'inventory', 'settings'
  activeCategory: 'todos',
  searchQuery: '',
  cart: [],
  currentSlide: 0,
  carouselTimer: null,
  selectedProductModal: null,

  // Datos base
  products: [],
  clients: [],
  orders: [],
  businessConfig: {
    brandName: "BEAUTE",
    founder: "Jesmary Rossell",
    phone: "3134880917",
    intlPhone: "573134880917",
    email: "lunessa.aesthetic@gmail.com",
    hours: "8:00 am - 5:00 pm",
    instagram: "@beaute_dermoestetica",
    currency: "COP"
  }
};

// Catálogo inicial basado en las imágenes de MEDIA (001 a 007) y especificaciones
const INITIAL_PRODUCTS = [
  {
    id: 'tca-40',
    name: 'OUHOE TCA 40% Skin Peel Serum',
    subtitle: 'Ácido Málico & Cítrico | Renovación Cutánea Profunda',
    category: 'sueros',
    price: 58000,
    stock: 24,
    lot: '250002',
    expiry: '2027-10',
    image: 'MEDIA/002.jpg',
    badge: 'TCA 40%',
    badgeColor: 'teal',
    isProfessional: false,
    tags: ['Anti-edad', 'Acné', 'Manchas', 'Tono Uniforme'],
    desc: 'Suero peeling con Ácido Tricloroacético al 40%, enriquecido con ácido málico, cítrico, niacinamida y tocoferol (Vitamina E). Reduce imperfecciones, manchas oscuras y estimula la síntesis de colágeno dérmico.',
    usage: 'Aplicar en la noche de 3 a 5 gotas sobre la piel limpia y seca. Dejar actuar de 3 a 7 minutos y aclarar con abundante agua fría. Uso estricto de protector solar FPS 50+ durante el día.',
    ph: 'pH 2.0 - 2.4',
    size: '30 ml / 1 fl. oz'
  },
  {
    id: 'sanaliv-cbd',
    name: 'SANALIV Firmeza - Crema Anticelulitis LMAC + CBD',
    subtitle: 'Activos Naturales Botánicos | Cero THC | Libre de Parabenos',
    category: 'corporal',
    price: 65000,
    stock: 18,
    lot: '250001',
    expiry: '2027-08',
    image: 'MEDIA/003.jpg',
    badge: 'CBD + LMAC',
    badgeColor: 'gold',
    isProfessional: false,
    tags: ['Corporal', 'Anticelulitis', 'Firmeza', 'Fitoterapia'],
    desc: 'Tratamiento corporal avanzado formulado a base de CBD (cannabidiol botánico seleccionado) y extracto reafirmante LMAC. Tonifica los tejidos, mejora la microcirculación y otorga elasticidad sin residuos grasos.',
    usage: 'Aplicar diariamente mañana y noche con masajes circulares ascendentes en abdomen, muslos, piernas o glúteos hasta su total absorción.',
    ph: 'pH 5.5 Neutro',
    size: '120 ml'
  },
  {
    id: 'salicilico-spray',
    name: 'Ácido Salicílico 35% Spray Profesional',
    subtitle: 'BHA Exfoliante Intensivo con Respaldo Peeling AHA 30% + BHA 2%',
    category: 'tonicos',
    price: 62000,
    stock: 16,
    lot: '250003',
    expiry: '2027-10',
    image: 'MEDIA/004.jpg',
    badge: 'Salicílico 35%',
    badgeColor: 'teal',
    isProfessional: true,
    tags: ['BHA Lipofílico', 'Control Seborreico', 'Poros Limpios'],
    desc: 'Fórmula profesional atomizada de ácido salicílico al 35%. Acción queratolítica profunda que desobstruye folículos pilosebáceos, previene comedones y elimina impurezas bacterianas causantes del acné.',
    usage: 'Atomizar sobre gasa o almohadilla y aplicar uniformemente sobre la zona a tratar. En protocolos profesionales de cabina, se ajusta según tolerancia cutánea.',
    ph: 'pH 2.8',
    size: '30 ml'
  },
  {
    id: 'lactic-aha-bha',
    name: 'EELHOE Lactic Acid 10% + ROZINO AHA-PHA-BHA 32%',
    subtitle: 'Dúo Multiactivo Peeling Suave & Gloss Effect',
    category: 'sueros',
    price: 55000,
    stock: 22,
    lot: '250005',
    expiry: '2027-11',
    image: 'MEDIA/005.jpg',
    badge: 'AHA PHA BHA 32%',
    badgeColor: 'gold',
    isProfessional: false,
    tags: ['Ácido Láctico + HA', 'Brillo Sedoso', 'Todo Tipo de Piel'],
    desc: 'Complejo sinérgico hidroxiácido (25% alfa + 5% poli + 2% beta) enriquecido con ácido hialurónico y ácido láctico al 10%. Proporciona renovación celular superficial sin agredir la barrera cutánea.',
    usage: 'Aplicar de 4 a 6 gotas por las noches sobre rostro limpio. Realizar suave masaje dermo-facial. Enjuagar o dejar actuar según protocolo individualizado.',
    ph: 'pH 3.4 - 3.8',
    size: '30 ml'
  },
  {
    id: 'salicilico-cabina',
    name: 'Ácido Salicílico Puro Profesional - Lunessa Aesthetic',
    subtitle: 'Solución Tónica Purificante Dermo-Clínica',
    category: 'tonicos',
    price: 48000,
    stock: 14,
    lot: '250003',
    expiry: '2027-10',
    image: 'MEDIA/006.jpg',
    badge: 'Uso Profesional',
    badgeColor: 'teal',
    isProfessional: true,
    tags: ['Cabina Estética', 'Purificante', 'Sebo-regulador'],
    desc: 'Formulación pura y estable de alta penetración diseñada para cosmetólogas y profesionales de la estética. Máxima asepsia dérmica y equilibrio en pieles acneicas y seborreicas.',
    usage: 'Uso en cabina estética previo a extracciones faciales o como paso preparatorio para peelings despigmentantes.',
    ph: 'pH 3.0',
    size: '30 ml Atomizador'
  },
  {
    id: 'tca-50-profesional',
    name: 'LUNESSA TCA 50% - Frasco de Vidrio Esmerilado',
    subtitle: 'Peeling Químico Profundo Grado Médico-Estético',
    category: 'profesional',
    price: 75000,
    stock: 10,
    lot: '250004',
    expiry: '2027-10',
    image: 'MEDIA/007.jpg',
    badge: 'TCA 50% Especializado',
    badgeColor: 'gold',
    isProfessional: true,
    tags: ['TCA 50%', 'Cicatrices', 'Rejuvenecimiento Severo'],
    desc: 'Presentación de alta gama en vidrio esmerilado con gotero de precisión. Ácido Tricloroacético al 50% para peeling de profundidad media a profunda. Remodela la arquitectura dérmica y atenúa cicatrices atróficas.',
    usage: 'EXCLUSIVO PROFESIONAL. Requiere valoración dérmica previa, desengrasado con alcohol/acetona y neutralización inmediata ante escarcha dérmica (frosting).',
    ph: 'pH 1.5 Ultra-activo',
    size: '30 ml Gotero de Precisión'
  }
];

// Clientes iniciales para el CRM
const INITIAL_CLIENTS = [
  {
    id: 1,
    name: 'Camila Montoya',
    phone: '3128945612',
    email: 'camila.montoya@gmail.com',
    city: 'Medellín',
    skinType: 'Grasa con tendencia acneica',
    allergies: 'Ninguna reportada',
    notes: 'Tratamiento en curso con Ácido Salicílico 35% y TCA 40%. Reporta 80% de mejoría en brotes activos.',
    totalPurchases: 120000,
    lastPurchaseDate: '2026-10-18'
  },
  {
    id: 2,
    name: 'Dra. Valentina Morales (Clínica Belladonna)',
    phone: '3004567890',
    email: 'valentina.morales@belladonna.co',
    city: 'Bogotá',
    skinType: 'Profesional Estética',
    allergies: 'Ninguna',
    notes: 'Cliente VIP y compradora frecuente de TCA 50% (lote 250004) y kits para cabina.',
    totalPurchases: 225000,
    lastPurchaseDate: '2026-10-20'
  },
  {
    id: 3,
    name: 'Mariana Giraldo',
    phone: '3157891234',
    email: 'mariana.g@hotmail.com',
    city: 'Cali',
    skinType: 'Mixta / Sensible',
    allergies: 'Sensibilidad a fragancias artificiales',
    notes: 'Se le recomendó el Dúo Ácido Láctico + HA y Sanaliv Crema Firmeza CBD por no contener parabenos.',
    totalPurchases: 120000,
    lastPurchaseDate: '2026-10-21'
  }
];

// Pedidos iniciales para el CRM
const INITIAL_ORDERS = [
  {
    id: 'ORD-1001',
    clientName: 'Dra. Valentina Morales',
    clientPhone: '3004567890',
    city: 'Bogotá',
    address: 'Calle 100 # 15-20, Consultorio 402',
    date: '2026-10-20',
    status: 'Enviado',
    items: [
      { id: 'tca-50-profesional', name: 'LUNESSA TCA 50%', quantity: 3, price: 75000 }
    ],
    total: 225000,
    notes: 'Envío asegurado por Servientrega. Guía #982314510.'
  },
  {
    id: 'ORD-1002',
    clientName: 'Camila Montoya',
    clientPhone: '3128945612',
    city: 'Medellín',
    address: 'Carrera 43A # 1Sur-220, El Poblado',
    date: '2026-10-21',
    status: 'Confirmado',
    items: [
      { id: 'salicilico-spray', name: 'Ácido Salicílico 35% Spray', quantity: 1, price: 62000 },
      { id: 'tca-40', name: 'OUHOE TCA 40% Skin Peel', quantity: 1, price: 58000 }
    ],
    total: 120000,
    notes: 'Enviar con folleto de cuidados y recomendaciones post-peeling.'
  }
];

// Carrusel de promociones
const PROMOTIONS = [
  {
    title: "RENOVACIÓN DÉRMICA PROFUNDA",
    subtitle: "Fórmulas Especializadas TCA 40% & TCA 50%",
    desc: "Atenúa manchas rebeldes, secuelas de acné y fotoenvejecimiento con la supervisión dermo-cosmética de Jesmary Rossell.",
    badge: "OFERTA DE TEMPORADA",
    tag: "Hasta 20% OFF en Kits Profesionales",
    bgClass: "from-sky-950/80 via-slate-900 to-black",
    actionCategory: "sueros"
  },
  {
    title: "CONTROL TOTAL DE ACNÉ Y POROS",
    subtitle: "Ácido Salicílico 35% Spray Profesional",
    desc: "Penetración lipofílica selectiva para disolver impurezas profundas y restaurar la claridad y balance dérmico.",
    badge: "MÁS VENDIDO EN CABINA",
    tag: "Lote Fresco 250003 Garantizado",
    bgClass: "from-teal-950/80 via-slate-900 to-black",
    actionCategory: "tonicos"
  },
  {
    title: "FIRMEZA NATURAL & BIENESTAR LMAC",
    subtitle: "Sanaliv Crema Anticelulitis con CBD Botánico",
    desc: "Reafirma tu piel con el poder botánico del Cannabidiol puro libre de THC y sin parabenos.",
    badge: "100% INGREDIENTES NATURALES",
    tag: "120 ml de Hidratación Reparadora",
    bgClass: "from-amber-950/80 via-slate-900 to-black",
    actionCategory: "corporal"
  }
];

// ============================================================================
// INICIALIZACIÓN Y PERSISTENCIA
// ============================================================================

function initApp() {
  loadFromLocalStorage();
  setupEventListeners();
  renderStore();
  startCarousel();
}

function loadFromLocalStorage() {
  const storedProducts = localStorage.getItem('beaute_products');
  const storedClients = localStorage.getItem('beaute_clients');
  const storedOrders = localStorage.getItem('beaute_orders');
  const storedCart = localStorage.getItem('beaute_cart');

  APP_STATE.products = storedProducts ? JSON.parse(storedProducts) : [...INITIAL_PRODUCTS];
  APP_STATE.clients = storedClients ? JSON.parse(storedClients) : [...INITIAL_CLIENTS];
  APP_STATE.orders = storedOrders ? JSON.parse(storedOrders) : [...INITIAL_ORDERS];
  APP_STATE.cart = storedCart ? JSON.parse(storedCart) : [];

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('beaute_products', JSON.stringify(APP_STATE.products));
  localStorage.setItem('beaute_clients', JSON.stringify(APP_STATE.clients));
  localStorage.setItem('beaute_orders', JSON.stringify(APP_STATE.orders));
  localStorage.setItem('beaute_cart', JSON.stringify(APP_STATE.cart));
}

// Formateador de moneda en pesos colombianos
function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);
}

// ============================================================================
// CONTROLADOR DE VISTAS (TIENDA VS CRM)
// ============================================================================

function switchView(viewName) {
  APP_STATE.activeView = viewName;
  const storeView = document.getElementById('store-view');
  const crmView = document.getElementById('crm-view');
  const viewBadge = document.getElementById('current-view-badge');

  if (viewName === 'store') {
    storeView.classList.remove('hidden');
    crmView.classList.add('hidden');
    viewBadge.textContent = "Catálogo Online";
    viewBadge.className = "px-3 py-1 text-xs rounded-full bg-teal-500/20 text-[#2596be] border border-[#2596be]/30";
    renderStore();
  } else {
    storeView.classList.add('hidden');
    crmView.classList.remove('hidden');
    viewBadge.textContent = "Panel CRM Administrativo";
    viewBadge.className = "px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30";
    renderCRM();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchCrmTab(tabName) {
  APP_STATE.crmTab = tabName;
  const tabs = ['dashboard', 'clients', 'orders', 'inventory', 'settings'];
  
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`tab-content-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.classList.add('bg-[#2596be]', 'text-white', 'shadow-lg');
        btn.classList.remove('text-slate-400', 'hover:bg-slate-800');
      } else {
        btn.classList.remove('bg-[#2596be]', 'text-white', 'shadow-lg');
        btn.classList.add('text-slate-400', 'hover:bg-slate-800');
      }
    }
    if (content) {
      if (t === tabName) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    }
  });

  renderCRM();
}

// ============================================================================
// CARRUSEL DE PROMOCIONES
// ============================================================================

function startCarousel() {
  renderCarouselSlide();
  if (APP_STATE.carouselTimer) clearInterval(APP_STATE.carouselTimer);
  APP_STATE.carouselTimer = setInterval(() => {
    APP_STATE.currentSlide = (APP_STATE.currentSlide + 1) % PROMOTIONS.length;
    renderCarouselSlide();
  }, 6000);
}

function nextSlide() {
  APP_STATE.currentSlide = (APP_STATE.currentSlide + 1) % PROMOTIONS.length;
  renderCarouselSlide();
}

function prevSlide() {
  APP_STATE.currentSlide = (APP_STATE.currentSlide - 1 + PROMOTIONS.length) % PROMOTIONS.length;
  renderCarouselSlide();
}

function renderCarouselSlide() {
  const container = document.getElementById('carousel-slide-content');
  const indicatorsContainer = document.getElementById('carousel-indicators');
  if (!container) return;

  const promo = PROMOTIONS[APP_STATE.currentSlide];
  container.innerHTML = `
    <div class="relative overflow-hidden rounded-2xl p-8 md:p-12 border border-[#d4af37]/30 bg-gradient-to-r ${promo.bgClass} shadow-2xl transition-all duration-700">
      <div class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#2596be]/10 blur-3xl pointer-events-none"></div>
      <div class="max-w-2xl relative z-10">
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#d4af37]/20 text-[#f3e5ab] border border-[#d4af37]/40">
            ${promo.badge}
          </span>
          <span class="text-xs text-sky-400 font-medium tracking-wide">
            <i class="fa-solid fa-sparkles mr-1"></i> ${promo.tag}
          </span>
        </div>
        <h2 class="text-2xl md:text-4xl font-bold font-serif-luxury text-white mb-2 tracking-wide leading-tight">
          ${promo.title}
        </h2>
        <p class="text-lg md:text-xl font-medium text-[#2596be] mb-4">
          ${promo.subtitle}
        </p>
        <p class="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
          ${promo.desc}
        </p>
        <div class="flex flex-wrap gap-4 items-center">
          <button onclick="filterCategory('${promo.actionCategory}')" class="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2596be] to-[#1e7a9c] hover:from-[#2eaddb] hover:to-[#2596be] text-white font-semibold shadow-lg shadow-[#2596be]/30 flex items-center gap-2 transform active:scale-95 transition-all">
            <i class="fa-solid fa-gem text-amber-300"></i> Ver Productos en Promo
          </button>
          <a href="https://wa.me/573134880917?text=${encodeURIComponent('Hola Jesmary Rossell, vi la promoción en BEAUTE: ' + promo.title + ' y deseo recibir asesoría personalizada.')}" target="_blank" class="px-5 py-3 rounded-xl bg-black/60 hover:bg-black/90 text-[#f3e5ab] border border-[#d4af37]/40 font-medium flex items-center gap-2 transition-all">
            <i class="fa-brands fa-whatsapp text-emerald-400 text-lg"></i> Asesoría con Jesmary
          </a>
        </div>
      </div>
    </div>
  `;

  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = PROMOTIONS.map((_, idx) => `
      <button onclick="goToSlide(${idx})" class="h-2 rounded-full transition-all duration-300 ${idx === APP_STATE.currentSlide ? 'w-8 bg-[#2596be]' : 'w-2 bg-slate-700 hover:bg-slate-500'}"></button>
    `).join('');
  }
}

function goToSlide(idx) {
  APP_STATE.currentSlide = idx;
  renderCarouselSlide();
}

// ============================================================================
// RENDERIZADO DE LA TIENDA Y CATÁLOGO
// ============================================================================

function filterCategory(category) {
  APP_STATE.activeCategory = category;
  
  // Actualizar botones de categoría
  document.querySelectorAll('.cat-btn').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.className = "cat-btn px-4 py-2 rounded-xl text-sm font-semibold bg-[#2596be] text-white shadow-lg shadow-[#2596be]/30 border border-[#2596be]";
    } else {
      btn.className = "cat-btn px-4 py-2 rounded-xl text-sm font-medium bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800";
    }
  });

  renderProductGrid();

  // Scroll suave al catálogo si se clickea desde el carrusel
  const catalogEl = document.getElementById('catalogo-section');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function onSearchInput(event) {
  APP_STATE.searchQuery = event.target.value.toLowerCase().trim();
  renderProductGrid();
}

function renderStore() {
  renderProductGrid();
  renderCartBadge();
}

function renderProductGrid() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = APP_STATE.products.filter(p => {
    const matchesCat = APP_STATE.activeCategory === 'todos' || p.category === APP_STATE.activeCategory;
    const matchesSearch = !APP_STATE.searchQuery || 
      p.name.toLowerCase().includes(APP_STATE.searchQuery) ||
      p.desc.toLowerCase().includes(APP_STATE.searchQuery) ||
      p.tags.some(t => t.toLowerCase().includes(APP_STATE.searchQuery));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i class="fa-solid fa-magnifying-glass text-4xl mb-3 text-slate-600"></i>
        <p class="text-lg">No encontramos productos bajo los criterios de búsqueda.</p>
        <button onclick="filterCategory('todos')" class="mt-4 px-4 py-2 rounded-lg bg-slate-800 text-sky-400 hover:bg-slate-700 text-sm">
          Restablecer Filtros
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const badgeStyle = product.badgeColor === 'gold' 
      ? 'bg-[#d4af37]/20 text-[#f3e5ab] border-[#d4af37]/40'
      : 'bg-[#2596be]/20 text-[#38bdf8] border-[#2596be]/40';

    return `
      <div class="product-card glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group">
        <!-- Imagen y Badges -->
        <div class="relative overflow-hidden aspect-square bg-slate-950/60 cursor-pointer" onclick="openProductModal('${product.id}')">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-img w-full h-full object-cover object-center"
            onerror="this.src='MEDIA/001.jpg'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity"></div>
          
          <!-- Badges superiores -->
          <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${badgeStyle} backdrop-blur-md">
              ${product.badge}
            </span>
            ${product.isProfessional ? `
              <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-rose-500/30">
                Uso Profesional
              </span>
            ` : ''}
          </div>

          <div class="absolute top-3 right-3 z-10">
            <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-black/70 text-slate-300 border border-slate-700/60 backdrop-blur-md">
              Lote: ${product.lot}
            </span>
          </div>

          <!-- Quick view hover button -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            <span class="px-4 py-2 rounded-xl bg-black/80 text-white text-xs font-semibold border border-sky-400/40 backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <i class="fa-solid fa-eye text-sky-400"></i> Ver Ficha Técnica
            </span>
          </div>
        </div>

        <!-- Información -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>${product.size}</span>
              <span class="text-amber-400/90 font-mono">${product.ph}</span>
            </div>
            <h3 class="font-bold text-lg text-white mb-1 leading-snug group-hover:text-[#38bdf8] transition-colors cursor-pointer" onclick="openProductModal('${product.id}')">
              ${product.name}
            </h3>
            <p class="text-xs text-slate-400 mb-3 line-clamp-2">
              ${product.subtitle}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${product.tags.slice(0, 3).map(tag => `
                <span class="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                  ${tag}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Precio y Botones -->
          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <div>
              <span class="text-[10px] uppercase tracking-wider text-slate-400 block">Precio Especial</span>
              <span class="text-xl font-bold font-mono text-[#f3e5ab]">
                ${formatCurrency(product.price)}
              </span>
            </div>

            <div class="flex items-center gap-1.5">
              <button 
                onclick="openProductModal('${product.id}')" 
                title="Ver Ficha Técnica"
                class="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors">
                <i class="fa-solid fa-file-lines"></i>
              </button>
              <button 
                onclick="addToCart('${product.id}')" 
                class="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#2596be] to-[#1e7a9c] hover:from-[#2eaddb] hover:to-[#2596be] text-white font-semibold shadow-md shadow-[#2596be]/20 active:scale-95 transition-all flex items-center gap-1.5 text-xs">
                <i class="fa-solid fa-cart-plus"></i>
                <span>Agregar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Modal de detalles de producto
function openProductModal(productId) {
  const product = APP_STATE.products.find(p => p.id === productId);
  if (!product) return;

  APP_STATE.selectedProductModal = product;
  const modal = document.getElementById('product-modal');
  const content = document.getElementById('product-modal-content');

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div class="rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-slate-800">
        <img src="${product.image}" alt="${product.name}" class="w-full max-h-[380px] object-contain" onerror="this.src='MEDIA/001.jpg'"/>
      </div>
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2596be]/20 text-[#38bdf8] border border-[#2596be]/40">
              ${product.badge}
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#d4af37]/20 text-[#f3e5ab] border border-[#d4af37]/40">
              ${product.size}
            </span>
            ${product.isProfessional ? `
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-950/80 text-rose-300 border border-rose-500/30">
                Uso Profesional
              </span>
            ` : ''}
          </div>
          <h2 class="text-2xl font-bold font-serif-luxury text-white mb-1">${product.name}</h2>
          <p class="text-sm text-[#2596be] font-medium mb-4">${product.subtitle}</p>
          
          <div class="space-y-3 mb-6 text-sm text-slate-300">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <i class="fa-solid fa-flask-vial text-teal-400"></i> Descripción y Acción Cosmética
              </h4>
              <p class="leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">${product.desc}</p>
            </div>

            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <i class="fa-solid fa-hand-holding-droplet text-amber-400"></i> Modo de Uso Recomendado
              </h4>
              <p class="leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">${product.usage}</p>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span class="text-slate-500 block">Nivel de Acidez:</span>
                <span class="font-mono font-bold text-amber-300">${product.ph}</span>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span class="text-slate-500 block">Lote & Vencimiento:</span>
                <span class="font-mono font-bold text-teal-300">Lote ${product.lot} (${product.expiry})</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 block">Inversión:</span>
            <span class="text-2xl font-bold font-mono text-[#f3e5ab]">${formatCurrency(product.price)}</span>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="addToCart('${product.id}'); closeProductModal();" class="px-5 py-3 rounded-xl bg-gradient-to-r from-[#2596be] to-[#1e7a9c] hover:from-[#2eaddb] hover:to-[#2596be] text-white font-semibold shadow-lg shadow-[#2596be]/30 flex items-center gap-2">
              <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.add('hidden');
  APP_STATE.selectedProductModal = null;
}

// ============================================================================
// CARRITO DE COMPRAS Y CHECKOUT POR WHATSAPP
// ============================================================================

function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.toggle('translate-x-full');
  renderCart();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.add('translate-x-full');
}

function addToCart(productId) {
  const product = APP_STATE.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = APP_STATE.cart.find(i => i.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    APP_STATE.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      lot: product.lot,
      quantity: 1
    });
  }

  saveToLocalStorage();
  renderCartBadge();
  showNotification(`"${product.name}" agregado al carrito.`);
}

function updateCartQuantity(productId, delta) {
  const item = APP_STATE.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    APP_STATE.cart = APP_STATE.cart.filter(i => i.id !== productId);
  }

  saveToLocalStorage();
  renderCart();
  renderCartBadge();
}

function removeFromCart(productId) {
  APP_STATE.cart = APP_STATE.cart.filter(i => i.id !== productId);
  saveToLocalStorage();
  renderCart();
  renderCartBadge();
}

function clearCart() {
  if (APP_STATE.cart.length === 0) return;
  if (confirm("¿Deseas vaciar todos los productos del carrito?")) {
    APP_STATE.cart = [];
    saveToLocalStorage();
    renderCart();
    renderCartBadge();
  }
}

function renderCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = APP_STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) {
    badge.textContent = count;
    badge.className = count > 0 
      ? "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#2596be] to-sky-400 text-black font-extrabold text-[11px] flex items-center justify-center animate-bounce"
      : "hidden";
  }
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  if (!container) return;

  if (APP_STATE.cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-slate-500">
        <i class="fa-solid fa-cart-shopping text-5xl mb-4 text-slate-700"></i>
        <p class="text-base font-medium text-slate-400">Tu carrito de compras está vacío</p>
        <p class="text-xs text-slate-500 mt-1">Explora nuestros sueros y tónicos y agrégalos aquí.</p>
        <button onclick="closeCartDrawer();" class="mt-6 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-sm">
          Explorar Catálogo
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
    if (totalEl) totalEl.textContent = formatCurrency(0);
    return;
  }

  const subtotal = APP_STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (totalEl) totalEl.textContent = formatCurrency(subtotal);

  container.innerHTML = APP_STATE.cart.map(item => `
    <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
      <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-lg object-cover bg-black" onerror="this.src='MEDIA/001.jpg'"/>
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-semibold text-white truncate">${item.name}</h4>
        <div class="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
          <span>${item.size}</span>
          <span class="text-amber-400 font-mono">${formatCurrency(item.price)}</span>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="updateCartQuantity('${item.id}', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center">-</button>
          <span class="text-xs font-mono font-bold text-white px-1.5">${item.quantity}</span>
          <button onclick="updateCartQuantity('${item.id}', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center">+</button>
        </div>
      </div>
      <div class="text-right">
        <div class="text-sm font-mono font-bold text-[#f3e5ab]">
          ${formatCurrency(item.price * item.quantity)}
        </div>
        <button onclick="removeFromCart('${item.id}')" class="text-slate-500 hover:text-red-400 text-xs mt-2 transition-colors">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Finalizar pedido y enviar por WhatsApp
function checkoutWhatsApp(event) {
  event.preventDefault();

  if (APP_STATE.cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const nameInput = document.getElementById('checkout-name');
  const phoneInput = document.getElementById('checkout-phone');
  const cityInput = document.getElementById('checkout-city');
  const addressInput = document.getElementById('checkout-address');
  const notesInput = document.getElementById('checkout-notes');

  const clientName = nameInput ? nameInput.value.trim() : "Cliente";
  const clientPhone = phoneInput ? phoneInput.value.trim() : "";
  const clientCity = cityInput ? cityInput.value.trim() : "";
  const clientAddress = addressInput ? addressInput.value.trim() : "";
  const clientNotes = notesInput ? notesInput.value.trim() : "";

  if (!clientName || !clientPhone) {
    alert("Por favor ingresa tu Nombre y Teléfono WhatsApp para coordinar el envío.");
    return;
  }

  const total = APP_STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
  const today = new Date().toISOString().split('T')[0];

  // Crear el nuevo pedido en el CRM
  const newOrder = {
    id: orderId,
    clientName,
    clientPhone,
    city: clientCity,
    address: clientAddress,
    date: today,
    status: 'Pendiente',
    items: [...APP_STATE.cart],
    total,
    notes: clientNotes || 'Pedido generado desde la tienda web'
  };

  APP_STATE.orders.unshift(newOrder);

  // Registrar o actualizar cliente en CRM
  let existingClient = APP_STATE.clients.find(c => c.phone === clientPhone);
  if (existingClient) {
    existingClient.totalPurchases += total;
    existingClient.lastPurchaseDate = today;
    if (clientCity) existingClient.city = clientCity;
  } else {
    APP_STATE.clients.push({
      id: Date.now(),
      name: clientName,
      phone: clientPhone,
      email: '',
      city: clientCity,
      skinType: 'Por evaluar',
      allergies: 'No registradas',
      notes: `Primer pedido web (${orderId}): ${clientNotes}`,
      totalPurchases: total,
      lastPurchaseDate: today
    });
  }

  saveToLocalStorage();

  // Construir mensaje para WhatsApp
  let itemsText = APP_STATE.cart.map(i => `• ${i.quantity}x ${i.name} (${i.size}) - ${formatCurrency(i.price * i.quantity)}`).join('\n');
  
  let msg = `*NUEVO PEDIDO - BEAUTE*\n`;
  msg += `*Orden:* #${orderId}\n`;
  msg += `*Cliente:* ${clientName}\n`;
  msg += `*Teléfono:* ${clientPhone}\n`;
  if (clientCity) msg += `*Ciudad:* ${clientCity}\n`;
  if (clientAddress) msg += `*Dirección:* ${clientAddress}\n`;
  msg += `\n*PRODUCTOS:* \n${itemsText}\n\n`;
  msg += `*TOTAL A PAGAR:* ${formatCurrency(total)}\n`;
  if (clientNotes) msg += `*Notas:* ${clientNotes}\n`;
  msg += `\n_Hola Jesmary Rossell, deseo confirmar este pedido de sueros y tónicos de BEAUTE._`;

  const waUrl = `https://wa.me/${APP_STATE.businessConfig.intlPhone}?text=${encodeURIComponent(msg)}`;
  
  // Limpiar carrito
  APP_STATE.cart = [];
  saveToLocalStorage();
  renderCart();
  renderCartBadge();
  closeCartDrawer();

  // Abrir WhatsApp
  window.open(waUrl, '_blank');
  showNotification(`¡Pedido #${orderId} registrado con éxito! Abriendo WhatsApp...`);
}

// ============================================================================
// PANEL CRM ADMINISTRATIVO (JESMARY ROSSELL)
// ============================================================================

function renderCRM() {
  renderCrmKpis();
  renderCrmClients();
  renderCrmOrders();
  renderCrmInventory();
  renderCrmSettings();
}

function renderCrmKpis() {
  const totalRevenue = APP_STATE.orders.reduce((sum, o) => sum + (o.status !== 'Cancelado' ? o.total : 0), 0);
  const totalOrders = APP_STATE.orders.length;
  const totalClients = APP_STATE.clients.length;
  const lowStockCount = APP_STATE.products.filter(p => p.stock <= 12).length;

  const revEl = document.getElementById('kpi-revenue');
  const ordersEl = document.getElementById('kpi-orders');
  const clientsEl = document.getElementById('kpi-clients');
  const lowStockEl = document.getElementById('kpi-low-stock');

  if (revEl) revEl.textContent = formatCurrency(totalRevenue);
  if (ordersEl) ordersEl.textContent = totalOrders;
  if (clientsEl) clientsEl.textContent = totalClients;
  if (lowStockEl) lowStockEl.textContent = lowStockCount;

  // Renderizar últimos pedidos en dashboard
  const recentOrdersContainer = document.getElementById('dashboard-recent-orders');
  if (recentOrdersContainer) {
    recentOrdersContainer.innerHTML = APP_STATE.orders.slice(0, 5).map(o => `
      <tr class="border-b border-slate-800/60 hover:bg-slate-900/50">
        <td class="py-3 px-4 font-mono text-xs text-[#2596be] font-bold">${o.id}</td>
        <td class="py-3 px-4 text-sm text-white font-medium">${o.clientName}</td>
        <td class="py-3 px-4 text-xs text-slate-400">${o.date}</td>
        <td class="py-3 px-4 text-xs">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold ${getOrderStatusBadgeClass(o.status)}">
            ${o.status}
          </span>
        </td>
        <td class="py-3 px-4 font-mono text-sm font-bold text-[#f3e5ab] text-right">${formatCurrency(o.total)}</td>
      </tr>
    `).join('');
  }
}

function getOrderStatusBadgeClass(status) {
  switch (status) {
    case 'Pendiente': return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    case 'Confirmado': return 'bg-sky-500/20 text-sky-300 border border-sky-500/30';
    case 'En Preparación': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
    case 'Enviado': return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
    case 'Entregado': return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
    case 'Cancelado': return 'bg-red-500/20 text-red-300 border border-red-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
  }
}

// Módulo de Clientes
function renderCrmClients() {
  const container = document.getElementById('crm-clients-table-body');
  if (!container) return;

  const searchInput = document.getElementById('crm-client-search');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filtered = APP_STATE.clients.filter(c => 
    !query || 
    c.name.toLowerCase().includes(query) || 
    c.phone.includes(query) ||
    c.skinType.toLowerCase().includes(query)
  );

  container.innerHTML = filtered.map(client => `
    <tr class="border-b border-slate-800 hover:bg-slate-900/60 transition-colors">
      <td class="py-3 px-4">
        <div class="font-semibold text-white text-sm">${client.name}</div>
        <div class="text-xs text-slate-400">${client.city || 'No especificada'}</div>
      </td>
      <td class="py-3 px-4 text-xs font-mono text-slate-300">
        <a href="https://wa.me/57${client.phone}" target="_blank" class="text-emerald-400 hover:underline flex items-center gap-1.5">
          <i class="fa-brands fa-whatsapp text-sm"></i> ${client.phone}
        </a>
      </td>
      <td class="py-3 px-4 text-xs">
        <span class="px-2.5 py-1 rounded-md bg-slate-800 text-sky-300 border border-slate-700">
          ${client.skinType || 'Sin diagnóstico'}
        </span>
      </td>
      <td class="py-3 px-4 text-xs text-slate-300 max-w-xs truncate" title="${client.notes}">
        ${client.notes || '-'}
      </td>
      <td class="py-3 px-4 font-mono text-sm text-[#f3e5ab] font-bold text-right">
        ${formatCurrency(client.totalPurchases || 0)}
      </td>
      <td class="py-3 px-4 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="editClient(${client.id})" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs" title="Editar">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button onclick="deleteClient(${client.id})" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-400 text-xs" title="Eliminar">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openNewClientModal() {
  const name = prompt("Nombre completo del paciente / cliente:");
  if (!name) return;
  const phone = prompt("Número de WhatsApp / Teléfono:");
  if (!phone) return;
  const skinType = prompt("Tipo de piel (ej: Grasa con acné, Seca, Sensible, Fotoenvejecida):", "Mixta");
  const notes = prompt("Observaciones / Alergias / Fórmulas recomendadas:", "");

  const newClient = {
    id: Date.now(),
    name,
    phone,
    email: '',
    city: 'Colombia',
    skinType: skinType || 'Mixta',
    allergies: 'Ninguna',
    notes: notes || '',
    totalPurchases: 0,
    lastPurchaseDate: new Date().toISOString().split('T')[0]
  };

  APP_STATE.clients.push(newClient);
  saveToLocalStorage();
  renderCrmClients();
  renderCrmKpis();
  showNotification("Cliente registrado con éxito en el CRM.");
}

function editClient(clientId) {
  const client = APP_STATE.clients.find(c => c.id === clientId);
  if (!client) return;

  const newNotes = prompt(`Editar notas de seguimiento para ${client.name}:`, client.notes);
  if (newNotes !== null) {
    client.notes = newNotes;
    const newSkinType = prompt(`Tipo de piel para ${client.name}:`, client.skinType);
    if (newSkinType !== null) client.skinType = newSkinType;

    saveToLocalStorage();
    renderCrmClients();
    showNotification("Ficha del cliente actualizada.");
  }
}

function deleteClient(clientId) {
  if (confirm("¿Seguro que deseas eliminar este cliente del CRM?")) {
    APP_STATE.clients = APP_STATE.clients.filter(c => c.id !== clientId);
    saveToLocalStorage();
    renderCrmClients();
    renderCrmKpis();
    showNotification("Cliente eliminado.");
  }
}

// Módulo de Pedidos
function renderCrmOrders() {
  const container = document.getElementById('crm-orders-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.orders.map(order => `
    <tr class="border-b border-slate-800 hover:bg-slate-900/60">
      <td class="py-3 px-4 font-mono font-bold text-xs text-[#2596be]">${order.id}</td>
      <td class="py-3 px-4">
        <div class="font-semibold text-white text-sm">${order.clientName}</div>
        <div class="text-xs text-slate-400">${order.clientPhone} • ${order.city || 'Despacho'}</div>
      </td>
      <td class="py-3 px-4 text-xs text-slate-300">
        ${order.items.map(i => `<div>${i.quantity}x ${i.name}</div>`).join('')}
      </td>
      <td class="py-3 px-4 font-mono text-sm font-bold text-[#f3e5ab] text-right">
        ${formatCurrency(order.total)}
      </td>
      <td class="py-3 px-4 text-center">
        <select onchange="updateOrderStatus('${order.id}', this.value)" class="text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 py-1 px-2 font-medium">
          <option value="Pendiente" ${order.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="Confirmado" ${order.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
          <option value="En Preparación" ${order.status === 'En Preparación' ? 'selected' : ''}>En Preparación</option>
          <option value="Enviado" ${order.status === 'Enviado' ? 'selected' : ''}>Enviado</option>
          <option value="Entregado" ${order.status === 'Entregado' ? 'selected' : ''}>Entregado</option>
          <option value="Cancelado" ${order.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
        </select>
      </td>
      <td class="py-3 px-4 text-right">
        <button onclick="viewOrderReceipt('${order.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs" title="Ver Comprobante">
          <i class="fa-solid fa-receipt"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const order = APP_STATE.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveToLocalStorage();
    renderCrmKpis();
    showNotification(`Estado de orden #${orderId} cambiado a "${newStatus}".`);
  }
}

function viewOrderReceipt(orderId) {
  const order = APP_STATE.orders.find(o => o.id === orderId);
  if (!order) return;

  let text = `========================================\n`;
  text += `   BEAUTE - COMPROBANTE DE PEDIDO\n`;
  text += `   Directora: Jesmary Rossell\n`;
  text += `   Contacto: +57 3134880917\n`;
  text += `========================================\n`;
  text += `Orden ID: ${order.id}\n`;
  text += `Fecha: ${order.date}\n`;
  text += `Cliente: ${order.clientName} (${order.clientPhone})\n`;
  text += `Dirección: ${order.address || 'No especificada'}, ${order.city}\n`;
  text += `Estado: ${order.status}\n`;
  text += `----------------------------------------\n`;
  text += `ITEMS:\n`;
  order.items.forEach(i => {
    text += `- ${i.quantity}x ${i.name} = ${formatCurrency(i.price * i.quantity)}\n`;
  });
  text += `----------------------------------------\n`;
  text += `TOTAL: ${formatCurrency(order.total)}\n`;
  text += `Notas: ${order.notes || 'Ninguna'}\n`;
  text += `========================================\n`;
  alert(text);
}

// Módulo de Inventario de Sueros & Tónicos
function renderCrmInventory() {
  const container = document.getElementById('crm-inventory-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.products.map(p => `
    <tr class="border-b border-slate-800 hover:bg-slate-900/60">
      <td class="py-3 px-4 flex items-center gap-3">
        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-lg object-cover bg-black" onerror="this.src='MEDIA/001.jpg'"/>
        <div>
          <div class="font-semibold text-white text-sm">${p.name}</div>
          <div class="text-xs text-slate-400">${p.size} • ${p.category}</div>
        </div>
      </td>
      <td class="py-3 px-4 font-mono text-xs text-teal-300 font-bold">${p.lot}</td>
      <td class="py-3 px-4 font-mono text-xs text-slate-300">${p.expiry}</td>
      <td class="py-3 px-4 font-mono text-sm font-bold text-[#f3e5ab] text-right">${formatCurrency(p.price)}</td>
      <td class="py-3 px-4 text-center">
        <div class="flex items-center justify-center gap-2">
          <button onclick="updateStock('${p.id}', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs">-</button>
          <span class="font-mono text-sm font-bold px-2 py-0.5 rounded ${p.stock <= 12 ? 'bg-red-950/80 text-rose-300 border border-rose-600/40' : 'bg-slate-800 text-white'}">
            ${p.stock}
          </span>
          <button onclick="updateStock('${p.id}', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs">+</button>
        </div>
      </td>
      <td class="py-3 px-4 text-right">
        <button onclick="editProductPrice('${p.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs" title="Editar Precio / Stock">
          <i class="fa-solid fa-pen"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function updateStock(productId, delta) {
  const p = APP_STATE.products.find(prod => prod.id === productId);
  if (p) {
    p.stock = Math.max(0, p.stock + delta);
    saveToLocalStorage();
    renderCrmInventory();
    renderCrmKpis();
    renderProductGrid();
  }
}

function editProductPrice(productId) {
  const p = APP_STATE.products.find(prod => prod.id === productId);
  if (!p) return;

  const newPrice = prompt(`Nuevo precio para ${p.name} (actual: ${p.price}):`, p.price);
  if (newPrice && !isNaN(newPrice)) {
    p.price = parseInt(newPrice);
    const newStock = prompt(`Stock actual (unidades):`, p.stock);
    if (newStock && !isNaN(newStock)) p.stock = parseInt(newStock);
    
    saveToLocalStorage();
    renderCrmInventory();
    renderProductGrid();
    showNotification("Producto actualizado con éxito.");
  }
}

function openAddNewProductModal() {
  const name = prompt("Nombre del nuevo suero o tónico:");
  if (!name) return;
  const price = prompt("Precio en COP:", "50000");
  if (!price || isNaN(price)) return;
  const category = prompt("Categoría (sueros / tonicos / corporal / profesional):", "sueros");
  const lot = prompt("Número de Lote:", "250006");

  const newProd = {
    id: 'prod-' + Date.now(),
    name,
    subtitle: 'Nueva Formulación Dermo-estética',
    category: category || 'sueros',
    price: parseInt(price),
    stock: 20,
    lot: lot || '250006',
    expiry: '2027-12',
    image: 'MEDIA/001.jpg',
    badge: 'Novedad',
    badgeColor: 'teal',
    isProfessional: category === 'profesional',
    tags: ['Novedad', 'Dermo-Cuidado'],
    desc: 'Producto incorporado al portafolio de BEAUTE.',
    usage: 'Consultar protocolo con Jesmary Rossell.',
    ph: 'pH 3.5',
    size: '30 ml'
  };

  APP_STATE.products.push(newProd);
  saveToLocalStorage();
  renderCrmInventory();
  renderProductGrid();
  showNotification("Nuevo producto agregado al catálogo e inventario.");
}

// Configuración & Exportación
function renderCrmSettings() {
  const phoneEl = document.getElementById('settings-phone');
  const emailEl = document.getElementById('settings-email');
  const hoursEl = document.getElementById('settings-hours');
  if (phoneEl) phoneEl.value = APP_STATE.businessConfig.phone;
  if (emailEl) emailEl.value = APP_STATE.businessConfig.email;
  if (hoursEl) hoursEl.value = APP_STATE.businessConfig.hours;
}

function saveCrmSettings(e) {
  if (e) e.preventDefault();
  const phoneEl = document.getElementById('settings-phone');
  const emailEl = document.getElementById('settings-email');
  const hoursEl = document.getElementById('settings-hours');

  if (phoneEl) {
    APP_STATE.businessConfig.phone = phoneEl.value.trim();
    APP_STATE.businessConfig.intlPhone = '57' + phoneEl.value.trim().replace(/\D/g, '');
  }
  if (emailEl) APP_STATE.businessConfig.email = emailEl.value.trim();
  if (hoursEl) APP_STATE.businessConfig.hours = hoursEl.value.trim();

  localStorage.setItem('beaute_config', JSON.stringify(APP_STATE.businessConfig));
  showNotification("Configuración de empresa guardada.");
}

function exportCrmData() {
  const data = {
    businessConfig: APP_STATE.businessConfig,
    products: APP_STATE.products,
    clients: APP_STATE.clients,
    orders: APP_STATE.orders,
    exportDate: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BEAUTE_CRM_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportOrdersCSV() {
  let csv = 'ID Pedido,Cliente,Telefono,Ciudad,Fecha,Total,Estado,Items\n';
  APP_STATE.orders.forEach(o => {
    const itemsStr = o.items.map(i => `${i.quantity}x ${i.name}`).join('; ');
    csv += `"${o.id}","${o.clientName}","${o.clientPhone}","${o.city}","${o.date}",${o.total},"${o.status}","${itemsStr}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BEAUTE_PEDIDOS_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetCrmData() {
  if (confirm("¿Estás seguro de restablecer todos los datos a la configuración inicial de fábrica?")) {
    localStorage.clear();
    location.reload();
  }
}

// ============================================================================
// TOAST NOTIFICACIONES
// ============================================================================

function showNotification(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-slate-900 text-white border border-[#2596be]/50 shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-10 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check text-teal-400 text-lg"></i> <span class="text-sm font-medium">${message}</span>`;
  toast.classList.remove('translate-y-10', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
  }, 3500);
}

// Configuración de listeners globales
function setupEventListeners() {
  const searchInput = document.getElementById('search-products-input');
  if (searchInput) {
    searchInput.addEventListener('input', onSearchInput);
  }

  const clientSearchInput = document.getElementById('crm-client-search');
  if (clientSearchInput) {
    clientSearchInput.addEventListener('input', () => renderCrmClients());
  }

  // Cerrar modal al presionar Escape o fondo
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCartDrawer();
    }
  });

  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProductModal();
    });
  }
}

// Auto-inicio al cargar el DOM
document.addEventListener('DOMContentLoaded', initApp);

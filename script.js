// =====================
// PRODUKT SLIDER
// =====================
const productSliders = document.querySelectorAll(".slider");

productSliders.forEach(slider => {
  const images = slider.querySelectorAll(".slides img");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  let index = 0;

  function showSlide(i) {
    images.forEach((img, idx) => {
      img.style.display = idx === i ? "block" : "none";
    });
  }

  showSlide(index);

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % images.length;
    showSlide(index);
  });

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showSlide(index);
  });
});

// =====================
// Produkte
// =====================


const products = [
  {
    id: 1,
    name: "Plastic Armchair",
    manufacturer: "Vitra",
    designer: "Charles und Ray Eames",
    price: 320,
    category: "Sitzmöbel",
    image: "data/Produktbilder/VitraArmChair_1-Photoroom.png",
    link: "produkt_VitraArmChair.html",
    uploadDate: "2025-05-01",
    status: "verfügbar",

    description: "Ikonischer Kunststoffstuhl von Vitra.",
    condition: "Sehr guter Zustand",
    dimensions: "H 83cm × B 62cm × T 60cm",
    color: "<Poppy Red>",
    material: "Kunststoff / Stahl",
    features: "Stapelbar, Armlehnen",
    weight: "7kg",

    images: [
      "data/Produktbilder/VitraArmChair_1-Photoroom.png",
      "data/Produktbilder/VitraArmChair_2-Photoroom.png",
      "data/Produktbilder/VitraArmChair_3-Photoroom.png",
      "data/Produktbilder/VitraArmChair_4-Photoroom.png",
      "data/Produktbilder/VitraArmChair_5-Photoroom.png",
      "data/Produktbilder/VitraArmChair_6-Photoroom.png",
      "data/Produktbilder/VitraArmChair_7-Photoroom.png"
    ],
  },
  {
    id: 2,
    name: "S33 Freischwinger",
    manufacturer: "Thonet",
    designer: "Mart Stam",
    price: 500,
    category: "Sitzmöbel",
    image: "data/Produktbilder/ThonetS33_1-Photoroom.png",
    link: "produkt_ThonetS33.html",
    uploadDate: "2025-05-02",
    status: "verfügbar"
  },
  {
    id: 3,
    name: "EA 208",
    manufacturer: "Vitra",
    designer: "Herman Miller",
    price: 600,
    category: "Sitzmöbel",
    image: "data/Produktbilder/VitraEA208_1-Photoroom.png",
    link: "produkt_VitraEA208.html",
    uploadDate: "2025-05-03",
    status: "verfügbar"
  },
  {
    id: 4,
    name: "214 Bugholzstuhl",
    manufacturer: "Thonet",
    designer: "Michael Thonet",
    price: 300,
    category: "Sitzmöbel",
    image: "data/Produktbilder/Thonet214_1-Photoroom.png",
    link: "produkt_Thonet214.html",
    uploadDate: "2025-05-05",
    status: "verfügbar"
  },
  {
    id: 5,
    name: "Egoa",
    manufacturer: "Stua",
    designer: "Josep Mora",
    price: 180,
    category: "Sitzmöbel",
    image: "data/Produktbilder/StuaEgoa_1-Photoroom.png",
    link: "produkt_StuaEgoa.html",
    uploadDate: "2025-05-03",
    status: "verfügbar"
  },
  {
    id: 6,
    name: "Plastic Chair",
    manufacturer: "Vitra",
    designer: "Charles und Ray Eames",
    price: 250,
    category: "Sitzmöbel",
    image: "data/Produktbilder/VitraPlasticChair_1-Photoroom.png",
    link: "produkt_VitraPlasticChair.html",
    uploadDate: "2025-05-03",
    status: "verfügbar"
  }
];

// =====================
// Grid
// =====================

const grid = document.querySelector(".image-grid");

function renderProducts(productList) {
  if (!grid) return;
  grid.innerHTML = "";

  productList.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("grid-item");

    item.innerHTML = `
      <a href="${p.link}">
        <img src="${p.image}" alt="${p.name}" />
        <div class="caption">
          <p>${p.manufacturer}</p>
          <p>${p.name}</p>
          <p>${p.price.toFixed(2)} €</p>
        </div>
      </a>
    `;

    grid.appendChild(item);
  });
}


// =====================
// Filter-State
// =====================

let activeFilters = {
  category: null,
  manufacturer: null,
  designer: null,
  sort: null
};

const defaultText = {
  category: "Filtern nach Kategorie",
  manufacturer: "Filtern nach Hersteller",
  designer: "Filtern nach Designer",
  sort: "Sortieren nach"
};


// =====================
// Dropdown dynamisch befüllen
// =====================

function getFilteredBase(excludeType) {
  // Gibt die Produktmenge zurück, die durch alle aktiven Filter
  // *außer* excludeType gefiltert wurde. Basis für mögliche Optionen.
  let result = [...products];

  if (excludeType !== "category" && activeFilters.category) {
    result = result.filter(p => p.category === activeFilters.category);
  }
  if (excludeType !== "manufacturer" && activeFilters.manufacturer) {
    result = result.filter(p => p.manufacturer === activeFilters.manufacturer);
  }
  if (excludeType !== "designer" && activeFilters.designer) {
    result = result.filter(p => p.designer === activeFilters.designer);
  }

  return result;
}

function buildDropdowns() {
  // Alle vier Typen (sort ist statisch)
  const dynamicTypes = ["category", "manufacturer", "designer"];

  dynamicTypes.forEach(type => {
    const base = getFilteredBase(type);

    // Eindeutige Werte aus der gefilterten Basis sammeln
    const values = [...new Set(base.map(p => p[type]))].sort();

    // Alle .dropdown-Listen für diesen Typ aktualisieren (Desktop + Mobil)
    document.querySelectorAll(`.filter-box[data-type="${type}"] .dropdown`).forEach(ul => {
      ul.innerHTML = "";

      values.forEach(val => {
        const li = document.createElement("li");
        li.dataset[type] = val;
        li.textContent = val;

        if (activeFilters[type] === val) {
          li.classList.add("active");
        }

        // Grau darstellen wenn dieser Wert keinen Treffer mehr ergäbe
        // (bei den anderen aktiven Filtern trotzdem möglich – hier immer sichtbar,
        //  da wir schon nur mögliche Werte anzeigen)

        ul.appendChild(li);
      });
    });
  });

  // Event-Listener neu binden
  bindDropdownItems();
}


// =====================
// Event-Listener für Dropdown-Items
// =====================

function bindDropdownItems() {
  document.querySelectorAll("[data-category], [data-manufacturer], [data-designer], [data-sort]").forEach(item => {

    // Verhindert doppelte Listener
    item.replaceWith(item.cloneNode(true));
  });

  document.querySelectorAll("[data-category], [data-manufacturer], [data-designer], [data-sort]").forEach(item => {

    item.addEventListener("pointerup", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const box = item.closest(".filter-box");
      const type = item.dataset.category ? "category"
        : item.dataset.manufacturer ? "manufacturer"
        : item.dataset.designer ? "designer"
        : "sort";

      const value = item.dataset[type];

      if (activeFilters[type] === value) {
        activeFilters[type] = null;
      } else {
        activeFilters[type] = value;
      }

      // Dropdown schließen
      box.classList.remove("open");

      applyFilters();
    });
  });
}


// =====================
// Filter anwenden
// =====================

function applyFilters() {
  let result = [...products];

  if (activeFilters.category) {
    result = result.filter(p => p.category === activeFilters.category);
  }
  if (activeFilters.manufacturer) {
    result = result.filter(p => p.manufacturer === activeFilters.manufacturer);
  }
  if (activeFilters.designer) {
    result = result.filter(p => p.designer === activeFilters.designer);
  }

  if (activeFilters.sort === "Höchster Preis") {
    result.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sort === "Niedrigster Preis") {
    result.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sort === "Neueste") {
    result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  }

  renderProducts(result);

  // URL aktualisieren
  const url = new URL(window.location);
  ["category", "manufacturer", "designer"].forEach(type => {
    if (activeFilters[type]) {
      url.searchParams.set(type, activeFilters[type]);
    } else {
      url.searchParams.delete(type);
    }
  });
  window.history.replaceState({}, "", url);

  // UI synchronisieren
  syncAllFilterUI();
  buildDropdowns();          // Optionen der Dropdowns neu berechnen
  updateActiveFiltersUI();
}


// =====================
// UI synchronisieren
// =====================

function syncAllFilterUI() {
  Object.entries(activeFilters).forEach(([type, value]) => {
    document.querySelectorAll(`.filter-box[data-type="${type}"]`).forEach(box => {
      const span = box.querySelector(".filter-box-header > span:first-child");
      if (span) {
        span.textContent = value || defaultText[type];
      }
      box.classList.toggle("active", !!value);
    });
  });

  updateClearButtons();
}

function updateClearButtons() {
  document.querySelectorAll(".filter-box").forEach(box => {
    const type = box.dataset.type;
    const clearBtn = box.querySelector(".clear-btn");
    if (!clearBtn || !type) return;
    clearBtn.classList.toggle("visible", activeFilters[type] != null);
  });
}

function updateActiveFiltersUI() {
  const container = document.querySelector(".active-filters");
  if (!container) return;
  container.innerHTML = "";

  Object.entries(activeFilters).forEach(([key, value]) => {
    if (value) {
      const tag = document.createElement("span");
      tag.textContent = value;
      container.appendChild(tag);
    }
  });
}

function resetFilters() {
  activeFilters = { category: null, manufacturer: null, designer: null, sort: null };
  applyFilters();
}


// =====================
// Filter-Box öffnen/schließen
// =====================

document.addEventListener("pointerdown", (e) => {
  const clickedBox = e.target.closest(".filter-box");

  document.querySelectorAll(".filter-box").forEach(box => {
    // Schließe alle Boxen die nicht angeklickt wurden
    if (box !== clickedBox) {
      box.classList.remove("open");
    }
  });

  if (!clickedBox) return; // Klick außerhalb → alle schon geschlossen
  if (e.target.closest(".dropdown")) return; // Klick auf Option → bleibt offen bis applyFilters()
  if (e.target.closest(".clear-btn")) return; // Clear-Button → kein Toggle

  clickedBox.classList.toggle("open");
});


// =====================
// Clear-Button
// =====================

document.querySelectorAll(".filter-box").forEach(box => {
  const clearBtn = box.querySelector(".clear-btn");
  if (!clearBtn) return;

  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const type = box.dataset.type;
    activeFilters[type] = null;

    applyFilters();
  });
});


// =====================
// URL-Parameter beim Laden lesen
// =====================

function applyURLFilter() {
  const params = new URLSearchParams(window.location.search);

  ["category", "manufacturer", "designer"].forEach(type => {
    const val = params.get(type);
    if (val) activeFilters[type] = val;
  });

  applyFilters();
}


// =====================
// Filter-Modal (Mobil)
// =====================

const modal = document.querySelector(".filter-modal");
const openBtn = document.querySelector(".filter-toggle");
const closeBtn = document.querySelector(".close-filter");

openBtn?.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn?.addEventListener("click", () => {
  modal.style.display = "none";
});

modal?.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    closeAllDropdowns();
  }
});


// =====================
// Neueste (Startseite)
// =====================

function renderNewest() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const count = isMobile ? 2 : 3;

  const sorted = [...products].sort(
    (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
  );

  renderProducts(sorted.slice(0, count));
}


// =====================
// Init
// =====================

document.addEventListener("DOMContentLoaded", () => {

  // Produktseite
  if (document.querySelector(".produkte-main")) {
    buildDropdowns();
    applyURLFilter();
    return;
  }

  // Hersteller/Designer Seite
  if (document.querySelector(".hd-grid")) {
    renderHerstellerDesigner();
    return;
  }

  // Startseite
  if (document.querySelector(".main-main")) {
    renderNewest();
  }
});


// =====================
// Modal bei Wechsel zu Desktop automatisch schließen
// =====================

const mediaQuery = window.matchMedia("(min-width: 769px)");

mediaQuery.addEventListener("change", (e) => {
  if (e.matches && modal) {
    modal.style.display = "none";
    closeAllDropdowns();
  }
  if (!document.querySelector(".filter-bar") && !document.querySelector(".hd-grid")) {
    renderNewest();
  }
});

// =====================
// HERSTELLER & DESIGNER SEITE
// =====================

function renderHerstellerDesigner() {
  const herstellerList = document.querySelector(".hd-list--hersteller ul");
  const designerList = document.querySelector(".hd-list--designer ul");

  if (!herstellerList || !designerList) return;

  const hersteller = [...new Set(products.map(p => p.manufacturer))].sort();
  const designer = [...new Set(products.map(p => p.designer))].sort();

  hersteller.forEach(h => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="produkte.html?manufacturer=${encodeURIComponent(h)}">${h}</a>`;
    herstellerList.appendChild(li);
  });

  designer.forEach(d => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="produkte.html?designer=${encodeURIComponent(d)}">${d}</a>`;
    designerList.appendChild(li);
  });
}


// =====================
// BURGER MENU
// =====================
const burgerBtn = document.getElementById("burgerBtn");
const navOverlay = document.getElementById("navOverlay");
const drawerClose = document.getElementById("drawerClose");

burgerBtn?.addEventListener("click", () => {
  navOverlay.classList.add("open");
  document.body.style.overflow = "hidden"; // Scrollen sperren
});

drawerClose?.addEventListener("click", () => {
  navOverlay.classList.remove("open");
  document.body.style.overflow = "";
});

navOverlay?.addEventListener("click", (e) => {
  if (e.target === navOverlay) { // Klick auf Overlay (außerhalb Drawer)
    navOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
});

// =====================
// PRODUKT SEKTIONEN
// =====================
document.querySelectorAll(".produkt-sektion-toggle").forEach(toggle => {
  toggle.addEventListener("click", () => {
    const sektion = toggle.closest(".produkt-sektion");
    const pfeil = toggle.querySelector(".produkt-sektion-pfeil");
    const offen = sektion.classList.toggle("offen");

    toggle.setAttribute("aria-expanded", offen);
    pfeil.style.transform = offen ? "rotate(180deg)" : "rotate(0deg)";
  });
});


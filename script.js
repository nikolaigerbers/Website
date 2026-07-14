// Touch-Geräte erkennen
if (
  navigator.maxTouchPoints > 0 ||
  window.matchMedia("(pointer: coarse)").matches
) {
  document.documentElement.classList.add("touch-device");
}

// =====================
// PRODUKT SLIDER
// =====================
const productSliders = document.querySelectorAll(".slider");

productSliders.forEach(slider => {
  const images = slider.querySelectorAll(".slides img");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  const dotsContainer = slider.closest(".left")?.querySelector(".slider-dots");

  let index = 0;
slider.currentIndex = () => index;
slider.goToSlide = (i) => {
  direction = i > index ? 1 : -1;
  showSlide(i);
};

images[0]?.classList.add("active");

  // Dots aufbauen
  if (dotsContainer) {
    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {

  direction = i > index ? 1 : -1;

  showSlide(i);

});
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  let direction = 1;


function showSlide(newIndex) {

  const oldIndex = index;


  // Erstes Bild beim Laden anzeigen
  if (
    oldIndex === newIndex &&
    !imgs[newIndex].classList.contains("active")
  ) {

    imgs[newIndex].classList.add("active");
    imgs[newIndex].style.transform = "translateX(0)";
    imgs[newIndex].style.opacity = "1";

    // NEU: Inline-Styles wieder entfernen, sonst blockieren sie
    // beim ersten Next/Prev die exit-left/exit-right Klassen
    requestAnimationFrame(() => {
      imgs[newIndex].style.transform = "";
      imgs[newIndex].style.opacity = "";
    });

    updateFullscreenDots();
    return;

  }


  const current = images[oldIndex];
  const next = images[newIndex];


  if (current === next) return;


  // alte Animationen entfernen
  next.classList.remove(
    "exit-left",
    "exit-right"
  );


  // neues Bild außerhalb positionieren
  next.classList.add("active");

  next.style.transition = "none";

  if (direction > 0) {

    // Next: von rechts einschieben
    next.style.transform = "translateX(100%)";

  } else {

    // Prev: von links einschieben
    next.style.transform = "translateX(-100%)";

  }


  // Browser zwingt die Position zu übernehmen
  next.offsetHeight;


  // Animation wieder aktivieren
  next.style.transition = "";


  // Index sofort aktualisieren
  index = newIndex;


  requestAnimationFrame(() => {


    // aktuelles Bild herausfahren

    if (direction > 0) {

      // Next
      current.classList.add("exit-left");

    } else {

      // Prev
      current.classList.add("exit-right");

    }


    // neues Bild einschieben

    next.style.transform = "translateX(0)";


  });


  // Aufräumen nach Animation

  setTimeout(() => {

    current.classList.remove(
      "active",
      "exit-left",
      "exit-right"
    );

    current.style.transform = "";
    current.style.opacity = "";

    next.style.transform = "";   // NEU: sonst bleibt translateX(0) inline stehen
                                  // und blockiert beim nächsten Wechsel die
                                  // exit-Klasse dieses Bildes

    updateFullscreenDots();

  }, 400);

}

  showSlide(index);

  nextBtn?.addEventListener("click", () => {

  direction = 1;

  showSlide(
    (index + 1) % images.length
  );

});

  prevBtn?.addEventListener("click", () => {

  direction = -1;

  showSlide(
    (index - 1 + images.length) % images.length
  );

});

  // Touch-Swipe
  let touchStartX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) {

  direction = 1;

  showSlide((index + 1) % images.length);

} else {

  direction = -1;

  showSlide((index - 1 + images.length) % images.length);

}
  }, { passive: true });
});

// =====================
// Produkte
// =====================


const products = [
  {
    id: 1,
    name: "Eames Plastic Armchair DAX",
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
    name: "SE 68 Stuhl",
    manufacturer: "Wilde + Spieth",
    designer: "Egon Eiermann",
    price: 160,
    category: "Sitzmöbel",
    image: "data/Produktbilder/WildeSpiethSE68_1.png",
    link: "produkt_WildeSpiethSE68.html",
    uploadDate: "2025-05-02",
    status: "verfügbar"
  },
  {
    id: 3,
    name: "Soft Pad Chair EA 208",
    manufacturer: "Vitra",
    designer: "Charles und Ray Eames",
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
    name: "Egoa Sidechair",
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
    name: "Eames Plastic Side Chair DSS",
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

  box.classList.remove("open");

  // Modal schließen nach Auswahl
  const modalEl = document.querySelector(".filter-modal");
  if (modalEl && modalEl.style.display === "block") {
    modalEl.style.display = "none";
  }

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
  updateFilterToggleLabel();
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
// Dropdown bei Maus-Verlassen schließen (nur Desktop)
// =====================

document.querySelectorAll(".filter-bar:not(.filter-modal .filter-bar) .filter-box").forEach(box => {
  box.addEventListener("mouseleave", () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      box.classList.remove("open");
    }
  });
});


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

function updateFilterToggleLabel() {
  const btn = document.querySelector(".filter-toggle");
  if (!btn) return;

  const count = Object.values(activeFilters).filter(v => v !== null).length;
  btn.textContent = count > 0 ? `Filter (${count})` : "Filter";
}


// =====================
// Neueste (Startseite)
// =====================

let neuheitenIndex = 0;
let neuheitenAnimating = false;

function initNeuheiten() {
  const prevBtn = document.querySelector(".neuheiten-prev");
  const nextBtn = document.querySelector(".neuheiten-next");
  const sliderEl = document.querySelector(".neuheiten-slider");
  const track = document.querySelector(".neuheiten-track");
  const wrapper = document.querySelector(".neuheiten-track-wrapper");
  const dotsContainer = document.querySelector(".neuheiten-dots");

  if (!track || !wrapper) return;

  const sorted = [...products].sort(
    (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
  );
  const total = sorted.length;

 function getCount() {
  if (window.matchMedia("(max-width: 768px)").matches) return 2;
  if (window.matchMedia("(max-width: 1152px)").matches) return 3;
  return 4;
}

  function getGap() {
  return parseFloat(getComputedStyle(track).gap) || 0;
}

  function getCardWidth() {
    const gap = getGap();
    const count = getCount();
    return (wrapper.offsetWidth - gap * (count - 1)) / count;
  }

  function makeCard(p) {
    const item = document.createElement("div");
    item.classList.add("grid-item");
    item.innerHTML = `
      <a href="${p.link}">
        <img src="${p.image}" alt="${p.name}" loading="eager" />
        <div class="caption">
          <p>${p.manufacturer}</p>
          <p>${p.name}</p>
          <p>${p.price.toFixed(2)} €</p>
        </div>
      </a>
    `;
    return item;
  }

  function buildTrack() {
    track.innerHTML = "";
    // Klone am Ende (für Vorwärts-Loop)
    sorted.forEach(p => track.appendChild(makeCard(p)));
    // Originale
    sorted.forEach(p => track.appendChild(makeCard(p)));
    // Klone am Anfang (für Rückwärts-Loop)
    sorted.forEach(p => track.appendChild(makeCard(p)));
  }

  function setCardWidths() {
    const cardWidth = getCardWidth();
    track.querySelectorAll(".grid-item").forEach(item => {
      item.style.width = cardWidth + "px";
    });
  }

  // neuheitenIndex zeigt immer auf die mittlere (echte) Gruppe
  // Offset: total Karten vor dem echten Block
  function positionTrack(animated) {
    const cardWidth = getCardWidth();
    const gap = getGap();
    const absoluteIndex = total + neuheitenIndex; // mittlere Gruppe
    const offset = absoluteIndex * (cardWidth + gap);

    track.style.transition = animated
      ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      : "none";
    track.style.transform = `translateX(-${offset}px)`;
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === neuheitenIndex);
    });
  }

  function goTo(newIndex, animated = true) {
    if (neuheitenAnimating && animated) return;
    neuheitenAnimating = true;

    neuheitenIndex = ((newIndex % total) + total) % total;
    positionTrack(animated);
    updateDots();

    if (animated) {
      // Nach der Animation: prüfen ob wir in einen Klon-Bereich gerutscht sind
      // (kann hier nicht passieren da wir immer in 0..total-1 normalisieren)
      setTimeout(() => { neuheitenAnimating = false; }, 420);
    } else {
      neuheitenAnimating = false;
    }
  }

  function goToRaw(absoluteIndex, animated = true) {
    // Für den Loop-Sprung: direkt einen absoluten Track-Index anfahren
    if (neuheitenAnimating && animated) return;
    neuheitenAnimating = true;

    const cardWidth = getCardWidth();
    const gap = getGap();
    const offset = absoluteIndex * (cardWidth + gap);

    track.style.transition = animated
      ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      : "none";
    track.style.transform = `translateX(-${offset}px)`;

    if (animated) {
      setTimeout(() => { neuheitenAnimating = false; }, 420);
    } else {
      neuheitenAnimating = false;
    }
  }

  function handleNext() {
    if (neuheitenAnimating) return;

    // Sind wir am Ende der echten Gruppe? → animiert in Klon-Gruppe gleiten, dann lautlos zurück
    if (neuheitenIndex === total - 1) {
      neuheitenAnimating = true;
      // Animiert zur ersten Karte der hinteren Klon-Gruppe (Index: 2*total)
      const cardWidth = getCardWidth();
      const gap = getGap();
      track.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      track.style.transform = `translateX(-${2 * total * (cardWidth + gap)}px)`;
      updateDots(); // Dot 0 wird aktiv
      setTimeout(() => {
        neuheitenIndex = 0;
        positionTrack(false); // lautlos zurück zur echten Gruppe
        neuheitenAnimating = false;
        updateDots();
      }, 420);
    } else {
      neuheitenIndex++;
      positionTrack(true);
      updateDots();
      setTimeout(() => { neuheitenAnimating = false; }, 420);
      neuheitenAnimating = true;
    }
  }

  function handlePrev() {
    if (neuheitenAnimating) return;

    if (neuheitenIndex === 0) {
      neuheitenAnimating = true;
      // Animiert zur letzten Karte der vorderen Klon-Gruppe (Index: total-1)
      const cardWidth = getCardWidth();
      const gap = getGap();
      track.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      track.style.transform = `translateX(-${(total - 1) * (cardWidth + gap)}px)`;
      setTimeout(() => {
        neuheitenIndex = total - 1;
        positionTrack(false); // lautlos zur echten Gruppe
        neuheitenAnimating = false;
        updateDots();
      }, 420);
    } else {
      neuheitenAnimating = true;
      neuheitenIndex--;
      positionTrack(true);
      updateDots();
      setTimeout(() => { neuheitenAnimating = false; }, 420);
    }
  }

  // Dots aufbauen
  if (dotsContainer) {
    sorted.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  nextBtn?.addEventListener("click", handleNext);
  prevBtn?.addEventListener("click", handlePrev);

  // Touch-Swipe
  let touchStartX = 0;

  sliderEl?.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  sliderEl?.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  }, { passive: true });

  // Resize
  window.addEventListener("resize", () => {
    setCardWidths();
    positionTrack(false);
  });

  // Init
  buildTrack();
  setCardWidths();
  positionTrack(false);
  updateDots();
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
    initNeuheiten();
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
    pfeil.style.transform = offen ? "rotate(0deg)" : "rotate(180deg)";
  });
});

// =====================
// FULLSCREEN SLIDER
// =====================

document.querySelectorAll(".slider").forEach(slider => {
  const images = slider.querySelectorAll(".slides img");
  const fullscreenBtn = slider.closest(".left")?.querySelector(".fullscreen-btn");
  const overlay = document.getElementById("fullscreenOverlay");
  const fullscreenSlides = overlay?.querySelector(".fullscreen-slides");
  const fullscreenDotsContainer = overlay?.querySelector(".fullscreen-dots"); // ← neu
  const closeBtn = document.getElementById("fullscreenClose");
  const prevBtn = overlay?.querySelector(".fullscreen-prev");
  const nextBtn = overlay?.querySelector(".fullscreen-next");

  if (!fullscreenBtn || !overlay || !fullscreenSlides) return;

  let currentIndex = 0;

  let fullscreenDirection = 1;

  function buildFullscreenDots(count) {  // ← neu
    if (!fullscreenDotsContainer) return;
    fullscreenDotsContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => {
        currentIndex = i;
        showFullscreenSlide(currentIndex);
        updateFullscreenDots();
      });
      fullscreenDotsContainer.appendChild(dot);
    }
  }

  function updateFullscreenDots() {  // ← neu
    if (!fullscreenDotsContainer) return;
    fullscreenDotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function openFullscreen(startIndex) {
    fullscreenSlides.innerHTML = "";
    images.forEach(img => {
      const clone = document.createElement("img");
      clone.src = img.src;
      clone.alt = img.alt;
      fullscreenSlides.appendChild(clone);
    });
    buildFullscreenDots(images.length);

currentIndex = startIndex;

overlay.classList.add("open");
document.body.style.overflow = "hidden";

// Reflow erzwingen, damit der erste Layout-Durchlauf
// (display:none → flex, neue Bilder) sicher abgeschlossen ist
overlay.offsetHeight;

// Doppeltes rAF: erstes rAF garantiert nur, dass der Frame
// nach dem Reflow gestartet ist – erst im zweiten ist das
// Layout zuverlässig committed
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    showFullscreenSlide(currentIndex);
  });
});
  }

  function showFullscreenSlide(newIndex) {

  const imgs = fullscreenSlides.querySelectorAll("img");

  const oldIndex = currentIndex;


  // Erstes Bild anzeigen
  if (
    oldIndex === newIndex &&
    !imgs[newIndex].classList.contains("active")
  ) {

    imgs[newIndex].classList.add("active");
    imgs[newIndex].style.transform = "translateX(0)";
    imgs[newIndex].style.opacity = "1";

    updateFullscreenDots();
    return;

  }


  const current = imgs[oldIndex];
  const next = imgs[newIndex];


  if (current === next) return;


  // alte Animationen entfernen

  next.classList.remove(
    "exit-left",
    "exit-right"
  );


  // neues Bild vorbereiten

  next.classList.add("active");

  next.style.transition = "none";


  if (fullscreenDirection > 0) {

    // Next → von rechts

    next.style.transform = "translateX(100%)";

  } else {

    // Prev → von links

    next.style.transform = "translateX(-100%)";

  }


  // Position erzwingen

  next.offsetHeight;


  // Transition wieder aktivieren

  next.style.transition = "";


  currentIndex = newIndex;

requestAnimationFrame(() => {
  slider.goToSlide?.(currentIndex);
});


  requestAnimationFrame(() => {


    if (fullscreenDirection > 0) {

      // aktuelles Bild nach links raus

      current.classList.add("exit-left");

    } else {

      // aktuelles Bild nach rechts raus

      current.classList.add("exit-right");

    }


    next.style.transform = "translateX(0)";


  });


  setTimeout(() => {


    current.classList.remove(
      "active",
      "exit-left",
      "exit-right"
    );


    current.style.transform = "";
    current.style.opacity = "";


    next.style.transform = "";


    updateFullscreenDots();


  }, 400);

}

  function getCurrentSliderIndex() {
  let idx = 0;

  images.forEach((img, i) => {
    if (img.classList.contains("active")) {
      idx = i;
    }
  });

  return idx;
}

  fullscreenBtn.addEventListener("click", () => {
    openFullscreen(getCurrentSliderIndex());
  });

  // NEU: Klick auf Bild öffnet Fullscreen
  images.forEach(img => {
    img.addEventListener("click", () => {
      openFullscreen(getCurrentSliderIndex());
    });
  });

  closeBtn?.addEventListener("click", () => {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  });

  // ESC schließt den Fullscreen
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
});

  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  nextBtn?.addEventListener("click", () => {

  const imgs = fullscreenSlides.querySelectorAll("img");

  fullscreenDirection = 1;

  showFullscreenSlide(
    (currentIndex + 1) % imgs.length
  );

});

  prevBtn?.addEventListener("click", () => {

  const imgs = fullscreenSlides.querySelectorAll("img");

  fullscreenDirection = -1;

  showFullscreenSlide(
    (currentIndex - 1 + imgs.length) % imgs.length
  );

});

  // Touch-Swipe
  let touchStartX = 0;

  overlay.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  overlay.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return; // zu kurz → kein Swipe
    const imgs = fullscreenSlides.querySelectorAll("img");
    if (diff > 0) {

  fullscreenDirection = 1;

  showFullscreenSlide(
    (currentIndex + 1) % imgs.length
  );

} else {

  fullscreenDirection = -1;

  showFullscreenSlide(
    (currentIndex - 1 + imgs.length) % imgs.length
  );

}
  }, { passive: true });
});
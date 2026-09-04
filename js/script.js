/* =========================================================
   Sadbhaav Child Development Foundation — shared script.js
   Pure vanilla JS, no dependencies.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
  initActiveNavLink();
  initHeroSlider();
  initTopbarHideOnScroll();
  document.querySelectorAll(".carousel").forEach(initCarousel);
  initGalleryFilters();
  initServiceSidebar();
});

/* ---------------- Mobile menu ---------------- */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const overlay = document.querySelector(".nav-overlay");
  if (!toggle || !nav) return;

  function closeMenu() {
    toggle.classList.remove("is-open");
    nav.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    if (overlay) overlay.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", toggleMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) closeMenu();
  });
}

/* ---------------- Highlight current page in nav ---------------- */
function initActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href").split("#")[0] || "index.html";
    if (href === current) link.classList.add("is-active");
  });
}

/* ---------------- Hero slider (full-bleed background slides) ---------------- */
function initHeroSlider() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const slides = Array.from(hero.querySelectorAll(".hero-slide"));
  const dotsWrap = hero.querySelector(".hero-dots");
  const prevBtn = hero.querySelector(".hero-arrow--prev");
  const nextBtn = hero.querySelector(".hero-arrow--next");
  let index = slides.findIndex((s) => s.classList.contains("is-active"));
  if (index < 0) index = 0;
  let timer;

  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      if (i === index) dot.classList.add("is-active");
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function render() {
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle("is-active", i === index));
    }
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
    restart();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  render();
  restart();
}

/* ---------------- Generic multi-item carousel ----------------
   Markup:
   <div class="carousel" data-per-desktop="3" data-per-tablet="2" data-per-mobile="1" data-autoplay="0">
     <div class="carousel-viewport">
       <div class="carousel-track" data-track>
         <div class="carousel-item">...</div>
         ...
       </div>
     </div>
     <button class="carousel-arrow carousel-arrow--prev">&lsaquo;</button>
     <button class="carousel-arrow carousel-arrow--next">&rsaquo;</button>
     <div class="carousel-dots"></div>
   </div>
------------------------------------------------------------- */
function initCarousel(root) {
  const track = root.querySelector("[data-track]");
  const items = track ? Array.from(track.children) : [];
  if (!track || !items.length) return;

  const prevBtn = root.querySelector(".carousel-arrow--prev");
  const nextBtn = root.querySelector(".carousel-arrow--next");
  const dotsWrap = root.querySelector(".carousel-dots");

  const perDesktop = parseInt(root.dataset.perDesktop || "3", 10);
  const perTablet = parseInt(root.dataset.perTablet || "2", 10);
  const perMobile = parseInt(root.dataset.perMobile || "1", 10);
  const autoplayMs = parseInt(root.dataset.autoplay || "0", 10);

  let perView = perDesktop;
  let page = 0;
  let timer;

  function computePerView() {
    const w = window.innerWidth;
    if (w <= 640) return perMobile;
    if (w <= 960) return perTablet;
    return perDesktop;
  }

  function pageCount() {
    return Math.max(1, Math.ceil(items.length / perView));
  }

  function layout() {
    perView = computePerView();
    items.forEach((item) => {
      item.style.flexBasis = (100 / perView) + "%";
      item.style.maxWidth = (100 / perView) + "%";
    });
    page = Math.min(page, pageCount() - 1);
    renderDots();
    update();
  }

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    const total = pageCount();
    if (total <= 1) { dotsWrap.style.display = "none"; return; }
    dotsWrap.style.display = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to page " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function update() {
    const total = pageCount();
    track.style.transform = "translateX(-" + (page * 100) + "%)";
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle("is-active", i === page));
    }
    if (prevBtn) prevBtn.style.visibility = total <= 1 ? "hidden" : "visible";
    if (nextBtn) nextBtn.style.visibility = total <= 1 ? "hidden" : "visible";
  }

  function goTo(i) {
    const total = pageCount();
    page = (i + total) % total;
    update();
    restart();
  }

  function next() { goTo(page + 1); }
  function prev() { goTo(page - 1); }

  function restart() {
    clearInterval(timer);
    if (autoplayMs > 0) timer = setInterval(next, autoplayMs);
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  window.addEventListener("resize", layout);
  layout();
  restart();
}

/* ---------------- Hide top contact bar on scroll ---------------- */
function initTopbarHideOnScroll() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  window.addEventListener("scroll", function () {
    topbar.style.display = window.scrollY > 80 ? "none" : "";
  }, { passive: true });
}

/* ---------------- Gallery filters ---------------- */
function initGalleryFilters() {
  const buttons = document.querySelectorAll(".gallery-filters .filter-btn");
  const items = document.querySelectorAll(".gallery-grid .gallery-item");
  if (!buttons.length || !items.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      items.forEach((item) => {
        const show = filter === "all" || item.dataset.year === filter;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });
}

/* ---------------- Services page: sidebar <-> content sync ---------------- */
function initServiceSidebar() {
  const tabs = document.querySelectorAll(".service-sidebar .service-tab");
  const cards = document.querySelectorAll(".service-grid-panel .service-detail-card");
  if (!tabs.length || !cards.length) return;

  function setActiveTab(id) {
    tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.target === id));
  }

  function highlightCard(card) {
    cards.forEach((c) => c.classList.remove("is-highlighted"));
    card.classList.add("is-highlighted");
    setTimeout(() => card.classList.remove("is-highlighted"), 1600);
  }

  function goToService(id) {
    const card = document.getElementById(id);
    if (!card) return;
    setActiveTab(id);
    highlightCard(card);
    const headerOffset = 90;
    const top = card.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      goToService(tab.dataset.target);
    });
  });

  document.querySelectorAll("[data-readmore]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      goToService(btn.dataset.readmore);
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    cards.forEach((card) => observer.observe(card));
  }

  setActiveTab(tabs[0].dataset.target);
}

/* ---------------- Simple demo form handler (no backend wired) ---------------- */
function handleDemoFormSubmit(form, noteEl) {
  form.reset();
  if (noteEl) noteEl.style.display = "block";
  return false;
}

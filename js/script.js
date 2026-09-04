/* =========================================================
   Sadbhaav Child Development Foundation — shared script.js
   Pure vanilla JS, no dependencies.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
  initActiveNavLink();
  initHeroSlider();
  initGenericSlider(".testimonial-slider");
  initGenericSlider(".team-slider");
  initDirectorCards();
  initTopbarHideOnScroll();
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

/* ---------------- Hero slider ---------------- */
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

/* ---------------- Generic dot-based slider (testimonials / team) ---------------- */
function initGenericSlider(selector) {
  const wrap = document.querySelector(selector);
  if (!wrap) return;
  const track = wrap.querySelector("[data-track]");
  const dotsWrap = wrap.querySelector(".slider-dots");
  if (!track || !dotsWrap) return;

  const pages = Array.from(track.children);
  let index = 0;

  dotsWrap.innerHTML = "";
  pages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Show group " + (i + 1));
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function render() {
    pages.forEach((p, i) => { p.style.display = i === index ? "" : "none"; });
    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle("is-active", i === index));
  }

  function goTo(i) {
    index = (i + pages.length) % pages.length;
    render();
  }

  if (pages.length > 1) render();
}

/* ---------------- Director / person cards ---------------- */
function initDirectorCards() {
  const cards = document.querySelectorAll(".directors-grid .person-card");
  if (!cards.length) return;
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("is-active"));
      card.classList.add("is-active");
    });
  });
}

/* ---------------- Hide top contact bar on scroll ---------------- */
function initTopbarHideOnScroll() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  let lastY = window.scrollY;
  window.addEventListener("scroll", function () {
    const y = window.scrollY;
    if (y > 80) {
      topbar.style.display = "none";
    } else {
      topbar.style.display = "";
    }
    lastY = y;
  }, { passive: true });
}

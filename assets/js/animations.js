/**
 * Scroll reveal + card entrance system (IntersectionObserver).
 * Progressive enhancement: content remains visible until observer successfully arms pending states.
 */
(function () {
  const SELECTORS = [
    ".hero .hero__content > *:not(.btn-group)",
    ".hero .hero__media",
    ".hero .btn-group",
    ".section > .container > .section__eyebrow",
    ".section > .container > .section__title",
    ".section > .container > .section__lead",
    ".section > .container > .section__desc",
    ".section > .container > .divider",
    ".page-hero .container > *",
    ".cta-band .container > *",
    ".grid",
    ".portfolio-grid",
    ".gallery-grid",
    ".process",
    ".contact-channels",
    ".cred-list",
    ".chip-list",
    ".markets-list",
    ".table-wrap",
    ".accordion",
    ".tabs",
    ".filter-bar",
    ".stat-card",
    ".card",
    ".portfolio-item",
    ".gallery-item",
    ".process__step",
    ".contact-channel",
  ].join(",");

  const SKIP = new Set(["SCRIPT", "STYLE", "LINK", "NOSCRIPT"]);
  let observer = null;
  let reduced = false;
  let armed = false;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function inInitialViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  }

  function markRevealed(el) {
    if (!el) return;
    el.classList.add("is-revealed");
    el.classList.remove("is-reveal-pending");
  }

  /** Force style flush so opacity 0 → 1 transitions actually paint. */
  function revealWithTransition(el) {
    if (!el) return;
    if (!el.classList.contains("is-reveal-pending")) {
      markRevealed(el);
      return;
    }
    /* Ensure pending styles are committed before flipping to revealed */
    void el.offsetWidth;
    requestAnimationFrame(() => {
      markRevealed(el);
    });
  }

  function isStaggerChild(el) {
    const parent = el.parentElement;
    return !!(parent && parent.classList.contains("reveal-stagger"));
  }

  function observeEl(el) {
    if (!el || el.dataset.motionObserved === "1") return;
    if (el.closest(".page-transition, .lightbox, .site-header, [hidden]")) return;
    if (el.hidden) return;

    /* Parent stagger owns entrance; avoid pending opacity fighting child animations */
    if (isStaggerChild(el)) {
      el.dataset.motionObserved = "1";
      el.classList.add("reveal", "reveal-child");
      return;
    }

    el.dataset.motionObserved = "1";
    el.classList.add("reveal");

    if (reduced || !observer) {
      markRevealed(el);
      return;
    }

    if (inInitialViewport(el)) {
      /* Visible content: keep shown, play a short enter (never leave it hidden). */
      el.classList.add("motion-enter");
      el.style.animationDelay = "0ms";
      markRevealed(el);
      el.addEventListener(
        "animationend",
        () => {
          el.classList.remove("motion-enter");
          el.style.animationDelay = "";
        },
        { once: true }
      );
      return;
    }

    el.classList.add("is-reveal-pending");
    observer.observe(el);
  }

  function enhanceStaggerContainers() {
    document.querySelectorAll(".grid, .portfolio-grid, .gallery-grid, .process, .contact-channels").forEach((el) => {
      el.classList.add("reveal-stagger");
    });
  }

  function scan(root) {
    const scope = root || document;
    if (scope.nodeType === 1) observeEl(scope);
    scope.querySelectorAll(SELECTORS).forEach((el) => {
      if (SKIP.has(el.tagName)) return;
      observeEl(el);
    });
  }

  function refresh(root) {
    if (!armed) return;
    enhanceStaggerContainers();
    scan(root || document);
  }

  function enterItems(nodes) {
    Array.from(nodes || []).forEach((el, i) => {
      if (!el || el.hidden) return;
      el.classList.add("motion-enter");
      el.style.animationDelay = `${Math.min(i, 8) * 75}ms`;
      el.addEventListener(
        "animationend",
        () => {
          el.classList.remove("motion-enter");
          el.style.animationDelay = "";
        },
        { once: true }
      );
      el.dataset.motionObserved = "1";
      el.classList.add("reveal");
      markRevealed(el);
    });
  }

  function revealAllPending() {
    document.querySelectorAll(".is-reveal-pending").forEach(markRevealed);
  }

  function setupObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealWithTransition(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
  }

  function armMotion() {
    reduced = prefersReducedMotion();

    if (reduced || typeof IntersectionObserver !== "function") {
      document.documentElement.classList.remove("js-motion");
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      enhanceStaggerContainers();
      scan(document);
      revealAllPending();
      return;
    }

    document.documentElement.classList.add("js-motion");
    setupObserver();
    enhanceStaggerContainers();
    scan(document);
  }

  function init() {
    if (armed) return;
    armed = true;
    armMotion();

    if (window.matchMedia) {
      window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
        reduced = e.matches;
        if (e.matches) {
          document.documentElement.classList.remove("js-motion");
          revealAllPending();
          if (observer) {
            observer.disconnect();
            observer = null;
          }
          return;
        }
        document.querySelectorAll("[data-motion-observed]").forEach((el) => {
          if (!el.classList.contains("is-revealed")) {
            delete el.dataset.motionObserved;
          }
        });
        armMotion();
      });
    }
  }

  window.SohailaMotion = { init, refresh, enterItems, scan };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

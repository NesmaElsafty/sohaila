/**
 * Scroll reveal + card entrance system (IntersectionObserver).
 * Progressive enhancement: content remains visible until observer successfully arms pending states.
 */
(function () {
  const SELECTORS = [
    ".about-spread__media",
    ".about-spread__copy > *",
    ".section > .container > .section__eyebrow",
    ".section > .container > .section__title",
    ".section > .container > .section__lead",
    ".section > .container > .section__desc",
    ".section > .container > .divider",
    ".page-hero .container > *",
    ".cta-band .container > *",
    ".cta-close__media",
    ".cta-close__content > *",
    ".grid",
    ".philosophy__header > *",
    ".philosophy__statement > *",
    ".philosophy__intro",
    ".philosophy__principles",
    ".philosophy__focus",
    ".expertise-areas__header > *",
    ".expertise-areas__grid",
    ".specialized__header > *",
    ".specialized__row",
    ".approach__header > *",
    ".approach__step",
    ".approach__badge",
    ".why__header > *",
    ".why__card",
    ".portfolio-grid",
    ".gallery-grid",
    ".process",
    ".contact-channels",
    ".cred-list",
    ".chip-list",
    ".markets-list",
    ".stats-row",
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

  function ensureStaggerParentObserved(child) {
    const parent = child && child.parentElement;
    if (!parent || !parent.classList.contains("reveal-stagger")) return;
    if (parent.dataset.motionObserved === "1") return;
    observeEl(parent);
  }

  function observeEl(el) {
    if (!el || el.dataset.motionObserved === "1") return;
    if (el.closest(".page-transition, .lightbox, .site-header, [hidden]")) return;
    if (el.hidden) return;

    /* Parent stagger owns entrance; avoid pending opacity fighting child animations */
    if (isStaggerChild(el)) {
      el.dataset.motionObserved = "1";
      el.classList.add("reveal", "reveal-child");
      ensureStaggerParentObserved(el);
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
    document
      .querySelectorAll(
        ".grid, .philosophy__principles, .expertise-areas__grid, .approach__grid, .why__grid, .portfolio-grid, .gallery-grid, .process, .contact-channels, .stats-row, .cred-list, .chip-list, .markets-list"
      )
      .forEach((el) => {
        /* Hero intro owns its own L/R entrance — skip vertical stagger */
        if (el.querySelector(".hero-intro__copy, .hero-intro__visual")) return;
        el.classList.add("reveal-stagger");
      });
  }

  function isHeroIntroEl(el) {
    return !!(
      el &&
      (el.classList.contains("hero-intro__copy") ||
        el.classList.contains("hero-intro__visual") ||
        el.querySelector(":scope > .hero-intro__copy, :scope > .hero-intro__visual"))
    );
  }

  function scan(root) {
    const scope = root || document;
    if (scope.nodeType === 1 && !isHeroIntroEl(scope)) observeEl(scope);
    scope.querySelectorAll(SELECTORS).forEach((el) => {
      if (SKIP.has(el.tagName)) return;
      if (isHeroIntroEl(el)) return;
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

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    if (!el || el.dataset.countAnimated === "1") return;
    el.dataset.countAnimated = "1";

    const target = Number(el.getAttribute("data-count"));
    if (!Number.isFinite(target)) return;

    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const decimals = Number(el.getAttribute("data-decimals") || "0");
    const duration = Number(el.getAttribute("data-duration") || "1400");

    if (reduced) {
      el.textContent =
        prefix +
        (decimals > 0 ? target.toFixed(decimals) : String(Math.round(target))) +
        suffix;
      return;
    }

    const start = performance.now();

    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const value = target * easeOutCubic(t);
      el.textContent =
        prefix +
        (decimals > 0 ? value.toFixed(decimals) : String(Math.round(value))) +
        suffix;
      if (t < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  function initCounters(root) {
    const scope = root || document;
    const nodes = scope.querySelectorAll("[data-count]:not([data-count-animated='1'])");
    if (!nodes.length) return;

    if (reduced || typeof IntersectionObserver !== "function") {
      nodes.forEach(animateCounter);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          io.unobserve(entry.target);
        });
      },
      /* Loose threshold — stats near the fold were never firing at 0.45 */
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    nodes.forEach((el) => {
      io.observe(el);
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (rect.top < vh - 40 && rect.bottom > 40) {
        animateCounter(el);
        io.unobserve(el);
      }
    });
  }

  let heroIntroPlayed = false;

  function playHeroIntro() {
    if (heroIntroPlayed) return;
    const nodes = document.querySelectorAll(".hero-intro__copy, .hero-intro__visual");
    if (!nodes.length) return;
    heroIntroPlayed = true;

    if (reduced) {
      nodes.forEach((el) => el.classList.add("is-in"));
      return;
    }

    requestAnimationFrame(() => {
      nodes.forEach((el) => el.classList.add("is-in"));
    });
  }

  function initHeroIntro() {
    const loader = document.getElementById("page-loader");
    const waiting =
      loader &&
      (loader.classList.contains("is-active") || loader.classList.contains("is-booting"));

    if (!waiting || reduced) {
      playHeroIntro();
      return;
    }

    document.addEventListener("sohaila:loader-done", playHeroIntro, { once: true });
    /* Safety if loader event was missed */
    window.setTimeout(playHeroIntro, 3200);
  }

  window.SohailaMotion = { init, refresh, enterItems, scan, initCounters, playHeroIntro };

  function bootCounters() {
    initCounters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      init();
      bootCounters();
      initHeroIntro();
    });
  } else {
    init();
    bootCounters();
    initHeroIntro();
  }

  /* Re-arm after loader / late layout (hash scroll, fonts) */
  document.addEventListener("sohaila:loader-done", bootCounters, { once: true });
  window.addEventListener("load", bootCounters, { once: true });
})();

/**
 * Branded loading + page transitions.
 * Boot / exit: fuchsia veil + light logo (2s RTL handwriting wipe).
 * Entrance after nav: light veil + fuchsia logo (2s wipe).
 * Uses extracted PNGs + CSS mask — SVG SMIL/mask is unreliable in Chromium embeds.
 */
(function () {
  const STORAGE_KEY = "sohaila-page-transition";
  const WRITE_MS = 2000;
  const EXIT_MS = 420;
  const LOGO_LIGHT = "assets/images/brand/logo-reveal-light.png";
  const LOGO_FUCHSIA = "assets/images/brand/logo-reveal-fuchsia.png";
  const LOGO_LIGHT_SVG = "assets/images/brand/sohaila_logo_reveal_light.svg";
  const LOGO_FUCHSIA_SVG = "assets/images/brand/sohaila_logo_reveal_fuchsia.svg";
  const PAGES = new Set([
    "index.html",
    "about.html",
    "expertise.html",
    "portfolio.html",
    "results.html",
    "testimonials.html",
    "contact.html",
    "",
  ]);

  let overlay = null;
  let navigating = false;
  let hideTimer = null;
  let navTimer = null;
  let revealRaf = 0;
  let startPlayed = false;

  function reduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function logoSrc(variant) {
    return variant === "enter" ? LOGO_FUCHSIA : LOGO_LIGHT;
  }

  function ensureOverlay() {
    if (overlay && overlay.isConnected) return overlay;

    const existing = document.getElementById("page-loader");
    if (existing) {
      overlay = existing;
      if (!overlay.querySelector(".page-transition__veil")) {
        overlay.innerHTML =
          '<div class="page-transition__veil"></div><div class="page-transition__logo-wrap"></div>';
      }
      return overlay;
    }

    overlay = document.createElement("div");
    overlay.id = "page-loader";
    overlay.className = "page-transition";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<div class="page-transition__veil"></div><div class="page-transition__logo-wrap"></div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function sampleKeyframes(times, values, t) {
    if (t <= times[0]) return values[0];
    if (t >= times[times.length - 1]) return values[values.length - 1];
    for (let i = 0; i < times.length - 1; i++) {
      if (t >= times[i] && t <= times[i + 1]) {
        const local = (t - times[i]) / (times[i + 1] - times[i]);
        return lerp(values[i], values[i + 1], local);
      }
    }
    return values[values.length - 1];
  }

  /**
   * Three-band wipe matching the authored SVG timeline:
   * 1) Upper Arabic name — RTL
   * 2) Signature — RTL
   * 3) English lockup — LTR
   */
  function applyRevealProgress(wrap, progress) {
    const upper = sampleKeyframes([0, 0.07, 0.64, 1], [0, 0, 100, 100], progress);
    const signature = sampleKeyframes([0, 0.64, 0.83, 1], [0, 0, 100, 100], progress);
    const english = sampleKeyframes([0, 0.83, 0.96, 1], [0, 0, 100, 100], progress);

    wrap.style.setProperty("--reveal-upper", upper.toFixed(2) + "%");
    wrap.style.setProperty("--reveal-signature", signature.toFixed(2) + "%");
    wrap.style.setProperty("--reveal-english", english.toFixed(2) + "%");
  }

  function stopReveal() {
    if (revealRaf) {
      window.cancelAnimationFrame(revealRaf);
      revealRaf = 0;
    }
  }

  function startReveal(wrap) {
    stopReveal();
    applyRevealProgress(wrap, 0);
    const start = performance.now();

    function frame(now) {
      const progress = Math.min(1, (now - start) / WRITE_MS);
      applyRevealProgress(wrap, progress);
      if (progress < 1) {
        revealRaf = window.requestAnimationFrame(frame);
      } else {
        revealRaf = 0;
      }
    }

    revealRaf = window.requestAnimationFrame(frame);
  }

  function mountWritingLogo(variant) {
    const el = ensureOverlay();
    const wrap = el.querySelector(".page-transition__logo-wrap");
    if (!wrap) return Promise.resolve();

    el.classList.toggle("page-transition--light", variant === "enter");
    wrap.classList.add("is-revealing");
    applyRevealProgress(wrap, 0);

    const src = logoSrc(variant);
    wrap.innerHTML =
      '<img class="page-transition__logo" src="' +
      src +
      '" alt="" width="372" height="233" decoding="async" />';

    const img = wrap.querySelector("img");
    return new Promise((resolve) => {
      const go = () => {
        startReveal(wrap);
        resolve();
      };
      if (img.complete && img.naturalWidth) {
        go();
      } else {
        img.addEventListener("load", go, { once: true });
        img.addEventListener(
          "error",
          () => {
            /* Fallback to SVG object if PNG missing */
            wrap.innerHTML =
              '<object class="page-transition__logo" type="image/svg+xml" data="' +
              (variant === "enter" ? LOGO_FUCHSIA_SVG : LOGO_LIGHT_SVG) +
              '" width="372" height="233" aria-hidden="true"></object>';
            startReveal(wrap);
            resolve();
          },
          { once: true }
        );
      }
    });
  }

  function clearFlag() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  function setFlag() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function getFlag() {
    try {
      return sessionStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function hideOverlay() {
    if (!overlay) return;
    stopReveal();
    overlay.classList.remove("is-active", "is-writing", "is-booting");
    overlay.classList.add("is-exiting");
    overlay.setAttribute("aria-busy", "false");
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      if (!overlay) return;
      overlay.classList.remove("is-exiting", "page-transition--light");
      const wrap = overlay.querySelector(".page-transition__logo-wrap");
      if (wrap) {
        wrap.classList.remove("is-revealing");
        wrap.innerHTML = "";
        wrap.style.removeProperty("--reveal-upper");
        wrap.style.removeProperty("--reveal-signature");
        wrap.style.removeProperty("--reveal-english");
      }
      navigating = false;
    }, EXIT_MS);
  }

  function playWriting(variant, thenHideAfterMs) {
    const el = ensureOverlay();
    el.classList.remove("is-exiting");
    el.classList.add("is-active", "is-writing");
    el.setAttribute("aria-busy", "true");
    return mountWritingLogo(variant).then(() => {
      if (thenHideAfterMs != null) {
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(hideOverlay, thenHideAfterMs);
      }
    });
  }

  function playStart() {
    if (startPlayed) return;
    startPlayed = true;

    if (reduced()) {
      clearFlag();
      const el = document.getElementById("page-loader");
      if (el) {
        el.classList.remove("is-active", "is-booting", "is-writing");
        el.setAttribute("aria-busy", "false");
      }
      return;
    }

    if (getFlag()) {
      clearFlag();
      playWriting("enter", WRITE_MS);
      return;
    }

    playWriting("exit", WRITE_MS);
  }

  function currentPage() {
    return (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  }

  function isEligibleLink(anchor, event) {
    if (!anchor) return false;
    if (event.defaultPrevented) return false;
    if (event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

    const raw = anchor.getAttribute("href");
    if (!raw || raw.startsWith("#")) return false;
    if (/^(mailto:|tel:|sms:|javascript:)/i.test(raw)) return false;
    if (anchor.target && anchor.target !== "_self") return false;
    if (anchor.hasAttribute("download")) return false;

    let url;
    try {
      url = new URL(raw, window.location.href);
    } catch {
      return false;
    }

    if (url.origin !== window.location.origin) return false;

    const page = (url.pathname.split("/").pop() || "index.html").toLowerCase();
    if (!PAGES.has(page)) return false;

    if (page === currentPage() && url.hash && url.search === window.location.search) {
      return false;
    }

    return true;
  }

  function navigateWithTransition(anchor, event) {
    if (reduced() || navigating) return;
    event.preventDefault();
    navigating = true;

    const href = anchor.href;
    setFlag();

    let left = false;
    const goOnce = () => {
      if (left) return;
      left = true;
      window.location.assign(href);
    };

    playWriting("exit", null).finally(() => {
      window.clearTimeout(navTimer);
      navTimer = window.setTimeout(goOnce, WRITE_MS);
      window.setTimeout(goOnce, WRITE_MS + 900);
    });
  }

  function onClick(event) {
    const anchor = event.target.closest && event.target.closest("a[href]");
    if (!isEligibleLink(anchor, event)) return;
    navigateWithTransition(anchor, event);
  }

  function init() {
    document.addEventListener("click", onClick, true);
    ensureOverlay();

    window.addEventListener("pageshow", (event) => {
      navigating = false;
      window.clearTimeout(navTimer);
      if (event.persisted) {
        hideOverlay();
        clearFlag();
        startPlayed = false;
        return;
      }
      playStart();
    });

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", playStart);
    } else {
      playStart();
    }

    window.addEventListener("pagehide", () => {
      navigating = false;
      stopReveal();
    });
  }

  window.SohailaPageTransition = {
    init,
    playStart,
    hideOverlay,
    logoLight: LOGO_LIGHT,
    logoFuchsia: LOGO_FUCHSIA,
    writeMs: WRITE_MS,
  };
  init();
})();

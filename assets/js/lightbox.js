/**
 * Accessible gallery lightbox — single init, event delegation, focus trap, i18n.
 */
(function () {
  let activeTrigger = null;
  let items = [];
  let index = 0;
  let initialized = false;
  let previouslyFocused = null;

  function t(key) {
    return window.SohailaI18n && typeof window.SohailaI18n.t === "function"
      ? window.SohailaI18n.t(key)
      : key;
  }

  function ensureLightbox() {
    let lb = document.getElementById("site-lightbox");
    if (lb) return lb;

    lb = document.createElement("dialog");
    lb.id = "site-lightbox";
    lb.className = "lightbox";
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-labelledby", "lightbox-caption");
    lb.innerHTML = `
      <div class="lightbox__dialog">
        <div class="lightbox__media"><img src="" alt="" decoding="async" /></div>
        <div class="lightbox__toolbar">
          <p class="lightbox__caption" id="lightbox-caption"></p>
          <p class="lightbox__position" id="lightbox-position" aria-live="polite"></p>
          <div class="lightbox__controls">
            <button type="button" class="lightbox__btn" data-lightbox-prev>‹</button>
            <button type="button" class="lightbox__btn" data-lightbox-next>›</button>
            <button type="button" class="lightbox__btn" data-lightbox-close>✕</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(lb);

    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    lb.querySelector("[data-lightbox-close]").addEventListener("click", close);
    lb.querySelector("[data-lightbox-prev]").addEventListener("click", () => show(index - 1));
    lb.querySelector("[data-lightbox-next]").addEventListener("click", () => show(index + 1));
    lb.addEventListener("cancel", (e) => {
      e.preventDefault();
      close();
    });
    lb.addEventListener("keydown", trapFocus);

    return lb;
  }

  function localizeControls(lb) {
    lb.querySelector("[data-lightbox-prev]").setAttribute("aria-label", t("common.previous"));
    lb.querySelector("[data-lightbox-next]").setAttribute("aria-label", t("common.next"));
    lb.querySelector("[data-lightbox-close]").setAttribute("aria-label", t("common.close"));
  }

  function collectGallery(trigger) {
    const root = trigger.closest("[data-lightbox-gallery]") || document;
    return Array.from(root.querySelectorAll("[data-lightbox-item]"))
      .filter((btn) => {
        const host = btn.closest(".gallery-item, article, li, [data-load-more-item]");
        if (!host) return true;
        if (host.hidden) return false;
        if (host.classList.contains("is-batch-hidden")) return false;
        return true;
      })
      .map((btn) => {
        const img = btn.querySelector("img");
        return {
          src: btn.getAttribute("data-full") || (img && (img.currentSrc || img.src)),
          alt: (img && img.alt) || "",
          caption: btn.getAttribute("data-caption") || "",
          trigger: btn,
        };
      });
  }

  function getFocusable(container) {
    return Array.from(
      container.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
  }

  function trapFocus(e) {
    if (e.key !== "Tab") return;
    const lb = document.getElementById("site-lightbox");
    if (!lb || !lb.open) return;
    const focusable = getFocusable(lb);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function positionLabel(i, total) {
    const template = t("common.galleryPosition");
    return String(template).replace("{current}", String(i + 1)).replace("{total}", String(total));
  }

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    const item = items[index];
    const lb = ensureLightbox();
    localizeControls(lb);

    const img = lb.querySelector(".lightbox__media img");
    img.src = item.src;
    img.alt = item.alt || "";
    img.style.objectFit = "contain";

    lb.querySelector(".lightbox__caption").textContent = item.caption || "";
    lb.querySelector(".lightbox__position").textContent = positionLabel(index, items.length);

    previouslyFocused = activeTrigger || document.activeElement;

    if (typeof lb.showModal === "function") {
      if (!lb.open) lb.showModal();
    } else {
      lb.setAttribute("open", "");
      lb.hidden = false;
    }

    document.body.classList.add("lightbox-open");
    lb.querySelector("[data-lightbox-close]").focus();
  }

  function close() {
    const lb = document.getElementById("site-lightbox");
    if (!lb) return;

    if (typeof lb.close === "function" && lb.open) {
      lb.close();
    } else {
      lb.removeAttribute("open");
      lb.hidden = true;
    }

    document.body.classList.remove("lightbox-open");
    const restore = activeTrigger || previouslyFocused;
    if (restore && typeof restore.focus === "function") restore.focus();
  }

  function openFromTrigger(btn) {
    items = collectGallery(btn);
    if (!items.length) {
      const img = btn.querySelector("img");
      items = [
        {
          src: btn.getAttribute("data-full") || (img && (img.currentSrc || img.src)),
          alt: (img && img.alt) || "",
          caption: btn.getAttribute("data-caption") || "",
          trigger: btn,
        },
      ];
    }
    activeTrigger = btn;
    const i = items.findIndex((it) => it.trigger === btn);
    show(i < 0 ? 0 : i);
  }

  function init() {
    if (initialized) return;
    initialized = true;

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lightbox-item]");
      if (!btn) return;
      e.preventDefault();
      openFromTrigger(btn);
    });

    document.addEventListener("keydown", (e) => {
      const lb = document.getElementById("site-lightbox");
      const isOpen = lb && (lb.open || lb.hasAttribute("open"));
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        show(index - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        show(index + 1);
      }
    });

    document.addEventListener("sohaila:langchange", () => {
      const lb = document.getElementById("site-lightbox");
      if (!lb) return;
      localizeControls(lb);
      if (lb.open || lb.hasAttribute("open")) {
        lb.querySelector(".lightbox__position").textContent = positionLabel(index, items.length);
      }
    });
  }

  /* Public aliases — initAll kept for backwards compatibility with page scripts */
  window.SohailaLightbox = { init, initAll: init, close, openFromTrigger };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

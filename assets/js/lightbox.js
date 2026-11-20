(function () {
  let activeTrigger = null;
  let items = [];
  let index = 0;
  let keybound = false;

  function ensureLightbox() {
    let lb = document.getElementById("site-lightbox");
    if (lb) return lb;
    lb = document.createElement("div");
    lb.id = "site-lightbox";
    lb.className = "lightbox";
    lb.hidden = true;
    lb.innerHTML = `
      <div class="lightbox__dialog" role="dialog" aria-modal="true" aria-labelledby="lightbox-caption">
        <div class="lightbox__media"><img src="" alt="" /></div>
        <div class="lightbox__toolbar">
          <p class="lightbox__caption" id="lightbox-caption"></p>
          <div class="lightbox__controls">
            <button type="button" class="lightbox__btn" data-lightbox-prev aria-label="Previous">‹</button>
            <button type="button" class="lightbox__btn" data-lightbox-next aria-label="Next">›</button>
            <button type="button" class="lightbox__btn" data-lightbox-close aria-label="Close">✕</button>
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
    return lb;
  }

  function collectGallery(trigger) {
    const root = trigger.closest("[data-lightbox-gallery]") || document;
    const triggers = Array.from(root.querySelectorAll("[data-lightbox-item]"));
    return triggers.map((btn) => {
      const img = btn.querySelector("img");
      return {
        src: btn.getAttribute("data-full") || (img && (img.currentSrc || img.src)),
        alt: (img && img.alt) || "",
        caption: btn.getAttribute("data-caption") || "",
        trigger: btn,
      };
    });
  }

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    const item = items[index];
    const lb = ensureLightbox();
    const img = lb.querySelector("img");
    img.src = item.src;
    img.alt = item.alt || "";
    lb.querySelector(".lightbox__caption").textContent = item.caption || item.alt || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector("[data-lightbox-close]").focus();
  }

  function close() {
    const lb = document.getElementById("site-lightbox");
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = "";
    if (activeTrigger) activeTrigger.focus();
  }

  function init() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lightbox-item]");
      if (!btn) return;
      e.preventDefault();
      items = collectGallery(btn);
      activeTrigger = btn;
      const i = items.findIndex((it) => it.trigger === btn);
      show(i < 0 ? 0 : i);
    });

    if (!keybound) {
      keybound = true;
      document.addEventListener("keydown", (e) => {
        const lb = document.getElementById("site-lightbox");
        if (!lb || lb.hidden) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.SohailaLightbox = { init, close };
})();

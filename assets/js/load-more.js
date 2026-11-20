/**
 * Responsive batch reveal for large galleries (testimonials).
 * Batch sizes: desktop 12 / tablet 8 / mobile 6 — all items remain in the dataset.
 */
(function () {
  function batchSize() {
    const w = window.innerWidth;
    if (w < 768) return 6;
    if (w < 1024) return 8;
    return 12;
  }

  function t(key) {
    return window.SohailaI18n && typeof window.SohailaI18n.t === "function"
      ? window.SohailaI18n.t(key)
      : key;
  }

  function initLoadMore(root) {
    if (root.dataset.loadMoreReady === "1") return;

    const gallery = root.querySelector("[data-load-more-gallery]") || root;
    const items = Array.from(gallery.querySelectorAll("[data-load-more-item]"));
    const button = root.querySelector("[data-load-more-btn]");
    const status = root.querySelector("[data-load-more-status]");
    if (!items.length || !button) return;

    root.dataset.loadMoreReady = "1";
    let shown = 0;

    function updateStatus() {
      if (!status) return;
      const template = t("common.showingCount");
      status.textContent = String(template)
        .replace("{shown}", String(shown))
        .replace("{total}", String(items.length));
    }

    function reveal(count) {
      const next = Math.min(shown + count, items.length);
      for (let i = shown; i < next; i += 1) {
        items[i].hidden = false;
        items[i].classList.remove("is-batch-hidden");
        items[i].removeAttribute("aria-hidden");
        items[i].querySelectorAll("button, a").forEach((el) => el.removeAttribute("tabindex"));
      }
      shown = next;
      updateStatus();

      if (shown >= items.length) {
        button.hidden = true;
        button.setAttribute("aria-hidden", "true");
        button.disabled = true;
      } else {
        button.hidden = false;
        button.removeAttribute("aria-hidden");
        button.disabled = false;
        button.textContent = t("common.loadMore");
      }
    }

    items.forEach((item) => {
      item.hidden = true;
      item.classList.add("is-batch-hidden");
      item.setAttribute("aria-hidden", "true");
      item.querySelectorAll("button, a").forEach((el) => el.setAttribute("tabindex", "-1"));
    });

    button.addEventListener("click", () => reveal(batchSize()));
    document.addEventListener("sohaila:langchange", () => {
      button.textContent = t("common.loadMore");
      updateStatus();
    });

    reveal(batchSize());
  }

  function initAll() {
    document.querySelectorAll("[data-load-more]").forEach(initLoadMore);
  }

  window.SohailaLoadMore = { initAll };
})();

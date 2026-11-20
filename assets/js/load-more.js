/**
 * Responsive batch reveal for large galleries (testimonials).
 * Batch sizes: desktop 12 / tablet 8 / mobile 6.
 * Scroll mode: next page loads when the user scrolls near the bottom sentinel.
 */
(function () {
  function batchSize(root) {
    const fixed = root && root.getAttribute("data-load-more-page-size");
    if (fixed) {
      const n = Number(fixed);
      if (Number.isFinite(n) && n > 0) return Math.floor(n);
    }
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
    const sentinel = root.querySelector("[data-load-more-sentinel]");
    const scrollMode =
      root.getAttribute("data-load-more-mode") === "scroll" || (!button && !!sentinel);

    if (!items.length) return;
    if (!scrollMode && !button) return;

    root.dataset.loadMoreReady = "1";
    let shown = 0;
    let loading = false;
    let scrollObserver = null;

    function updateStatus() {
      if (!status) return;
      const template = t("common.showingCount");
      status.textContent = String(template)
        .replace("{shown}", String(shown))
        .replace("{total}", String(items.length));
    }

    function done() {
      return shown >= items.length;
    }

    function reveal(count) {
      if (loading || done()) return false;
      loading = true;

      const next = Math.min(shown + count, items.length);
      const newly = [];
      for (let i = shown; i < next; i += 1) {
        items[i].hidden = false;
        items[i].classList.remove("is-batch-hidden");
        items[i].removeAttribute("aria-hidden");
        items[i].querySelectorAll("button, a").forEach((el) => el.removeAttribute("tabindex"));
        newly.push(items[i]);
      }
      shown = next;
      updateStatus();

      if (window.SohailaMotion && newly.length) {
        window.SohailaMotion.enterItems(newly);
      }

      if (button) {
        if (done()) {
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

      if (sentinel) {
        sentinel.hidden = done();
        if (done() && scrollObserver) {
          scrollObserver.disconnect();
          scrollObserver = null;
        }
      }

      loading = false;
      return newly.length > 0;
    }

    items.forEach((item) => {
      item.hidden = true;
      item.classList.add("is-batch-hidden");
      item.setAttribute("aria-hidden", "true");
      item.querySelectorAll("button, a").forEach((el) => el.setAttribute("tabindex", "-1"));
    });

    const pageSize = () => batchSize(root);

    if (button && !scrollMode) {
      button.addEventListener("click", () => reveal(pageSize()));
    }

    function tryLoadMore() {
      if (loading || done()) return;
      reveal(pageSize());
    }

    if (scrollMode) {
      if (sentinel && typeof IntersectionObserver === "function") {
        scrollObserver = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) tryLoadMore();
          },
          { root: null, rootMargin: "320px 0px", threshold: 0 }
        );
        scrollObserver.observe(sentinel);
      }

      let ticking = false;
      window.addEventListener(
        "scroll",
        () => {
          if (ticking || loading || done()) return;
          ticking = true;
          requestAnimationFrame(() => {
            ticking = false;
            const doc = document.documentElement;
            const nearBottom =
              window.innerHeight + window.scrollY >= doc.scrollHeight - 480;
            if (nearBottom) tryLoadMore();
          });
        },
        { passive: true }
      );
    }

    document.addEventListener("sohaila:langchange", () => {
      if (button) button.textContent = t("common.loadMore");
      updateStatus();
    });

    /* First page only — further pages load on scroll */
    reveal(pageSize());
  }

  function initAll() {
    document.querySelectorAll("[data-load-more]").forEach(initLoadMore);
  }

  window.SohailaLoadMore = { initAll };
})();

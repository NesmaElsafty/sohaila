(function () {
  function initFilters(root) {
    if (root.dataset.filtersReady === "1") {
      /* Re-apply current filter after dynamic grid population */
      const pressed = root.querySelector('[aria-pressed="true"]') || root.querySelector("[data-filter]");
      if (pressed) root._sohailaApply && root._sohailaApply(pressed.getAttribute("data-filter"));
      return;
    }

    const buttons = Array.from(root.querySelectorAll("[data-filter]"));
    const grid = document.querySelector(root.getAttribute("data-filter-target") || "[data-filter-grid]");
    if (!grid) return;
    const empty = document.querySelector(root.getAttribute("data-empty") || "[data-filter-empty]");

    function apply(filter) {
      const items = Array.from(grid.querySelectorAll("[data-category]"));
      buttons.forEach((btn) => {
        const active = btn.getAttribute("data-filter") === filter;
        btn.setAttribute("aria-pressed", active ? "true" : "false");
        btn.classList.toggle("is-active", active);
      });

      let visible = 0;
      items.forEach((item) => {
        const cats = (item.getAttribute("data-category") || "").split(/\s+/);
        const show = filter === "all" || cats.includes(filter);
        item.hidden = !show;
        item.setAttribute("aria-hidden", show ? "false" : "true");
        item.querySelectorAll("a, button").forEach((el) => {
          if (show) el.removeAttribute("tabindex");
          else el.setAttribute("tabindex", "-1");
        });
        if (show) visible += 1;
      });

      if (empty) {
        empty.hidden = visible > 0;
        empty.setAttribute("aria-hidden", visible > 0 ? "true" : "false");
      }
    }

    root._sohailaApply = apply;
    root.dataset.filtersReady = "1";

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => apply(btn.getAttribute("data-filter")));
    });

    document.addEventListener("sohaila:langchange", () => {
      buttons.forEach((btn) => {
        const key = btn.getAttribute("data-i18n");
        if (key && window.SohailaI18n) btn.textContent = window.SohailaI18n.t(key);
      });
    });

    const initial = buttons.find((b) => b.getAttribute("aria-pressed") === "true") || buttons[0];
    if (initial) apply(initial.getAttribute("data-filter"));
  }

  function initAll() {
    document.querySelectorAll("[data-filter-bar]").forEach(initFilters);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.SohailaFilters = { initAll };
})();

(function () {
  function initFilters(root) {
    const buttons = Array.from(root.querySelectorAll("[data-filter]"));
    const grid = document.querySelector(root.getAttribute("data-filter-target") || "[data-filter-grid]");
    if (!grid) return;
    const empty = document.querySelector(root.getAttribute("data-empty") || "[data-filter-empty]");

    function apply(filter) {
      const items = Array.from(grid.querySelectorAll("[data-category]"));
      buttons.forEach((btn) => {
        btn.setAttribute("aria-pressed", btn.getAttribute("data-filter") === filter ? "true" : "false");
      });
      let visible = 0;
      items.forEach((item) => {
        const cats = (item.getAttribute("data-category") || "").split(/\s+/);
        const show = filter === "all" || cats.includes(filter);
        item.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => apply(btn.getAttribute("data-filter")));
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
})();

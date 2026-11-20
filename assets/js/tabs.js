(function () {
  function initTabs(root) {
    const tablist = root.querySelector('[role="tablist"]');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = tabs
      .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
      .filter(Boolean);

    function activate(tab, focus) {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        const show = panel.id === tab.getAttribute("aria-controls");
        panel.hidden = !show;
      });
      if (focus) tab.focus();

      const hash = tab.getAttribute("data-hash");
      if (hash && history.replaceState) {
        history.replaceState(null, "", "#" + hash);
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab, false));
      tab.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(index + 1) % tabs.length];
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          activate(next, true);
        }
      });
    });

    const hash = location.hash.replace("#", "");
    const fromHash = tabs.find((t) => t.getAttribute("data-hash") === hash);
    activate(fromHash || tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0], false);
  }

  function initAll() {
    document.querySelectorAll("[data-tabs]").forEach(initTabs);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  window.SohailaTabs = { initAll };
})();

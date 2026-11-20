(function () {
  function initTabs(root) {
    const tablist = root.querySelector('[role="tablist"]');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const panels = tabs
      .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
      .filter(Boolean);

    const isRtl = () => document.documentElement.dir === "rtl";

    function activate(tab, { focus = false, updateHash = true } = {}) {
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
      if (updateHash && hash && history.replaceState) {
        history.replaceState(null, "", "#" + hash);
      }
    }

    function resolveFromHash() {
      const hash = location.hash.replace("#", "");
      if (!hash) return null;
      return (
        tabs.find((t) => t.getAttribute("data-hash") === hash) ||
        tabs.find((t) => t.id === hash) ||
        tabs.find((t) => t.getAttribute("aria-controls") === hash)
      );
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab, { focus: false }));
      tab.addEventListener("keydown", (e) => {
        let next = null;
        const rtl = isRtl();
        const nextKey = rtl ? "ArrowLeft" : "ArrowRight";
        const prevKey = rtl ? "ArrowRight" : "ArrowLeft";

        if (e.key === nextKey || e.key === "ArrowDown") next = tabs[(index + 1) % tabs.length];
        if (e.key === prevKey || e.key === "ArrowUp") next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          activate(next, { focus: true });
        }
      });
    });

    const fromHash = resolveFromHash();
    activate(fromHash || tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0], {
      focus: false,
      updateHash: Boolean(fromHash),
    });

    if (fromHash) {
      /* Ensure deep-linked content is in view after layout */
      requestAnimationFrame(() => {
        const panel = document.getElementById(fromHash.getAttribute("aria-controls"));
        const target = panel || fromHash;
        if (target && typeof target.scrollIntoView === "function") {
          target.scrollIntoView({ block: "nearest" });
        }
      });
    }

    window.addEventListener("hashchange", () => {
      const match = resolveFromHash();
      if (match) activate(match, { focus: false, updateHash: false });
    });
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

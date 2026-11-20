(function () {
  function initAccordion(root) {
    const triggers = Array.from(root.querySelectorAll(".accordion__trigger"));
    triggers.forEach((btn) => {
      const panelId = btn.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      if (!panel) return;
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        panel.hidden = expanded;
      });
    });
  }

  function initAll() {
    document.querySelectorAll("[data-accordion]").forEach(initAccordion);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();

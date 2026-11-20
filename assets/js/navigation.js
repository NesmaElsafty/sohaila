(function () {
  function initNavigation() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!header || !toggle || !nav) return;

    const openLabel = () => toggle.getAttribute("data-i18n-aria") || "Open menu";

    function setOpen(open) {
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : openLabel());
    }

    toggle.addEventListener("click", () => {
      setOpen(!header.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    // Mark current page
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    nav.querySelectorAll(".site-nav__link").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href === path || (path === "" && href === "index.html")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  window.SohailaNav = { init: initNavigation };
})();

(function () {
  function initNavigation() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!header || !toggle || !nav) return;

    let lastFocus = null;

    function label(key) {
      return window.SohailaI18n && typeof window.SohailaI18n.t === "function"
        ? window.SohailaI18n.t(key)
        : key === "nav.closeMenu"
          ? "Close menu"
          : "Open menu";
    }

    function syncToggleLabel(open) {
      toggle.setAttribute("aria-label", open ? label("nav.closeMenu") : label("nav.openMenu"));
      toggle.setAttribute("data-i18n-aria", open ? "nav.closeMenu" : "nav.openMenu");
    }

    function setNavInert(inert) {
      nav.setAttribute("aria-hidden", inert ? "true" : "false");
      if (inert) nav.setAttribute("inert", "");
      else nav.removeAttribute("inert");
      nav.querySelectorAll("a, button").forEach((el) => {
        if (inert) el.setAttribute("tabindex", "-1");
        else el.removeAttribute("tabindex");
      });
    }

    function setOpen(open) {
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      syncToggleLabel(open);

      const isMobile = window.matchMedia("(max-width: 860px)").matches;
      if (isMobile) setNavInert(!open);
      else setNavInert(false);

      if (open) {
        lastFocus = document.activeElement;
        const firstLink = nav.querySelector("a, button");
        if (firstLink) firstLink.focus();
      } else if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
        lastFocus = null;
      }
    }

    if (!toggle.dataset.navBound) {
      toggle.dataset.navBound = "1";
      toggle.addEventListener("click", () => {
        setOpen(!header.classList.contains("is-open"));
      });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && header.classList.contains("is-open")) {
          setOpen(false);
          toggle.focus();
        }
      });
    }

    syncToggleLabel(false);
    if (window.matchMedia("(max-width: 860px)").matches) {
      setNavInert(true);
    }

    window.addEventListener("resize", () => {
      const isMobile = window.matchMedia("(max-width: 860px)").matches;
      if (!isMobile) {
        setOpen(false);
        setNavInert(false);
      } else if (!header.classList.contains("is-open")) {
        setNavInert(true);
      }
    });

    document.addEventListener("sohaila:langchange", () => {
      syncToggleLabel(header.classList.contains("is-open"));
    });

    function syncScrolled() {
      const scrolled = window.scrollY > 8;
      header.classList.toggle("is-scrolled", scrolled);
    }

    syncScrolled();
    window.addEventListener("scroll", syncScrolled, { passive: true });

    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    nav.querySelectorAll(".site-nav__link").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href === path || (path === "" && href === "index.html")) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.SohailaNav = { init: initNavigation };
})();

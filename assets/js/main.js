(function () {
  const PAGES = [
    { href: "index.html", key: "home", label: "Home" },
    { href: "about.html", key: "about", label: "About" },
    { href: "expertise.html", key: "expertise", label: "Expertise" },
    { href: "portfolio.html", key: "portfolio", label: "Our Clients" },
    { href: "results.html", key: "results", label: "Results" },
    { href: "testimonials.html", key: "testimonials", label: "Testimonials" },
    { href: "contact.html", key: "contact", label: "Contact" },
  ];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;
    const navItems = PAGES.map(
      (p) =>
        `<li><a class="site-nav__link" href="${p.href}" data-i18n="nav.${p.key}">${escapeHtml(p.label)}</a></li>`
    ).join("");

    mount.innerHTML = `
      <header class="site-header">
        <div class="container container--wide site-header__inner">
          <a class="brand-logo" href="index.html" aria-label="Sohaila Halim">
            <img src="assets/images/brand/logo-dark.png" alt="Sohaila Halim Arabic calligraphy logo" width="120" height="48" />
            <span class="brand-logo__text">
              <span class="brand-logo__name">SOHAILA HALIM</span>
              <span class="brand-logo__role" data-i18n="shared.brandStrategistShort">Brand Strategist</span>
            </span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-i18n-aria="nav.openMenu" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
          <nav class="site-nav" id="primary-nav" data-nav-label aria-label="Primary">
            <ul class="site-nav__list">${navItems}</ul>
            <div class="lang-switcher" role="group" aria-label="Language">
              <button type="button" data-lang="en" aria-pressed="true">EN</button>
              <button type="button" data-lang="ar" aria-pressed="false">AR</button>
            </div>
            <a class="btn btn--primary header-cta" href="contact.html" data-i18n="nav.cta">Let's Talk</a>
          </nav>
        </div>
      </header>`;
  }

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;

    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container container--wide">
          <div class="site-footer__rule" aria-hidden="true"></div>
          <div class="site-footer__credit">
            <p class="site-footer__copy">© 2026 Sohaila Halim</p>
            <p class="site-footer__powered">Powered by <a href="https://nesma.dev" target="_blank" rel="noopener noreferrer">nesma.dev</a></p>
          </div>
        </div>
      </footer>`;
  }

  function boot() {
    renderHeader();
    renderFooter();
    if (window.SohailaI18n) window.SohailaI18n.init();
    if (window.SohailaNav) window.SohailaNav.init();
    if (window.SohailaMotion) window.SohailaMotion.refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

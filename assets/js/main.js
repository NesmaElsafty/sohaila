(function () {
  const PAGES = [
    { href: "index.html", key: "home", label: "Home" },
    { href: "about.html", key: "about", label: "About" },
    { href: "expertise.html", key: "expertise", label: "Expertise" },
    { href: "portfolio.html", key: "portfolio", label: "Portfolio" },
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
              <span class="brand-logo__role">Brand Strategist</span>
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
    const links = PAGES.map(
      (p) => `<li><a href="${p.href}" data-i18n="nav.${p.key}">${escapeHtml(p.label)}</a></li>`
    ).join("");

    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container container--wide">
          <div class="site-footer__grid">
            <div>
              <p class="site-footer__brand-name">SOHAILA HALIM</p>
              <p class="site-footer__brand-title">Brand, Marketing &amp; Business Growth Strategist</p>
              <p>Building Brands. Shaping Strategies. Driving Growth.</p>
            </div>
            <div>
              <p class="site-footer__heading" data-i18n="footer.explore">Explore</p>
              <ul class="site-footer__list">${links}</ul>
            </div>
            <div>
              <p class="site-footer__heading" data-i18n="footer.contact">Contact</p>
              <ul class="site-footer__list">
                <li><a href="mailto:Sohaila.a.halim@gmail.com">Sohaila.a.halim@gmail.com</a></li>
                <li><a href="tel:+201012537915">01012537915</a></li>
                <li><a href="tel:+201060420920">01060420920</a></li>
                <li><a href="https://www.linkedin.com/in/sohailahalim/" target="_blank" rel="noopener noreferrer">/sohailahalim</a></li>
              </ul>
              <div class="lang-switcher" role="group" aria-label="Language" style="margin-top:1rem">
                <button type="button" data-lang="en" aria-pressed="true">EN</button>
                <button type="button" data-lang="ar" aria-pressed="false">AR</button>
              </div>
            </div>
          </div>
          <div class="site-footer__bottom">
            <p>SOHAILA HALIM Branding Portfolio 2026</p>
            <a href="#top" data-i18n="common.backToTop">Back to top</a>
          </div>
        </div>
      </footer>`;
  }

  function injectTranslationBanner() {
    if (document.querySelector(".translation-banner")) return;
    const main = document.getElementById("main");
    if (!main) return;
    const banner = document.createElement("div");
    banner.className = "translation-banner";
    banner.setAttribute("role", "status");
    banner.hidden = true;
    banner.setAttribute("aria-hidden", "true");
    banner.innerHTML = `<p data-i18n="common.translationPending">Arabic translation pending approval. English source text is shown.</p>`;
    main.insertBefore(banner, main.firstChild);

    function sync() {
      const lang = window.SohailaI18n ? window.SohailaI18n.getStoredLang() : "en";
      const show = lang === "ar";
      banner.hidden = !show;
      banner.setAttribute("aria-hidden", show ? "false" : "true");
      if (show && window.SohailaI18n) {
        const p = banner.querySelector("[data-i18n]");
        if (p) p.textContent = window.SohailaI18n.t("common.translationPending");
      }
    }
    document.addEventListener("sohaila:langchange", sync);
    sync();
  }

  function boot() {
    renderHeader();
    renderFooter();
    if (window.SohailaI18n) window.SohailaI18n.init();
    if (window.SohailaNav) window.SohailaNav.init();
    injectTranslationBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

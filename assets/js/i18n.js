/**
 * Bilingual i18n — EN default, AR UI with EN body fallback for unapproved content.
 */
(function () {
  const STORAGE_KEY = "sohaila-lang";
  const SUPPORTED = ["en", "ar"];

  function nestedGet(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), obj);
  }

  function t(key, lang) {
    const active = lang || getStoredLang();
    const dict = (window.SOHAILA_I18N && window.SOHAILA_I18N[active]) || {};
    const fallback = (window.SOHAILA_I18N && window.SOHAILA_I18N.en) || {};
    return nestedGet(dict, key) ?? nestedGet(fallback, key) ?? key;
  }

  function getStoredLang() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(v) ? v : "en";
    } catch {
      return "en";
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore quota / private mode */
    }
  }

  function markSourceContentRegions() {
    document.querySelectorAll("[data-source-content]").forEach((el) => {
      el.setAttribute("lang", "en");
      el.setAttribute("dir", "ltr");
    });
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(key, lang);
      if (value == null || value === key) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      /* Dynamic open/close labels are owned by navigation.js */
      if (el.classList.contains("nav-toggle")) return;
      const value = t(key, lang);
      if (value != null && value !== key) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const value = t(key, lang);
      if (value != null && value !== key) el.innerHTML = value;
    });

    document.querySelectorAll(".lang-switcher").forEach((group) => {
      group.setAttribute("aria-label", t("footer.language", lang));
      group.querySelectorAll("button").forEach((btn) => {
        const pressed = btn.getAttribute("data-lang") === lang;
        btn.setAttribute("aria-pressed", pressed ? "true" : "false");
      });
    });

    document.querySelectorAll("[data-nav-label]").forEach((el) => {
      el.setAttribute("aria-label", t("nav.primary", lang));
    });

    markSourceContentRegions();
    document.dispatchEvent(new CustomEvent("sohaila:langchange", { detail: { lang } }));
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    setStoredLang(lang);
    applyTranslations(lang);
  }

  function init() {
    document.querySelectorAll(".lang-switcher button").forEach((btn) => {
      if (btn.dataset.i18nBound) return;
      btn.dataset.i18nBound = "1";
      btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
    });
    applyTranslations(getStoredLang());
  }

  window.SohailaI18n = {
    init,
    setLanguage,
    getStoredLang,
    applyTranslations,
    t,
  };
})();

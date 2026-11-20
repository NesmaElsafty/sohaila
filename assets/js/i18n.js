/**
 * Bilingual i18n system — English default, Arabic with English fallback for unapproved content.
 */
(function () {
  const STORAGE_KEY = "sohaila-lang";
  const SUPPORTED = ["en", "ar"];

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
      /* ignore */
    }
  }

  function nestedGet(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), obj);
  }

  function applyTranslations(lang) {
    const dict = (window.SOHAILA_I18N && window.SOHAILA_I18N[lang]) || {};
    const fallback = (window.SOHAILA_I18N && window.SOHAILA_I18N.en) || {};

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = nestedGet(dict, key) ?? nestedGet(fallback, key);
      if (value == null) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const value = nestedGet(dict, key) ?? nestedGet(fallback, key);
      if (value != null) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const value = nestedGet(dict, key) ?? nestedGet(fallback, key);
      if (value != null) el.innerHTML = value;
    });

    document.querySelectorAll(".lang-switcher button").forEach((btn) => {
      const pressed = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");
    });

    document.dispatchEvent(new CustomEvent("sohaila:langchange", { detail: { lang } }));
  }

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    setStoredLang(lang);
    applyTranslations(lang);
  }

  function init() {
    document.querySelectorAll(".lang-switcher button").forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
    });
    applyTranslations(getStoredLang());
  }

  window.SohailaI18n = { init, setLanguage, getStoredLang, applyTranslations };
})();

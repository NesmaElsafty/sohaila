/**
 * Bilingual i18n — EN default, full AR UI + body content (same meaning).
 */
(function () {
  const STORAGE_KEY = "sohaila-lang";
  const SUPPORTED = ["en", "ar"];

  const PAGE_BY_FILE = {
    "": "home",
    "index.html": "home",
    "about.html": "about",
    "expertise.html": "expertise",
    "portfolio.html": "portfolio",
    "results.html": "results",
    "testimonials.html": "testimonials",
    "contact.html": "contact",
  };

  const TEXT_SELECTORS = [
    "#main h1",
    "#main h2",
    "#main h3",
    "#main p",
    "#main li",
    "#main th",
    "#main .section__eyebrow",
    "#main .section__lead",
    "#main .section__desc",
    "#main .section__title",
    "#main .page-hero__title",
    "#main .hero__name",
    "#main .hero__title",
    "#main .hero__services",
    "#main .hero__tagline .part-a",
    "#main .hero__tagline .part-b",
    "#main .stat-card__label",
    "#main .card__title",
    "#main .card__text",
    "#main .process__title",
    "#main .cta-band__title",
    "#main .cta-band__lead",
    "#main .cta-band__desc",
    "#main .contact-channel__label",
    "#main .gallery-item__caption",
    "#main .portfolio-item__meta",
    "#main .tabs__tab",
    "#main .accordion__trigger",
    "#main .section-nav a",
    "#main .filter-bar [aria-label]",
    ".site-footer__brand-title",
    ".site-footer__brand-name",
    ".site-footer p",
    ".brand-logo__role",
  ].join(",");

  const HTML_SELECTORS = [
    "#main .accordion__panel > p:first-child",
    "#main [data-source-content] p > strong",
    "#main .card p",
    "#main .contact-channels + p",
    "#main p",
  ].join(",");

  let textMapCache = null;
  let htmlMapCache = null;

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
      /* ignore */
    }
  }

  function currentPageKey() {
    const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    return PAGE_BY_FILE[file] || "home";
  }

  function flattenStrings(node, out) {
    if (node == null) return;
    if (typeof node === "string") {
      const trimmed = node.trim();
      if (trimmed) out.push(node);
      return;
    }
    if (typeof node !== "object") return;
    Object.keys(node).forEach((key) => flattenStrings(node[key], out));
  }

  function buildPairMaps() {
    if (textMapCache && htmlMapCache) {
      return { textMap: textMapCache, htmlMap: htmlMapCache };
    }

    const enRoot = (window.SOHAILA_I18N && window.SOHAILA_I18N.en) || {};
    const arRoot = (window.SOHAILA_I18N && window.SOHAILA_I18N.ar) || {};
    const textMap = new Map();
    const htmlMap = new Map();

    function walk(enNode, arNode) {
      if (enNode == null || arNode == null) return;
      if (typeof enNode === "string" && typeof arNode === "string") {
        const enTrim = enNode.trim();
        const arTrim = arNode.trim();
        if (!enTrim) return;
        if (/<[a-z][\s\S]*>/i.test(enNode) || /<[a-z][\s\S]*>/i.test(arNode)) {
          htmlMap.set(enTrim, arNode);
          htmlMap.set(enNode, arNode);
        } else {
          textMap.set(enTrim, arTrim);
          /* Also map without weird spacing variants */
          textMap.set(enNode, arNode);
        }
        return;
      }
      if (typeof enNode !== "object" || typeof arNode !== "object") return;
      Object.keys(enNode).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(arNode, key)) {
          walk(enNode[key], arNode[key]);
        }
      });
    }

    walk(enRoot.pages, arRoot.pages);
    walk(enRoot.shared, arRoot.shared);
    walk(enRoot.portfolioCategories, arRoot.portfolioCategories);

    /* Role / category dictionaries keyed by English source */
    Object.keys(arRoot.portfolioRoles || {}).forEach((enKey) => {
      textMap.set(enKey.trim(), arRoot.portfolioRoles[enKey]);
    });
    Object.keys(arRoot.portfolioCategories || {}).forEach((catKey) => {
      const enVal = (enRoot.portfolioCategories || {})[catKey];
      const arVal = arRoot.portfolioCategories[catKey];
      if (typeof enVal === "string" && typeof arVal === "string") {
        textMap.set(enVal.trim(), arVal);
      }
    });

    /* Chrome strings also help reverse consistency for overlapping labels */
    walk(enRoot.nav, arRoot.nav);
    walk(enRoot.common, arRoot.common);
    walk(enRoot.footer, arRoot.footer);
    walk(enRoot.portfolio, arRoot.portfolio);

    textMapCache = textMap;
    htmlMapCache = htmlMap;
    return { textMap, htmlMap };
  }

  function normalizeSpace(str) {
    return String(str).replace(/\s+/g, " ").trim();
  }

  function translateTextValue(enText, lang, textMap) {
    if (lang === "en") return enText;
    const direct = textMap.get(enText) || textMap.get(enText.trim()) || textMap.get(normalizeSpace(enText));
    return direct != null ? direct : enText;
  }

  function rememberSrc(el, attr, value) {
    if (!el.hasAttribute(attr)) el.setAttribute(attr, value);
  }

  function canTranslateTextContent(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.closest("script, style, noscript, code, pre, a.contact-channel")) return false;
    if (el.hasAttribute("data-i18n") || el.hasAttribute("data-i18n-html")) return false;
    if (el.matches(".contact-channel__value, .stat-card__value, .process__num, .brand-logo__name")) return false;
    /* Skip nodes that wrap complex nested blocks (keep simple inline wrappers). */
    if (el.children.length) {
      return Array.from(el.children).every((child) =>
        ["BR", "WBR", "SPAN", "STRONG", "EM", "B", "I"].includes(child.tagName)
      );
    }
    return true;
  }

  function applyLeafText(lang) {
    const { textMap } = buildPairMaps();
    document.querySelectorAll(TEXT_SELECTORS).forEach((el) => {
      if (!canTranslateTextContent(el)) return;
      if (el.children.length) return; /* plain text only here; HTML handled separately */
      const raw = el.textContent;
      if (!raw || !raw.trim()) return;
      rememberSrc(el, "data-i18n-src", raw);
      const src = el.getAttribute("data-i18n-src");
      el.textContent = translateTextValue(src, lang, textMap);
    });
  }

  function applyHtmlFragments(lang) {
    const { htmlMap, textMap } = buildPairMaps();
    document.querySelectorAll("#main p, #main .card__text, #main li").forEach((el) => {
      if (el.hasAttribute("data-i18n") || el.hasAttribute("data-i18n-html")) return;
      if (!el.querySelector("strong, br, em")) return;
      const html = el.innerHTML.trim();
      if (!html) return;
      rememberSrc(el, "data-i18n-src-html", html);
      const src = el.getAttribute("data-i18n-src-html");
      if (lang === "en") {
        el.innerHTML = src;
        return;
      }
      if (htmlMap.has(src) || htmlMap.has(normalizeSpace(src))) {
        el.innerHTML = htmlMap.get(src) || htmlMap.get(normalizeSpace(src));
        return;
      }
      /* Fallback: translate text pieces around tags */
      const strong = el.querySelector("strong");
      if (strong) {
        rememberSrc(strong, "data-i18n-src", strong.textContent);
        strong.textContent = translateTextValue(strong.getAttribute("data-i18n-src"), lang, textMap);
      }
    });
  }

  function applyAltsAndLabels(lang) {
    const { textMap } = buildPairMaps();
    document.querySelectorAll("#main img[alt], .brand-logo img[alt]").forEach((img) => {
      const alt = img.getAttribute("alt") || "";
      if (!alt.trim()) return;
      rememberSrc(img, "data-i18n-alt", alt);
      const src = img.getAttribute("data-i18n-alt");
      img.setAttribute("alt", translateTextValue(src, lang, textMap));
    });

    document.querySelectorAll("#main nav.section-nav[aria-label], #main [role='tablist'][aria-label], #main .filter-bar[aria-label]").forEach((el) => {
      const label = el.getAttribute("aria-label") || "";
      if (!label.trim()) return;
      rememberSrc(el, "data-i18n-aria-src", label);
      const src = el.getAttribute("data-i18n-aria-src");
      el.setAttribute("aria-label", translateTextValue(src, lang, textMap));
    });
  }

  function applyDocumentMeta(lang) {
    const page = currentPageKey();
    const title = t(`pages.${page}.docTitle`, lang);
    if (title && title !== `pages.${page}.docTitle`) document.title = title;
    const desc = t(`pages.${page}.metaDescription`, lang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta && desc && desc !== `pages.${page}.metaDescription`) meta.setAttribute("content", desc);
  }

  function applySourceRegionDirs(lang) {
    document.querySelectorAll("[data-source-content]").forEach((el) => {
      if (lang === "ar") {
        el.setAttribute("lang", "ar");
        el.setAttribute("dir", "rtl");
      } else {
        el.setAttribute("lang", "en");
        el.setAttribute("dir", "ltr");
      }
    });
  }

  function translatePortfolioMeta(lang) {
    const roles = ((window.SOHAILA_I18N || {})[lang] || {}).portfolioRoles || {};
    const rolesEn = ((window.SOHAILA_I18N || {}).en || {}).portfolioRoles || {};
    const cats = ((window.SOHAILA_I18N || {})[lang] || {}).portfolioCategories || {};
    const catsEn = ((window.SOHAILA_I18N || {}).en || {}).portfolioCategories || {};

    document.querySelectorAll(".portfolio-item__meta").forEach((el) => {
      rememberSrc(el, "data-i18n-src", el.getAttribute("data-i18n-src") || el.textContent.trim());
      const src = el.getAttribute("data-i18n-src");
      if (lang === "en") {
        el.textContent = src;
        return;
      }
      if (roles[src]) {
        el.textContent = roles[src];
        return;
      }
      /* Category echo descriptions */
      const catKey = Object.keys(catsEn).find((k) => catsEn[k] === src);
      if (catKey && cats[catKey]) {
        el.textContent = cats[catKey];
        return;
      }
      const { textMap } = buildPairMaps();
      el.textContent = translateTextValue(src, lang, textMap);
    });
  }

  function translatePatternCaptions(lang) {
    const { textMap } = buildPairMaps();
    document.querySelectorAll(".gallery-item__caption, [data-caption]").forEach((el) => {
      const isAttr = el.hasAttribute("data-caption");
      const value = isAttr ? el.getAttribute("data-caption") : el.textContent;
      if (!value) return;
      const attr = isAttr ? "data-i18n-caption-src" : "data-i18n-src";
      rememberSrc(el, attr, el.getAttribute(attr) || value);

      const src = el.getAttribute(attr);
      let next = src;
      if (lang === "ar") {
        const mEvidence = src.match(/^Results evidence\s+(\d+)$/i);
        const mTestimony = src.match(/^Testimonial\s+(\d+)$/i);
        if (mEvidence) next = `دليل النتائج ${mEvidence[1]}`;
        else if (mTestimony) next = `شهادة ${mTestimony[1]}`;
        else next = translateTextValue(src, lang, textMap);
      }
      if (isAttr) {
        el.setAttribute("data-caption", next);
        const captionEl = el.querySelector(".gallery-item__caption");
        if (captionEl) captionEl.textContent = next;
      } else {
        el.textContent = next;
      }
    });
  }

  function applyBodyContent(lang) {
    applyLeafText(lang);
    applyHtmlFragments(lang);
    applyAltsAndLabels(lang);
    applyDocumentMeta(lang);
    applySourceRegionDirs(lang);
    translatePortfolioMeta(lang);
    translatePatternCaptions(lang);
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

    applyBodyContent(lang);
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

  function translateDescription(desc, lang) {
    if (!desc) return desc;
    const active = lang || getStoredLang();
    if (active === "en") return desc;
    const roles = ((window.SOHAILA_I18N || {}).ar || {}).portfolioRoles || {};
    if (roles[desc]) return roles[desc];
    const catsAr = ((window.SOHAILA_I18N || {}).ar || {}).portfolioCategories || {};
    const catsEn = ((window.SOHAILA_I18N || {}).en || {}).portfolioCategories || {};
    const catKey = Object.keys(catsEn).find((k) => catsEn[k] === desc);
    if (catKey && catsAr[catKey]) return catsAr[catKey];
    const { textMap } = buildPairMaps();
    return translateTextValue(desc, active, textMap);
  }

  window.SohailaI18n = {
    init,
    setLanguage,
    getStoredLang,
    applyTranslations,
    t,
    translateDescription,
    applyBodyContent,
  };
})();

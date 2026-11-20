from pathlib import Path

root = Path(r"D:\Projects\Sohaila")
needle = '<script src="assets/js/translations.js"></script>\n  <script src="assets/js/i18n.js"></script>'
insert = (
    '<script src="assets/js/translations.js"></script>\n'
    '  <script src="assets/js/page-content.js"></script>\n'
    '  <script src="assets/js/i18n.js"></script>'
)

for name in ["index", "about", "expertise", "portfolio", "results", "testimonials", "contact"]:
    path = root / f"{name}.html"
    text = path.read_text(encoding="utf-8")
    if "page-content.js" in text:
        print(name, "already")
        continue
    if needle not in text:
        print(name, "PATTERN MISSING")
        idx = text.find("translations.js")
        print(repr(text[max(0, idx - 30) : idx + 140]))
        continue
    path.write_text(text.replace(needle, insert, 1), encoding="utf-8")
    print(name, "updated")

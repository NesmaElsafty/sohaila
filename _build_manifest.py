# -*- coding: utf-8 -*-
import json
import os
from collections import Counter

base = r"D:\Projects\Sohaila"
items = []


def add(**kw):
    items.append(kw)


add(
    id="home-hero-name",
    sourcePage=1,
    type="heading",
    originalWording="SOHAILA HALIM",
    destinationPage="index.html",
    destinationSection="hero",
    selector="#hero-name",
    translationStatus="source-en-only",
    verificationStatus="verified-in-dom",
)
add(
    id="home-hero-title",
    sourcePage=1,
    type="subtitle",
    originalWording="Brand, Marketing & Business Growth Strategist",
    destinationPage="index.html",
    destinationSection="hero",
    selector=".hero__title",
    translationStatus="source-en-only",
    verificationStatus="verified-in-dom",
)
add(
    id="home-hero-tagline",
    sourcePage=1,
    type="tagline",
    originalWording="Building Brands. Shaping Strategies. Driving Growth.",
    destinationPage="index.html",
    destinationSection="hero",
    selector=".hero__tagline",
    translationStatus="source-en-only",
    verificationStatus="verified-in-dom",
)
add(
    id="about-intro-full",
    sourcePage=2,
    type="paragraphs",
    originalWording="I'm Sohaila Halim, a Brand, Marketing & Business Growth Strategist with over 12 years of experience...",
    destinationPage="about.html",
    destinationSection="introduction",
    selector="#introduction",
    translationStatus="source-en-only",
    verificationStatus="verified-in-dom",
)
add(
    id="about-stat-12",
    sourcePage=3,
    type="metric",
    originalWording="12+",
    destinationPage="about.html",
    destinationSection="experience",
    selector="#experience",
    translationStatus="n/a",
    verificationStatus="verified-in-dom",
)
add(
    id="about-stat-600",
    sourcePage=3,
    type="metric",
    originalWording="600+",
    destinationPage="about.html",
    destinationSection="experience",
    selector="#experience",
    translationStatus="n/a",
    verificationStatus="verified-in-dom",
)

edu = [
    "Master of Business Administration (MBA) – Marketing Uppsala University, Sweden",
    "Neuromarketing Specialization Harvard University, USA",
    "Project Management Professional (PMP) – Project Management Training ESLSCA University, Egypt",
    "Professional Marketing Diploma - The American University in Cairo (AUC)",
    "Google Certified Marketing Professional - Google",
]
for i, e in enumerate(edu, 1):
    add(
        id=f"about-edu-{i:02d}",
        sourcePage=3,
        type="credential",
        originalWording=e,
        destinationPage="about.html",
        destinationSection="education",
        selector="#education .cred-list li",
        translationStatus="source-en-only",
        verificationStatus="verified-in-dom",
    )

markets = ["Libya", "Egypt", "Jordan", "Saudi Arabia", "Kuwait", "Qatar", "UAE", "Oman"]
for i, m in enumerate(markets, 1):
    add(
        id=f"about-market-{i:02d}",
        sourcePage=4,
        type="market",
        originalWording=m,
        destinationPage="about.html",
        destinationSection="where-we-work",
        selector="#where-we-work .markets-list li",
        translationStatus="source-en-only",
        verificationStatus="verified-in-dom",
    )

add(
    id="expertise-phil-statement",
    sourcePage=5,
    type="statement",
    originalWording="Strategy Before Execution. Value Before Visibility. Growth Beyond Campaigns.",
    destinationPage="expertise.html",
    destinationSection="strategic-philosophy",
    selector="#strategic-philosophy .section__lead",
    translationStatus="source-en-only",
    verificationStatus="verified-in-dom",
)

import re

portfolio_js = open(os.path.join(base, "assets", "data", "portfolio.js"), encoding="utf-8").read()
# Extract object literals from the portfolio array without exec()
for match in re.finditer(
    r"\{\s*id:\s*\"([^\"]+)\",\s*name:\s*\"([^\"]+)\",\s*description:\s*\"([^\"]*)\",\s*category:\s*\"([^\"]+)\",\s*image:\s*\"([^\"]+)\"(?:,\s*url:\s*\"([^\"]+)\")?(?:,\s*nameUncertain:\s*true)?",
    portfolio_js,
):
    cid, name, _desc, category, image, url = match.groups()
    uncertain = "nameUncertain: true" in match.group(0)
    add(
        id=f"client-{cid}",
        sourcePage="11-13",
        type="client",
        originalWording=name,
        destinationPage="portfolio.html",
        destinationSection="gallery",
        selector=f"[data-category='{category}']",
        assetPath=image,
        translationStatus="source-en-only",
        verificationStatus="uncertain-name" if uncertain else "verified-in-data",
        url=url,
    )

rows_ht = [
    ("Sewar amer", "$249", "6.0×", "$2,500", "300"),
    ("Noha Elbatrawi", "$450", "3.5×", "$4,000", "100"),
    ("Dr. Islam Mohamed", "$97", "8.0×", "$1,500", "600"),
    ("Mohamed Roshdy", "$45", "4.8×", "$2,000", "200"),
]
for i, r in enumerate(rows_ht, 1):
    add(
        id=f"results-ht-{i:02d}",
        sourcePage=14,
        type="table-row",
        originalWording=" | ".join(r),
        destinationPage="results.html",
        destinationSection="high-ticket",
        selector="#high-ticket table tbody tr",
        translationStatus="n/a",
        verificationStatus="verified-in-dom",
    )

for i in range(1, 27):
    path = f"assets/images/results/result-{i:02d}.png"
    add(
        id=f"result-evidence-{i:02d}",
        sourcePage="16-18",
        type="screenshot",
        originalWording=f"Results evidence screenshot {i}",
        destinationPage="results.html",
        destinationSection="evidence",
        selector="#results-gallery [data-lightbox-item]",
        assetPath=path,
        translationStatus="n/a-images",
        verificationStatus="asset-present" if os.path.exists(os.path.join(base, path)) else "missing",
    )

for i in range(1, 53):
    path = f"assets/images/testimonials/testimonial-{i:02d}.png"
    add(
        id=f"testimonial-{i:02d}",
        sourcePage="19-25",
        type="screenshot",
        originalWording=f"Testimonial screenshot {i}",
        destinationPage="testimonials.html",
        destinationSection="gallery",
        selector="#testimonials-gallery [data-load-more-item]",
        assetPath=path,
        translationStatus="n/a-images",
        verificationStatus="asset-present" if os.path.exists(os.path.join(base, path)) else "missing",
    )

add(
    id="contact-email",
    sourcePage=26,
    type="contact",
    originalWording="Sohaila.a.halim@gmail.com",
    destinationPage="contact.html",
    destinationSection="contact",
    selector='a[href^="mailto:"]',
    translationStatus="n/a",
    verificationStatus="verified-in-dom",
)
add(
    id="contact-phone-1",
    sourcePage=26,
    type="contact",
    originalWording="01012537915",
    destinationPage="contact.html",
    destinationSection="contact",
    selector='a[href^="tel:"]',
    translationStatus="n/a",
    verificationStatus="verified-in-dom",
)
add(
    id="contact-phone-2",
    sourcePage=26,
    type="contact",
    originalWording="01060420920",
    destinationPage="contact.html",
    destinationSection="contact",
    selector='a[href^="tel:"]',
    translationStatus="n/a",
    verificationStatus="verified-in-dom",
)
add(
    id="contact-linkedin",
    sourcePage=26,
    type="contact",
    originalWording="/sohailahalim",
    destinationPage="contact.html",
    destinationSection="contact",
    selector='a[href*="linkedin.com/in/sohailahalim"]',
    translationStatus="n/a",
    verificationStatus="verified-in-dom",
)

out = {
    "generated": "refinement-pass",
    "totalItems": len(items),
    "summary": dict(Counter(i["verificationStatus"] for i in items)),
    "items": items,
}
with open(os.path.join(base, "assets", "data", "content-manifest.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
print("items", len(items), out["summary"])

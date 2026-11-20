# -*- coding: utf-8 -*-
import os
import shutil
import json
from PIL import Image
import fitz

base = r"D:\Projects\Sohaila"
assets = os.path.join(base, "assets", "images")

dirs = [
    "hero",
    "brand",
    "about",
    "clients/personal",
    "clients/corporate",
    "clients/care-beauty",
    "clients/healthcare",
    "clients/real-estate",
    "clients/government",
    "clients/startups",
    "results",
    "testimonials",
    "markets",
    "expertise",
]
for d in dirs:
    os.makedirs(os.path.join(assets, d), exist_ok=True)

# Brand assets
shutil.copy(
    os.path.join(assets, "sections assets", "hero.png"),
    os.path.join(assets, "hero", "sohaila-hero.png"),
)
shutil.copy(
    os.path.join(assets, "sections assets", "light logo.png"),
    os.path.join(assets, "brand", "logo-light.png"),
)
shutil.copy(
    os.path.join(assets, "sections assets", "dark logo.png"),
    os.path.join(assets, "brand", "logo-dark.png"),
)
shutil.copy(
    os.path.join(assets, "sections assets", "brand guide line.png"),
    os.path.join(assets, "brand", "brand-guideline.png"),
)

page4 = Image.open(os.path.join(assets, "_pdf_pages", "page04.png"))
map_crop = page4.crop((80, 520, 2800, 1450))
map_crop.save(os.path.join(assets, "about", "multi-market-map.png"))

page2 = Image.open(os.path.join(assets, "_pdf_pages", "page02.png"))
about_portrait = page2.crop((1450, 180, 2750, 1500))
about_portrait.save(os.path.join(assets, "about", "sohaila-about.png"))

pdf_ext = os.path.join(assets, "_pdf_extract")
for i, name in enumerate(
    ["business-first", "cross-industry", "integrated-perspective", "strategy-execution"]
):
    src = os.path.join(pdf_ext, f"page15_img{i:02d}.png")
    if os.path.exists(src):
        shutil.copy(src, os.path.join(assets, "about", f"why-{name}.png"))

for i in range(6):
    src = os.path.join(pdf_ext, f"page06_img{i:02d}.png")
    if os.path.exists(src):
        shutil.copy(src, os.path.join(assets, "expertise", f"audience-{i+1:02d}.png"))

for i in range(4):
    src = os.path.join(pdf_ext, f"page09_img{i:02d}.png")
    if os.path.exists(src):
        shutil.copy(src, os.path.join(assets, "expertise", f"specialized-{i+1:02d}.png"))

ri = 0
for page_n in range(16, 19):
    for j in range(20):
        src = os.path.join(pdf_ext, f"page{page_n:02d}_img{j:02d}.png")
        if os.path.exists(src):
            ri += 1
            shutil.copy(src, os.path.join(assets, "results", f"result-{ri:02d}.png"))
print(f"Results images: {ri}")

ti = 0
for page_n in range(19, 26):
    for j in range(20):
        src = os.path.join(pdf_ext, f"page{page_n:02d}_img{j:02d}.png")
        if os.path.exists(src):
            ti += 1
            shutil.copy(
                src, os.path.join(assets, "testimonials", f"testimonial-{ti:02d}.png")
            )
print(f"Testimonial images: {ti}")

personal_clients = [
    "aya-mamdouh",
    "dr-nour",
    "mohamed-roshdy",
    "noha-el-batrawi",
    "randa-azar",
    "sewar-amer",
    "eleonora-attar",
    "lina-bayazid",
    "ghizlan-guenez",
    "yamankunbargi25",
    "dr-islam-mohamed",
    "luciana-habib",
    "rajaeibahaj",
    "dr-ramy-saeed",
    "dr-rami-nakhla",
    "dr-abdallah-shaheer",
    "mohamed-abouelregal",
    "dr-karim-sayed",
    "nilly-shams",
    "dr-mahmoud-sayed",
    "sherif-helal",
    "ahmed-darwish",
    "sole-fine-works",
]

doc = fitz.open(os.path.join(base, "Suhaila Portfolio 7-11-2026.pdf"))
page = doc[10]
imgs = page.get_images(full=True)
image_list = []
for j, img in enumerate(imgs):
    xref = img[0]
    rects = page.get_image_rects(xref)
    if rects:
        r = rects[0]
        image_list.append((r.y0, r.x0, j, xref))
image_list.sort()
print(f"Page11 sorted images: {len(image_list)}")

for idx, (y, x, j, xref) in enumerate(image_list):
    if idx >= len(personal_clients):
        break
    src = os.path.join(pdf_ext, f"page11_img{j:02d}.png")
    dst = os.path.join(assets, "clients", "personal", f"{personal_clients[idx]}.png")
    if os.path.exists(src):
        shutil.copy(src, dst)
        print(f"  {personal_clients[idx]} <- img{j:02d} @ ({x:.0f},{y:.0f})")

# Page 12 logos - category by y rows
page = doc[11]
imgs = page.get_images(full=True)
image_list = []
for j, img in enumerate(imgs):
    xref = img[0]
    rects = page.get_image_rects(xref)
    if rects:
        r = rects[0]
        image_list.append((round(r.y0), round(r.x0), j, xref, round(r.width), round(r.height)))
image_list.sort()
print("\nPage12 logos by position:")
for item in image_list:
    print(f"  img{item[2]:02d} @ ({item[1]},{item[0]}) {item[4]}x{item[5]}")

# Group by y bands
ys = sorted(set(i[0] for i in image_list))
print("Y values:", ys)

# Approximate row assignment by clustering y
rows = []
current = []
last_y = None
for item in image_list:
    y = item[0]
    if last_y is None or abs(y - last_y) < 40:
        current.append(item)
    else:
        rows.append(sorted(current, key=lambda t: t[1]))
        current = [item]
    last_y = y
if current:
    rows.append(sorted(current, key=lambda t: t[1]))

corporate_names = ["kelloggs", "lexus", "talabat", "wuuzz"]
care_names = [
    "alejon",
    "avene",
    "bioderma",
    "dear-skin-care",
    "kitti-mom-kids",
    "kitti",
    "myvi",
    "now-egypt",
    "nutrascience",
    "ts-beauty-shop",
    "vabilla",
]
health_names = [
    "healthcare-01",
    "almehwar-hospital",
    "el-nada-hospital",
    "my-child-center",
    "qaitbay-hospital",
    "rofayda-hospital",
    "healthcare-07",
]

print(f"\nPage12 rows: {len(rows)} counts={[len(r) for r in rows]}")
row_maps = [
    ("corporate", corporate_names),
    ("care-beauty", care_names),
    ("healthcare", health_names),
]
for ri, row in enumerate(rows[:3]):
    cat, names = row_maps[ri]
    for ni, item in enumerate(row):
        j = item[2]
        name = names[ni] if ni < len(names) else f"{cat}-{ni+1:02d}"
        src = os.path.join(pdf_ext, f"page12_img{j:02d}.png")
        dst = os.path.join(assets, "clients", cat, f"{name}.png")
        if os.path.exists(src):
            shutil.copy(src, dst)
            print(f"  {cat}/{name} <- img{j:02d}")

# Page 13
page = doc[12]
imgs = page.get_images(full=True)
image_list = []
for j, img in enumerate(imgs):
    xref = img[0]
    rects = page.get_image_rects(xref)
    if rects:
        r = rects[0]
        # skip very small decorative images
        if r.width < 40 or r.height < 40:
            continue
        image_list.append((round(r.y0), round(r.x0), j, xref, round(r.width), round(r.height)))
image_list.sort()
print("\nPage13 logos by position:")
for item in image_list:
    print(f"  img{item[2]:02d} @ ({item[1]},{item[0]}) {item[4]}x{item[5]}")

rows = []
current = []
last_y = None
for item in image_list:
    y = item[0]
    if last_y is None or abs(y - last_y) < 35:
        current.append(item)
    else:
        rows.append(sorted(current, key=lambda t: t[1]))
        current = [item]
    last_y = y
if current:
    rows.append(sorted(current, key=lambda t: t[1]))

print(f"Page13 rows: {len(rows)} counts={[len(r) for r in rows]}")

re_names = [
    "vento",
    "hs-real-estate",
    "masters",
    "seredo",
    "sole-fine-works",
    "d-logo",
    "kayan",
    "creative-interiors",
    "maven",
    "marseille-group",
]
gov_names = [
    "government-01",
    "government-02",
    "government-03",
    "government-04",
    "sada-al-wadi",
    "government-06",
]
startup_names = [
    "dinamo",
    "plastihub",
    "plasti-co-pack",
    "qatar-filters",
    "wingoo",
    "al-malakiya",
    "noa",
    "startup-08",
    "mzad-arab",
    "arab-downtown",
    "fahim",
    "the-pro-english",
    "startup-13",
    "royal-pet",
    "first-vet",
    "royal-vet-clinic",
    "first-rider",
]

# Page13 may have more row clusters due to startup wrapping
# Merge small adjacent rows into categories by expected counts
all_logos = []
for row in rows:
    all_logos.extend(row)

# Filter out tiny overlays (flag badges etc) - already filtered
# Assign by y bands manually based on printed y values
re_y_max = None
if rows:
    # First row cluster = real estate
    pass

# Heuristic: real estate ~10, gov ~6, startups rest
assigned = 0
# Use first row as RE if ~10 items
cat_files = []
if len(rows) >= 1:
    re_row = rows[0]
    for ni, item in enumerate(re_row):
        name = re_names[ni] if ni < len(re_names) else f"real-estate-{ni+1:02d}"
        cat_files.append(("real-estate", name, item[2]))

# Find gov and startups among remaining
remaining = []
for row in rows[1:]:
    remaining.append(row)

# Flatten remaining and split: first ~6 gov, rest startups - or by row sizes
flat_remain = []
for row in remaining:
    flat_remain.extend(row)

# If second row looks like gov (~6)
if len(remaining) >= 1 and 4 <= len(remaining[0]) <= 8:
    for ni, item in enumerate(remaining[0]):
        name = gov_names[ni] if ni < len(gov_names) else f"government-{ni+1:02d}"
        cat_files.append(("government", name, item[2]))
    startup_items = []
    for row in remaining[1:]:
        startup_items.extend(row)
else:
    # first 6 remaining = gov
    for ni, item in enumerate(flat_remain[:6]):
        name = gov_names[ni] if ni < len(gov_names) else f"government-{ni+1:02d}"
        cat_files.append(("government", name, item[2]))
    startup_items = flat_remain[6:]

if "startup_items" not in dir() or startup_items is None:
    startup_items = []

for ni, item in enumerate(startup_items):
    name = startup_names[ni] if ni < len(startup_names) else f"startup-{ni+1:02d}"
    cat_files.append(("startups", name, item[2]))

for cat, name, j in cat_files:
    src = os.path.join(pdf_ext, f"page13_img{j:02d}.png")
    dst = os.path.join(assets, "clients", cat, f"{name}.png")
    if os.path.exists(src):
        shutil.copy(src, dst)
        print(f"  {cat}/{name} <- img{j:02d}")

# Contact portrait page 26
src = os.path.join(pdf_ext, "page26_img00.png")
if os.path.exists(src):
    shutil.copy(src, os.path.join(assets, "about", "sohaila-contact.png"))

# Page 3 credentials portrait if useful
src = os.path.join(pdf_ext, "page03_img00.png")
if os.path.exists(src):
    shutil.copy(src, os.path.join(assets, "about", "sohaila-credentials.png"))

print("\nDone organizing assets")
print("Personal:", len(os.listdir(os.path.join(assets, "clients", "personal"))))
for cat in ["corporate", "care-beauty", "healthcare", "real-estate", "government", "startups"]:
    p = os.path.join(assets, "clients", cat)
    print(f"{cat}:", len(os.listdir(p)) if os.path.exists(p) else 0)

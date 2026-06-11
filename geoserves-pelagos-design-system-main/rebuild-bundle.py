#!/usr/bin/env python3
"""
rebuild-bundle.py
Rebuilds pages/bundle.js from every *.html file in pages/.
Also increments the ?v= cache-buster on bundle.js in index.html so browsers
always load the latest bundle after every rebuild.

Run this after adding or editing ANY page HTML file.

Usage:
  python3 rebuild-bundle.py
"""
import os, re

ROOT_DIR    = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR   = os.path.join(ROOT_DIR, "pages")
BUNDLE_PATH = os.path.join(PAGES_DIR, "bundle.js")
INDEX_PATH  = os.path.join(ROOT_DIR, "index.html")

HEADER = "(function(){\n  window.PAGES_BUNDLE = window.PAGES_BUNDLE || {};"
FOOTER = "})();"

# ── 1. Build bundle ───────────────────────────────────────────────────────────
page_files = sorted([
    f[:-5] for f in os.listdir(PAGES_DIR)
    if f.endswith(".html") and not f.startswith("bundle")
])

lines = [HEADER]
for key in page_files:
    html_path = os.path.join(PAGES_DIR, key + ".html")
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    escaped = (html
        .replace("\\", "\\\\")
        .replace('"',  '\\"')
        .replace("\r", "")
        .replace("\n", "\\n"))
    lines.append(f'  window.PAGES_BUNDLE["{key}"] = "{escaped}";')

lines.append(FOOTER)
bundle = "\n".join(lines)

with open(BUNDLE_PATH, "w", encoding="utf-8") as f:
    f.write(bundle)

print(f"✅ bundle.js rebuilt — {len(page_files)} pages, {len(bundle):,} chars")

# ── 2. Bump ?v= in index.html so browsers never serve a stale bundle ──────────
with open(INDEX_PATH, "r", encoding="utf-8") as f:
    index = f.read()

def bump_version(match):
    new_v = int(match.group(1)) + 1
    return match.group(0).replace(f"?v={match.group(1)}", f"?v={new_v}")

# Only bump bundle.js version (not patch/toast/script)
new_index, count = re.subn(r'bundle\.js\?v=(\d+)', bump_version, index)

if count:
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        f.write(new_index)
    # Extract the new version number to display
    m = re.search(r'bundle\.js\?v=(\d+)', new_index)
    print(f"✅ index.html bundle.js version bumped to ?v={m.group(1)}")
else:
    print("⚠️  Could not find bundle.js?v= in index.html — version not bumped")

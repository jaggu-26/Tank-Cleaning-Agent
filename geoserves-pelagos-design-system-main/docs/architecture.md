# Architecture

## Overview

Pelagos is structured around three layers that map directly to how designers and developers think about a UI system:

```
┌──────────────────────────────────────┐
│           DOCUMENTATION              │  pages/ + docs/
├──────────────────────────────────────┤
│           COMPONENTS                 │  components/
│  primitives · panels · navigations   │
├──────────────────────────────────────┤
│           FOUNDATIONS                │  foundations/
│  colors · typography · spacing       │
└──────────────────────────────────────┘
```

---

## Layer 1 — Foundations (`foundations/`)

Raw design tokens. Nothing here knows about components.

| File              | Contains                                        |
| ----------------- | ----------------------------------------------- |
| `colors.css`      | All primitive color scales + semantic aliases   |
| `typography.css`  | Font families, sizes, weights, line heights     |
| `spacing.css`     | 4px-grid spacing, border radii, elevation       |
| `index.css`       | Re-exports all three via `@import`              |

### Token tiers

Tokens are organised in three tiers to separate raw values from intent:

```
Tier 1  Primitive  --prim-blue-500: #2463eb
Tier 2  Semantic   --color-brand: var(--prim-marine)
Tier 3  Component  --btn-primary-bg: var(--color-brand)
```

Component tokens live inside each component's `.scss` file, not in `foundations/`.

---

## Layer 2 — Components (`components/`)

Self-contained React components. Each component lives in its own folder:

```
components/primitives/button/
├── Button.jsx     React component
├── Button.scss    Scoped styles (uses foundation tokens)
└── README.md      Props, usage, and design reference
```

### Category breakdown

| Category        | Path                          | Examples                              |
| --------------- | ----------------------------- | ------------------------------------- |
| Primitives      | `components/primitives/`      | Button, Input, Badge, Checkbox, Card  |
| Panels          | `components/panels/`          | Modal, Slideout, Popover              |
| Navigations     | `components/navigations/`     | Tabs, Pagination                      |

All components are exported from `components/index.js` for convenient single-import access.

---

## Layer 3 — Documentation

| Path              | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `pages/*.html`    | Live interactive documentation, loaded by the viewer |
| `docs/*.md`       | Developer guides (architecture, tokens, contributing)|
| `index.html`      | The documentation viewer shell                       |
| `script.js`       | Navigation, search, and page-loading logic           |
| `styles.css`      | Viewer shell styles + all token definitions          |

The viewer fetches pages on demand from `pages/` via `navigate(pageId)`. Search is powered by an in-memory index (`SEARCH_INDEX`) in `script.js`.

---

## Naming conventions

| Thing              | Convention          | Example                    |
| ------------------ | ------------------- | -------------------------- |
| Component folder   | lowercase kebab     | `primitives/button/`       |
| Component file     | PascalCase          | `Button.jsx`               |
| SCSS file          | PascalCase          | `Button.scss`              |
| CSS custom props   | kebab with prefix   | `--btn-primary-bg`         |
| Documentation page | prefix + kebab      | `prim-buttons.html`        |

Page filename prefixes used in `pages/`:

| Prefix   | Category      |
| -------- | ------------- |
| `found-` | Foundations   |
| `prim-`  | Primitives    |
| `panel-` | Panels        |
| `nav-`   | Navigations   |
| `form-`  | Forms         |
| `view-`  | Views         |

---

## Data flow in the viewer

```
User clicks sidebar item
  → navigate(pageId)         [script.js]
  → fetch pages/{id}.html    [server or PAGES_BUNDLE]
  → inject into #page-content
  → run PAGE_INITS[id]()     (page-specific JS, e.g. colour renderer)
```

Search works entirely client-side via `SEARCH_INDEX` — no server needed.

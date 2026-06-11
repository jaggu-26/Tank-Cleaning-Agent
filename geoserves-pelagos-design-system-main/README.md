# Pelagos Design System

**v1.0.0** · Geoserves Maritime Operations

Pelagos is the shared design language for Geoserves products. It provides design tokens, a React component library, and live HTML documentation — everything a team needs to build consistent, accessible maritime interfaces.

---

## Repository structure

```
geoserves-pelagos-design-system/
│
├── foundations/                  Design tokens (CSS custom properties)
│   ├── colors.css                Color scales — primitive + semantic
│   ├── typography.css            Font families, sizes, weights
│   ├── spacing.css               4px-grid spacing, radii, elevation
│   └── index.css                 Single @import entry point
│
├── components/                   React component library
│   ├── primitives/               Atomic UI elements
│   │   ├── button/               Button.jsx · Button.scss · README.md
│   │   ├── input/                Input.jsx · Input.scss · README.md
│   │   ├── badge/                Badge.jsx · Badge.scss · README.md
│   │   ├── banners/              Banner.jsx · Banner.scss · README.md
│   │   ├── cards/                Card.jsx · Card.scss · README.md
│   │   ├── checkbox/             Checkbox.jsx · Checkbox.scss · README.md
│   │   ├── chips/                Chip.jsx · Chip.scss · README.md
│   │   ├── accordion/            Accordion.jsx · Accordion.scss · README.md
│   │   ├── dropdown/             Dropdown.jsx · Dropdown.scss · README.md
│   │   ├── radio/                Radio.jsx · Radio.scss · README.md
│   │   ├── search/               Search.jsx · Search.scss · README.md
│   │   ├── slider/               Slider.jsx · Slider.scss · README.md
│   │   ├── toast/                Toast.jsx · Toast.scss · README.md
│   │   ├── toggle/               Toggle.jsx · Toggle.scss · README.md
│   │   └── tooltip/              Tooltip.jsx · Tooltip.scss · README.md
│   │
│   ├── panels/                   Overlay and contextual panels
│   │   ├── modal/                Modal.jsx · Modal.scss · README.md
│   │   ├── slideout/             Slideout.jsx · Slideout.scss · README.md
│   │   ├── popover/              Popover.jsx · Popover.scss · README.md
│   │   └── notifications/        NotificationPanel.jsx · README.md
│   │
│   ├── navigations/              Navigation patterns
│   │   ├── tabs/                 Tabs.jsx · Tabs.scss · README.md
│   │   └── pagination/           Pagination.jsx · Pagination.scss · README.md
│   │
│   └── index.js                  Barrel export — all components
│
├── pages/                        Live HTML documentation pages (viewer)
│   ├── found-color.html          Colour palette
│   ├── found-typography.html     Typography
│   ├── found-tokens.html         Design tokens
│   ├── prim-buttons.html         Button docs
│   ├── prim-textfields.html      Input / Text field docs
│   ├── panel-modals.html         Modal docs
│   ├── panel-slideout.html       Slideout docs
│   └── …                         (40+ pages total)
│
├── docs/                         Developer guides
│   ├── getting-started.md        Setup and first use
│   ├── architecture.md           How the system is structured
│   ├── tokens.md                 Full token reference
│   └── contributing.md           Adding / modifying components
│
├── Assets/                       Static assets
│   ├── Figma/                    Source Figma file
│   ├── illustrations/            Product illustration SVGs
│   ├── images/                   Photography and raster assets
│   └── …                         Fonts, audio, logo SVGs
│
├── index.html                    Documentation viewer shell
├── styles.css                    Viewer styles + all token definitions
├── script.js                     Viewer navigation, search, page loader
├── DS_PAGE_SPEC.md               Page specification reference
└── .gitignore
```

---

## Quick start

### View the documentation

```bash
npx serve .
# → http://localhost:3000
```

Or open `index.html` directly in your browser (uses bundled page content).

### Use the design tokens

```css
/* Global CSS / entry point */
@import 'foundations/index.css';
```

### Use the components

```jsx
import { Button, Input, Modal } from '@pelagos/components';

<Button variant="primary" size="md">Save port call</Button>
<Input label="Vessel name" placeholder="MV Oceanic Dawn" />
```

---

## Design resources

- [Figma file](https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=9801-15431) — all components and foundations
- [Getting started guide](./docs/getting-started.md)
- [Token reference](./docs/tokens.md)
- [Contributing guide](./docs/contributing.md)

---

## Component status

| Component          | Figma | Tokens | React | Docs |
| ------------------ | :---: | :----: | :---: | :--: |
| Button             | ✅    | ✅     | ✅    | ✅   |
| Input (Text Field) | ✅    | ✅     | ✅    | ✅   |
| Badge              | ✅    | ✅     | ✅    | ✅   |
| Banner             | ✅    | ✅     | ✅    | ✅   |
| Card               | ✅    | ✅     | ✅    | ✅   |
| Checkbox           | ✅    | ✅     | ✅    | ✅   |
| Chip               | ✅    | ✅     | ✅    | ✅   |
| Accordion          | ✅    | ✅     | ✅    | ✅   |
| Dropdown           | ✅    | ✅     | ✅    | ✅   |
| Radio              | ✅    | ✅     | ✅    | ✅   |
| Search             | ✅    | ✅     | ✅    | ✅   |
| Slider             | ✅    | ✅     | ✅    | ✅   |
| Toast              | ✅    | ✅     | ✅    | ✅   |
| Toggle             | ✅    | ✅     | ✅    | ✅   |
| Tooltip            | ✅    | ✅     | ✅    | ✅   |
| Modal              | ✅    | ✅     | ✅    | ✅   |
| Slideout           | ✅    | ✅     | ✅    | ✅   |
| Popover            | ✅    | ✅     | ✅    | ✅   |
| Notification Panel | ✅    | ✅     | ✅    | ✅   |
| Tabs               | ✅    | ✅     | ✅    | ✅   |
| Pagination         | ✅    | ✅     | ✅    | ✅   |

---

Maintained by the Geoserves product team · `designdesk@geoserves.com`

# Design Tokens Reference

All tokens are CSS custom properties defined in `foundations/`. They follow a three-tier model.

## Quick import

```css
@import 'foundations/index.css';
```

---

## Color tokens (`foundations/colors.css`)

### Primitive colors — `--prim-{color}-{step}`

Steps run from `10` (lightest) to `900` (darkest).

| Scale   | Brand use                          |
| ------- | ---------------------------------- |
| `blue`  | Primary brand, interactive         |
| `red`   | Danger, errors                     |
| `green` | Success, confirmed                 |
| `yellow`| Warning, caution                   |
| `orange`| Alerts, highlight                  |
| `grey`  | Text, borders, surfaces            |
| `teal`  | Accent (data/charts)               |
| `purple`| Accent (secondary feature areas)   |

Special primitives:

```css
--prim-marine:  #1852FE;   /* Geoserves brand blue */
--prim-white:   #ffffff;
--prim-black:   #000000;
```

### Semantic colors — `--color-{role}`

Prefer these in component code — they carry meaning and are easier to theme.

```css
/* Brand */
--color-brand          --color-brand-hover     --color-brand-active
--color-brand-subtle   --color-brand-border

/* Danger */
--color-danger         --color-danger-hover    --color-danger-active
--color-danger-subtle  --color-danger-border

/* Text */
--color-text-default   --color-text-secondary  --color-text-placeholder
--color-text-disabled  --color-text-inverse    --color-text-brand

/* Surface */
--color-surface-default  --color-surface-subtle  --color-surface-overlay

/* Border */
--color-border-default   --color-border-subtle   --color-border-strong
```

---

## Typography tokens (`foundations/typography.css`)

### Primitive — `--prim-font-*`

```css
--prim-font-primary           /* Gilroy + system fallbacks */
--prim-font-mono              /* SF Mono + Fira Code */

--prim-font-size-xs:  11px
--prim-font-size-sm:  12px
--prim-font-size-md:  14px    /* body default */
--prim-font-size-lg:  16px
--prim-font-size-xl:  20px
--prim-font-size-2xl: 24px
--prim-font-size-3xl: 32px

--prim-font-weight-regular:   400
--prim-font-weight-medium:    500
--prim-font-weight-semibold:  600
--prim-font-weight-bold:      700
--prim-font-weight-extrabold: 800

--prim-line-height-tight:     1.25
--prim-line-height-normal:    1.5
--prim-line-height-relaxed:   1.65
```

### Semantic — `--font-{role}-*`

```css
--font-body          --font-body-size        --font-body-weight     --font-body-line
--font-label-size    --font-label-weight     --font-label-line
--font-caption-size  --font-caption-weight
--font-heading-1-*   --font-heading-2-*      --font-heading-3-*     --font-heading-4-*
--font-code          --font-code-size
```

---

## Spacing tokens (`foundations/spacing.css`)

### Primitive — `--prim-space-{n}` (4px grid)

```
1 → 4px   2 → 8px   3 → 12px  4 → 16px  5 → 20px
6 → 24px  8 → 32px  10 → 40px 12 → 48px 16 → 64px
```

### Semantic — `--space-{size}`

```css
--space-xs:  4px    --space-sm: 8px    --space-md: 16px
--space-lg:  24px   --space-xl: 32px   --space-2xl: 40px   --space-3xl: 48px
```

### Radius — `--radius-{size}` and `--prim-radius-{size}`

```css
--radius-sm:   4px    --radius-md:   8px
--radius-lg:   12px   --radius-xl:   16px   --radius-full: 9999px
```

### Elevation — `--shadow-{role}`

```css
--shadow-sm          --shadow-md           --shadow-lg
--shadow-card        --shadow-dropdown     --shadow-modal
--shadow-toast       --shadow-tooltip
```

---

## Component tokens

Component-level tokens live inside each component's `.scss` file (e.g. `components/primitives/button/Button.scss`). They follow the pattern `--{component}-{property}`:

```css
/* Button */
--btn-radius              --btn-font-size           --btn-height-md
--btn-primary-bg          --btn-primary-bg-hover    --btn-primary-text

/* Input / Text field */
--tf-radius               --tf-border-default       --tf-border-focus
--tf-text-value           --tf-label-color          --tf-help-color
```

Override any token in your project's CSS to theme a component without touching source files.

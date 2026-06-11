/**
 * Pelagos Menu — Ant Design ConfigProvider Theme Mapping
 * components/primitives/menu/menuTheme.js
 *
 * Maps Pelagos design tokens to Ant Design v5 Menu component tokens.
 * Global tokens (colour, typography, radius) are imported from pelagosTheme.js
 * so they stay in sync with every other Pelagos component wrapper.
 *
 * Two theme variants (light / dark) are supported, mirroring the AntD
 * `theme` prop. Each gets its own scoped ConfigProvider object so the
 * Menu wrapper can inject precise per-theme overrides without touching
 * the application's global theme.
 *
 * Token reference:
 *   https://ant.design/components/menu#design-token
 *   https://ant.design/docs/react/customize-theme
 */

import { globalTokens } from '../../../pelagosTheme.js';

// ─── Shared Menu component tokens ─────────────────────────────────────────────
//
// Sizing, spacing and typography tokens shared across both light and dark themes.

const baseMenuTokens = {
  // Item sizing  —  --prim-space-10 / --prim-space-8
  itemHeight:                40,   // --prim-space-10 (40 px)  — matches controlHeight

  // Item border radius  —  --radius-sm
  itemBorderRadius:           4,   // --prim-radius-sm

  // SubMenu item border radius  —  --radius-sm
  subMenuItemBorderRadius:    4,   // --prim-radius-sm

  // Item margins  —  --prim-space-1
  itemMarginBlock:            4,   // 4px vertical between items
  itemMarginInline:           4,   // --prim-space-1 = 4px horizontal margin

  // Item padding  —  --prim-space-4
  itemPaddingInline:         16,   // --prim-space-4

  // Icon metrics  —  --prim-font-size-md
  iconSize:                  14,   // --prim-font-size-md
  iconMarginInlineEnd:       10,   // --prim-space-2·5 (10px icon-to-label gap)

  // Active indicator bar  —  suppress the default 3px bar
  activeBarBorderWidth:       0,   // none — selection shown via background only
  activeBarHeight:            2,   // --prim-space-half (2px)
  activeBarWidth:             0,   // 0 — not used in Pelagos style

  // Horizontal item
  horizontalLineHeight:    '46px', // AntD default — kept as-is
  horizontalItemBorderRadius: 4,   // --prim-radius-sm

  // Popup / dropdown
  dropdownWidth:            180,   // --prim-space-45 (180px popup min-width)
  zIndexPopup:             1050,   // above overlays but below modals
};

// ─── Light theme ──────────────────────────────────────────────────────────────
//
// Default. Uses Pelagos brand blue for selected items.
// Background and border tokens align with the Pelagos surface / border scale.

export const lightTheme = {
  token: {
    ...globalTokens,
    // Menu popup uses elevated surface — same as Modal / Dropdown
    colorBgElevated: '#ffffff',    // --color-surface-default
  },
  components: {
    Menu: {
      ...baseMenuTokens,

      // Container background
      itemBg:                    '#ffffff',  // --color-surface-default

      // Default text  —  --prim-grey-900
      itemColor:                 '#030712',  // --color-text-default

      // Hover state  —  --prim-grey-50 bg / --prim-grey-900 text
      itemHoverBg:               '#f8fafc',  // --prim-grey-50
      itemHoverColor:            '#030712',  // --color-text-default

      // Active / pressed state  —  --color-brand-subtle tint
      itemActiveBg:              '#dde7ff',  // --prim-blue-50

      // Selected state  —  brand blue text + subtle brand bg
      itemSelectedBg:            '#eef6ff',  // --color-brand-subtle
      itemSelectedColor:         '#1852FE',  // --color-brand  --prim-marine

      // Disabled state  —  --prim-grey-300
      itemDisabledColor:         '#94a3b8',  // --prim-grey-300

      // Horizontal mode selected / hover
      horizontalItemSelectedBg:   'transparent', // no fill — underline indicator only
      horizontalItemSelectedColor: '#1852FE',    // --color-brand  --prim-marine
      horizontalItemHoverBg:       '#f8fafc',    // --prim-grey-50
      horizontalItemHoverColor:    '#1852FE',    // --color-brand

      // SubMenu
      subMenuItemBg:              'rgba(0,0,0,0.02)',  // very light tint for sub-level
      subMenuItemSelectedColor:   '#1852FE',           // --color-brand

      // Group title  —  --prim-grey-400
      groupTitleColor:            '#94a3b8',   // --prim-grey-300
      groupTitleFontSize:         12,          // --prim-font-size-sm

      // Popup background
      popupBg:                   '#ffffff',   // --color-surface-default

      // Danger items  —  aligned with Pelagos danger scale
      dangerItemColor:           '#dc2625',  // --prim-red-500 / --color-danger
      dangerItemHoverColor:      '#b91c1b',  // --prim-red-600 / --color-danger-hover
      dangerItemSelectedBg:      '#fef1f2',  // --color-danger-subtle
      dangerItemSelectedColor:   '#dc2625',  // --color-danger
      dangerItemActiveBg:        '#fde2e2',  // --prim-red-50
    },
  },
};

// ─── Dark theme ───────────────────────────────────────────────────────────────
//
// Applied when `theme="dark"`. Uses Pelagos navy / dark surface tokens.

export const darkTheme = {
  token: {
    ...globalTokens,
    colorBgElevated: '#0f172a',  // --prim-grey-900 dark surface
  },
  components: {
    Menu: {
      ...baseMenuTokens,

      // Container background  —  --prim-grey-900
      darkItemBg:                   '#0f172a',  // --prim-grey-900

      // Default text  —  light on dark
      darkItemColor:                'rgba(255,255,255,0.72)',  // --prim-grey-100 at 72%

      // Hover state
      darkItemHoverBg:              'rgba(255,255,255,0.08)', // subtle white tint
      darkItemHoverColor:           '#ffffff',               // full white

      // Selected state  —  brand blue background, white text
      darkItemSelectedBg:           '#1852FE',  // --color-brand  --prim-marine
      darkItemSelectedColor:        '#ffffff',  // --prim-white

      // Disabled state
      darkItemDisabledColor:        'rgba(255,255,255,0.25)',  // 25% white

      // SubMenu dark bg  —  --prim-grey-800 equivalent
      darkSubMenuItemBg:            '#1e293b',  // --prim-grey-800

      // Popup dark background
      darkPopupBg:                  '#0f172a',  // --prim-grey-900

      // Group title dark
      darkGroupTitleColor:          'rgba(255,255,255,0.45)',  // 45% white

      // Danger items (dark)
      darkDangerItemColor:          '#fca5a5',  // --prim-red-300
      darkDangerItemHoverColor:     '#fecaca',  // --prim-red-200
      darkDangerItemSelectedBg:     '#dc2625',  // --color-danger
      darkDangerItemSelectedColor:  '#ffffff',  // --prim-white
      darkDangerItemActiveBg:       '#b91c1b',  // --color-danger-hover
    },
  },
};

/**
 * Returns the scoped ConfigProvider theme for a given Pelagos Menu theme.
 * Falls back to `light` for any unrecognised theme string.
 *
 * @param {'light' | 'dark'} theme
 * @returns {{ token: object, components: object }}
 */
export const getMenuTheme = (theme) =>
  theme === 'dark' ? darkTheme : lightTheme;

/**
 * Pelagos Button — Ant Design ConfigProvider Theme Mapping
 * components/primitives/button/buttonTheme.js
 *
 * Maps Pelagos design tokens to Ant Design v5 Button component tokens.
 * Global tokens (colour, typography, radius) are imported from pelagosTheme.js
 * so they stay in sync with every other Pelagos component wrapper.
 *
 * Each variant gets its own scoped theme object so the Button wrapper can
 * inject precise per-variant overrides via ConfigProvider without touching
 * the application's global theme.
 *
 * Token reference:
 *   https://ant.design/docs/react/customize-theme
 *   https://ant.design/theme-editor#component-size
 */

import { globalTokens, globalComponentTokens } from '../../../pelagosTheme.js';

// ─── Button component tokens (sizing + typography, Button-specific only) ───────
//
// Heights are consumed from globalComponentTokens (controlHeight / LG / SM).
// Only padding, font sizes, font weight, and shadow suppression live here.

const baseButtonTokens = {
  // Spread the shared control heights so every Button size matches
  // the same height scale used by Input, Select, etc.
  ...globalComponentTokens,

  // Horizontal padding  —  --btn-padding-*  (--prim-space-3 / -4 / -6)
  paddingInline:          16,   // md  → --prim-space-4
  paddingInlineLG:        24,   // lg  → --prim-space-6
  paddingInlineSM:        12,   // sm  → --prim-space-3

  // Font sizes  —  --prim-font-size-*
  contentFontSize:        14,   // md  — --prim-font-size-md
  contentFontSizeLG:      16,   // lg  — --prim-font-size-lg
  contentFontSizeSM:      12,   // sm  — --prim-font-size-sm

  // Font weight  —  --prim-font-weight-semibold
  fontWeight:             600,

  // Shadows — Pelagos buttons are flat; suppress AntD defaults
  primaryShadow:          'none',
  defaultShadow:          'none',
  dangerShadow:           'none',
};

// ─── Per-variant theme configs ────────────────────────────────────────────────

export const variantThemes = {

  // ── primary ──────────────────────────────────────────────────────────────────
  // AntD type="primary"
  // colorPrimary / colorPrimaryHover / colorPrimaryActive drive bg + border + focus ring.
  primary: {
    token:      globalTokens,
    components: { Button: baseButtonTokens },
  },

  // ── secondary ────────────────────────────────────────────────────────────────
  // AntD type="default"
  // Tinted brand background, brand-coloured text and border.
  secondary: {
    token:      globalTokens,
    components: {
      Button: {
        ...baseButtonTokens,
        defaultBg:                '#eef6ff',  // --color-brand-subtle (--prim-blue-10)
        defaultBorderColor:       '#bedbfe',  // --color-brand-border (--prim-blue-100)
        defaultColor:             '#1852FE',  // --color-brand
        defaultHoverBg:           '#dde7ff',
        defaultHoverBorderColor:  '#bedbfe',  // --prim-blue-100
        defaultHoverColor:        '#1852FE',  // --color-brand
        defaultActiveBg:          '#bedbfe',  // --prim-blue-100
        defaultActiveBorderColor: '#bedbfe',  // --prim-blue-100
        defaultActiveColor:       '#1242d4',  // --color-brand-hover
      },
    },
  },

  // ── tertiary ─────────────────────────────────────────────────────────────────
  // AntD type="text"
  // Transparent background, brand-coloured text, subtle brand hover bg.
  // colorText is overridden in this scoped ConfigProvider so the text button
  // inherits brand blue — safe because this provider wraps only the one Button.
  tertiary: {
    token: {
      ...globalTokens,
      colorText:   '#1852FE',  // --color-brand  (scoped to this button only)
    },
    components: {
      Button: {
        ...baseButtonTokens,
        textHoverBg: '#eef6ff',  // --color-brand-subtle
      },
    },
  },

  // ── danger ───────────────────────────────────────────────────────────────────
  // AntD type="primary" danger={true}
  // colorError / colorErrorHover / colorErrorActive drive bg + border + focus ring.
  danger: {
    token:      globalTokens,
    components: { Button: baseButtonTokens },
  },

  // ── danger-secondary ─────────────────────────────────────────────────────────
  // AntD type="default" danger={true}
  // Subtle red background, red text and border.
  // colorBgContainer sets the button's default background.
  // colorErrorBg / colorErrorBgHover are AntD's generated tints for hover/active
  // — we override them so they match Pelagos's exact red scale.
  'danger-secondary': {
    token: {
      ...globalTokens,
      colorBgContainer:   '#fef1f2',  // --color-danger-subtle (--prim-red-10)   initial bg
      colorErrorBg:       '#fde2e2',  // --prim-red-50                           hover  bg
      colorErrorBgHover:  '#fecaca',  // --prim-red-100                          active bg
      colorErrorBorder:   '#fecaca',  // --prim-red-100                          initial border
    },
    components: { Button: baseButtonTokens },
  },

  // ── neutral ──────────────────────────────────────────────────────────────────
  // AntD type="default"
  // Plain white background, grey border and text — no brand tint.
  neutral: {
    token:      globalTokens,
    components: {
      Button: {
        ...baseButtonTokens,
        defaultBg:                '#ffffff',  // --color-surface-default
        defaultBorderColor:       '#e2e8f0',  // --color-border-default (--prim-grey-100)
        defaultColor:             '#475569',  // --prim-grey-500
        defaultHoverBg:           '#f1f5f9',  // --prim-grey-50
        defaultHoverBorderColor:  '#e2e8f0',  // --prim-grey-100
        defaultHoverColor:        '#334154',  // --prim-grey-600
        defaultActiveBg:          '#e2e8f0',  // --prim-grey-100
        defaultActiveBorderColor: '#cbd5e1',  // --prim-grey-200
        defaultActiveColor:       '#334154',  // --prim-grey-600
      },
    },
  },

  // ── link ─────────────────────────────────────────────────────────────────────
  // AntD type="link"
  // colorLink / colorLinkHover / colorLinkActive control text colour and underline.
  link: {
    token:      globalTokens,
    components: { Button: baseButtonTokens },
  },
};

/**
 * Returns the scoped ConfigProvider theme for a given Pelagos button variant.
 * Falls back to `primary` for any unrecognised variant string.
 *
 * @param {string} variant
 * @returns {{ token: object, components: object }}
 */
export const getButtonTheme = (variant) =>
  variantThemes[variant] ?? variantThemes.primary;

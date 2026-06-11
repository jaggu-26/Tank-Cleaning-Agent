/**
 * Pelagos Design System — Shared AntD Theme Tokens
 * pelagosTheme.js
 *
 * Single source of truth for all AntD global tokens and shared component-level
 * sizing tokens. Every Pelagos component wrapper imports from here rather than
 * redeclaring the same values.
 *
 * Token sources:
 *   foundations/colors.css      —  color values
 *   foundations/typography.css  —  font-family, font-size
 *   foundations/spacing.css     —  radius, control heights
 *
 * AntD token reference:
 *   https://ant.design/docs/react/customize-theme
 */

// ─── Tier 1 · Global tokens ────────────────────────────────────────────────────
//
// Passed as the `token` prop of AntD ConfigProvider.
// These values cascade to every component unless overridden at the component slot.

export const globalTokens = {

  // ── Brand / Primary ────────────────────────────────────────────────────────
  colorPrimary:           '#1852FE',  // --prim-marine / --color-brand
  colorPrimaryHover:      '#1242d4',  // --color-brand-hover
  colorPrimaryActive:     '#0d3299',  // --color-brand-active

  // ── Danger / Error ─────────────────────────────────────────────────────────
  colorError:             '#dc2625',  // --prim-red-500 / --color-danger
  colorErrorHover:        '#b91c1b',  // --prim-red-600 / --color-danger-hover
  colorErrorActive:       '#981b1b',  // --prim-red-700 / --color-danger-active

  // ── Text ───────────────────────────────────────────────────────────────────
  colorText:              '#030712',  // --prim-grey-900 / --color-text-default
  colorTextSecondary:     '#334154',  // --prim-grey-600 / --color-text-secondary

  // ── Surface + border ───────────────────────────────────────────────────────
  colorBgContainer:       '#ffffff',  // --prim-white / --color-surface-default
  colorBorder:            '#e2e8f0',  // --prim-grey-100 / --color-border-default

  // ── Links ──────────────────────────────────────────────────────────────────
  colorLink:              '#1852FE',  // --prim-marine / --color-brand
  colorLinkHover:         '#1242d4',  // --color-brand-hover
  colorLinkActive:        '#0d3299',  // --color-brand-active

  // ── Typography ─────────────────────────────────────────────────────────────
  fontFamily:             "'Gilroy', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
                                      // --prim-font-primary
  fontSize:               14,         // --prim-font-size-md

  // ── Border radius ──────────────────────────────────────────────────────────
  borderRadius:           4,          // --prim-radius-sm / --radius-sm
  borderRadiusLG:         4,          // --prim-radius-sm / --radius-sm
  borderRadiusSM:         4,          // --prim-radius-sm / --radius-sm
};

// ─── Tier 2 · Shared component tokens (control sizing) ────────────────────────
//
// Passed into the `components` slot of AntD ConfigProvider for each form control
// (Button, Input, Select, etc.) so all controls share the same height scale.
//
// AntD v5 defaults:  SM = 24px / middle = 32px / LG = 40px
// Pelagos spec:      sm = 32px / md     = 40px / lg = 48px   (+8px at each step)

export const globalComponentTokens = {
  controlHeight:          40,  // --prim-space-10 (40px) — md / middle
  controlHeightLG:        48,  // --prim-space-12 (48px) — lg / large
  controlHeightSM:        32,  // --prim-space-8  (32px) — sm / small
};

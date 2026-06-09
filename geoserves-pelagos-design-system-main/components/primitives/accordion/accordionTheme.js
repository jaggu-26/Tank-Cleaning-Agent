/**
 * Pelagos Accordion — Ant Design ConfigProvider Theme Mapping
 * components/primitives/accordion/accordionTheme.js
 *
 * Maps Pelagos design tokens to Ant Design v5 Collapse component tokens.
 * Global tokens (colour, typography, radius) are imported from pelagosTheme.js
 * so they stay in sync with every other Pelagos component wrapper.
 *
 * Header height by size (collapsed state):
 *   sm (small)  → 40px  — AntD small  (8px v-padding + 24px line-height + 8px)
 *   md (medium) → 48px  — AntD medium (12px v-padding + 24px line-height + 12px)
 *   lg (large)  → 56px  — AntD large  (16px v-padding + 24px line-height + 16px)
 *
 * Token reference:
 *   https://ant.design/components/collapse#design-token
 */

import { globalTokens } from '../../../pelagosTheme.js';

// ─── Collapse component tokens ────────────────────────────────────────────────
//
// Only Collapse-specific overrides live here. Global tokens (colour, font,
// border radius) come from pelagosTheme.js via the token spread above.

const accordionComponentTokens = {
  headerBg:       '#ffffff',    // --prim-white / --color-surface-default
  contentBg:      '#ffffff',    // --prim-white / --color-surface-default
  contentPadding: '16px 16px',  // --prim-space-4 vertical + horizontal
};

// ─── Full theme object ────────────────────────────────────────────────────────

export const accordionTheme = {
  token: {
    ...globalTokens,
    // Panel header title colour — overrides AntD's default rgba(0,0,0,0.88)
    colorTextHeading: '#001e4c',  // --prim-blue-900 (Figma: --primary/navy)
  },
  components: {
    Collapse: accordionComponentTokens,
  },
};

/**
 * Returns the scoped ConfigProvider theme for the Pelagos Accordion.
 *
 * @returns {{ token: object, components: object }}
 */
export const getAccordionTheme = () => accordionTheme;

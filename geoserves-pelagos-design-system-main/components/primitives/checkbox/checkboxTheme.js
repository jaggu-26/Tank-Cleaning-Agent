/**
 * Pelagos Checkbox — Ant Design ConfigProvider Theme Mapping
 * components/primitives/checkbox/checkboxTheme.js
 *
 * Maps Pelagos design tokens to Ant Design v5 Checkbox component tokens.
 * Global tokens (colour, typography, radius) are imported from pelagosTheme.js
 * so they stay in sync with every other Pelagos component wrapper.
 *
 * AntD handles all visual states — checked bg/border, indeterminate marker,
 * hover highlight, focus ring, and disabled opacity — entirely through the
 * token system. No colour values live in Checkbox.scss.
 *
 * Token reference:
 *   https://ant.design/components/checkbox#design-token
 *   https://ant.design/docs/react/customize-theme
 */

import { globalTokens } from '../../../pelagosTheme.js';

// ─── Checkbox component tokens (Checkbox-specific only) ───────────────────────

const checkboxComponentTokens = {
  // Box size  —  --prim-space-4 (16px); matches AntD default, explicit for traceability
  controlInteractiveSize: 16,  // --prim-space-4
};

// ─── Checkbox theme ───────────────────────────────────────────────────────────
//
// Checkbox has no visual variants — a single theme covers all states.
// Disabled opacity and pointer-events are applied automatically by AntD.

export const checkboxTheme = {
  token: {
    ...globalTokens,

    // Disabled surface  —  --prim-grey-50 / --color-surface-overlay
    colorBgContainerDisabled: '#f1f5f9',  // --prim-grey-50

    // Disabled text  —  --prim-grey-300 / --color-text-disabled
    colorTextDisabled:        '#94a3b8',  // --prim-grey-300 / --color-text-disabled
  },

  components: {
    Checkbox: checkboxComponentTokens,
  },
};

/**
 * Returns the Pelagos Checkbox ConfigProvider theme.
 * Signature mirrors getButtonTheme() for API consistency across all wrappers.
 *
 * @returns {{ token: object, components: object }}
 */
export const getCheckboxTheme = () => checkboxTheme;

/**
 * Pelagos Design System — Global Theme Provider
 * PelagosProvider.jsx
 *
 * Wraps Ant Design's ConfigProvider with the full Pelagos token set so that
 * every AntD component rendered inside it automatically inherits:
 *   • Global design tokens  (colour, typography, border radius)
 *   • Shared control sizing (controlHeight × 3 sizes) applied to Button,
 *     Input, and Select so all form controls share the same height scale.
 *
 * Mount this once near the root of your application, outside any router or
 * page-level component, to avoid re-mounting the provider on navigation.
 *
 * @example
 * // ── Basic usage ─────────────────────────────────────────────────────────────
 * import { PelagosProvider } from './PelagosProvider';
 *
 * function App() {
 *   return (
 *     <PelagosProvider>
 *       <RouterProvider router={router} />
 *     </PelagosProvider>
 *   );
 * }
 *
 * @example
 * // ── Token override ──────────────────────────────────────────────────────────
 * // Pass `tokenOverrides` to extend or override individual global tokens
 * // without forking pelagosTheme.js.
 * import { PelagosProvider } from './PelagosProvider';
 *
 * function App() {
 *   return (
 *     <PelagosProvider tokenOverrides={{ colorPrimary: '#0047AB' }}>
 *       <RouterProvider router={router} />
 *     </PelagosProvider>
 *   );
 * }
 */

import React from 'react';
import { ConfigProvider } from 'antd';
import { globalTokens, globalComponentTokens } from './pelagosTheme.js';

/**
 * PelagosProvider
 *
 * Injects Pelagos design tokens into the AntD ConfigProvider so all AntD
 * components rendered in the subtree automatically use Pelagos colours,
 * typography, and sizing.
 *
 * @param {object}    props
 * @param {React.ReactNode} props.children        — Subtree to theme.
 * @param {object}   [props.tokenOverrides={}]    — Additional global token
 *   overrides merged on top of globalTokens. Useful for white-labelling or
 *   per-tenant colour customisation without editing the shared token file.
 */
export const PelagosProvider = ({ children, tokenOverrides = {} }) => (
  <ConfigProvider
    theme={{
      // ── Global tokens ────────────────────────────────────────────────────
      // Merged last so consumer overrides win.
      token: {
        ...globalTokens,
        ...tokenOverrides,
      },

      // ── Component slots ──────────────────────────────────────────────────
      // Spread globalComponentTokens (control heights) into every form
      // control so Button, Input, and Select share the same size scale.
      components: {
        Button: { ...globalComponentTokens },
        Input:  { ...globalComponentTokens },
        Select: { ...globalComponentTokens },
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default PelagosProvider;

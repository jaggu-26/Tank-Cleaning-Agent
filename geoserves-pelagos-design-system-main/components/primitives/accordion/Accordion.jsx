import React from 'react';
import { Collapse as AntCollapse, ConfigProvider } from 'antd';
import { getAccordionTheme } from './accordionTheme';
import './Accordion.layout.scss';

/**
 * Pelagos Accordion — primitives/accordion
 *
 * A thin Pelagos wrapper on top of Ant Design's Collapse component.
 *
 * All interactive behaviours — keyboard activation, expand/collapse animation,
 * disabled state, aria attributes, accordion mode — are delegated entirely to
 * AntD. Pelagos design tokens are injected via a scoped ConfigProvider so they
 * never bleed into the global application theme.
 *
 * Refs are forwarded to the underlying AntD Collapse, preserving compatibility
 * with focus management and any existing ref usage in the consuming app.
 *
 * ─── Prop mapping ───────────────────────────────────────────────────────────
 *
 *   Pelagos prop      │ AntD Collapse equivalent │ Notes
 *   ──────────────────┼──────────────────────────┼──────────────────────────
 *   size              │ size                     │ sm→small  md→medium  lg→large
 *   accordion         │ accordion                │ true = single-open mode
 *   items             │ items                    │ AntD ItemType[] — thin passthrough
 *   defaultActiveKey  │ defaultActiveKey         │ uncontrolled initial active panels
 *   activeKey         │ activeKey                │ controlled active panels
 *   onChange          │ onChange                 │ fires when active panels change
 *
 * ─── Size → header height ───────────────────────────────────────────────────
 *
 *   Pelagos  │ AntD     │ Collapsed header height
 *   sm       │ small    │ 40px
 *   md       │ medium   │ 48px  (default)
 *   lg       │ large    │ 56px
 *
 * ─── AntD passthrough ───────────────────────────────────────────────────────
 *
 * All other Ant Design Collapse props (bordered, ghost, collapsible,
 * destroyOnHidden, classNames, styles, expandIcon, …) pass through via ...rest:
 * https://ant.design/components/collapse#api
 *
 * ─── items shape (AntD ItemType) ────────────────────────────────────────────
 *
 *   { key, label, children, extra, collapsible, showArrow, forceRender }
 *
 * Use collapsible: 'disabled' on an item to disable a specific panel.
 *
 * ─── Design tokens ──────────────────────────────────────────────────────────
 *
 * Token overrides live in accordionTheme.js. No CSS variables or custom
 * classes are used for colour — every shade is driven by AntD's token system.
 *
 * ─── Design reference ───────────────────────────────────────────────────────
 * /pages/prim-accordion.html
 * Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=13305-5227
 */

// ─── ConfigProvider necessity ────────────────────────────────────────────────
//
// Accordion always needs a local ConfigProvider — it applies colour overrides
// that are NOT in the PelagosProvider root token set:
//   · colorTextHeading (#001e4c)  — panel header title colour
//   · headerBg / contentBg       — white surface tokens
// Removing the ConfigProvider here would revert all three to AntD defaults.

// ─── Size → AntD size ────────────────────────────────────────────────────────

const SIZE_MAP = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

// ─── Chevron icon ─────────────────────────────────────────────────────────────
//
// AntD passes { isActive } to the expandIcon render function.
// CSS transition on accordion__chevron--active handles the rotation animation.
// expandIconPlacement="end" positions this chevron on the right (Figma spec).

const ChevronIcon = ({ isActive }) => (
  <svg
    className={[
      'accordion__chevron',
      isActive && 'accordion__chevron--active',
    ].filter(Boolean).join(' ')}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={24}
    height={24}
    aria-hidden="true"
  >
    <path d="M6 10l6 6 6-6" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

export const Accordion = React.forwardRef(function Accordion(
  {
    // ── Pelagos-specific props ───────────────────────────────────────────────
    size = 'md',

    // ── Intercepted — Pelagos manages the chevron internally ─────────────────
    // expandIcon is destructured so it cannot reach AntD via ...rest and
    // silently override the Pelagos chevron.
    expandIcon,           // eslint-disable-line no-unused-vars

    // ── Props forwarded to AntD Collapse ────────────────────────────────────
    accordion     = false,
    items,
    defaultActiveKey,
    activeKey,
    onChange,
    className,
    ...rest       // all other AntD Collapse props: bordered, ghost, collapsible, …
  },
  ref,
) {
  const antSize = SIZE_MAP[size] ?? 'medium';

  // ── Dev-mode prop guard ──────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production' && expandIcon !== undefined) {
    console.warn(
      '[PelagosAccordion] `expandIcon` is not supported. ' +
      'Pelagos manages the expand chevron internally. Remove the `expandIcon` prop.',
    );
  }

  return (
    <ConfigProvider theme={getAccordionTheme()}>
      <AntCollapse
        ref={ref}
        size={antSize}
        accordion={accordion}
        items={items}
        defaultActiveKey={defaultActiveKey}
        activeKey={activeKey}
        onChange={onChange}
        expandIcon={({ isActive }) => <ChevronIcon isActive={isActive} />}
        expandIconPlacement="end"
        className={className}
        data-size={size}
        {...rest}
      />
    </ConfigProvider>
  );
});

Accordion.displayName = 'PelagosAccordion';

export default Accordion;

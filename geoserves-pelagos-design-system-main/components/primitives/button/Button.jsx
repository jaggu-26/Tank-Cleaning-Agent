import React from 'react';
import { Button as AntButton, ConfigProvider } from 'antd';
import { getButtonTheme } from './buttonTheme';
import './Button.scss';

/**
 * Pelagos Button — primitives/button
 *
 * A thin Pelagos wrapper on top of Ant Design's Button component.
 *
 * All interactive behaviours — loading spinner, wave-ripple click feedback,
 * keyboard activation, disabled state, aria attributes, and link rendering
 * (via href) — are delegated entirely to AntD. Pelagos design tokens are
 * injected via a scoped ConfigProvider so they never bleed into the global
 * application theme.
 *
 * Refs are forwarded to the underlying AntD Button, preserving compatibility
 * with form libraries (react-hook-form, Formik), focus management, and any
 * existing ref usage in the consuming app.
 *
 * ─── Prop mapping ───────────────────────────────────────────────────────────
 *
 *   Pelagos prop   │ AntD equivalent             │ Notes
 *   ───────────────┼─────────────────────────────┼───────────────────────────
 *   variant        │ type + danger               │ see VARIANT_MAP below
 *   size           │ size                        │ sm→small  md→middle  lg→large
 *   fullWidth      │ block                       │ replaces AntD `block`
 *   iconLeft       │ icon + iconPosition="start" │ AntD handles gap + alignment
 *   iconRight      │ icon + iconPosition="end"   │ AntD handles gap + alignment
 *   type           │ htmlType                    │ HTML button type: submit/reset/button
 *   loading        │ loading                     │ boolean OR { delay: number }
 *   disabled       │ disabled                    │
 *   onClick        │ onClick                     │
 *
 * ─── AntD passthrough ───────────────────────────────────────────────────────
 *
 * All other Ant Design Button props (href, target, shape, ghost, classNames,
 * styles, etc.) pass through via ...rest unchanged:
 * https://ant.design/components/button#api
 *
 * ─── AntD version notes ─────────────────────────────────────────────────────
 *
 * v5.13+: AntD introduced its own `variant` prop (outlined/solid/filled/…) and
 * a `color` prop. Both are intercepted here: `variant` is consumed by Pelagos
 * and translated via VARIANT_MAP; `color` is destructured and dropped to
 * prevent conflicting passthrough. Use Pelagos `variant` for all visual style.
 *
 * v5.17+: `iconPosition` prop added — required for iconLeft/iconRight to work.
 * Peer dependency is set to antd >= 5.17.0 for this reason.
 *
 * ─── Migration from raw AntD ────────────────────────────────────────────────
 *
 *   AntD usage                     │ Pelagos equivalent
 *   ───────────────────────────────┼────────────────────────────────────────
 *   type="primary"                 │ variant="primary"
 *   type="default"                 │ variant="secondary"
 *   type="text"                    │ variant="tertiary"
 *   type="link"                    │ variant="link"
 *   type="primary" danger={true}   │ variant="danger"
 *   type="default" danger={true}   │ variant="danger-secondary"
 *   size="large"                   │ size="lg"
 *   size="middle"                  │ size="md"
 *   size="small"                   │ size="sm"
 *   block={true}                   │ fullWidth={true}
 *   ref={myRef}                    │ ref={myRef}  (forwarded — no change needed)
 *   loading / disabled / href / target / shape / ghost / onClick
 *                                  │ unchanged — pass through via ...rest
 *
 * ─── Design tokens ──────────────────────────────────────────────────────────
 *
 * Token overrides live in buttonTheme.js. No CSS variables or custom classes
 * are used for colour — every shade is driven by AntD's token system via a
 * scoped ConfigProvider.
 *
 * ─── Design reference ───────────────────────────────────────────────────────
 * /pages/prim-buttons.html
 */

// ─── Variant → AntD type + danger flag ───────────────────────────────────────

const VARIANT_MAP = {
  primary:            { type: 'primary', danger: false },
  secondary:          { type: 'default', danger: false },
  tertiary:           { type: 'text',    danger: false },
  danger:             { type: 'primary', danger: true  },
  'danger-secondary': { type: 'default', danger: true  },
  neutral:            { type: 'default', danger: false },
  link:               { type: 'link',    danger: false },
};

// ─── Size → AntD size ────────────────────────────────────────────────────────

const SIZE_MAP = {
  sm: 'small',
  md: 'middle',
  lg: 'large',
};

// ─── Variants that require a scoped ConfigProvider for per-variant token overrides.
// primary, danger, and link are fully covered by PelagosProvider at the app root
// and must NOT be wrapped — doing so would add an unnecessary React tree node
// and could mask future root-level token changes.

const THEMED_VARIANTS = new Set(['secondary', 'tertiary', 'neutral', 'danger-secondary']);

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = React.forwardRef(function Button(
  {
    // ── Pelagos-specific props ───────────────────────────────────────────────
    variant   = 'primary',
    size      = 'md',
    iconLeft,
    iconRight,
    fullWidth = false,
    type      = 'button',   // HTML button type (submit | reset | button) → htmlType

    // ── Intercepted to prevent AntD v5.13+ passthrough conflicts ────────────
    color,                  // eslint-disable-line no-unused-vars  (AntD v5.13+)

    // ── Props forwarded to AntD Button ──────────────────────────────────────
    disabled  = false,
    loading   = false,      // boolean | { delay: number }
    onClick,
    children,
    className,
    ...rest                 // all other AntD Button props: href, target, shape, ghost, …
  },
  ref,
) {
  const { type: antType, danger } = VARIANT_MAP[variant] ?? VARIANT_MAP.primary;
  const antSize                   = SIZE_MAP[size]        ?? 'middle';

  // ── Dev-mode prop guard ──────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production' && color !== undefined) {
    console.warn('[PelagosButton] The `color` prop is not supported. Use `variant` instead.');
  }

  // ── Icon handling ────────────────────────────────────────────────────────
  //
  // AntD Button supports one `icon` node with an `iconPosition` ("start"|"end").
  // When only one icon is provided we pass it to AntD so it handles the gap,
  // alignment, and icon-only sizing automatically.
  //
  // When BOTH iconLeft and iconRight are provided we fall back to manual markup
  // (spans with margin only; AntD still renders the button shell).

  const hasBothIcons = Boolean(iconLeft && iconRight);
  let   icon, iconPosition;

  if (!hasBothIcons) {
    if (iconLeft)  { icon = iconLeft;  iconPosition = 'start'; }
    if (iconRight) { icon = iconRight; iconPosition = 'end';   }
  }

  const buttonNode = (
    <AntButton
      ref={ref}
      type={antType}
      danger={danger}
      size={antSize}
      disabled={disabled}
      loading={loading}
      block={fullWidth}
      icon={icon}
      iconPosition={iconPosition}
      htmlType={type}
      onClick={onClick}
      className={className}
      data-variant={variant}
      {...rest}
    >
      {hasBothIcons ? (
        <>
          <span className="btn__icon--left">{iconLeft}</span>
          {children}
          <span className="btn__icon--right">{iconRight}</span>
        </>
      ) : children}
    </AntButton>
  );

  // primary, danger, and link are covered by PelagosProvider at the app root —
  // skip the ConfigProvider entirely for those variants.
  if (!THEMED_VARIANTS.has(variant)) {
    return buttonNode;
  }

  return (
    <ConfigProvider theme={getButtonTheme(variant)}>
      {buttonNode}
    </ConfigProvider>
  );
});

Button.displayName = 'PelagosButton';

export default Button;

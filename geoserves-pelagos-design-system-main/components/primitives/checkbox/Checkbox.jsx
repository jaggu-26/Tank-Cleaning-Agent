import React from 'react';
import { Checkbox as AntCheckbox, ConfigProvider } from 'antd';
import { getCheckboxTheme } from './checkboxTheme';
import './Checkbox.layout.scss';

/**
 * Pelagos Checkbox — primitives/checkbox
 *
 * A thin Pelagos wrapper on top of Ant Design's Checkbox component.
 *
 * All interactive behaviours — checked/unchecked/indeterminate toggling,
 * keyboard activation (Space), disabled state, focus ring, wave animation,
 * and form library integration — are delegated entirely to AntD. Pelagos
 * design tokens are injected via a scoped ConfigProvider so they never bleed
 * into the global application theme.
 *
 * Refs are forwarded to the underlying AntD Checkbox, preserving compatibility
 * with form libraries (react-hook-form, Formik), focus management, and any
 * existing ref usage in the consuming app.
 *
 * ─── Prop mapping ───────────────────────────────────────────────────────────
 *
 *   Pelagos prop    │ AntD equivalent   │ Notes
 *   ────────────────┼───────────────────┼────────────────────────────────────
 *   label           │ children          │ convenience alias; children wins
 *   checked         │ checked           │ controlled mode
 *   defaultChecked  │ defaultChecked    │ uncontrolled mode initial value
 *   disabled        │ disabled          │
 *   indeterminate   │ indeterminate     │ partial-selection dash marker
 *   onChange        │ onChange          │ (e: CheckboxChangeEvent) => void
 *   onBlur          │ onBlur            │
 *   onFocus         │ onFocus           │
 *
 * ─── AntD passthrough ───────────────────────────────────────────────────────
 *
 * All other Ant Design Checkbox props (classNames, styles, name, value, etc.)
 * pass through via ...rest unchanged:
 * https://ant.design/components/checkbox#api
 *
 * ─── Controlled vs uncontrolled ─────────────────────────────────────────────
 *
 * Controlled  → supply both `checked` and `onChange`.
 * Uncontrolled → supply `defaultChecked` only; AntD manages internal state.
 *
 * When used inside Ant Design Form.Item, set valuePropName="checked" on the
 * Form.Item wrapper:
 *
 *   <Form.Item name="agree" valuePropName="checked">
 *     <Checkbox label="I agree" />
 *   </Form.Item>
 *
 * ─── Design tokens ──────────────────────────────────────────────────────────
 *
 * Token overrides live in checkboxTheme.js. Colour is entirely AntD-driven;
 * Checkbox.layout.scss contains structural layout only.
 *
 * ─── Design reference ───────────────────────────────────────────────────────
 * /pages/prim-checkbox.html
 * Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=6715-2726
 */

// ─── ConfigProvider necessity ────────────────────────────────────────────────
//
// Checkbox always needs a local ConfigProvider — it applies colour and sizing
// overrides that are NOT in the PelagosProvider root token set:
//   · colorBgContainerDisabled (#f1f5f9)  — disabled surface colour
//   · colorTextDisabled        (#94a3b8)  — disabled text colour
//   · controlInteractiveSize   (16)       — checkbox box size
// Removing the ConfigProvider here would revert these to AntD defaults.

// ─── Component ───────────────────────────────────────────────────────────────

export const Checkbox = React.forwardRef(function Checkbox(
  {
    // ── Pelagos-specific props ───────────────────────────────────────────────
    label,                    // convenience label text; renders as AntD children

    // ── AntD Checkbox props (explicit for documentation + default values) ────
    checked,
    defaultChecked,
    disabled       = false,
    indeterminate  = false,
    onChange,
    onBlur,
    onFocus,
    children,                 // richer label content — takes priority over label
    className,

    // ── Passthrough ─────────────────────────────────────────────────────────
    ...rest                   // all other AntD Checkbox props: name, value, classNames, …
  },
  ref,
) {
  // ── Dev-mode prop guard ──────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production' && label !== undefined && children !== undefined) {
    console.warn(
      '[PelagosCheckbox] Both `label` and `children` were provided. ' +
      '`children` takes priority; `label` will be ignored. Remove one of the two.',
    );
  }

  return (
    <ConfigProvider theme={getCheckboxTheme()}>
      <AntCheckbox
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        indeterminate={indeterminate}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={className}
        data-state={disabled ? 'disabled' : 'default'}
        {...rest}
      >
        {children ?? label}
      </AntCheckbox>
    </ConfigProvider>
  );
});

Checkbox.displayName = 'PelagosCheckbox';

export default Checkbox;

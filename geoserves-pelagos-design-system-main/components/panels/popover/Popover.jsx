import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Popover.scss';

/**
 * Pelagos Popover — panels/popover
 *
 * Props:
 *   content      ReactNode          — content to render inside the floating panel
 *   placement    string             — where the panel appears relative to the trigger
 *                                     'bottom' | 'bottom-center' | 'bottom-right' |
 *                                     'top'    | 'top-center'    | 'top-right'    |
 *                                     'left'   | 'right'
 *                                     default: 'bottom'
 *   trigger      'click' | 'hover'  — how the popover opens        (default: 'click')
 *   minWidth     number | string    — CSS min-width of the panel    (default: 200)
 *   className    string             — extra class on the wrapper
 *   children     ReactNode          — trigger element (rendered as-is)
 *
 * Design reference: /pages/panel-popover.html
 * Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=12983-50855
 */
export const Popover = ({
  content,
  placement = 'bottom',
  trigger = 'click',
  minWidth = 200,
  className = '',
  children,
}) => {
  // Two-phase visibility pattern:
  //   `mounted` keeps the DOM node alive during the CSS exit transition
  //   `open`    drives the `.is-open` class that transitions open ↔ closed
  const [mounted, setMounted] = useState(false);
  const [open, setOpen]       = useState(false);

  const wrapRef  = useRef(null);
  const timerRef = useRef(null);

  const show = useCallback(() => {
    clearTimeout(timerRef.current);
    setMounted(true);
    // One rAF so the element is in the DOM before the open class is added,
    // giving the CSS transition something to animate FROM.
    requestAnimationFrame(() => setOpen(true));
  }, []);

  const hide = useCallback((delay = 0) => {
    clearTimeout(timerRef.current);
    setOpen(false);
    // Keep the node mounted for the exit transition (220 ms) + optional delay.
    timerRef.current = setTimeout(() => setMounted(false), delay + 230);
  }, []);

  // Dismiss on click-outside (click trigger only)
  useEffect(() => {
    if (trigger !== 'click') return;
    const onDown = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) hide(0);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [trigger, hide]);

  // Dismiss on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') hide(0); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, hide]);

  // Timer cleanup on unmount
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Event bindings for the wrapper element
  const triggerProps =
    trigger === 'click'
      ? { onClick: () => (open ? hide(0) : show()) }
      : { onMouseEnter: show, onMouseLeave: () => hide(80) };

  // Keep the floating panel itself hoverable so moving from trigger → panel
  // does not close it (hover trigger only).
  const panelProps =
    trigger === 'hover'
      ? { onMouseEnter: show, onMouseLeave: () => hide(80) }
      : {};

  const minWidthStyle =
    typeof minWidth === 'number' ? `${minWidth}px` : minWidth;

  return (
    <span
      className={`popover-wrap${className ? ` ${className}` : ''}`}
      ref={wrapRef}
      {...triggerProps}
    >
      {children}

      {mounted && (
        <div
          className={`popover popover--${placement}${open ? ' is-open' : ''}`}
          role="dialog"
          aria-modal="false"
          style={{ minWidth: minWidthStyle }}
          {...panelProps}
        >
          <div className="popover__content">{content}</div>
        </div>
      )}
    </span>
  );
};

// ─── Composable sub-components ────────────────────────────────────────────────

/**
 * A single action row inside a popover.
 * Renders as <a> when `href` is supplied, otherwise as <button>.
 *
 * Props: icon, label, danger, onClick, href
 */
export const PopoverItem = ({ icon, label, danger = false, onClick, href }) => {
  const cls = `popover__item${danger ? ' popover__item--danger' : ''}`;
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {icon && <span className="popover__icon">{icon}</span>}
        <span>{label}</span>
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {icon && <span className="popover__icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

/** Full-width 1 px horizontal separator between sections. */
export const PopoverDivider = () => <div className="popover__divider" />;

/**
 * A row with a label on the left and a control on the right.
 * Matches the "Active Counterparty" toggle-row pattern from Figma.
 *
 * Props: label (string), children (toggle control)
 */
export const PopoverToggleRow = ({ label, children }) => (
  <div className="popover__toggle-row">
    <span>{label}</span>
    {children}
  </div>
);

export default Popover;

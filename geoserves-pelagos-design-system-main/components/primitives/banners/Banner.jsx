import React, { useState, useRef, useCallback } from 'react';
import './Banner.scss';

// ─── Shared SVG icons ────────────────────────────────────────────────────────
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const TYPE_ICONS = { info: InfoIcon, success: SuccessIcon, warning: WarningIcon, error: ErrorIcon };

// ─── Shared dismiss hook (Ant Design smooth unmount pattern) ─────────────────
function useDismiss(onClose) {
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);

  const dismiss = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const h = el.offsetHeight;
    el.style.overflow   = 'hidden';
    el.style.height     = h + 'px';
    // Force a reflow so the next rAF actually transitions
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight;
    el.style.transition = 'height 300ms ease, opacity 300ms ease, padding 300ms ease, margin 300ms ease';
    requestAnimationFrame(() => {
      el.style.height  = '0';
      el.style.opacity = '0';
      el.style.padding = '0';
      el.style.margin  = '0';
    });
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 310);
  }, [onClose]);

  return { visible, ref, dismiss };
}

// ─────────────────────────────────────────────────────────────────────────────
// Alert — Info Banner (strip-style contextual alert)
//
// Props:
//   type        'info' | 'success' | 'warning' | 'error'   default: 'info'
//   size        'lg' | 'sm'                                  default: 'lg'
//   title       string   — bold title line (optional)
//   description string   — secondary description text
//   showIcon    boolean  — show left type icon               default: true
//   closable    boolean  — show × dismiss button             default: false
//   action      ReactNode — custom action in the right slot
//   onClose     function — called after dismiss animation
//
// Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/?node-id=7271-15730
// Reference: Ant Design Alert (smooth unmount animation)
// ─────────────────────────────────────────────────────────────────────────────
export const Alert = ({
  type = 'info',
  size = 'lg',
  title,
  description,
  showIcon = true,
  closable = false,
  action,
  onClose,
}) => {
  const { visible, ref, dismiss } = useDismiss(onClose);
  if (!visible) return null;

  const Icon = TYPE_ICONS[type] || InfoIcon;

  return (
    <div
      ref={ref}
      className={`gs-alert gs-alert--${type} gs-alert--${size}`}
      role="alert"
      aria-live="polite"
    >
      {showIcon && (
        <span className="gs-alert__icon" aria-hidden="true">
          <Icon />
        </span>
      )}

      <div className="gs-alert__body">
        {title       && <p className="gs-alert__title">{title}</p>}
        {description && <p className="gs-alert__desc">{description}</p>}
      </div>

      {action && <div className="gs-alert__action">{action}</div>}

      {closable && (
        <button
          className="gs-alert__close"
          onClick={dismiss}
          aria-label="Dismiss"
          type="button"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Banner — General announcement banner
//
// Props:
//   title       string    — headline (18 px semibold)
//   description string    — body copy (14 px regular, optional)
//   icon        ReactNode — left icon slot (optional, shows 42 px circle)
//   primaryAction   { label, onClick } — filled primary button
//   secondaryAction { label, onClick } — outlined secondary button
//   closable    boolean   — show × dismiss button             default: true
//   onClose     function  — called after dismiss animation
//
// Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/?node-id=9192-1614
// ─────────────────────────────────────────────────────────────────────────────
export const Banner = ({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  closable = true,
  onClose,
}) => {
  const { visible, ref, dismiss } = useDismiss(onClose);
  if (!visible) return null;

  return (
    <div ref={ref} className="gs-banner" role="banner">
      <div className="gs-banner__inner">
        {icon && (
          <span className="gs-banner__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <div className="gs-banner__body">
          {title       && <p className="gs-banner__title">{title}</p>}
          {description && <p className="gs-banner__desc">{description}</p>}
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="gs-banner__actions">
            {secondaryAction && (
              <button
                type="button"
                className="gs-banner__btn gs-banner__btn--secondary"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                type="button"
                className="gs-banner__btn gs-banner__btn--primary"
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        )}

        {closable && (
          <button
            className="gs-banner__close"
            onClick={dismiss}
            aria-label="Dismiss"
            type="button"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;

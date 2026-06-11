import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import './Toast.scss';

/**
 * Pelagos Toast — primitives/toast
 * Figma: TOLfBpRePgynqwvDVp6fg3 · node 660-7012
 *
 * Variants: blank | loading | success | error | warning | notification | neutral
 *
 * Usage:
 *   const { toast } = useToast();
 *   toast.success({ title: 'Saved', desc: 'Changes saved successfully' });
 *   toast.neutral({ title: 'Deleted', desc: 'Item removed', dismissible: true });
 */

// ── Icons ─────────────────────────────────────────────────────────────────

const IconSuccess = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="var(--prim-green-700)" />
    <path d="M7.5 12.5l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconError = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="var(--prim-red-600)" />
    <path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconWarning = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      fill="var(--prim-orange-600)" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="#fff" />
  </svg>
);

const IconNotification = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="var(--prim-blue-900)" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="var(--prim-blue-900)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="6" r="3" fill="var(--prim-red-500)" />
  </svg>
);

const IconNeutral = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" stroke="var(--prim-grey-400)" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 6l-1 14H6L5 6" stroke="var(--prim-grey-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11v6M14 11v6" stroke="var(--prim-grey-400)" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 6V4h6v2" stroke="var(--prim-grey-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSpinner = () => (
  <svg className="toast__spinner" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="var(--prim-grey-200)" strokeWidth="2.5" />
    <path d="M12 3a9 9 0 0 1 9 9" stroke="var(--prim-grey-600)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ── Single Toast ──────────────────────────────────────────────────────────

const VARIANT_ICONS = {
  success:      <IconSuccess />,
  error:        <IconError />,
  warning:      <IconWarning />,
  notification: <IconNotification />,
  neutral:      <IconNeutral />,
  loading:      <IconSpinner />,
  blank:        null,
};

export function Toast({ id, variant = 'blank', title, desc, dismissible = false, onDismiss, exiting = false }) {
  const hasIcon = variant !== 'blank';

  return (
    <div
      className={`toast toast--${variant}${exiting ? ' is-exiting' : ''}`}
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      {hasIcon && (
        <span className="toast__icon">
          {VARIANT_ICONS[variant]}
        </span>
      )}

      <div className="toast__content">
        {title && <span className="toast__title">{title}</span>}
        {desc  && <span className="toast__desc">{desc}</span>}
        {!title && !desc && <span className="toast__title">{variant === 'loading' ? 'Loading…' : 'Blank Toast'}</span>}
      </div>

      {dismissible && (
        <button className="toast__dismiss" onClick={() => onDismiss?.(id)} aria-label="Dismiss notification">
          <IconClose />
        </button>
      )}
    </div>
  );
}

// ── Toast Manager (context + reducer) ────────────────────────────────────

const ToastContext = createContext(null);

let _nextId = 0;

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':    return [...state, action.toast];
    case 'EXIT':   return state.map(t => t.id === action.id ? { ...t, exiting: true } : t);
    case 'REMOVE': return state.filter(t => t.id !== action.id);
    default:       return state;
  }
}

export function ToastProvider({ children, duration = 4000 }) {
  const [toasts, dispatch] = useReducer(reducer, []);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id]);
    dispatch({ type: 'EXIT', id });
    setTimeout(() => dispatch({ type: 'REMOVE', id }), 250);
  }, []);

  const show = useCallback((opts) => {
    const id = ++_nextId;
    const toast = { id, exiting: false, dismissible: false, ...opts };
    dispatch({ type: 'ADD', toast });
    const ms = opts.duration ?? duration;
    if (ms > 0) {
      timers.current[id] = setTimeout(() => dismiss(id), ms);
    }
    return id;
  }, [dismiss, duration]);

  const toast = {
    show,
    blank:        (o) => show({ variant: 'blank',        ...o }),
    loading:      (o) => show({ variant: 'loading',      duration: 0, ...o }),
    success:      (o) => show({ variant: 'success',      ...o }),
    error:        (o) => show({ variant: 'error',        ...o }),
    warning:      (o) => show({ variant: 'warning',      ...o }),
    notification: (o) => show({ variant: 'notification', ...o }),
    neutral:      (o) => show({ variant: 'neutral',      dismissible: true, ...o }),
    dismiss,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-container" aria-label="Notifications" role="region">
        {toasts.map(t => (
          <Toast key={t.id} {...t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return { toast: ctx };
}

export default Toast;

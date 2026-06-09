import React, { useEffect, useRef, useState } from 'react';
import './Modal.scss';

// ─── Illustration paths ───────────────────────────────────────────────────────
const ILLUSTRATIONS = {
  success:      '../../../Assets/illustrations/img-success.svg',
  delete:       '../../../Assets/illustrations/img-delete.svg',
  discard:      '../../../Assets/illustrations/img-delete.svg',
  'yes-no':     '../../../Assets/illustrations/img-calendar.svg',
  cancellation: '../../../Assets/illustrations/img-warning.svg',
};

// ─── Per-variant button configuration ────────────────────────────────────────
const VARIANT_CONFIG = {
  success: {
    confirmLabel: 'OK',
    confirmType:  'primary',   // blue fill
    showCancel:   false,
    showRemarks:  false,
  },
  delete: {
    cancelLabel:  'Cancel',
    confirmLabel: 'Delete',
    confirmType:  'danger',    // red fill
    showCancel:   true,
    showRemarks:  false,
  },
  discard: {
    cancelLabel:  'Cancel',
    confirmLabel: 'Discard',
    confirmType:  'primary',
    showCancel:   true,
    showRemarks:  false,
  },
  'yes-no': {
    cancelLabel:  'No, I will select myself',
    confirmLabel: 'Yes',
    confirmType:  'primary',
    showCancel:   true,
    showRemarks:  false,
  },
  cancellation: {
    cancelLabel:  'Close',
    confirmLabel: 'Yes, Cancel',
    confirmType:  'danger',
    showCancel:   true,
    showRemarks:  true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ConfirmModal
//
// Confirmation dialogs with illustration, centred text, and horizontal buttons.
//
// Props:
//   open            boolean             controls visibility
//   onClose         function            called on × / cancel / backdrop click
//   onConfirm       function({ remarks }) called on primary action button
//   variant         string              'success' | 'delete' | 'discard' |
//                                        'yes-no' | 'cancellation'
//   title           string              heading
//   message         string | ReactNode  body description
//   confirmLabel    string              override primary button label
//   cancelLabel     string              override cancel/secondary button label
//   illustration    string              override illustration src (URL or path)
//   remarksLabel    string              textarea label (default 'Remarks')
//   remarksMax      number              max textarea chars (default 500)
//
// Design reference: /pages/panel-modals.html
// Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=11463-3626
// ─────────────────────────────────────────────────────────────────────────────
export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  variant = 'delete',
  title,
  message,
  confirmLabel,
  cancelLabel,
  illustration,
  remarksLabel = 'Remarks',
  remarksMax = 500,
}) => {
  const [remarks, setRemarks] = useState('');
  const ref = useRef(null);

  const cfg = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.delete;
  const imgSrc      = illustration ?? ILLUSTRATIONS[variant];
  const primaryLabel  = confirmLabel  ?? cfg.confirmLabel;
  const secondaryLabel = cancelLabel  ?? cfg.cancelLabel;

  useEffect(() => {
    if (!open) { setRemarks(''); return; }
    const prev = document.activeElement;
    ref.current?.focus();
    const onKey = e => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div
        className="modal modal--sm modal--confirm"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        tabIndex={-1}
      >
        {/* Close button — top-right only, no title bar */}
        <div className="modal__confirm-header">
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Illustration + centred text */}
        <div className="modal__confirm-body">
          {imgSrc && (
            <div className="modal__illustration" aria-hidden="true">
              <img src={imgSrc} alt="" />
            </div>
          )}

          <div className="modal__confirm-text">
            {title && (
              <h2 id="confirm-modal-title" className="modal__confirm-title">
                {title}
              </h2>
            )}
            {message && (
              <p className="modal__confirm-desc">{message}</p>
            )}
          </div>

          {/* Remarks textarea — cancellation variant */}
          {cfg.showRemarks && (
            <div className="modal__remarks">
              <label className="modal__remarks-label" htmlFor="confirm-remarks">
                {remarksLabel}
                <span className="modal__remarks-required" aria-hidden="true"> *</span>
              </label>
              <textarea
                id="confirm-remarks"
                className="modal__remarks-textarea"
                placeholder={`Add ${remarksLabel}`}
                maxLength={remarksMax}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                rows={4}
              />
              <span className="modal__remarks-count">
                {remarks.length}/{remarksMax}
              </span>
            </div>
          )}
        </div>

        {/* Horizontal footer buttons — equal width */}
        <div className="modal__confirm-footer">
          {cfg.showCancel && (
            <button
              type="button"
              className="modal__confirm-btn modal__confirm-btn--cancel"
              onClick={onClose}
            >
              {secondaryLabel}
            </button>
          )}
          <button
            type="button"
            className={`modal__confirm-btn modal__confirm-btn--${cfg.confirmType}`}
            onClick={() => onConfirm?.({ remarks })}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Modal — general purpose overlay
//
// Props: open, onClose, title, size, footer, children
// ─────────────────────────────────────────────────────────────────────────────
export const Modal = ({ open, onClose, title, size = 'md', footer, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    ref.current?.focus();
    const onKey = e => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className={`modal modal--${size}`} ref={ref} role="dialog" aria-modal="true"
        aria-labelledby="modal-title" tabIndex={-1}>
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;

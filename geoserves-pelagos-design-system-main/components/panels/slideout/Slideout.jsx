import React, { useEffect, useRef } from 'react';
import './Slideout.scss';

/**
 * Pelagos Slideout (Drawer) — panels/slideout
 * Props: open, onClose, title, side ('right'|'left'), width, footer, children
 * Design reference: /pages/panel-slideout.html
 */
export const Slideout = ({ open, onClose, title, side = 'right', width = 480, footer, children }) => {
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

  return (
    <>
      {open && <div className="slideout-overlay" onClick={onClose} />}
      <div
        className={['slideout', `slideout--${side}`, open ? 'slideout--open' : ''].filter(Boolean).join(' ')}
        style={{ '--slideout-width': `${width}px` }}
        ref={ref} role="dialog" aria-modal="true"
        aria-labelledby="slideout-title" tabIndex={-1}>
        <div className="slideout__header">
          <h2 id="slideout-title" className="slideout__title">{title}</h2>
          <button className="slideout__close" onClick={onClose} aria-label="Close panel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="slideout__body">{children}</div>
        {footer && <div className="slideout__footer">{footer}</div>}
      </div>
    </>
  );
};
export default Slideout;

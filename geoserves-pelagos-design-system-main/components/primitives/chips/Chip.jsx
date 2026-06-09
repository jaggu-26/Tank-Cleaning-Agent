import React from 'react';
import './Chip.scss';

/**
 * Pelagos Chip — primitives/chips
 * Props: label, variant, selected, onRemove, onClick, disabled
 * Design reference: /pages/prim-chips.html
 */
export const Chip = ({ label, variant = 'default', selected = false, onRemove, onClick, disabled = false }) => (
  <span
    className={['chip', `chip--${variant}`, selected ? 'chip--selected' : '', disabled ? 'chip--disabled' : ''].filter(Boolean).join(' ')}
    onClick={!disabled ? onClick : undefined}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick && !disabled ? 0 : undefined}
  >
    <span className="chip__label">{label}</span>
    {onRemove && (
      <button className="chip__remove" onClick={e => { e.stopPropagation(); onRemove(); }} aria-label={`Remove ${label}`} disabled={disabled}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    )}
  </span>
);
export default Chip;

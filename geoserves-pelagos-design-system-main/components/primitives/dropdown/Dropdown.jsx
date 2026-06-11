import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.scss';

/**
 * Pelagos Dropdown — primitives/dropdown
 * Props: options [{ value, label }], value, onChange, placeholder, disabled
 * Design reference: /pages/prim-dropdowns.html
 */
export const Dropdown = ({ options = [], value, onChange, placeholder = 'Select…', disabled = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={['dropdown', open ? 'dropdown--open' : '', disabled ? 'dropdown--disabled' : ''].filter(Boolean).join(' ')} ref={ref}>
      <button className="dropdown__trigger" onClick={() => !disabled && setOpen(v => !v)} disabled={disabled} aria-haspopup="listbox" aria-expanded={open}>
        <span className={selected ? '' : 'dropdown__placeholder'}>{selected ? selected.label : placeholder}</span>
        <svg className="dropdown__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <ul className="dropdown__menu" role="listbox">
          {options.map(opt => (
            <li key={opt.value} className={['dropdown__option', opt.value === value ? 'dropdown__option--selected' : ''].filter(Boolean).join(' ')}
              role="option" aria-selected={opt.value === value}
              onClick={() => { onChange?.(opt.value); setOpen(false); }}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;

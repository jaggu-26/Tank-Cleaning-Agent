import React, { useId } from 'react';
import './Toggle.scss';

/**
 * Pelagos Toggle/Switch — primitives/toggle
 * Design reference: /pages/prim-toggles.html
 */
export const Toggle = ({ label, checked, onChange, disabled = false, size = 'md', id: idProp, ...rest }) => {
  const generatedId = useId();
  const id = idProp || generatedId;
  return (
    <label className={['toggle', `toggle--${size}`, disabled ? 'toggle--disabled' : ''].filter(Boolean).join(' ')} htmlFor={id}>
      <span className="toggle__track">
        <input id={id} type="checkbox" className="toggle__input" checked={checked} onChange={onChange} disabled={disabled} role="switch" aria-checked={checked} {...rest} />
        <span className="toggle__thumb" aria-hidden="true" />
      </span>
      {label && <span className="toggle__label">{label}</span>}
    </label>
  );
};
export default Toggle;

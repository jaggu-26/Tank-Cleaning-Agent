import React, { useId } from 'react';
import './Radio.scss';

/**
 * Pelagos Radio — primitives/radio
 * Design reference: /pages/prim-radio.html
 */
export const Radio = ({ label, value, checked, onChange, name, disabled = false, id: idProp, ...rest }) => {
  const generatedId = useId();
  const id = idProp || generatedId;
  return (
    <label className={['radio', disabled ? 'radio--disabled' : ''].filter(Boolean).join(' ')} htmlFor={id}>
      <span className="radio__control">
        <input id={id} type="radio" className="radio__input" value={value} checked={checked}
          onChange={onChange} name={name} disabled={disabled} {...rest} />
        <span className="radio__circle" aria-hidden="true" />
      </span>
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
};
export default Radio;

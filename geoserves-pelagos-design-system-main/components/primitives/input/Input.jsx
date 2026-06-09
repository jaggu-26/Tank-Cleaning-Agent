import React, { useState, useId } from 'react';
import './Input.scss';

/**
 * Pelagos Input (Text Field) — primitives/input
 *
 * Props:
 *   label        string
 *   placeholder  string
 *   helperText   string
 *   errorText    string
 *   size         'sm' | 'lg'
 *   disabled     boolean
 *   readOnly     boolean
 *   required     boolean
 *   iconLeft     ReactNode
 *   iconRight    ReactNode
 *   value        string
 *   onChange     function
 *
 * Design reference: /pages/prim-textfields.html
 */
export const Input = ({
  label,
  placeholder,
  helperText,
  errorText,
  size = 'lg',
  disabled = false,
  readOnly = false,
  required = false,
  iconLeft,
  iconRight,
  value,
  onChange,
  type = 'text',
  id: idProp,
  ...rest
}) => {
  const generatedId = useId();
  const id = idProp || generatedId;
  const hasError = Boolean(errorText);

  const wrapClass = [
    'input-field',
    `input-field--${size}`,
    hasError ? 'input-field--error' : '',
    disabled ? 'input-field--disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapClass}>
      {label && (
        <label className="input-field__label" htmlFor={id}>
          {label}
          {required && <span className="input-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <div className="input-field__control">
        {iconLeft && <span className="input-field__icon input-field__icon--left">{iconLeft}</span>}
        <input
          id={id}
          type={type}
          className="input-field__input"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          value={value}
          onChange={onChange}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...rest}
        />
        {iconRight && <span className="input-field__icon input-field__icon--right">{iconRight}</span>}
      </div>
      {hasError && (
        <p id={`${id}-error`} className="input-field__helper input-field__helper--error" role="alert">
          {errorText}
        </p>
      )}
      {!hasError && helperText && (
        <p id={`${id}-helper`} className="input-field__helper">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;

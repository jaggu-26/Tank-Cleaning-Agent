import React, { useState, useRef } from 'react';

/**
 * SearchField — Pelagos Design System
 * primitives/search · Search & Filter system
 *
 * Design tokens:
 *   Border:     --prim-grey-100 → --prim-marine (focused/has-value)
 *   Background: --prim-grey-10  → #fff (focused/has-value)
 *   Placeholder: --prim-grey-300
 *   Text:        --prim-grey-900
 *   Focus ring:  0 0 0 3px rgba(24,82,254,.08)
 *   Icon:        14×14px, stroke --prim-grey-300, left 9px
 *   Clear btn:   16px circle, --prim-grey-200 bg, right 8px
 *
 * Design reference: /pages/prim-search.html#sf-d-search
 * Figma:  Design-System → Primitives → Search & Filter
 *
 * Props:
 *   value         string        Controlled value
 *   onChange      (v) => void   Called on every keystroke
 *   onClear       () => void    Called when clear button clicked
 *   placeholder   string        Defaults to "Search"
 *   width         number|string Defaults to 210 (px)
 *   className     string        Extra class names
 */
export function SearchField({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search',
  width = 210,
  className = '',
}) {
  const inputRef = useRef(null);
  const hasValue = value.length > 0;

  const handleClear = () => {
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={`sf-search-wrap ${className}`} style={{ display: 'inline-flex', position: 'relative', alignItems: 'center' }}>
      {/* Magnifier icon */}
      <svg
        className="sf-search-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ position:'absolute', left:9, width:14, height:14, stroke:'var(--prim-grey-300,#94a3b8)', fill:'none', strokeWidth:1.8, strokeLinecap:'round', pointerEvents:'none' }}
      >
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        className={`sf-search-input${hasValue ? ' has-value' : ''}`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        style={{ width }}
      />

      {/* Clear button — visible when has-value */}
      {hasValue && (
        <button
          className="sf-search-clear"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
          style={{ position:'absolute', right:8 }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}

/**
 * Uncontrolled search wrapper — manages its own state.
 * Use when you only need the debounced query value externally.
 *
 * Props:
 *   onSearch      (query: string) => void   Debounced callback
 *   debounce      number   ms debounce delay (default 280)
 *   placeholder   string
 *   width         number|string
 */
export function Search({ onSearch, debounce = 280, placeholder = 'Search', width = 210 }) {
  const [value, setValue] = useState('');
  const timerRef = useRef(null);

  const handleChange = (v) => {
    setValue(v);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch?.(v), debounce);
  };

  const handleClear = () => {
    setValue('');
    clearTimeout(timerRef.current);
    onSearch?.('');
  };

  return (
    <SearchField
      value={value}
      onChange={handleChange}
      onClear={handleClear}
      placeholder={placeholder}
      width={width}
    />
  );
}

export default Search;

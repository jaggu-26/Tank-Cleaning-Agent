import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Slider.scss';

/**
 * Pelagos Slider — primitives/slider
 *
 * Props:
 *   min, max, step   number
 *   value            number (controlled)
 *   defaultValue     number (uncontrolled, default 30)
 *   onChange         (value: number) => void
 *   disabled         boolean
 *   showTooltip      boolean — show value bubble above thumb while dragging
 *   marks            Array<{value, label}>
 *
 * Figma: node-id=11866-4068
 * Ref: Ant Design Slider
 */
export const Slider = ({
  min = 0, max = 100, step = 1,
  value: controlled,
  defaultValue = 30,
  onChange,
  disabled = false,
  showTooltip = true,
  marks,
  className = '',
}) => {
  const [val, setVal] = useState(controlled ?? defaultValue);
  const [active, setActive] = useState(false);
  const pct = ((val - min) / (max - min)) * 100;

  useEffect(() => { if (controlled !== undefined) setVal(controlled); }, [controlled]);

  const handle = useCallback(e => {
    const v = parseFloat(e.target.value);
    setVal(v); onChange?.(v);
  }, [onChange]);

  return (
    <div className={`gs-slider${disabled ? ' gs-slider--disabled' : ''}${active ? ' gs-slider--active' : ''} ${className}`}>
      <div className="gs-slider__track-wrap">
        {/* Visual track */}
        <div className="gs-slider__track" aria-hidden="true">
          <div className="gs-slider__fill" style={{ width: `${pct}%` }} />
        </div>
        {/* Tooltip */}
        {showTooltip && active && (
          <div className="gs-slider__tip" style={{ left: `${pct}%` }}>
            {Math.round(val)}
          </div>
        )}
        {/* Native range input (invisible, floats above) */}
        <input
          type="range" className="gs-slider__input"
          min={min} max={max} step={step} value={val} disabled={disabled}
          onChange={handle}
          onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)}
          onTouchStart={() => setActive(true)} onTouchEnd={() => setActive(false)}
          aria-valuemin={min} aria-valuemax={max} aria-valuenow={val}
        />
      </div>
      {marks && (
        <div className="gs-slider__marks" aria-hidden="true">
          {marks.map(m => (
            <span key={m.value} className={`gs-slider__mark${val >= m.value ? ' gs-slider__mark--active' : ''}`}
              style={{ left: `${((m.value - min) / (max - min)) * 100}%` }}>
              {m.label && <span className="gs-slider__mark-label">{m.label}</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * RangeSlider — dual-thumb range selection
 *
 * Props: min, max, step, values=[lo,hi], defaultValues, onChange, disabled, showTooltip
 */
export const RangeSlider = ({
  min = 0, max = 100, step = 1,
  values: controlled,
  defaultValues = [20, 80],
  onChange,
  disabled = false,
  showTooltip = true,
  className = '',
}) => {
  const [vals, setVals] = useState(controlled ?? defaultValues);
  const [active, setActive] = useState(null); // 'lo' | 'hi'
  const [lo, hi] = vals;
  const loPct = ((lo - min) / (max - min)) * 100;
  const hiPct = ((hi - min) / (max - min)) * 100;

  useEffect(() => { if (controlled) setVals(controlled); }, [controlled]);

  const handleLo = useCallback(e => {
    const v = Math.min(parseFloat(e.target.value), hi - step);
    const next = [v, hi]; setVals(next); onChange?.(next);
  }, [hi, step, onChange]);

  const handleHi = useCallback(e => {
    const v = Math.max(parseFloat(e.target.value), lo + step);
    const next = [lo, v]; setVals(next); onChange?.(next);
  }, [lo, step, onChange]);

  return (
    <div className={`gs-slider gs-slider--range${disabled ? ' gs-slider--disabled' : ''} ${className}`}>
      <div className="gs-slider__track-wrap">
        <div className="gs-slider__track" aria-hidden="true">
          <div className="gs-slider__fill gs-slider__fill--range"
            style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }} />
        </div>
        {showTooltip && active === 'lo' && <div className="gs-slider__tip" style={{ left: `${loPct}%` }}>{Math.round(lo)}</div>}
        {showTooltip && active === 'hi' && <div className="gs-slider__tip" style={{ left: `${hiPct}%` }}>{Math.round(hi)}</div>}
        <input type="range" className="gs-slider__input gs-slider__input--lo"
          min={min} max={max} step={step} value={lo} disabled={disabled}
          onChange={handleLo}
          onMouseDown={() => setActive('lo')} onMouseUp={() => setActive(null)}
          aria-label="Lower bound" aria-valuemin={min} aria-valuemax={hi} aria-valuenow={lo} />
        <input type="range" className="gs-slider__input gs-slider__input--hi"
          min={min} max={max} step={step} value={hi} disabled={disabled}
          onChange={handleHi}
          onMouseDown={() => setActive('hi')} onMouseUp={() => setActive(null)}
          aria-label="Upper bound" aria-valuemin={lo} aria-valuemax={max} aria-valuenow={hi} />
      </div>
    </div>
  );
};

export default Slider;

import React from 'react';

/**
 * Spinner — Pelagos Design System
 * primitives/spinner · Loading / progress indicator
 *
 * Architecture: two-layer CSS pseudo-elements — zero extra DOM nodes.
 *   ::before  → TRACK  — static full-circle ring (does NOT rotate)
 *   ::after   → ARC    — ~270° handle that rotates (0.72s linear infinite)
 *
 * The track stays fixed at all times. Only the arc sweeps around it.
 *
 * Design reference: /pages/loading-spinner.html
 * CSS source:       /pages/loading-spinner.html <style> block
 *                   (.gs-spinner, .gs-spinner--{size}, .gs-spinner--{variant})
 *
 * Props:
 *   size        'sm' | 'md' | 'lg' | 'xl'          default: 'md'
 *   variant     'brand' | 'white' | 'muted'         default: 'brand'
 *   label       string   Accessible text (aria-label + optional visible label)
 *   showLabel   boolean  Render label text beside the spinner  default: false
 *   className   string   Extra classes on the root element
 */
export function Spinner({
  size      = 'md',
  variant   = 'brand',
  label     = 'Loading',
  showLabel = false,
  className = '',
}) {
  const spinnerEl = (
    <div
      className={[
        'gs-spinner',
        `gs-spinner--${size}`,
        `gs-spinner--${variant}`,
        className,
      ].filter(Boolean).join(' ')}
      role="status"
      aria-label={showLabel ? undefined : label}
      aria-hidden={showLabel ? true : undefined}
    />
  );

  if (showLabel) {
    return (
      <div className="gs-spinner-row" role="status" aria-label={label}>
        {spinnerEl}
        <span>{label}</span>
      </div>
    );
  }

  return spinnerEl;
}

export default Spinner;

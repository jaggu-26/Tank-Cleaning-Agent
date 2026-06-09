import React, { useState } from 'react';
import './Tooltip.scss';

/**
 * Pelagos Tooltip — primitives/tooltip
 *
 * Props:
 *   content    string | ReactNode  — tooltip text
 *   placement  'top'|'bottom'|'left'|'right'  (default 'top')
 *   mode       'dark'|'light'                  (default 'dark')
 *   showArrow  boolean                          (default true)
 *   children   ReactNode                        — trigger element
 *
 * Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/?node-id=6209-492
 *
 * Dark  — bg #001e4c (primary/navy), white text, shadow-xs
 * Light — bg #ffffff, grey/700 text, drop-shadow 0 0 2px rgba(0,0,0,0.16)
 * Arrow — 16×8px triangle (top/bottom), 8×16px (left/right)
 *         always points toward the trigger element
 */
export const Tooltip = ({
  content,
  placement  = 'top',
  mode       = 'dark',
  showArrow  = true,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="gs-tt-wrap"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <span
          className={[
            'gs-tt',
            `gs-tt--${placement}`,
            `gs-tt--${mode}`,
            showArrow && 'gs-tt--arrow',
          ].filter(Boolean).join(' ')}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;

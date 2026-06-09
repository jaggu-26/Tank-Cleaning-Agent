import React, { useRef, useCallback } from 'react';
import './Scroll.scss';

/**
 * Pelagos Scroll — primitives/scroll
 *
 * Show-on-hover: JS sets CSS custom properties (--scroll-handle, --scroll-track-active)
 * on mouseenter/leave. CSS var() cascades into ::-webkit-scrollbar pseudo-elements,
 * which is reliable across modern Chrome — unlike parent:hover → scrollbar selectors.
 *
 * Width expand (6px → 10px): .gs-scroll--hover class added on mouseenter.
 * CSS transitions cannot animate ::-webkit-scrollbar-width directly.
 *
 * Props:
 *   direction  'vertical' | 'horizontal' | 'both'   (default: 'vertical')
 *   theme      'light' | 'dark'                      (default: 'light')
 *   maxHeight  string  — CSS max-height for vertical scroll
 *   maxWidth   string  — CSS max-width  for horizontal scroll
 *   className  string
 *   children   ReactNode
 *
 * Design reference: /pages/prim-scroll.html
 * Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/?node-id=1087-4781
 */
export const Scroll = ({
  direction = 'vertical',
  theme     = 'light',
  maxHeight,
  maxWidth,
  className = '',
  style,
  children,
  ...rest
}) => {
  const ref = useRef(null);

  const onEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Inject CSS custom properties — these cascade into ::-webkit-scrollbar
    el.style.setProperty('--scroll-handle',        '#94a3b8');
    el.style.setProperty('--scroll-track-active',  'rgba(226,232,240,0.35)');
    el.classList.add('gs-scroll--hover');        // for 10px width expand
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--scroll-handle',       'transparent');
    el.style.setProperty('--scroll-track-active', 'transparent');
    el.classList.remove('gs-scroll--hover');
  }, []);

  const classes = [
    'gs-scroll',
    `gs-scroll--${direction}`,
    `gs-scroll--${theme}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ maxHeight, maxWidth, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Scroll;

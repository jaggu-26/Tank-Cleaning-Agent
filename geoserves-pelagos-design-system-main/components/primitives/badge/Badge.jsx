import React from 'react';
import './Badge.scss';

/**
 * Pelagos Badge — primitives/badge
 * Props: variant, size, dot, children
 * Design reference: /pages/prim-badge.html
 */
export const Badge = ({ variant = 'default', size = 'md', dot = false, children }) => (
  <span className={['badge', `badge--${variant}`, `badge--${size}`, dot ? 'badge--dot' : ''].filter(Boolean).join(' ')}>
    {dot && <span className="badge__dot" aria-hidden="true" />}
    {children}
  </span>
);
export default Badge;

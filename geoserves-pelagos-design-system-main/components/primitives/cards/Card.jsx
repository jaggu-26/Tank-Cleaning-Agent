import React from 'react';
import './Card.scss';

/**
 * Pelagos Card — primitives/cards
 * Props: header, footer, padding, interactive, children
 * Design reference: /pages/prim-cards.html
 */
export const Card = ({ header, footer, padding = 'md', interactive = false, onClick, children, className = '' }) => (
  <div className={['card', `card--pad-${padding}`, interactive ? 'card--interactive' : '', className].filter(Boolean).join(' ')}
    onClick={onClick} role={interactive ? 'button' : undefined} tabIndex={interactive ? 0 : undefined}>
    {header && <div className="card__header">{header}</div>}
    <div className="card__body">{children}</div>
    {footer && <div className="card__footer">{footer}</div>}
  </div>
);
export default Card;

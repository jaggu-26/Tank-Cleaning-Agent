import React from 'react';
import './Pagination.scss';

/**
 * Pelagos Pagination — navigations/pagination
 * Props: page, totalPages, onChange, siblingCount
 * Design reference: /pages/nav-pagination.html
 */
export const Pagination = ({ page, totalPages, onChange, siblingCount = 1 }) => {
  const pages = [];
  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const left  = Math.max(2, page - siblingCount);
  const right = Math.min(totalPages - 1, page + siblingCount);
  pages.push(1);
  if (left > 2)             pages.push('…');
  pages.push(...range(left, right));
  if (right < totalPages - 1) pages.push('…');
  if (totalPages > 1)       pages.push(totalPages);

  const ChevL = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
  const ChevR = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="pagination__btn" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous"><ChevL /></button>
      {pages.map((p, i) =>
        p === '…'
          ? <span key={`e${i}`} className="pagination__ellipsis">…</span>
          : <button key={p} className={['pagination__page', p === page ? 'pagination__page--active' : ''].filter(Boolean).join(' ')}
              onClick={() => onChange(p)} aria-current={p === page ? 'page' : undefined}>{p}</button>
      )}
      <button className="pagination__btn" onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next"><ChevR /></button>
    </nav>
  );
};
export default Pagination;

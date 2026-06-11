import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * ══════════════════════════════════════════════════════════════════
 * Search & Filter — Pelagos Design System
 * primitives/search/SearchFilter.jsx
 *
 * Exports:
 *   StatusFilterChips   — single-select chip group
 *   SearchField         — see Search.jsx
 *   FilterButton        — icon button with count badge
 *   FilterPanel         — slide-in overlay with dropdown + multi-select fields
 *   SearchFilter        — composite (all four wired together)
 *
 * Design reference: /pages/prim-search.html
 * Token source:     foundations/colors.css · foundations/spacing.css
 * ══════════════════════════════════════════════════════════════════
 */

// ─── StatusFilterChips ────────────────────────────────────────────
/**
 * @typedef {{ id: string, label: string, count: number, dividerBefore?: boolean }} ChipItem
 *
 * Props:
 *   chips      ChipItem[]
 *   activeId   string
 *   onChange   (id: string) => void
 */
export function StatusFilterChips({ chips = [], activeId, onChange }) {
  const handleKey = (e, chip) => {
    const items = chips.filter(c => !c.dividerBefore || c);
    const idx   = chips.findIndex(c => c.id === chip.id);
    if (e.key === 'ArrowRight') {
      const next = chips[idx + 1];
      if (next) { onChange(next.id); }
    } else if (e.key === 'ArrowLeft') {
      const prev = chips[idx - 1];
      if (prev) { onChange(prev.id); }
    }
  };

  return (
    <div
      className="sf-chip-row"
      role="tablist"
      aria-label="Filter by status"
      style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'nowrap', overflowX:'auto' }}
    >
      {chips.map((chip) => (
        <React.Fragment key={chip.id}>
          {chip.dividerBefore && (
            <div
              aria-hidden="true"
              style={{ width:1, height:20, background:'var(--prim-grey-100,#e2e8f0)', flexShrink:0 }}
            />
          )}
          <button
            role="tab"
            aria-selected={chip.id === activeId}
            className={`sf-chip${chip.id === activeId ? ' is-active' : ''}`}
            onClick={() => onChange(chip.id)}
            onKeyDown={(e) => handleKey(e, chip)}
          >
            {chip.label}
            {chip.count !== undefined && (
              <span className="sf-chip-count" style={{ opacity:.75, fontSize:11, marginLeft:3 }}>
                ({chip.count})
              </span>
            )}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}


// ─── FilterButton ─────────────────────────────────────────────────
/**
 * Props:
 *   isActive      boolean
 *   activeCount   number   — displayed in the badge when > 0
 *   onClick       () => void
 */
export function FilterButton({ isActive = false, activeCount = 0, onClick }) {
  const showBadge = isActive && activeCount > 0;
  const displayCount = activeCount > 9 ? '9+' : activeCount;

  return (
    <button
      className={`sf-filter-btn${isActive ? ' is-active' : ''}`}
      onClick={onClick}
      type="button"
      aria-label={`Filters${showBadge ? ` — ${activeCount} active` : ''}`}
      aria-haspopup="dialog"
      aria-expanded={isActive}
      style={{
        width:32, height:32, borderRadius:'var(--radius-md,8px)',
        border:`1px solid ${isActive ? 'var(--prim-marine,#1852fe)' : 'var(--prim-grey-100,#e2e8f0)'}`,
        background: isActive ? 'var(--prim-marine,#1852fe)' : '#fff',
        display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', color: isActive ? '#fff' : 'var(--prim-grey-400,#64748b)',
        position:'relative', padding:0, flexShrink:0, transition:'all .12s',
      }}
    >
      {/* Filter icon */}
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <line x1="4" y1="6"  x2="20" y2="6"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
        <line x1="11" y1="18" x2="13" y2="18"/>
      </svg>

      {/* Count badge */}
      {showBadge && (
        <span
          aria-label={`${activeCount} filters active`}
          style={{
            position:'absolute', top:-4, right:-4,
            width:16, height:16, borderRadius:'50%',
            background:'#fff', color:'var(--prim-marine,#1852fe)',
            fontSize:9, fontWeight:700,
            display:'flex', alignItems:'center', justifyContent:'center',
            border:'2px solid var(--prim-marine,#1852fe)',
            lineHeight:1,
          }}
        >
          {displayCount}
        </span>
      )}
    </button>
  );
}


// ─── FilterPanel internals ────────────────────────────────────────

/** Single-select custom dropdown within the Filter Panel */
function CddField({ id, label, options = [], value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <div className="sf-group-label" style={{ fontSize:10.5, fontWeight:700, color:'var(--prim-grey-300,#94a3b8)', textTransform:'uppercase', letterSpacing:.5, marginBottom:6 }}>
        {label}
      </div>
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{
          width:'100%', height:34,
          border:`1.5px solid ${open ? 'var(--prim-marine,#1852fe)' : value ? 'var(--prim-grey-200,#cbd5e1)' : 'var(--prim-grey-100,#e2e8f0)'}`,
          borderRadius:'var(--radius-md,8px)', padding:'0 32px 0 12px',
          fontSize:13, color: value ? 'var(--prim-grey-700,#1e293b)' : 'var(--prim-grey-300,#94a3b8)',
          background:'#fff', cursor:'pointer', display:'flex', alignItems:'center',
          justifyContent:'space-between', textAlign:'left', fontFamily:'inherit',
          boxShadow: open ? '0 0 0 3px rgba(24,82,254,.08)' : 'none',
          transition:'all .15s', position:'relative',
        }}
      >
        <span>{value || 'Select…'}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={open ? 'var(--prim-marine,#1852fe)' : 'var(--prim-grey-300,#94a3b8)'}
          strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"
          style={{ position:'absolute', right:10, transition:'transform .2s', transform: open ? 'rotate(180deg)' : 'none', pointerEvents:'none' }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <div
          role="listbox"
          style={{
            position:'absolute', top:'calc(100% + 4px)', left:0, right:0, zIndex:30,
            background:'#fff', border:'1.5px solid var(--prim-grey-100,#e2e8f0)',
            borderRadius:10, boxShadow:'0 8px 24px rgba(14,26,51,.12)', overflow:'hidden',
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              role="option"
              aria-selected={opt === value}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding:'9px 12px', fontSize:13, cursor:'pointer',
                color: opt === value ? 'var(--prim-marine,#1852fe)' : 'var(--prim-grey-700,#1e293b)',
                background: opt === value ? 'var(--prim-blue-10,#eff6ff)' : '#fff',
                fontWeight: opt === value ? 500 : 400,
                display:'flex', justifyContent:'space-between', alignItems:'center',
                borderBottom:'1px solid var(--prim-grey-50,#f3f4f6)',
              }}
            >
              <span>{opt}</span>
              {opt === value && <span style={{ fontSize:11, fontWeight:700, color:'var(--prim-marine,#1852fe)' }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Multi-select chip field within the Filter Panel */
function MultiField({ id, label, value = [], onChange, placeholder = 'Search…' }) {
  const inputRef = useRef(null);

  const removeChip = (chip) => onChange(value.filter(v => v !== chip));
  const handleKey  = (e) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && value.length > 0) {
      removeChip(value[value.length - 1]);
    }
  };

  return (
    <div>
      <div className="sf-group-label" style={{ fontSize:10.5, fontWeight:700, color:'var(--prim-grey-300,#94a3b8)', textTransform:'uppercase', letterSpacing:.5, marginBottom:6 }}>
        {label}
      </div>
      <div
        style={{
          minHeight:34, border:'1.5px solid var(--prim-grey-100,#e2e8f0)', borderRadius:'var(--radius-md,8px)',
          padding:'4px 8px', display:'flex', flexWrap:'wrap', alignItems:'center', gap:4,
          background:'#fff', cursor:'text',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((v) => (
          <span
            key={v}
            style={{
              display:'inline-flex', alignItems:'center', gap:4, height:22,
              padding:'0 8px 0 10px', borderRadius:20,
              background:'var(--prim-blue-10,#eff6ff)', border:'1px solid var(--prim-blue-100,#bfdbfe)',
              fontSize:11.5, fontWeight:500, color:'var(--prim-blue-700,#1d40af)',
            }}
          >
            {v}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeChip(v); }}
              aria-label={`Remove ${v}`}
              style={{
                width:14, height:14, borderRadius:'50%', border:'none',
                background:'rgba(29,64,175,.12)', cursor:'pointer', display:'flex',
                alignItems:'center', justifyContent:'center', padding:0,
                color:'var(--prim-blue-700,#1d40af)', fontSize:10, lineHeight:1,
              }}
            >
              ✕
            </button>
          </span>
        ))}
        {value.length === 0 && (
          <span style={{ fontSize:12.5, color:'var(--prim-grey-300,#94a3b8)' }}>{placeholder}</span>
        )}
        <input
          ref={inputRef}
          type="text"
          onKeyDown={handleKey}
          style={{ border:'none', outline:'none', fontSize:12.5, fontFamily:'inherit', color:'var(--prim-grey-700,#1e293b)', flex:1, minWidth:60, background:'transparent', opacity: value.length > 0 ? 1 : 0, position: value.length > 0 ? 'static' : 'absolute' }}
          aria-label={`Add ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}


// ─── FilterPanel ──────────────────────────────────────────────────
/**
 * @typedef {{ id: string, label: string, type: 'select'|'multi', options?: string[], placeholder?: string }} FilterField
 *
 * Props:
 *   isOpen       boolean
 *   onClose      () => void
 *   fields       FilterField[]
 *   values       Record<string, any>
 *   onApply      (values: Record<string, any>) => void
 *   onClear      () => void
 *   activeCount  number
 */
export function FilterPanel({ isOpen, onClose, fields = [], values = {}, onApply, onClear, activeCount = 0 }) {
  const [draft, setDraft] = useState({ ...values });
  const panelRef = useRef(null);

  // Sync draft when values change externally
  useEffect(() => { setDraft({ ...values }); }, [isOpen]);

  // Keyboard: Escape closes panel
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Focus trap — move focus into panel when it opens
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector('button, [tabindex]:not([tabindex="-1"]), input');
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const setField = useCallback((id, val) => setDraft(d => ({ ...d, [id]: val })), []);

  const handleApply = () => { onApply?.(draft); onClose(); };
  const handleClear = () => { const empty = {}; setDraft(empty); onClear?.(); };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position:'fixed', inset:0, background:'rgba(8,18,38,.2)',
          opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none',
          transition:'opacity .28s cubic-bezier(.4,0,.2,1)', zIndex:40,
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        aria-hidden={!isOpen}
        style={{
          position:'fixed', top:0, right: isOpen ? 0 : -320,
          width:300, height:'100dvh',
          background:'#fff',
          border:'1px solid var(--prim-grey-100,#e2e8f0)',
          borderRadius:'10px 0 0 10px',
          boxShadow:'0 8px 32px rgba(8,18,38,.12)',
          display:'flex', flexDirection:'column',
          zIndex:50,
          transition:'right .28s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom:'1px solid var(--prim-grey-100,#e5e7eb)', flexShrink:0 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--prim-grey-900,#0f1b35)', display:'flex', alignItems:'center', gap:8 }}>
            Filters
            {activeCount > 0 && (
              <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20, background:'var(--prim-blue-10,#eef4ff)', color:'var(--prim-marine,#1852fe)' }}>
                {activeCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close filters"
            type="button"
            style={{ width:26, height:26, borderRadius:6, border:'1px solid var(--prim-grey-100,#e5e7eb)', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--prim-grey-300,#94a3b8)', padding:0 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:16, overflowY:'auto', flex:1 }}>
          {fields.map((field) => {
            if (field.type === 'select') {
              return (
                <CddField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  options={field.options || []}
                  value={draft[field.id] || ''}
                  onChange={(val) => setField(field.id, val)}
                />
              );
            }
            if (field.type === 'multi') {
              return (
                <MultiField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  value={draft[field.id] || []}
                  onChange={(val) => setField(field.id, val)}
                  placeholder={field.placeholder}
                />
              );
            }
            return null;
          })}
        </div>

        {/* Footer */}
        <div style={{ display:'flex', gap:8, padding:'12px 18px', borderTop:'1px solid var(--prim-grey-100,#e5e7eb)', background:'#fafafa', flexShrink:0 }}>
          <button
            type="button"
            onClick={handleClear}
            style={{ flex:1, height:36, borderRadius:'var(--radius-md,8px)', fontSize:13, fontWeight:600, cursor:'pointer', background:'#fff', color:'var(--prim-grey-500,#475569)', border:'1.5px solid var(--prim-grey-100,#e5e7eb)', fontFamily:'inherit' }}
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={handleApply}
            style={{ flex:1, height:36, borderRadius:'var(--radius-md,8px)', fontSize:13, fontWeight:600, cursor:'pointer', background:'var(--prim-marine,#1852fe)', color:'#fff', border:'none', fontFamily:'inherit' }}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

// Count how many filter fields have a non-empty value
function countActiveFilters(values = {}) {
  return Object.values(values).filter(v => {
    if (Array.isArray(v)) return v.length > 0;
    return v !== '' && v != null;
  }).length;
}


// ─── SearchFilter (composite) ─────────────────────────────────────
/**
 * Composite toolbar component — StatusFilterChips + SearchField + FilterButton + FilterPanel
 *
 * Props:
 *   chips              ChipItem[]
 *   activeChip         string
 *   onChipChange       (id) => void
 *
 *   searchValue        string
 *   onSearchChange     (v) => void
 *   searchPlaceholder  string
 *   searchWidth        number
 *
 *   filterFields       FilterField[]
 *   filterValues       Record<string, any>
 *   onFiltersApply     (values) => void
 *   onFiltersClear     () => void
 */
export function SearchFilter({
  chips = [],
  activeChip,
  onChipChange,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search',
  searchWidth = 210,
  filterFields = [],
  filterValues = {},
  onFiltersApply,
  onFiltersClear,
}) {
  const [panelOpen, setPanelOpen] = useState(false);
  const activeFilterCount = countActiveFilters(filterValues);

  const handleApply = (values) => {
    onFiltersApply?.(values);
    setPanelOpen(false);
  };

  const handleClear = () => {
    onFiltersClear?.();
  };

  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
      {/* Chip group */}
      {chips.length > 0 && (
        <StatusFilterChips
          chips={chips}
          activeId={activeChip}
          onChange={onChipChange}
        />
      )}

      {/* Right-side: search + filter */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginLeft:'auto' }}>
        <SearchField
          value={searchValue}
          onChange={onSearchChange}
          onClear={() => onSearchChange?.('')}
          placeholder={searchPlaceholder}
          width={searchWidth}
        />
        <FilterButton
          isActive={panelOpen || activeFilterCount > 0}
          activeCount={activeFilterCount}
          onClick={() => setPanelOpen(o => !o)}
        />
      </div>

      {/* Filter panel */}
      {filterFields.length > 0 && (
        <FilterPanel
          isOpen={panelOpen}
          onClose={() => setPanelOpen(false)}
          fields={filterFields}
          values={filterValues}
          onApply={handleApply}
          onClear={handleClear}
          activeCount={activeFilterCount}
        />
      )}
    </div>
  );
}

export default SearchFilter;

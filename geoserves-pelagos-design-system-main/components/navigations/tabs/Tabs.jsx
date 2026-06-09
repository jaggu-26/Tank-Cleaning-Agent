import React, { useState } from 'react';
import './Tabs.scss';

/**
 * Pelagos Tabs — navigations/tabs
 * Props: tabs [{ id, label, content }], defaultTab, variant ('line'|'pill')
 * Design reference: /pages/nav-tabs.html
 */
export const Tabs = ({ tabs = [], defaultTab, variant = 'line', onChange }) => {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);
  const select = id => { setActive(id); onChange?.(id); };
  const current = tabs.find(t => t.id === active);
  return (
    <div className={`tabs tabs--${variant}`}>
      <div className="tabs__list" role="tablist">
        {tabs.map(tab => (
          <button key={tab.id} role="tab" className={['tabs__tab', active === tab.id ? 'tabs__tab--active' : ''].filter(Boolean).join(' ')}
            aria-selected={active === tab.id} onClick={() => select(tab.id)} disabled={tab.disabled}>
            {tab.label}
            {tab.count !== undefined && <span className="tabs__count">{tab.count}</span>}
          </button>
        ))}
      </div>
      {current?.content && (
        <div className="tabs__panel" role="tabpanel">{current.content}</div>
      )}
    </div>
  );
};
export default Tabs;

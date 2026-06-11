import React from 'react';
import { Menu as AntMenu, ConfigProvider } from 'antd';
import { getMenuTheme } from './menuTheme';
import './Menu.scss';

/**
 * Pelagos Menu — primitives/menu
 *
 * A thin Pelagos wrapper on top of Ant Design's Menu component.
 *
 * All interactive behaviours — keyboard navigation, submenu open/close,
 * selection, inline collapse, hover tooltips, and overflow handling — are
 * delegated entirely to AntD. Pelagos design tokens are injected via a
 * scoped ConfigProvider so they never bleed into the global application theme.
 *
 * Refs are forwarded to the underlying AntD Menu.
 *
 * ─── Prop mapping ───────────────────────────────────────────────────────────
 *
 *   Pelagos prop        │ AntD equivalent   │ Notes
 *   ────────────────────┼───────────────────┼──────────────────────────────
 *   mode                │ mode              │ 'horizontal' | 'vertical' | 'inline'
 *   theme               │ theme             │ 'light' | 'dark' — also selects Pelagos token set
 *   items               │ items             │ ItemType[] — declarative item tree
 *   selectedKeys        │ selectedKeys      │ controlled selected items
 *   defaultSelectedKeys │ defaultSelectedKeys│ uncontrolled initial selection
 *   openKeys            │ openKeys          │ controlled open submenus
 *   defaultOpenKeys     │ defaultOpenKeys   │ uncontrolled initial open submenus
 *   inlineCollapsed     │ inlineCollapsed   │ collapsed state (inline mode only)
 *   inlineIndent        │ inlineIndent      │ px per nesting level (default 24)
 *   multiple            │ multiple          │ allow multi-select
 *   selectable          │ selectable        │ allow item selection
 *   onClick             │ onClick           │ function({ key, keyPath, domEvent })
 *   onSelect            │ onSelect          │ function({ key, keyPath, selectedKeys })
 *   onDeselect          │ onDeselect        │ function({ key, keyPath, selectedKeys })
 *   onOpenChange        │ onOpenChange      │ function(openKeys: string[])
 *
 * ─── AntD passthrough ───────────────────────────────────────────────────────
 *
 * All other Ant Design Menu props (expandIcon, forceSubMenuRender,
 * overflowedIndicator, subMenuCloseDelay, subMenuOpenDelay, tooltip,
 * triggerSubMenuAction, popupRender, style, classNames, styles, etc.)
 * pass through via ...rest unchanged:
 * https://ant.design/components/menu#api
 *
 * ─── Items API ──────────────────────────────────────────────────────────────
 *
 * Items are passed as an `items` array of ItemType. Each item can be:
 *
 *   MenuItemType   — { key, label, icon?, disabled?, danger?, title? }
 *   SubMenuType    — { key, label, icon?, disabled?, children: ItemType[] }
 *   MenuItemGroup  — { type: 'group', label, children: MenuItemType[] }
 *   MenuDivider    — { type: 'divider', dashed? }
 *
 * ─── Design reference ───────────────────────────────────────────────────────
 * /pages/prim-menu.html
 */

// ─── Component ───────────────────────────────────────────────────────────────

export const Menu = React.forwardRef(function Menu(
  {
    // ── Pelagos-specific props ───────────────────────────────────────────────
    theme = 'light',   // 'light' | 'dark' — selects the Pelagos token set

    // ── Props forwarded directly to AntD Menu ───────────────────────────────
    mode                = 'vertical',
    items,
    selectedKeys,
    defaultSelectedKeys,
    openKeys,
    defaultOpenKeys,
    inlineCollapsed,
    inlineIndent,
    multiple            = false,
    selectable          = true,
    onClick,
    onSelect,
    onDeselect,
    onOpenChange,
    className,
    style,

    // ── Rest forwarded to AntD Menu ─────────────────────────────────────────
    ...rest
  },
  ref,
) {
  return (
    <ConfigProvider theme={getMenuTheme(theme)}>
      <AntMenu
        ref={ref}
        mode={mode}
        theme={theme}
        items={items}
        selectedKeys={selectedKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        openKeys={openKeys}
        defaultOpenKeys={defaultOpenKeys}
        inlineCollapsed={inlineCollapsed}
        inlineIndent={inlineIndent}
        multiple={multiple}
        selectable={selectable}
        onClick={onClick}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onOpenChange={onOpenChange}
        className={className}
        style={style}
        data-theme={theme}
        data-mode={mode}
        {...rest}
      />
    </ConfigProvider>
  );
});

Menu.displayName = 'PelagosMenu';

export default Menu;

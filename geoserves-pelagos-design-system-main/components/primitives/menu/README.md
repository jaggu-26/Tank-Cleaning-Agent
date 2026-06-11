# Pelagos Menu

`components/primitives/menu`

A thin Pelagos design token wrapper over Ant Design's `<Menu>` (React) and ng-zorro-antd's `nz-menu` directive (Angular). All interactive behaviours — keyboard navigation, submenu open/close animations, inline collapse, selection, hover tooltips, and horizontal overflow — are delegated entirely to the underlying library.

---

## Peer dependencies

| Package | Version |
|---------|---------|
| `antd` | `>= 5.0.0` |
| `ng-zorro-antd` | `>= 17.0.0` (Angular only) |
| `@angular/core` | `>= 15.0.0` (Angular only — standalone component support) |

---

## Import paths

### React

```jsx
import { Menu } from '@pelagos/components/primitives/menu';
```

### Angular (NgModule app)

```typescript
import { MenuModule } from '@pelagos/components/primitives/menu';

@NgModule({ imports: [MenuModule] })
export class AppModule {}
```

### Angular (standalone app)

```typescript
import { MenuComponent } from '@pelagos/components/primitives/menu';

@Component({ standalone: true, imports: [MenuComponent], ... })
export class MyComponent {}
```

---

## Usage examples

### React — Inline vertical menu (default)

```jsx
import { Menu } from '@pelagos/components/primitives/menu';

const items = [
  { key: '1', label: 'Dashboard' },
  { key: '2', label: 'Fleet', children: [
    { key: '2a', label: 'Active vessels' },
    { key: '2b', label: 'Port calls' },
  ]},
  { key: '3', label: 'Reports' },
  { type: 'divider' },
  { key: '4', label: 'Settings', danger: true },
];

<Menu
  mode="inline"
  items={items}
  defaultSelectedKeys={['1']}
  defaultOpenKeys={['2']}
  style={{ width: 240 }}
/>
```

### React — Horizontal top navigation

```jsx
<Menu
  mode="horizontal"
  items={navItems}
  selectedKeys={[currentRoute]}
  onClick={({ key }) => navigate(key)}
/>
```

### React — Dark sidebar

```jsx
<Menu
  mode="inline"
  theme="dark"
  items={sidebarItems}
  inlineCollapsed={collapsed}
  style={{ height: '100%' }}
/>
```

### Angular — Items array

```html
<gs-menu
  mode="inline"
  theme="light"
  [items]="menuItems"
  [selectedKeys]="[activeRoute]"
  (itemClick)="onMenuClick($event)"
/>
```

### Angular — Template-driven

```html
<gs-menu mode="vertical" theme="light">
  <li nz-menu-item>Dashboard</li>
  <li nz-submenu nzTitle="Fleet">
    <ul>
      <li nz-menu-item>Active vessels</li>
      <li nz-menu-item>Port calls</li>
    </ul>
  </li>
  <li nz-menu-item nzDanger>Delete</li>
</gs-menu>
```

---

## Props (React)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark'` | `'light'` | Colour theme. Also selects the Pelagos token set. |
| `mode` | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` | Layout mode of the menu. |
| `items` | `ItemType[]` | — | Declarative item tree. |
| `selectedKeys` | `string[]` | — | Controlled selected items. |
| `defaultSelectedKeys` | `string[]` | — | Uncontrolled initial selection. |
| `openKeys` | `string[]` | — | Controlled open submenus. |
| `defaultOpenKeys` | `string[]` | — | Uncontrolled initial open submenus. |
| `inlineCollapsed` | `boolean` | — | Collapse inline menu to icon-only width. |
| `inlineIndent` | `number` | `24` | Indentation in px per nesting level. |
| `multiple` | `boolean` | `false` | Allow multi-select. |
| `selectable` | `boolean` | `true` | Allow item selection. |
| `onClick` | `function({ key, keyPath, domEvent })` | — | Called when a menu item is clicked. |
| `onSelect` | `function({ key, keyPath, selectedKeys })` | — | Called when an item is selected. |
| `onDeselect` | `function({ key, keyPath, selectedKeys })` | — | Called on deselection (multiple mode). |
| `onOpenChange` | `function(openKeys: string[])` | — | Called when open submenus change. |

All other AntD Menu props (`expandIcon`, `forceSubMenuRender`, `overflowedIndicator`, `tooltip`, `triggerSubMenuAction`, `popupRender`, `style`, `classNames`, `styles`, etc.) pass through via `...rest`. See the [AntD Menu API](https://ant.design/components/menu#api).

---

## Inputs (Angular)

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `mode` | `'horizontal' \| 'vertical' \| 'inline'` | `'vertical'` | Layout mode. Maps to `nzMode`. |
| `theme` | `'light' \| 'dark'` | `'light'` | Colour theme. Maps to `nzTheme`. |
| `items` | `PelagosItemType[]` | `[]` | Declarative item tree. |
| `selectedKeys` | `string[]` | `[]` | Controlled selected item keys. |
| `openKeys` | `string[]` | `[]` | Controlled open submenu keys. |
| `inlineCollapsed` | `boolean` | `false` | Collapse inline menu. Maps to `nzInlineCollapsed`. |
| `inlineIndent` | `number` | `24` | Indent per level. Maps to `nzInlineIndent`. |
| `selectable` | `boolean` | `true` | Allow selection. Maps to `nzSelectable`. |
| `multiple` | `boolean` | `false` | Allow multi-select. Maps to `nzMultiple`. |

### Outputs (Angular)

| Output | Type | Description |
|--------|------|-------------|
| `itemClick` | `{ key: string; keyPath: string[] }` | Item was clicked. |
| `itemSelect` | `{ key: string; selectedKeys: string[] }` | Item selected. |
| `itemDeselect` | `{ key: string; selectedKeys: string[] }` | Item deselected (multiple mode). |
| `openChange` | `string[]` | Open submenu keys changed. |

---

## Mode → AntD mapping

| Pelagos | AntD `mode` | Description |
|---------|-------------|-------------|
| `'vertical'` | `'vertical'` | Side nav with popup submenus |
| `'horizontal'` | `'horizontal'` | Top navigation bar |
| `'inline'` | `'inline'` | Expandable inline tree (sidebar) |

---

## Theme → token set

| Pelagos `theme` | Token set | Primary selected colour |
|-----------------|-----------|------------------------|
| `'light'` | `lightTheme` | `#1852FE` (Pelagos brand blue) |
| `'dark'` | `darkTheme` | `#1852FE` bg, `#fff` text |

---

## ItemType API

```typescript
// Plain menu item
{ key: string; label: ReactNode; icon?: ReactNode; disabled?: boolean; danger?: boolean; title?: string }

// Submenu
{ key: string; label: ReactNode; icon?: ReactNode; disabled?: boolean; children: ItemType[] }

// Group (label + children, no key)
{ type: 'group'; label: ReactNode; children: MenuItemType[] }

// Divider
{ type: 'divider'; dashed?: boolean }
```

---

## Applying Pelagos tokens (Angular)

Provide the token object via `NZ_CONFIG` at the root module level:

```typescript
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { getMenuTheme } from '@pelagos/components/primitives/menu';

const theme = getMenuTheme('light');
const nzConfig: NzConfig = {
  menu: theme.components.Menu,
};

@NgModule({
  providers: [{ provide: NZ_CONFIG, useValue: nzConfig }],
})
export class AppModule {}
```

---

## Token overrides (React)

```jsx
import { ConfigProvider } from 'antd';
import { Menu, lightTheme } from '@pelagos/components/primitives/menu';

// Override selected item background
const myTheme = {
  ...lightTheme,
  components: {
    Menu: {
      ...lightTheme.components.Menu,
      itemSelectedBg: '#f0fdf4',     // custom green
      itemSelectedColor: '#15803d',  // custom green text
    },
  },
};

<ConfigProvider theme={myTheme}>
  <Menu mode="inline" items={items} />
</ConfigProvider>
```

---

## Figma reference

[Figma — Menu component frame](https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=13312-7261)

## Live docs

`/pages/prim-menu.html`

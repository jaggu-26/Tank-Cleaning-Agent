import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { getMenuTheme } from './menuTheme';

/**
 * Pelagos Menu — Angular wrapper
 * primitives/menu/Menu.component.ts
 *
 * A thin Pelagos wrapper on top of ng-zorro-antd's nz-menu directive.
 * All interactive behaviours (keyboard navigation, submenu open/close,
 * inline collapse, selection, hover tooltips) are delegated to ng-zorro.
 * Pelagos design tokens are applied at module/bootstrap level via NZ_CONFIG.
 *
 * This is a standalone component (Angular 15+). NgModule apps should use
 * MenuModule instead, which re-exports MenuComponent for backward compat.
 *
 * ─── Input mapping ──────────────────────────────────────────────────────────
 *
 *   Pelagos @Input       │ ng-zorro equivalent   │ Notes
 *   ─────────────────────┼───────────────────────┼──────────────────────────
 *   mode                 │ nzMode                │ 'horizontal'|'vertical'|'inline'
 *   theme                │ nzTheme               │ 'light' | 'dark'
 *   inlineCollapsed      │ nzInlineCollapsed     │ collapse inline menu
 *   inlineIndent         │ nzInlineIndent        │ px per nesting level
 *   selectable           │ nzSelectable          │ allow item selection
 *   multiple             │ nzMultiple            │ allow multi-select
 *
 * ─── Items ──────────────────────────────────────────────────────────────────
 *
 * Unlike the React wrapper (which uses the `items` array API), the Angular
 * template uses ng-zorro directive markup. Consume the component via slot
 * projection — place `<gs-menu-item>`, `<gs-submenu>` etc. as children of
 * `<gs-menu>`, or use the template-driven approach documented in the README.
 *
 * ─── Design tokens ──────────────────────────────────────────────────────────
 *
 * Tokens come from menuTheme.js (shared with React). Inject them at the
 * module level using NZ_CONFIG or provide them via NzConfigService.
 *
 * ─── Design reference ───────────────────────────────────────────────────────
 * /pages/prim-menu.html
 */

// ─── Item type interfaces ─────────────────────────────────────────────────────

export interface PelagosMenuItemType {
  key:       string;
  label:     string;
  icon?:     string;
  disabled?: boolean;
  danger?:   boolean;
  title?:    string;
}

export interface PelagosSubMenuType {
  key:       string;
  label:     string;
  icon?:     string;
  disabled?: boolean;
  children:  PelagosItemType[];
}

export interface PelagosMenuGroupType {
  type:     'group';
  label:    string;
  children: PelagosMenuItemType[];
}

export interface PelagosMenuDividerType {
  type:   'divider';
  dashed?: boolean;
}

export type PelagosItemType =
  | PelagosMenuItemType
  | PelagosSubMenuType
  | PelagosMenuGroupType
  | PelagosMenuDividerType;

// ─── Component ───────────────────────────────────────────────────────────────

@Component({
  selector:     'gs-menu',
  standalone:   true,
  imports:      [CommonModule, NzMenuModule, NzIconModule],
  templateUrl:  './Menu.component.html',
  host:         { class: 'gs-menu-host' },
})
export class MenuComponent implements OnChanges {

  // ── Pelagos props ──────────────────────────────────────────────────────────

  /** Menu layout mode. Maps to ng-zorro nzMode. @default 'vertical' */
  @Input() mode: 'horizontal' | 'vertical' | 'inline' = 'vertical';

  /** Colour theme. Maps to ng-zorro nzTheme. Also selects the Pelagos token set. @default 'light' */
  @Input() theme: 'light' | 'dark' = 'light';

  /** Items array for declarative rendering. Mirrors the AntD items prop. */
  @Input() items: PelagosItemType[] = [];

  /** Controlled selected item keys. */
  @Input() selectedKeys: string[] = [];

  /** Controlled open submenu keys. */
  @Input() openKeys: string[] = [];

  /** Collapse inline menu. Maps to ng-zorro nzInlineCollapsed. */
  @Input() inlineCollapsed: boolean = false;

  /** Indentation in pixels per nesting level. Maps to ng-zorro nzInlineIndent. @default 24 */
  @Input() inlineIndent: number = 24;

  /** Allow selecting menu items. Maps to ng-zorro nzSelectable. @default true */
  @Input() selectable: boolean = true;

  /** Allow multi-selection. Maps to ng-zorro nzMultiple. @default false */
  @Input() multiple: boolean = false;

  // ── Events ────────────────────────────────────────────────────────────────

  /** Emits when a menu item is clicked. */
  @Output() itemClick = new EventEmitter<{ key: string; keyPath: string[] }>();

  /** Emits when a menu item is selected. */
  @Output() itemSelect = new EventEmitter<{ key: string; selectedKeys: string[] }>();

  /** Emits when a menu item is deselected (multiple mode). */
  @Output() itemDeselect = new EventEmitter<{ key: string; selectedKeys: string[] }>();

  /** Emits when open submenus change. */
  @Output() openChange = new EventEmitter<string[]>();

  // ── Derived ng-zorro binding values ──────────────────────────────────────

  nzMode:   'horizontal' | 'vertical' | 'inline' = 'vertical';
  nzTheme:  'light' | 'dark' = 'light';

  // ── Token theme (for documentation; injection handled at module level) ────
  get theme$() { return getMenuTheme(this.theme); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode'])  { this.nzMode  = this.mode; }
    if (changes['theme']) { this.nzTheme = this.theme; }
  }

  // ── Type guards for template rendering ───────────────────────────────────

  isGroup(item: PelagosItemType): item is PelagosMenuGroupType {
    return (item as any).type === 'group';
  }

  isDivider(item: PelagosItemType): item is PelagosMenuDividerType {
    return (item as any).type === 'divider';
  }

  isSubMenu(item: PelagosItemType): item is PelagosSubMenuType {
    return !!(item as any).children && (item as any).type !== 'group';
  }

  isMenuItem(item: PelagosItemType): item is PelagosMenuItemType {
    return !(item as any).children && (item as any).type !== 'divider' && (item as any).type !== 'group';
  }

  // ── Event handlers ────────────────────────────────────────────────────────

  handleClick(key: string, keyPath: string[]): void {
    this.itemClick.emit({ key, keyPath });
  }

  handleSelect(key: string, selectedKeys: string[]): void {
    this.itemSelect.emit({ key, selectedKeys });
  }

  handleDeselect(key: string, selectedKeys: string[]): void {
    this.itemDeselect.emit({ key, selectedKeys });
  }

  handleOpenChange(openKeys: string[]): void {
    this.openChange.emit(openKeys);
  }
}

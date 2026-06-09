/**
 * Pelagos Menu — public API barrel
 * components/primitives/menu/index.ts
 *
 * All public exports for the Menu primitive. Import from this file
 * (or from the package root '@pelagos/components/primitives/menu')
 * rather than from individual source files.
 *
 * ─── React ───────────────────────────────────────────────────────────────────
 *
 *   import { Menu } from '@pelagos/components/primitives/menu';
 *
 * ─── Angular (NgModule app) ──────────────────────────────────────────────────
 *
 *   import { MenuModule } from '@pelagos/components/primitives/menu';
 *
 * ─── Angular (standalone app) ────────────────────────────────────────────────
 *
 *   import { MenuComponent } from '@pelagos/components/primitives/menu';
 *
 * ─── Token overrides ─────────────────────────────────────────────────────────
 *
 *   import { getMenuTheme, lightTheme, darkTheme } from '@pelagos/components/primitives/menu';
 *
 * ─── Angular item types ──────────────────────────────────────────────────────
 *
 *   import { PelagosItemType, PelagosMenuItemType, PelagosSubMenuType } from '@pelagos/components/primitives/menu';
 */

// ── React ─────────────────────────────────────────────────────────────────────
export { Menu }             from './Menu';
export { Menu as default }  from './Menu';

// ── Angular ───────────────────────────────────────────────────────────────────
export { MenuComponent }    from './Menu.component';
export { MenuModule }       from './MenuModule';

// ── Angular types ─────────────────────────────────────────────────────────────
export type {
  PelagosItemType,
  PelagosMenuItemType,
  PelagosSubMenuType,
  PelagosMenuGroupType,
  PelagosMenuDividerType,
} from './Menu.component';

// ── Shared tokens (advanced use — override individual themes) ─────────────────
export { getMenuTheme, lightTheme, darkTheme } from './menuTheme';

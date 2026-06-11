/**
 * Pelagos Checkbox — public API barrel
 * components/primitives/checkbox/index.ts
 *
 * All public exports for the Checkbox primitive. Import from this file
 * (or from the package root '@pelagos/components/primitives/checkbox')
 * rather than from individual source files.
 *
 * ─── React ───────────────────────────────────────────────────────────────────
 *
 *   import { Checkbox } from '@pelagos/components/primitives/checkbox';
 *
 * ─── Angular (NgModule app) ──────────────────────────────────────────────────
 *
 *   import { CheckboxModule } from '@pelagos/components/primitives/checkbox';
 *
 * ─── Angular (standalone app) ────────────────────────────────────────────────
 *
 *   import { CheckboxComponent } from '@pelagos/components/primitives/checkbox';
 *
 * ─── Token overrides ─────────────────────────────────────────────────────────
 *
 *   import { getCheckboxTheme, checkboxTheme } from '@pelagos/components/primitives/checkbox';
 */

// ── React ─────────────────────────────────────────────────────────────────────
export { Checkbox }              from './Checkbox';
export { Checkbox as default }   from './Checkbox';

// ── Angular ───────────────────────────────────────────────────────────────────
export { CheckboxComponent }     from './Checkbox.component';
export { CheckboxModule }        from './CheckboxModule';

// ── Shared tokens (advanced use — inject theme into NZ_CONFIG or ConfigProvider)
export { getCheckboxTheme, checkboxTheme } from './checkboxTheme';

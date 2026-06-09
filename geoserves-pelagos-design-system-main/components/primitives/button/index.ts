/**
 * Pelagos Button — public API barrel
 * components/primitives/button/index.ts
 *
 * All public exports for the Button primitive. Import from this file
 * (or from the package root '@pelagos/components/primitives/button')
 * rather than from individual source files.
 *
 * ─── React ───────────────────────────────────────────────────────────────────
 *
 *   import { Button } from '@pelagos/components/primitives/button';
 *
 * ─── Angular (NgModule app) ──────────────────────────────────────────────────
 *
 *   import { ButtonModule } from '@pelagos/components/primitives/button';
 *
 * ─── Angular (standalone app) ────────────────────────────────────────────────
 *
 *   import { ButtonComponent } from '@pelagos/components/primitives/button';
 *
 * ─── Token overrides ─────────────────────────────────────────────────────────
 *
 *   import { getButtonTheme, variantThemes } from '@pelagos/components/primitives/button';
 */

// ── React ─────────────────────────────────────────────────────────────────────
export { Button }         from './Button';
export { Button as default } from './Button';

// ── Angular ───────────────────────────────────────────────────────────────────
export { ButtonComponent } from './Button.component';
export { ButtonModule }    from './ButtonModule';

// ── Shared tokens (advanced use — override individual variant themes) ─────────
export { getButtonTheme, variantThemes } from './buttonTheme';

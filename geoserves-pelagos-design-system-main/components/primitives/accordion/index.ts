/**
 * Pelagos Accordion — public API barrel
 * components/primitives/accordion/index.ts
 *
 * All public exports for the Accordion primitive. Import from this file
 * (or from the package root '@pelagos/components/primitives/accordion')
 * rather than from individual source files.
 *
 * ─── React ───────────────────────────────────────────────────────────────────
 *
 *   import { Accordion } from '@pelagos/components/primitives/accordion';
 *
 * ─── Angular (NgModule app) ──────────────────────────────────────────────────
 *
 *   import { AccordionModule } from '@pelagos/components/primitives/accordion';
 *
 * ─── Angular (standalone app) ────────────────────────────────────────────────
 *
 *   import { AccordionComponent } from '@pelagos/components/primitives/accordion';
 *
 * ─── Token overrides ─────────────────────────────────────────────────────────
 *
 *   import { getAccordionTheme, accordionTheme } from '@pelagos/components/primitives/accordion';
 *
 * ─── Angular item type ───────────────────────────────────────────────────────
 *
 *   import { AccordionItem } from '@pelagos/components/primitives/accordion';
 */

// ── React ─────────────────────────────────────────────────────────────────────
export { Accordion }             from './Accordion';
export { Accordion as default }  from './Accordion';

// ── Angular ───────────────────────────────────────────────────────────────────
export { AccordionComponent }    from './Accordion.component';
export { AccordionModule }       from './AccordionModule';
export type { AccordionItem }    from './Accordion.component';

// ── Shared tokens (advanced use — inject theme into NZ_CONFIG or ConfigProvider)
export { getAccordionTheme, accordionTheme } from './accordionTheme';

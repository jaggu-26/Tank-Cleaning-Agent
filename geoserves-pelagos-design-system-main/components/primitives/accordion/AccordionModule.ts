import { NgModule } from '@angular/core';

import { AccordionComponent } from './Accordion.component';

/**
 * Pelagos AccordionModule
 * primitives/accordion/AccordionModule.ts
 *
 * NgModule compatibility wrapper for AccordionComponent.
 * Because AccordionComponent is a standalone component, this module simply
 * imports and re-exports it — CommonModule and NzCollapseModule are already
 * declared inside the standalone component itself.
 *
 * ─── NgModule apps ──────────────────────────────────────────────────────────
 *
 *   import { AccordionModule } from '@pelagos/components/primitives/accordion';
 *
 *   @NgModule({ imports: [AccordionModule] })
 *   export class AppModule {}
 *
 * ─── Standalone / bootstrapApplication apps ─────────────────────────────────
 *
 *   Import AccordionComponent directly — no module wrapper needed:
 *
 *   import { AccordionComponent } from '@pelagos/components/primitives/accordion';
 *
 *   @Component({ standalone: true, imports: [AccordionComponent], ... })
 *   export class MyComponent {}
 *
 * ─── Peer dependencies ──────────────────────────────────────────────────────
 *
 *   ng-zorro-antd >= 17.0.0
 *   @angular/core  >= 15.0.0  (standalone component support)
 */

@NgModule({
  imports: [AccordionComponent],   // standalone: import, not declare
  exports: [AccordionComponent],
})
export class AccordionModule {}

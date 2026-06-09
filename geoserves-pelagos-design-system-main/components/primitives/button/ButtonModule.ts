import { NgModule } from '@angular/core';

import { ButtonComponent } from './Button.component';

/**
 * Pelagos ButtonModule
 * primitives/button/ButtonModule.ts
 *
 * NgModule compatibility wrapper for ButtonComponent.
 * Because ButtonComponent is a standalone component, this module simply
 * imports and re-exports it — CommonModule and NzButtonModule are already
 * declared inside the standalone component itself.
 *
 * ─── NgModule apps ──────────────────────────────────────────────────────────
 *
 *   import { ButtonModule } from '@pelagos/components/primitives/button';
 *
 *   @NgModule({ imports: [ButtonModule] })
 *   export class AppModule {}
 *
 * ─── Standalone / bootstrapApplication apps ─────────────────────────────────
 *
 *   Import ButtonComponent directly — no module wrapper needed:
 *
 *   import { ButtonComponent } from '@pelagos/components/primitives/button';
 *
 *   @Component({ standalone: true, imports: [ButtonComponent], ... })
 *   export class MyComponent {}
 *
 * ─── Peer dependencies ──────────────────────────────────────────────────────
 *
 *   ng-zorro-antd >= 17.0.0
 *   @angular/core  >= 15.0.0  (standalone component support)
 */

@NgModule({
  imports: [ButtonComponent],   // standalone: import, not declare
  exports: [ButtonComponent],
})
export class ButtonModule {}

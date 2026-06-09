import { NgModule } from '@angular/core';

import { CheckboxComponent } from './Checkbox.component';

/**
 * Pelagos CheckboxModule
 * primitives/checkbox/CheckboxModule.ts
 *
 * NgModule compatibility wrapper for CheckboxComponent.
 * Because CheckboxComponent is a standalone component, this module simply
 * imports and re-exports it — CommonModule, FormsModule, and NzCheckboxModule
 * are already declared inside the standalone component itself.
 *
 * ─── NgModule apps ──────────────────────────────────────────────────────────
 *
 *   import { CheckboxModule } from '@pelagos/components/primitives/checkbox';
 *
 *   @NgModule({ imports: [CheckboxModule] })
 *   export class AppModule {}
 *
 * ─── Standalone / bootstrapApplication apps ─────────────────────────────────
 *
 *   Import CheckboxComponent directly — no module wrapper needed:
 *
 *   import { CheckboxComponent } from '@pelagos/components/primitives/checkbox';
 *
 *   @Component({ standalone: true, imports: [CheckboxComponent], ... })
 *   export class MyComponent {}
 *
 * ─── Peer dependencies ──────────────────────────────────────────────────────
 *
 *   ng-zorro-antd >= 17.0.0
 *   @angular/core  >= 15.0.0  (standalone component support)
 */

@NgModule({
  imports: [CheckboxComponent],   // standalone: import, not declare
  exports: [CheckboxComponent],
})
export class CheckboxModule {}

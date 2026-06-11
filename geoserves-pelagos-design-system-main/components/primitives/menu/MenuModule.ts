import { NgModule } from '@angular/core';

import { MenuComponent } from './Menu.component';

/**
 * Pelagos MenuModule
 * primitives/menu/MenuModule.ts
 *
 * NgModule compatibility wrapper for MenuComponent.
 * Because MenuComponent is a standalone component, this module simply
 * imports and re-exports it — CommonModule, NzMenuModule, and NzIconModule
 * are already declared inside the standalone component itself.
 *
 * ─── NgModule apps ──────────────────────────────────────────────────────────
 *
 *   import { MenuModule } from '@pelagos/components/primitives/menu';
 *
 *   @NgModule({ imports: [MenuModule] })
 *   export class AppModule {}
 *
 * ─── Standalone / bootstrapApplication apps ─────────────────────────────────
 *
 *   Import MenuComponent directly — no module wrapper needed:
 *
 *   import { MenuComponent } from '@pelagos/components/primitives/menu';
 *
 *   @Component({ standalone: true, imports: [MenuComponent], ... })
 *   export class MyComponent {}
 *
 * ─── Applying Pelagos tokens ─────────────────────────────────────────────────
 *
 *   Provide tokens via NzConfigService in AppModule or bootstrapApplication:
 *
 *   import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
 *   import { getMenuTheme } from '@pelagos/components/primitives/menu';
 *
 *   const nzConfig: NzConfig = { menu: getMenuTheme('light').components.Menu };
 *   providers: [{ provide: NZ_CONFIG, useValue: nzConfig }]
 *
 * ─── Peer dependencies ──────────────────────────────────────────────────────
 *
 *   ng-zorro-antd >= 17.0.0
 *   @angular/core  >= 15.0.0  (standalone component support)
 */

@NgModule({
  imports: [MenuComponent],   // standalone: import, not declare
  exports: [MenuComponent],
})
export class MenuModule {}

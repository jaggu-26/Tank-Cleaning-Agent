import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  isDevMode,
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { NzButtonModule }    from 'ng-zorro-antd/button';
import { NzConfigService }   from 'ng-zorro-antd/core/config';
import { getButtonTheme }    from './buttonTheme';

/**
 * Pelagos Button — Angular wrapper
 * primitives/button/Button.component.ts
 *
 * A thin Pelagos wrapper on top of ng-zorro-antd's nz-button directive.
 * All interactive behaviours (loading, disabled, keyboard, a11y) are
 * delegated to ng-zorro. Pelagos design tokens are applied via NZ_CONFIG
 * at module/bootstrap level — see README.md "Angular: Applying Pelagos Tokens".
 *
 * This is a standalone component (Angular 15+). NgModule apps should use
 * ButtonModule instead, which re-exports ButtonComponent for backward compat.
 *
 * ─── Input mapping ──────────────────────────────────────────────────────────
 *
 *   Pelagos @Input  │ ng-zorro equivalent          │ Notes
 *   ────────────────┼──────────────────────────────┼──────────────────────────
 *   variant         │ nzType + nzDanger            │ see VARIANT_MAP below
 *   size            │ nzSize                       │ sm→small  md→default  lg→large
 *   fullWidth       │ nzBlock                      │ replaces nzBlock
 *   loading         │ nzLoading                    │
 *   disabled        │ [disabled]                   │ native HTML attr
 *   ghost           │ nzGhost                      │ passed through
 *   shape           │ nzShape                      │ 'circle' | 'round' | 'default'
 *   type            │ [attr.type]                  │ HTML button type: submit/reset/button
 *   href            │ href (renders <a>)           │ ng-zorro handles link rendering
 *   target          │ target                       │ used with href
 *
 * ─── Migration from raw ng-zorro ────────────────────────────────────────────
 *
 *   ng-zorro usage               │ Pelagos equivalent
 *   ─────────────────────────────┼──────────────────────────────────────────
 *   nzType="primary"             │ variant="primary"
 *   nzType="default"             │ variant="secondary"
 *   nzType="text"                │ variant="tertiary"
 *   nzType="link"                │ variant="link"
 *   nzType="primary" nzDanger    │ variant="danger"
 *   nzType="default" nzDanger    │ variant="danger-secondary"
 *   nzSize="large"               │ size="lg"
 *   nzSize="default"             │ size="md"
 *   nzSize="small"               │ size="sm"
 *   nzBlock                      │ fullWidth
 *   nzLoading / disabled / nzGhost / nzShape
 *                                │ unchanged — same @Input names
 *
 * ─── Design tokens ──────────────────────────────────────────────────────────
 *
 * Tokens come from buttonTheme.js (shared with React). Inject them at the
 * module level using NZ_CONFIG or provide them via NzConfigService in your
 * AppModule / standalone bootstrap to avoid polluting the global theme.
 *
 * ─── Design reference ───────────────────────────────────────────────────────
 * /pages/prim-buttons.html
 */

// ─── Variant → ng-zorro nzType + nzDanger ────────────────────────────────────

const VARIANT_MAP: Record<string, { nzType: string; nzDanger: boolean }> = {
  primary:            { nzType: 'primary', nzDanger: false },
  secondary:          { nzType: 'default', nzDanger: false },
  tertiary:           { nzType: 'text',    nzDanger: false },
  danger:             { nzType: 'primary', nzDanger: true  },
  'danger-secondary': { nzType: 'default', nzDanger: true  },
  neutral:            { nzType: 'default', nzDanger: false },
  link:               { nzType: 'link',    nzDanger: false },
};

// ─── Size → ng-zorro nzSize ──────────────────────────────────────────────────

const SIZE_MAP: Record<string, string> = {
  sm: 'small',
  md: 'default',
  lg: 'large',
};

@Component({
  selector:     'gs-button',
  standalone:   true,
  imports:      [CommonModule, NzButtonModule],
  templateUrl:  './Button.component.html',
  host:         { class: 'gs-button-host' },
})
export class ButtonComponent implements OnChanges {

  constructor(private nzConfigService: NzConfigService) {}

  // ── Pelagos props ──────────────────────────────────────────────────────────

  /** Visual style. Maps to ng-zorro nzType + nzDanger. @default 'primary' */
  @Input() variant: string = 'primary';

  /** Size token. Maps to ng-zorro nzSize. @default 'md' */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Stretch to container width. Maps to ng-zorro nzBlock. @default false */
  @Input() fullWidth: boolean = false;

  // ── Props forwarded directly to ng-zorro ──────────────────────────────────

  /** Show loading spinner. */
  @Input() loading: boolean = false;

  /** Disable the button. */
  @Input() disabled: boolean = false;

  /** Transparent background for coloured surfaces. */
  @Input() ghost: boolean = false;

  /** Button shape: 'default' | 'circle' | 'round'. */
  @Input() shape: 'default' | 'circle' | 'round' = 'default';

  /** HTML button type attribute. @default 'button' */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Renders an <a> tag when set. */
  @Input() href?: string;

  /** Link target — used with href. */
  @Input() target?: string;

  /**
   * @deprecated Not supported. Use `variant` instead.
   * Intercepted to mirror React's `color` prop guard and prevent accidental
   * passthrough of the AntD v5.13+ `color` input.
   */
  @Input() color?: string;

  // ── Events ────────────────────────────────────────────────────────────────

  /** Click event (delegated from nz-button). */
  @Output() clicked = new EventEmitter<MouseEvent>();

  // ── Derived ng-zorro binding values (computed on change) ─────────────────

  nzType: string    = 'primary';
  nzDanger: boolean = false;
  nzSize: string    = 'default';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variant']) {
      const mapped = VARIANT_MAP[this.variant] ?? VARIANT_MAP['primary'];
      this.nzType   = mapped.nzType;
      this.nzDanger = mapped.nzDanger;

      // ── Per-variant token injection ──────────────────────────────────────
      // React uses a scoped ConfigProvider; ng-zorro exposes NzConfigService
      // for the same purpose. We extract the Button component tokens from the
      // shared buttonTheme.js and push them into the service so this instance
      // renders identically to its React counterpart.
      //
      // NzConfigService.set() is scoped to the service instance injected into
      // this component — it does NOT mutate the global NZ_CONFIG token.
      const theme = getButtonTheme(this.variant);
      const buttonTokens = theme?.components?.['Button'];
      if (buttonTokens) {
        this.nzConfigService.set('button', {
          nzSize: (SIZE_MAP[this.size] ?? 'default') as any,
          ...buttonTokens,
        });
      }

    }
    if (changes['size']) {
      this.nzSize = SIZE_MAP[this.size] ?? 'default';
    }
    if (isDevMode() && changes['color'] && this.color !== undefined) {
      console.warn(
        '[PelagosButton] The `color` input is not supported. Use `variant` instead.',
      );
    }
  }

  handleClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }
}

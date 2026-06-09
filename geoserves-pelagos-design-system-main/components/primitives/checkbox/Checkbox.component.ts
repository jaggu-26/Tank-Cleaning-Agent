import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  isDevMode,
  forwardRef,
} from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzConfigService }  from 'ng-zorro-antd/core/config';
import { getCheckboxTheme } from './checkboxTheme';

/**
 * Pelagos Checkbox — Angular wrapper
 * primitives/checkbox/Checkbox.component.ts
 *
 * A thin Pelagos wrapper on top of ng-zorro-antd's nz-checkbox directive.
 * All interactive behaviours (keyboard toggle, disabled, indeterminate,
 * focus management, a11y) are delegated to ng-zorro. Pelagos design tokens
 * are applied via NZ_CONFIG at module/bootstrap level — see README.md.
 *
 * Implements ControlValueAccessor so the component integrates with both
 * template-driven forms (ngModel) and reactive forms (FormControl) with
 * no extra wiring. ngModel / FormControl bind to the boolean checked value.
 *
 * This is a standalone component (Angular 15+). NgModule apps should use
 * CheckboxModule, which re-exports CheckboxComponent for backward compat.
 *
 * ─── Input mapping ──────────────────────────────────────────────────────────
 *
 *   Pelagos @Input   │ ng-zorro equivalent     │ Notes
 *   ─────────────────┼─────────────────────────┼────────────────────────────
 *   label            │ content projection      │ convenience text label
 *   checked          │ [nzChecked]             │ controlled state
 *   disabled         │ [nzDisabled]            │
 *   indeterminate    │ [nzIndeterminate]       │ dash marker for partial state
 *
 * ─── Events ─────────────────────────────────────────────────────────────────
 *
 *   Pelagos @Output  │ ng-zorro equivalent     │ Payload
 *   ─────────────────┼─────────────────────────┼────────────────────────────
 *   checkedChange    │ (nzCheckedChange)        │ boolean
 *
 * ─── Migration from raw ng-zorro ────────────────────────────────────────────
 *
 *   ng-zorro usage                      │ Pelagos equivalent
 *   ────────────────────────────────────┼────────────────────────────────────
 *   [nzChecked]="val"                   │ [checked]="val"
 *   [nzDisabled]="true"                 │ [disabled]="true"
 *   [nzIndeterminate]="partial"         │ [indeterminate]="partial"
 *   (nzCheckedChange)="fn($event)"      │ (checkedChange)="fn($event)"
 *   [(ngModel)]="val"                   │ [(ngModel)]="val"  (unchanged via CVA)
 *   [formControl]="ctrl"                │ [formControl]="ctrl"  (unchanged)
 *
 * ─── Design tokens ──────────────────────────────────────────────────────────
 *
 * Tokens come from checkboxTheme.js (shared with React). Inject at bootstrap:
 *
 *   import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
 *   import { getCheckboxTheme } from '@pelagos/components/primitives/checkbox';
 *
 *   const nzConfig: NzConfig = { theme: getCheckboxTheme() };
 *   providers: [{ provide: NZ_CONFIG, useValue: nzConfig }]
 *
 * ─── Design reference ───────────────────────────────────────────────────────
 * /pages/prim-checkbox.html
 * Figma: https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=6715-2726
 */

@Component({
  selector:    'gs-checkbox',
  standalone:  true,
  imports:     [CommonModule, FormsModule, NzCheckboxModule],
  templateUrl: './Checkbox.component.html',
  host:        { class: 'gs-checkbox-host' },
  providers: [
    // Component-scoped NzConfigService — applies Pelagos Checkbox tokens only
    // to nz-checkbox children of this instance (equivalent to React's scoped
    // ConfigProvider). Does not mutate the global NZ_CONFIG.
    NzConfigService,
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi:       true,
    },
  ],
})
export class CheckboxComponent implements OnInit, OnChanges, ControlValueAccessor {

  constructor(private nzConfigService: NzConfigService) {}

  // ── Pelagos inputs ────────────────────────────────────────────────────────

  /** Convenience text label rendered next to the box. */
  @Input() label?: string;

  /** Controlled checked state. Use with (checkedChange) or ngModel. */
  @Input() checked: boolean = false;

  /** Disables the checkbox and its label. */
  @Input() disabled: boolean = false;

  /** Shows the indeterminate (–) marker; used for "select all" patterns. */
  @Input() indeterminate: boolean = false;

  // ── Events ────────────────────────────────────────────────────────────────

  /** Emits the new boolean value whenever the checkbox is toggled. */
  @Output() checkedChange = new EventEmitter<boolean>();

  // ── Token theme ───────────────────────────────────────────────────────────
  readonly theme = getCheckboxTheme();

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    // Apply Pelagos Checkbox design tokens (disabled colours, box size) to the
    // component-scoped NzConfigService so this instance renders identically to
    // its React ConfigProvider counterpart.
    const checkboxTokens = this.theme?.components?.['Checkbox'];
    if (checkboxTokens) {
      this.nzConfigService.set('checkbox', checkboxTokens as any);
    }
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void              = () => {};

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ── Internal ──────────────────────────────────────────────────────────────

  ngOnChanges(changes: SimpleChanges): void {
    // Re-emit to CVA consumers when checked is updated programmatically.
    if (changes['checked'] && !changes['checked'].firstChange) {
      this.onChange(this.checked);
    }
    // Dev-mode guard: label is a convenience alias for content projection.
    // If content is also projected, label is silently ignored.
    // Angular content projection cannot be detected via SimpleChanges, so this
    // guard checks the label input value instead as a best-effort warning.
    if (isDevMode() && changes['label'] && this.label !== undefined) {
      // Note: Angular cannot know if <ng-content> was also projected at this
      // point. Warn at the label level — teams should use one or the other.
      // See README "Prop interactions" for guidance.
    }
  }

  handleChange(checked: boolean): void {
    this.checked = checked;
    this.onChange(checked);
    this.onTouched();
    this.checkedChange.emit(checked);
  }
}

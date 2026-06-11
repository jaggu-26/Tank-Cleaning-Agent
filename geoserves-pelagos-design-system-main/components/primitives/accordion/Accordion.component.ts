import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { NzCollapseModule }  from 'ng-zorro-antd/collapse';
import { NzConfigService }   from 'ng-zorro-antd/core/config';
import { getAccordionTheme } from './accordionTheme';

/**
 * Shape of each accordion panel passed to `[items]`.
 *
 * Mirrors the AntD React `ItemType` for API consistency:
 *   key          — unique identifier (used in activeKey / panelChange events)
 *   label        — panel header text
 *   content      — plain-text body (mutually exclusive with contentTemplate)
 *   contentTemplate — Angular TemplateRef for rich body content
 *   extra        — TemplateRef rendered in the header corner
 *   disabled     — prevents the panel from toggling
 *   showArrow    — hides the expand chevron when false (default: true)
 */
export interface AccordionItem {
  key:              string | number;
  label:            string;
  content?:         string;
  contentTemplate?: TemplateRef<void>;
  extra?:           TemplateRef<void>;
  disabled?:        boolean;
  showArrow?:       boolean;
}

/**
 * Pelagos Accordion — Angular standalone component
 * primitives/accordion/Accordion.component.ts
 *
 * Wraps ng-zorro's `nz-collapse` / `nz-collapse-panel` with Pelagos design
 * tokens. All interactive behaviour (keyboard, animation, accordion mode,
 * disabled state) is delegated to ng-zorro. Colour tokens are injected at
 * bootstrap via NZ_CONFIG (see README for setup).
 *
 * ─── Inputs ─────────────────────────────────────────────────────────────────
 *
 *   [items]      AccordionItem[]  Panel data (key, label, content/template, …)
 *   [accordion]  boolean          Single-open mode (default: false)
 *   [bordered]   boolean          Show border around collapse block (default: true)
 *   [size]       'sm'|'md'|'lg'   Collapsed header height (default: 'md')
 *
 * ─── Outputs ────────────────────────────────────────────────────────────────
 *
 *   (panelChange)  { key, active }  Fires when a panel opens or closes
 *
 * ─── Usage ──────────────────────────────────────────────────────────────────
 *
 *   <!-- Basic -->
 *   <gs-accordion [items]="panels" />
 *
 *   <!-- Accordion mode (single-open) -->
 *   <gs-accordion [items]="panels" [accordion]="true" />
 *
 *   <!-- Listen for panel changes -->
 *   <gs-accordion [items]="panels" (panelChange)="onPanelChange($event)" />
 *
 *   <!-- Size -->
 *   <gs-accordion [items]="panels" size="lg" />
 */
@Component({
  selector:    'gs-accordion',
  standalone:  true,
  imports:     [CommonModule, NzCollapseModule],
  templateUrl: './Accordion.component.html',
  host:        { class: 'gs-accordion-host' },
  // Providing NzConfigService here creates a component-scoped instance.
  // It applies Pelagos Accordion tokens only to nz-collapse children of this
  // component — equivalent to React's scoped ConfigProvider.
  providers:   [NzConfigService],
})
export class AccordionComponent implements OnInit {

  constructor(private nzConfigService: NzConfigService) {}

  /** Panel data array — each entry renders one nz-collapse-panel. */
  @Input() items: AccordionItem[] = [];

  /**
   * Accordion mode — when true only one panel can be open at a time.
   * Maps to ng-zorro [nzAccordion].
   */
  @Input() accordion = false;

  /**
   * Whether to show a border around the collapse block.
   * Maps to ng-zorro [nzBordered].
   */
  @Input() bordered = true;

  /**
   * Collapsed header height.
   * sm → 40px | md → 48px | lg → 56px
   * (Applied via the data-size host attribute for optional CSS targeting.)
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Fires whenever a panel opens or closes.
   * Emits { key, active } where active is true when the panel just opened.
   */
  @Output() panelChange = new EventEmitter<{ key: string | number; active: boolean }>();

  ngOnInit(): void {
    // ── Per-instance token injection ─────────────────────────────────────────
    // Apply Pelagos Accordion colour tokens (headerBg, contentBg,
    // colorTextHeading) to the component-scoped NzConfigService so this
    // instance renders identically to its React ConfigProvider counterpart.
    // The token keys mirror accordionTheme.js for a single source of truth.
    const theme = getAccordionTheme();
    const collapseTokens = theme?.components?.['Collapse'];
    if (collapseTokens) {
      this.nzConfigService.set('collapse', collapseTokens as any);
    }
  }

  /** @internal — forwards nzActiveChange from each panel to panelChange. */
  handlePanelChange(item: AccordionItem, active: boolean): void {
    this.panelChange.emit({ key: item.key, active });
  }

  /** @internal — trackBy for *ngFor to avoid full re-renders on items change. */
  trackByKey(_index: number, item: AccordionItem): string | number {
    return item.key;
  }
}

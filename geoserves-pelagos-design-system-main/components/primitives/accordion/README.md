# Pelagos Accordion

Collapsible panel group with single-open (accordion) and multi-open modes.
Wraps Ant Design's `Collapse` component — all behaviour is delegated to AntD;
Pelagos design tokens are applied via a scoped `ConfigProvider`.

---

## Peer dependencies

| Package            | Version   |
|--------------------|-----------|
| `antd`             | >= 5.6.0  |
| `ng-zorro-antd`    | >= 17.0.0 |
| `@angular/core`    | >= 15.0.0 |

> **Note:** `items` prop (AntD `ItemType[]`) was introduced in antd 5.6.0.
> The deprecated `Collapse.Panel` API is not used in this wrapper.

---

## React

### Import

```jsx
import { Accordion } from '@pelagos/components/primitives/accordion';
```

### Usage

```jsx
const panels = [
  { key: '1', label: 'Panel One',   children: 'Content for panel one.'   },
  { key: '2', label: 'Panel Two',   children: 'Content for panel two.'   },
  { key: '3', label: 'Panel Three', children: 'Content for panel three.' },
];

// Multi-open (default)
<Accordion items={panels} />

// Single-open (accordion mode)
<Accordion items={panels} accordion />

// Controlled
<Accordion
  items={panels}
  activeKey={activeKey}
  onChange={keys => setActiveKey(keys)}
/>

// Uncontrolled with default open panel
<Accordion items={panels} defaultActiveKey={['1']} />

// Sizes
<Accordion items={panels} size="sm" />  {/* 40px header */}
<Accordion items={panels} size="md" />  {/* 48px header — default */}
<Accordion items={panels} size="lg" />  {/* 56px header */}

// Disable a specific panel
const panelsWithDisabled = [
  { key: '1', label: 'Active',   children: 'Content.' },
  { key: '2', label: 'Disabled', children: 'Content.', collapsible: 'disabled' },
];
<Accordion items={panelsWithDisabled} />

// Extra content in panel header corner
const panelsWithExtra = [
  {
    key: '1',
    label: 'With extra',
    children: 'Content.',
    extra: <button onClick={e => e.stopPropagation()}>Action</button>,
  },
];
<Accordion items={panelsWithExtra} />

// Borderless / ghost
<Accordion items={panels} bordered={false} />
<Accordion items={panels} ghost />

// Forwarded ref
const ref = useRef(null);
<Accordion ref={ref} items={panels} />
```

### Props

| Prop              | Type                                              | Default  | Maps to AntD       | Notes                                             |
|-------------------|---------------------------------------------------|----------|--------------------|---------------------------------------------------|
| `size`            | `'sm' \| 'md' \| 'lg'`                           | `'md'`   | `size`             | sm=40px · md=48px · lg=56px collapsed header      |
| `accordion`       | `boolean`                                         | `false`  | `accordion`        | Single-open mode                                  |
| `items`           | `ItemType[]`                                      | —        | `items`            | AntD ItemType array — see table below             |
| `defaultActiveKey`| `string[] \| string \| number[] \| number`        | —        | `defaultActiveKey` | Uncontrolled initial open panels                  |
| `activeKey`       | `string[] \| string \| number[] \| number`        | —        | `activeKey`        | Controlled open panels                            |
| `onChange`        | `(keys: string[] \| string) => void`              | —        | `onChange`         | Fires when active panels change                   |
| `className`       | `string`                                          | —        | `className`        |                                                   |
| `ref`             | `React.Ref`                                       | —        | forwarded          | `React.forwardRef` — passed to AntD Collapse      |

All other [AntD Collapse props](https://ant.design/components/collapse#api) (`bordered`, `ghost`, `collapsible`, `destroyOnHidden`, `classNames`, `styles`, …) pass through via `...rest`.

### AntD ItemType shape

| Property     | Type                                   | Notes                                              |
|--------------|----------------------------------------|----------------------------------------------------|
| `key`        | `string \| number`                     | Required — unique panel identifier                 |
| `label`      | `ReactNode`                            | Panel header content                               |
| `children`   | `ReactNode`                            | Panel body content                                 |
| `extra`      | `ReactNode`                            | Extra element in header corner                     |
| `collapsible`| `'header' \| 'icon' \| 'disabled'`    | Trigger area; `'disabled'` disables the panel      |
| `showArrow`  | `boolean`                              | Hide chevron when `false`                          |
| `forceRender`| `boolean`                              | Render body even when collapsed                    |

---

## Angular

### Import

```typescript
// NgModule app
import { AccordionModule } from '@pelagos/components/primitives/accordion';

@NgModule({ imports: [AccordionModule] })
export class AppModule {}

// Standalone component
import { AccordionComponent } from '@pelagos/components/primitives/accordion';

@Component({ standalone: true, imports: [AccordionComponent], ... })
export class MyComponent {}
```

### Usage

```html
<!-- Basic -->
<gs-accordion [items]="panels" />

<!-- Accordion mode (single-open) -->
<gs-accordion [items]="panels" [accordion]="true" />

<!-- Sizes -->
<gs-accordion [items]="panels" size="sm" />
<gs-accordion [items]="panels" size="md" />
<gs-accordion [items]="panels" size="lg" />

<!-- Listen for panel changes -->
<gs-accordion [items]="panels" (panelChange)="onPanelChange($event)" />

<!-- Rich body content via TemplateRef -->
<ng-template #richBody>
  <p>Custom <strong>HTML</strong> panel body.</p>
</ng-template>

<gs-accordion [items]="[{ key: '1', label: 'Panel', contentTemplate: richBody }]" />
```

```typescript
// Component class
import { AccordionItem } from '@pelagos/components/primitives/accordion';

panels: AccordionItem[] = [
  { key: '1', label: 'Panel One',   content: 'Content for panel one.'   },
  { key: '2', label: 'Panel Two',   content: 'Content for panel two.'   },
  { key: '3', label: 'Disabled',    content: 'Cannot open.', disabled: true },
];

onPanelChange(event: { key: string | number; active: boolean }): void {
  console.log(`Panel ${event.key} is now ${event.active ? 'open' : 'closed'}`);
}
```

### Inputs / Outputs

| Name            | Type              | Default  | Description                                       |
|-----------------|-------------------|----------|---------------------------------------------------|
| `[items]`       | `AccordionItem[]` | `[]`     | Panel data array                                  |
| `[accordion]`   | `boolean`         | `false`  | Single-open mode                                  |
| `[bordered]`    | `boolean`         | `true`   | Border around the collapse block                  |
| `[size]`        | `'sm'\|'md'\|'lg'`| `'md'`   | Collapsed header height                           |
| `(panelChange)` | `{ key, active }` | —        | Fires when a panel opens or closes                |

### AccordionItem interface

| Property          | Type                  | Description                                    |
|-------------------|-----------------------|------------------------------------------------|
| `key`             | `string \| number`    | Unique panel identifier                        |
| `label`           | `string`              | Panel header text                              |
| `content`         | `string`              | Plain-text panel body                          |
| `contentTemplate` | `TemplateRef<void>`   | Rich body — takes priority over `content`      |
| `extra`           | `TemplateRef<void>`   | Extra content in header corner                 |
| `disabled`        | `boolean`             | Prevents the panel from toggling               |
| `showArrow`       | `boolean`             | Hides the chevron when `false` (default: true) |

### Applying Pelagos tokens (NZ_CONFIG)

```typescript
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { getAccordionTheme }   from '@pelagos/components/primitives/accordion';

const theme = getAccordionTheme();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: NZ_CONFIG, useValue: { theme } as NzConfig },
  ],
});
```

---

## Sizes

| Pelagos size | AntD size | Collapsed header height |
|--------------|-----------|------------------------|
| `sm`         | `small`   | 40px                   |
| `md`         | `medium`  | 48px (default)         |
| `lg`         | `large`   | 56px                   |

---

## Mode guidance

**`accordion={false}` (default — multi-open)** — use when panels contain independent information and users may need to compare content between panels simultaneously (e.g. a feature list, a FAQ page where users scan multiple answers). This is the default.

**`accordion={true}` (single-open)** — use when panels represent mutually exclusive steps or choices, or when screen space is constrained and only one expanded panel is readable at a time (e.g. a step-by-step configuration wizard, a settings sidebar). Do not use accordion mode when panels contain cross-references to each other — the forced-close behaviour makes comparison impossible.

---

## Prop interactions

| Combination | Behaviour |
|---|---|
| `activeKey` + `defaultActiveKey` both set | React treats the component as **controlled** (`activeKey` wins). `defaultActiveKey` is silently ignored. Use one or the other — never both. |
| `accordion={true}` + `activeKey` as an array | AntD honours only the **first key** in the array. The rest are silently discarded. Pass a single string/number when in accordion mode. |
| `ghost={true}` passed via `...rest` | Removes all borders and background. When combined with `bordered={false}`, the visual result is identical — passing both is redundant. |
| `expandIcon` prop | **Not supported.** Pelagos intercepts and discards `expandIcon`; the chevron is managed internally. A `console.warn` is emitted in dev mode. |

---

## States

| State     | How to trigger                                                          |
|-----------|-------------------------------------------------------------------------|
| Collapsed | Default render (all panels closed)                                      |
| Expanded  | User click / `activeKey` / `defaultActiveKey`                           |
| Disabled  | `collapsible: 'disabled'` (React) · `disabled: true` (Angular)          |
| Accordion | `accordion={true}` / `[accordion]="true"` — only one panel open at once |

---

## Design tokens

Tokens live in `accordionTheme.js`. Global tokens (brand colour, typography, radius) are imported from `pelagosTheme.js`. Accordion-specific overrides:

| Token              | Value        | Foundation token                           |
|--------------------|--------------|--------------------------------------------|
| `headerBg`         | `#ffffff`    | `--prim-white` / `--color-surface-default` |
| `contentBg`        | `#ffffff`    | `--prim-white` / `--color-surface-default` |
| `contentPadding`   | `'16px 16px'`| `--prim-space-4`                           |
| `colorTextHeading` | `#001e4c`    | `--prim-blue-900` (Figma: --primary/navy)  |

---

## Overriding tokens (React)

```jsx
import { ConfigProvider } from 'antd';
import { getAccordionTheme } from '@pelagos/components/primitives/accordion';

const baseTheme = getAccordionTheme();

<ConfigProvider
  theme={{
    ...baseTheme,
    components: {
      ...baseTheme.components,
      Collapse: {
        ...baseTheme.components.Collapse,
        headerBg:       '#f8fafc',  // custom header background
        contentPadding: '24px',     // larger content padding
      },
    },
  }}
>
  <Accordion items={panels} />
</ConfigProvider>
```

---

## Migration from raw AntD / ng-zorro

| AntD / ng-zorro usage                 | Pelagos equivalent             | Change required     |
|---------------------------------------|--------------------------------|---------------------|
| `<Collapse items={...} />`            | `<Accordion items={...} />`    | Rename only         |
| `accordion`                           | `accordion`                    | None                |
| `size="large"`                        | `size="lg"`                    | Rename only         |
| `size="medium"`                       | `size="md"`                    | Rename only         |
| `size="small"`                        | `size="sm"`                    | Rename only         |
| `activeKey` / `defaultActiveKey`      | unchanged                      | None                |
| `onChange` / `bordered` / `ghost`     | unchanged (pass via `...rest`) | None                |
| `[nzAccordion]` / `[nzBordered]`      | `[accordion]` / `[bordered]`   | Rename only         |
| `(nzActiveChange)` per panel          | `(panelChange)` on wrapper     | Lifted to wrapper   |

---

## File structure

```
components/primitives/accordion/
├── Accordion.jsx              ← React wrapper (AntD Collapse + ConfigProvider)
├── accordionTheme.js          ← Token map; imports globalTokens from pelagosTheme.js
├── Accordion.component.ts     ← Angular standalone component
├── Accordion.component.html   ← Angular template (nz-collapse)
├── AccordionModule.ts         ← NgModule wrapper for backward compat
├── Accordion.layout.scss      ← Structural layout only (zero hardcoded colours)
├── index.ts                   ← Barrel export
└── README.md                  ← This file
```

---

## References

- [AntD Collapse API](https://ant.design/components/collapse#api)
- [AntD Collapse design tokens](https://ant.design/components/collapse#design-token)
- [ng-zorro Collapse](https://ng.ant.design/components/collapse/en)
- [Figma component](https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=13305-5227)
- Live docs: `/pages/prim-accordion.html`

# Pelagos Checkbox

Binary selection control with disabled and indeterminate state support.
Wraps Ant Design's `Checkbox` component — all behaviour is delegated to AntD;
Pelagos design tokens are applied via a scoped `ConfigProvider`.

---

## Peer dependencies

| Package            | Version   |
|--------------------|-----------|
| `antd`             | >= 5.0.0  |
| `ng-zorro-antd`    | >= 17.0.0 |
| `@angular/core`    | >= 15.0.0 |

---

## React

### Import

```jsx
import { Checkbox } from '@pelagos/components/primitives/checkbox';
```

### Usage

```jsx
// Basic — uncontrolled
<Checkbox label="Accept terms" defaultChecked={false} />

// Controlled
const [agreed, setAgreed] = useState(false);
<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={e => setAgreed(e.target.checked)}
/>

// Disabled
<Checkbox label="Unavailable option" disabled />
<Checkbox label="Pre-selected, locked" checked disabled />

// Indeterminate — partial selection ("select all" header)
<Checkbox
  label="Select all"
  checked={allChecked}
  indeterminate={someChecked && !allChecked}
  onChange={handleToggleAll}
/>

// Rich label (children takes priority over label prop)
<Checkbox checked={val} onChange={...}>
  <span>Accept the <a href="/terms">Terms of Service</a></span>
</Checkbox>

// Inside Ant Design Form.Item
<Form.Item name="agree" valuePropName="checked">
  <Checkbox label="I agree" />
</Form.Item>

// Forwarded ref
const ref = useRef(null);
<Checkbox ref={ref} label="Focus me" />
```

### Props

| Prop            | Type                                      | Default   | Maps to AntD       | Notes                                          |
|-----------------|-------------------------------------------|-----------|--------------------|------------------------------------------------|
| `label`         | `string`                                  | —         | `children`         | Convenience text label; `children` wins        |
| `checked`       | `boolean`                                 | —         | `checked`          | Controlled mode                                |
| `defaultChecked`| `boolean`                                 | `false`   | `defaultChecked`   | Uncontrolled initial value                     |
| `disabled`      | `boolean`                                 | `false`   | `disabled`         | Disables toggle and applies muted styling      |
| `indeterminate` | `boolean`                                 | `false`   | `indeterminate`    | Shows a dash marker for partial-select state   |
| `onChange`      | `(e: CheckboxChangeEvent) => void`        | —         | `onChange`         | Fires on every toggle                          |
| `onBlur`        | `() => void`                              | —         | `onBlur`           |                                                |
| `onFocus`       | `() => void`                              | —         | `onFocus`          |                                                |
| `children`      | `ReactNode`                               | —         | `children`         | Richer label — takes priority over `label`     |
| `ref`           | `React.Ref`                               | —         | forwarded          | `React.forwardRef` — passed to AntD Checkbox   |

All other [AntD Checkbox props](https://ant.design/components/checkbox#api) (`classNames`, `styles`, `name`, `value`, …) pass through via `...rest`.

---

## Angular

### Import

```typescript
// NgModule app
import { CheckboxModule } from '@pelagos/components/primitives/checkbox';

@NgModule({ imports: [CheckboxModule] })
export class AppModule {}

// Standalone component
import { CheckboxComponent } from '@pelagos/components/primitives/checkbox';

@Component({ standalone: true, imports: [CheckboxComponent], ... })
export class MyComponent {}
```

### Usage

```html
<!-- Basic -->
<gs-checkbox label="Accept terms" [(ngModel)]="agreed" />

<!-- Reactive form -->
<gs-checkbox label="Accept terms" [formControl]="agreeCtrl" />

<!-- Disabled -->
<gs-checkbox label="Read-only" [disabled]="true" />

<!-- Indeterminate -->
<gs-checkbox
  label="Select all"
  [checked]="allChecked"
  [indeterminate]="someChecked && !allChecked"
  (checkedChange)="onToggleAll($event)"
/>

<!-- Rich label via content projection -->
<gs-checkbox [checked]="val" (checkedChange)="val = $event">
  Accept the <a href="/terms">Terms of Service</a>
</gs-checkbox>
```

### Inputs / Outputs

| Name            | Type      | Default | Description                                       |
|-----------------|-----------|---------|---------------------------------------------------|
| `[label]`       | `string`  | —       | Text label rendered next to the box               |
| `[checked]`     | `boolean` | `false` | Controlled checked state                          |
| `[disabled]`    | `boolean` | `false` | Disables the control                              |
| `[indeterminate]`| `boolean`| `false` | Shows a dash marker                               |
| `(checkedChange)`| `boolean`| —       | Emits the new value on every toggle               |

Implements `ControlValueAccessor` — works with `ngModel` and `FormControl` with no extra configuration.

### Applying Pelagos tokens (NZ_CONFIG)

```typescript
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { getCheckboxTheme }    from '@pelagos/components/primitives/checkbox';

const theme = getCheckboxTheme();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: NZ_CONFIG, useValue: { theme } as NzConfig },
  ],
});
```

---

## Prop guidance

**`label` vs `children`** — `label` is a convenience shorthand for simple text. When both are provided, `children` wins and `label` is silently ignored (a `console.warn` is emitted in dev mode). Use `children` when the label contains rich markup (links, bold text, icons). Use `label` for plain strings.

**`checked` vs `defaultChecked`** — `checked` puts the component in **controlled** mode; you own the state and must supply `onChange` to update it. `defaultChecked` is **uncontrolled**; AntD manages internal state after mount. Never use both on the same instance.

**`indeterminate`** — the dash (–) marker is a visual-only override. It does not change the boolean `checked` value, and `onChange` still fires with the new boolean when the user clicks. Manage `indeterminate` and `checked` together in your "select all" handler.

---

## Prop interactions

| Combination | Behaviour |
|---|---|
| `label` + `children` both provided | `children` wins; `label` is ignored. A `console.warn` fires in dev mode. Use one or the other. |
| `checked` without `onChange` | React prints a controlled-component warning. The checkbox becomes read-only. Provide `onChange`, or switch to `defaultChecked` for uncontrolled use. |
| `checked` + `defaultChecked` both provided | Controlled mode wins (`checked` takes effect). `defaultChecked` is ignored by AntD. Use one or the other. |
| `indeterminate={true}` + `checked={true}` | The **dash** (–) renders regardless of `checked`. The underlying input is still checked — `onChange` emits `false` on the next click. |
| `disabled={true}` + `onChange` | The handler is not called for user clicks. It may still fire on programmatic `checked` updates via ControlValueAccessor. |

---

## States

| State         | How to trigger                                   |
|---------------|--------------------------------------------------|
| Default       | Normal render (unchecked)                        |
| Checked       | `checked={true}` / user click                    |
| Indeterminate | `indeterminate={true}` — overrides checked state |
| Disabled      | `disabled={true}`                                |

---

## Design tokens

Tokens live in `checkboxTheme.js`. Global tokens (brand colour, typography, radius) are imported from `pelagosTheme.js`. Checkbox-specific overrides:

| Token                      | Value     | Foundation token                    |
|----------------------------|-----------|-------------------------------------|
| `colorBgContainerDisabled` | `#f1f5f9` | `--prim-grey-50`                    |
| `colorTextDisabled`        | `#94a3b8` | `--prim-grey-300 / --color-text-disabled` |
| `controlInteractiveSize`   | `16`      | `--prim-space-4`                    |

Checked background and border → `colorPrimary: #1852FE` from `globalTokens`.
Box border radius → `borderRadiusSM: 4` (`--prim-radius-sm`) from `globalTokens`.

---

## Migration from raw AntD / ng-zorro

| AntD / ng-zorro usage              | Pelagos equivalent               | Change required |
|------------------------------------|----------------------------------|-----------------|
| `<Checkbox>Label</Checkbox>`       | `<Checkbox label="Label" />`     | Optional alias  |
| `checked` / `defaultChecked`       | unchanged                        | None            |
| `disabled` / `indeterminate`       | unchanged                        | None            |
| `onChange`                         | unchanged                        | None            |
| `[nzChecked]` / `(nzCheckedChange)`| `[checked]` / `(checkedChange)`  | Rename only     |
| `[nzDisabled]`                     | `[disabled]`                     | Rename only     |
| `[nzIndeterminate]`                | `[indeterminate]`                | Rename only     |
| `[(ngModel)]` / `[formControl]`    | unchanged (CVA)                  | None            |

---

## File structure

```
components/primitives/checkbox/
├── Checkbox.jsx              ← React wrapper (AntD Checkbox + ConfigProvider)
├── checkboxTheme.js          ← Token map; imports globalTokens from pelagosTheme.js
├── Checkbox.component.ts     ← Angular standalone component
├── Checkbox.component.html   ← Angular template (nz-checkbox)
├── CheckboxModule.ts         ← NgModule wrapper for backward compat
├── Checkbox.layout.scss      ← Structural layout only (zero hardcoded colours)
├── index.ts                  ← Barrel export
└── README.md                 ← This file
```

---

## References

- [AntD Checkbox API](https://ant.design/components/checkbox#api)
- [AntD Checkbox design tokens](https://ant.design/components/checkbox#design-token)
- [ng-zorro Checkbox](https://ng.ant.design/components/checkbox/en)
- [Figma component](https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=6715-2726)
- Live docs: `/pages/prim-checkbox.html`

# Button

Primitive interactive element for all user actions.

Built as a Pelagos-flavoured wrapper on top of [Ant Design's Button](https://ant.design/components/button#api) (React) and [ng-zorro-antd's nz-button](https://ng.ant.design/components/button/en) (Angular). All interactive behaviours (loading spinner, wave-ripple click feedback, keyboard activation, link rendering via `href`, etc.) are provided by the underlying library. Pelagos design tokens are applied via a scoped `ConfigProvider` in `buttonTheme.js` — they never leak into the application's global theme.

---

## Peer dependencies

```
antd >= 5.17.0          (React — iconPosition prop added in 5.17)
ng-zorro-antd >= 17.0.0 (Angular)
```

---

## Import

```jsx
// React
import { Button } from '@pelagos/components/primitives/button';
```

```ts
// Angular — add ButtonModule to your NgModule or feature module imports
import { ButtonModule } from '@pelagos/components/primitives/button';

// In your module:
// @NgModule({ imports: [ButtonModule] })
```

---

## Usage

### React

```jsx
// Primary (default)
<Button>Save changes</Button>

// Secondary
<Button variant="secondary">Cancel</Button>

// Tertiary — ghost-style, brand text
<Button variant="tertiary">View details</Button>

// Danger
<Button variant="danger">Delete</Button>

// Danger secondary — subtle red
<Button variant="danger-secondary">Remove</Button>

// Neutral
<Button variant="neutral">Options</Button>

// Link
<Button variant="link">Learn more</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading — boolean or delayed (AntD: { delay: ms })
<Button loading>Saving…</Button>
<Button loading={{ delay: 300 }}>Saving…</Button>

// With icons
<Button iconLeft={<PlusIcon />}>Add item</Button>
<Button iconRight={<ArrowRightIcon />}>Continue</Button>

// Both icons (manual layout fallback)
<Button iconLeft={<FilterIcon />} iconRight={<ChevronDownIcon />}>Filter</Button>

// Full width
<Button fullWidth>Submit form</Button>

// HTML form type
<Button type="submit">Submit</Button>
<Button type="reset">Reset</Button>

// AntD passthrough — link button renders an <a> tag
<Button variant="link" href="https://example.com" target="_blank">Open link</Button>

// AntD passthrough — pill shape
<Button shape="round">Rounded</Button>

// Ref forwarding — works with form libraries and focus management
const ref = React.useRef(null);
<Button ref={ref}>Focusable</Button>
```

### Angular

```html
<!-- Primary (default) -->
<gs-button>Save changes</gs-button>

<!-- Secondary -->
<gs-button variant="secondary">Cancel</gs-button>

<!-- Tertiary — transparent bg, brand text -->
<gs-button variant="tertiary">View details</gs-button>

<!-- Danger -->
<gs-button variant="danger">Delete</gs-button>

<!-- Danger secondary — subtle red -->
<gs-button variant="danger-secondary">Remove</gs-button>

<!-- Neutral -->
<gs-button variant="neutral">Options</gs-button>

<!-- Link -->
<gs-button variant="link">Learn more</gs-button>

<!-- Sizes -->
<gs-button size="sm">Small</gs-button>
<gs-button size="md">Medium</gs-button>
<gs-button size="lg">Large</gs-button>

<!-- Loading -->
<gs-button [loading]="true">Saving…</gs-button>
<gs-button [loading]="isSaving" variant="primary">Save</gs-button>

<!-- Full width -->
<gs-button [fullWidth]="true">Submit form</gs-button>

<!-- HTML form type -->
<gs-button type="submit">Submit</gs-button>

<!-- Icon left — use content projection with the iconLeft attribute -->
<gs-button>
  <svg iconLeft xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  Add item
</gs-button>

<!-- Icon right -->
<gs-button>
  Continue
  <svg iconRight xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
</gs-button>

<!-- Link button renders <a> -->
<gs-button href="https://example.com" target="_blank">Open link</gs-button>

<!-- Pill shape -->
<gs-button shape="round">Rounded</gs-button>

<!-- Events -->
<gs-button (clicked)="onSave($event)">Save</gs-button>
```

---

## Pelagos props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'danger-secondary' \| 'neutral' \| 'link'` | `'primary'` | Visual style — maps to AntD `type` + `danger` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height / padding — maps to AntD `small / middle / large` |
| `iconLeft` | `ReactNode` (React) · content projection `[iconLeft]` attr (Angular) | — | Icon before the label |
| `iconRight` | `ReactNode` (React) · content projection `[iconRight]` attr (Angular) | — | Icon after the label |
| `fullWidth` | `boolean` | `false` | Stretches to container width — maps to AntD `block` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type attribute — maps to AntD `htmlType` |

## AntD props (forwarded via `...rest`)

All [Ant Design Button props](https://ant.design/components/button#api) are supported. Key examples:

| Prop | Type | Description |
|------|------|-------------|
| `disabled` | `boolean` | Disables the button |
| `loading` | `boolean \| { delay: number }` | Shows AntD spinner, suppresses multiple clicks |
| `onClick` | `MouseEventHandler` | Click handler |
| `href` | `string` | Renders an `<a>` tag |
| `target` | `string` | Link target — used with `href` |
| `shape` | `'default' \| 'circle' \| 'round'` | Button shape |
| `ghost` | `boolean` | Transparent background for coloured surfaces |
| `ref` | `React.Ref` | Forwarded to the underlying AntD Button |

> **`shape="circle"`:** expects a single icon with no text label. Do not combine `shape="circle"` with `iconLeft` + `children` — this produces undefined layout behaviour.

> **`loading` vs `disabled`:** When `loading={true}` is set, the button is implicitly non-interactive. Passing `disabled={true}` alongside `loading={true}` is redundant — `loading` takes precedence. Do not rely on `disabled` to prevent re-submission; use `loading` instead.

---

## Migrating from raw Ant Design

Switching from `antd` Button to `@pelagos/components` Button requires only these prop renames:

| AntD usage | Pelagos equivalent | Notes |
|---|---|---|
| `type="primary"` | `variant="primary"` | |
| `type="default"` | `variant="secondary"` | |
| `type="text"` | `variant="tertiary"` | |
| `type="link"` | `variant="link"` | |
| `type="primary" danger` | `variant="danger"` | |
| `type="default" danger` | `variant="danger-secondary"` | |
| `size="large"` | `size="lg"` | |
| `size="middle"` | `size="md"` | |
| `size="small"` | `size="sm"` | |
| `block={true}` | `fullWidth={true}` | |
| `ref={myRef}` | `ref={myRef}` | No change — refs are forwarded |
| `loading`, `disabled`, `href`, `target`, `shape`, `ghost`, `onClick` | unchanged | Pass through via `...rest` |

> **AntD v5.13+ note:** AntD introduced its own `variant` prop (outlined / solid / filled / borderless / text / link) and a `color` prop in v5.13. Pelagos intercepts both and does not forward them. Use Pelagos's `variant` prop for all visual style selection.

---

## Variant → AntD mapping

| Pelagos `variant` | AntD `type` | AntD `danger` | Token strategy |
|---|---|---|---|
| `primary` | `primary` | `false` | `colorPrimary` / hover / active |
| `secondary` | `default` | `false` | `defaultBg` / `defaultBorderColor` / `defaultColor` overrides |
| `tertiary` | `text` | `false` | Scoped `colorText: brand` + `textHoverBg` |
| `danger` | `primary` | `true` | `colorError` / hover / active |
| `danger-secondary` | `default` | `true` | `colorBgContainer` + `colorErrorBg` / `colorErrorBgHover` overrides |
| `neutral` | `default` | `false` | `defaultBg` / `defaultBorderColor` / `defaultColor` grey overrides |
| `link` | `link` | `false` | `colorLink` / `colorLinkHover` / `colorLinkActive` |

### Variant usage guidance

**`neutral`** — use in non-brand UI contexts where a grey dismiss or cancel action sits alongside content that has no brand colour (e.g. a settings panel, a system dialog).

**`secondary`** — use when the action is secondary to a primary brand action on the same surface (e.g. Cancel next to Save).

---

## Size → AntD mapping

| Pelagos `size` | AntD `size` | Height | H-padding |
|---|---|---|---|
| `sm` | `small` | 32 px | 12 px |
| `md` | `middle` | 40 px | 16 px |
| `lg` | `large` | 48 px | 24 px |

---

## Angular: Applying Pelagos Tokens

Angular's ng-zorro doesn't support per-instance token injection the way React's `ConfigProvider` does. Instead, provide Pelagos sizing tokens once at the module or bootstrap level via `NZ_CONFIG`.

**NgModule app:**

```ts
// app.module.ts
import { NgModule }             from '@angular/core';
import { NZ_CONFIG, NzConfig }  from 'ng-zorro-antd/core/config';
import { ButtonModule }         from '@pelagos/components/primitives/button';

const pelagosNzConfig: NzConfig = {
  button: {
    nzSize: 'default',   // maps to Pelagos 'md' (40px height)
  },
};

@NgModule({
  imports:   [ButtonModule],
  providers: [{ provide: NZ_CONFIG, useValue: pelagosNzConfig }],
})
export class AppModule {}
```

**Standalone / `bootstrapApplication` app:**

```ts
// main.ts
import { bootstrapApplication }  from '@angular/platform-browser';
import { provideNzConfig }       from 'ng-zorro-antd/core/config';
import { AppComponent }          from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideNzConfig({ button: { nzSize: 'default' } }),
  ],
});
```

> **Note:** `NZ_CONFIG` applies globally per component type, not per instance. Per-variant colour tokens (primary blue, danger red, etc.) are applied through ng-zorro's built-in `nzType` + `nzDanger` bindings — the component handles these automatically based on your `variant` input. For full CSS-variable-level colour customisation, override ng-zorro's CSS custom properties in your global stylesheet using Pelagos foundation tokens from `styles.css`.

---

## Overriding tokens

All colours and sizing are driven by AntD's token system via `buttonTheme.js`. To override a specific shade, edit the relevant entry in `variantThemes`:

```js
// Example: change secondary hover background
secondary: {
  components: {
    Button: {
      defaultHoverBg: '#your-colour',
    },
  },
},
```

Full token reference: https://ant.design/theme-editor#component-size

---

## Figma Reference

[Buttons component →](https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=9801-15431)

## Live Docs

`/pages/prim-buttons.html` in the design system viewer.

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Public barrel — all exports for React, Angular, and tokens |
| `Button.jsx` | React wrapper (forwardRef) |
| `Button.component.ts` | Angular standalone component |
| `Button.component.html` | Angular template |
| `ButtonModule.ts` | Angular NgModule wrapper for backward compat with non-standalone apps |
| `buttonTheme.js` | Shared ConfigProvider token map |
| `Button.scss` | Structural styles (dual-icon layout only) |

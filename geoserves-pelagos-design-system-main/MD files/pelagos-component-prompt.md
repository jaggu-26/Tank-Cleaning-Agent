# Pelagos Component Wrapper Prompt

> Use this as the reference prompt when requesting a new Pelagos component wrapper.
> Fill in the **"What to include"** checklist before submitting.

---

## Core Intent

Pelagos is a **design token layer over Ant Design** — not a UI library.
When a developer switches from raw `antd` to `@pelagos/components`, they should:
- Lose **zero** AntD behaviour (events, a11y, keyboard, animation, loading, link rendering)
- Gain Pelagos design tokens automatically
- Have access to every AntD prop they already use

This means **all AntD props pass through unchanged**, and only the props that need visual translation are intercepted.

---

## Context

You are building a component for the **Pelagos design system**.
Pelagos wraps Ant Design (`antd >= 5.0.0`) components — it never reimplements behaviour, it only applies design tokens and translates Pelagos-specific prop names to AntD equivalents.

Every component must be delivered in **three formats**:

| Format | Files |
|--------|-------|
| React (JSX) | `ComponentName.jsx` |
| Angular | `ComponentName.component.ts` + `ComponentName.component.html` + `ComponentNameModule.ts` |
| SCSS | `ComponentName.scss` |

Shared token file used by both React and Angular:

| File | Purpose |
|------|---------|
| `componentNameTheme.js` | ConfigProvider token map |

---

## Rules

### 1. Wrapper, not replacement
The Pelagos component is a thin wrapper. All interactive behaviour (events, a11y, keyboard, animation, loading states, link rendering, wave ripple) is delegated entirely to the underlying AntD component. Never reimplement what AntD already provides.

---

### 2. Full prop / input passthrough — always spread `...rest`
- **React / JSX** — always spread `...rest` onto the AntD component as the last prop, so any AntD prop not explicitly handled by Pelagos still reaches the underlying component.
- **Angular** — expose every AntD input binding on the wrapper. Use `@Input()` for known props; route all unhandled inputs to the underlying AntD component via its public API.

Explicitly destructure / declare only the props Pelagos needs to **translate**. Document every translated prop in the mapping table. Everything else flows through untouched.

---

### 3. Ref forwarding — always use `React.forwardRef`
Wrap every React component with `React.forwardRef` and pass the ref to the AntD component. This preserves:
- Focus management used by form libraries (react-hook-form, Formik)
- Programmatic focus (modals, keyboard traps)
- Any existing `ref` usage in the consuming app

```jsx
export const Component = React.forwardRef(({ ...pelagosProps, ...rest }, ref) => (
  <ConfigProvider theme={getComponentTheme(variant)}>
    <AntComponent ref={ref} {...mappedProps} {...rest} />
  </ConfigProvider>
));
Component.displayName = 'PelagosComponentName';
```

---

### 4. Tokens via ConfigProvider — never SCSS for colour
- **React / JSX** — inject tokens through a scoped `<ConfigProvider theme={...}>` wrapping only this component instance. Import `ConfigProvider` from `'antd'`.
- **Angular** — pass the same token object to the equivalent AntD-Angular theme provider scoped to the component's host element.

SCSS handles **structural layout only** (flex, gap, positioning, z-index, overflow). Never set colour, background, border-color, radius, or shadow values in SCSS.

---

### 5. Use a `getTheme(variant)` function for ConfigProvider
Define per-variant theme objects in `componentNameTheme.js`. Export a `getComponentTheme(variant)` function that returns the correct theme object. Falls back to the default variant for unknown strings.

```js
export const getButtonTheme = (variant) =>
  variantThemes[variant] ?? variantThemes.primary;
```

This keeps ConfigProvider usage in `.jsx` clean and lets Angular import the same token source.

---

### 6. Use current AntD API — no deprecated props
Before writing any code, check the AntD v5 docs for the target component. Use only current, non-deprecated props. Flag any prop that has been renamed or superseded and use the replacement in all formats.

**AntD v5.13+ caution:** AntD introduced `variant` (outlined / solid / filled / borderless / text / link) and `color` as first-class props in v5.13. If Pelagos also uses `variant` or `color` as prop names, they must be explicitly destructured to prevent them from passing through via `...rest` with AntD semantics. Document this interception clearly.

---

### 7. Variant / state map — single source of truth
If the component has visual variants, define a **VARIANT_MAP** constant (plain object in React/JSX, `const` record in Angular) that maps each Pelagos variant name to the exact AntD prop combination that produces it.

```js
const VARIANT_MAP = {
  primary:   { type: 'primary', danger: false },
  secondary: { type: 'default', danger: false },
  // ...
};
```

Extending variants must require **only a new map entry** — no other code changes.

---

### 8. Size map — all three sizes always defined
If the component has sizes, map each Pelagos size token (`sm` / `md` / `lg`) to its AntD equivalent and the corresponding token triplet (height / padding / font-size). Define all three sizes even when they are identical.

```js
const SIZE_MAP = { sm: 'small', md: 'middle', lg: 'large' };
```

The same map values feed both the React/JSX and Angular implementations.

---

### 9. Token comments — every value traced to its foundation token
Every hardcoded value in the theme file must have an inline comment referencing its Pelagos foundation token source. This applies to all formats.

```js
colorPrimary: '#1852FE',  // --prim-marine / --color-brand
borderRadius: 4,          // --radius-sm → --prim-radius-sm
```

---

### 10. SCSS — structural only
The single shared `.scss` file covers all formats.

| | Properties |
|---|---|
| **Allowed** | `display`, `flex`, `gap`, `grid`, `position`, `overflow`, `z-index`, `cursor`, `transition` (non-colour), spacing via CSS custom properties tracing to Pelagos spacing tokens |
| **Forbidden** | `color`, `background`, `border-color`, `box-shadow`, `outline-color`, any hardcoded colour value |

Use **BEM naming**: `.componentname__element--modifier`

---

### 11. No behaviour in the wrapper
If you find yourself writing event logic, state management, or DOM manipulation inside the Pelagos wrapper, stop. That belongs in AntD or in a separate hook / service. The wrapper's only responsibilities are **prop translation** and **token injection**.

---

### 12. Structural fallbacks — layout only
When a layout need arises that AntD doesn't natively support (e.g., two icons in one button), use plain wrapper elements for structure only. Spacing must reference a CSS custom property tracing to a Pelagos spacing token. Never apply colour to these wrapper elements.

---

### 13. Debugging attribute
Add `data-{component}="{variant}"` (or equivalent) to the AntD component root for easier identification in browser DevTools and automated tests.

```jsx
<AntButton data-variant={variant} ... />
```

---

### 14. Documentation contract
Every wrapper must ship with:

- **JSDoc** (React/JSX) and **TSDoc** (Angular): prop/input mapping table (Pelagos → AntD), types, defaults, fallback behavior for unknown values, notes.
- **README.md** covering:
  - Peer dependency (`antd >= 5.0.0`)
  - Import paths for React and Angular
  - Usage examples for every variant / size / state
  - Props table (Pelagos props only, with "Maps to AntD" column)
  - AntD passthrough note with link to AntD API docs
  - Variant → AntD mapping table
  - Size → AntD mapping table
  - Token override instructions
  - Figma reference link
  - Live docs path

---

## Migration compatibility note

When writing the component, verify that the following AntD usage patterns continue to work through Pelagos with only minimal prop renaming:

| AntD pattern | Pelagos equivalent | Notes |
|---|---|---|
| `type="primary"` | `variant="primary"` | Only rename required for style type |
| `size="large"` | `size="lg"` | Only rename required for size |
| `block={true}` | `fullWidth={true}` | Only rename required for block |
| `loading`, `disabled`, `href`, `target`, `shape`, `ghost`, `onClick` | unchanged | Pass through via `...rest` |
| `ref={myRef}` | unchanged | Forwarded via `React.forwardRef` |

Document any interception that requires a prop rename. Keep the rename count minimal.

---

## Output files

| File | Purpose |
|---|---|
| `index.ts` | Public barrel — re-exports React component, Angular component + module, and token getter |
| `ComponentName.jsx` | React wrapper with forwardRef |
| `ComponentName.component.ts` | Angular standalone component (`standalone: true`, imports CommonModule + NzXxxModule) |
| `ComponentName.component.html` | Angular template |
| `ComponentNameModule.ts` | Angular NgModule for backward compat — imports + re-exports the standalone component |
| `componentNameTheme.js` | Shared ConfigProvider token map (React + Angular) |
| `ComponentName.scss` | Single shared structural stylesheet |
| `README.md` | Full usage and reference documentation |

---

---

## Quality checks — apply to every component

These checks must be verified before marking any component as complete. They apply to every new wrapper and to every fix or update to an existing one.

---

### QC-1 · ConfigProvider — performance (React)
Only wrap variants in a scoped `<ConfigProvider>` when they require colour or component token overrides **beyond** the global token set already provided by `PelagosProvider` at the app root.

Define a `THEMED_VARIANTS` constant (a `Set`) listing the variants that need local overrides. Variants not in the set render the AntD component directly — no `ConfigProvider` wrapper.

```jsx
const THEMED_VARIANTS = new Set(['secondary', 'tertiary', 'neutral', 'danger-secondary']);

// …

if (!THEMED_VARIANTS.has(variant)) return antNode;
return <ConfigProvider theme={getTheme(variant)}>{antNode}</ConfigProvider>;
```

For components with no variants (e.g. Accordion, Checkbox), keep the `ConfigProvider` only if the theme applies colour or component-token overrides beyond `globalTokens`. Add a comment in the JSX explaining which specific tokens require it.

---

### QC-2 · Angular variant parity — NzConfigService
Per-variant (or per-component) colour overrides from the `*Theme.js` file must be applied in Angular using `NzConfigService`, **scoped to the component instance** (not globally).

Provide `NzConfigService` in the component's own `providers` array so it does not pollute the global config:

```typescript
@Component({
  providers: [NzConfigService],  // component-scoped
})
export class MyComponent implements OnInit {
  constructor(private nzConfigService: NzConfigService) {}

  ngOnInit(): void {
    const tokens = getComponentTheme(this.variant)?.components?.['AntComponentName'];
    if (tokens) this.nzConfigService.set('componentKey', tokens as any);
  }
}
```

For variant-driven components, call `nzConfigService.set()` on every `variant` change in `ngOnChanges`. React and Angular must produce visually identical output for every variant.

---

### QC-3 · Dev-mode prop warnings
For every Pelagos prop that intercepts and discards a native AntD prop (or when two Pelagos props conflict), add a dev-mode guard.

**React:**
```jsx
if (process.env.NODE_ENV !== 'production' && <prop> !== undefined) {
  console.warn('[Pelagos<Component>] `<prop>` is not supported. Use `<pelagos-equivalent>` instead.');
}
```

**Angular** — in `ngOnChanges`:
```typescript
if (isDevMode() && changes['propName'] && this.propName !== undefined) {
  console.warn('[Pelagos<Component>] `propName` is not supported. Use `equivalent` instead.');
}
```

Destructure intercepted props out of `...rest` in JSX so they cannot silently reach the underlying AntD component and override Pelagos behaviour.

---

### QC-4 · SCSS filename reflects actual scope
If the SCSS file contains **only** structural/layout rules (no colour values), rename it to signal that scope clearly:

| Actual content | Rename to |
|---|---|
| Only icon/dual-icon layout | `Component.icons.scss` |
| Only host display + cursor behaviour | `Component.layout.scss` |
| Mix of structural rules (chevron, host, layout) | `Component.layout.scss` |

Update the `import` reference in the JSX file accordingly. The `.layout` or `.icons` suffix is a contract: any reviewer or linter can assert that the file contains no colour properties.

---

### QC-5 · Variant use-case documentation (README)
For every pair of variants that share the same underlying AntD `type`, add an explicit use-case distinction in the README under a "Variant guidance" or "Mode guidance" section. Cover:

- **When to use** each variant
- **When not to use** each (the failure mode / anti-pattern)
- Which layout context each belongs to

Do not leave two similar-looking variants undifferentiated — teams will pick arbitrarily and visual language will drift.

---

### QC-6 · Prop interaction documentation (README)
Add a **"Prop interactions"** section to the README. At minimum cover:

| Situation | What to document |
|---|---|
| `loading` + `disabled` together | `loading` takes precedence; `disabled` is redundant |
| Controlled + uncontrolled props together | Which wins; which is silently ignored |
| Icon props + shape variants | Whether they are compatible; what breaks when they aren't |
| Any prop that silently overrides another | The winner, the loser, and the dev-mode warning |

Use a Markdown table with columns: Combination · Behaviour.

---

### QC-7 · Shape + icon guard (if applicable)
If the component supports a shape or display variant that expects a single icon with no text label (e.g. `shape="circle"`), add a dev-mode warning when incompatible props are combined:

```jsx
if (
  process.env.NODE_ENV !== 'production' &&
  rest.shape === 'circle' &&
  (iconLeft || iconRight) &&
  children
) {
  console.warn(
    '[PelagosButton] shape="circle" expects a single icon with no text label. ' +
    'Combining shape="circle" with iconLeft/iconRight + children produces undefined layout behaviour.',
  );
}
```

Apply the equivalent guard in Angular using `isDevMode()` in `ngOnChanges` or `ngOnInit`. If the component does not have a shape or icon-only mode, this check is not applicable — note that explicitly in the component's README.

---

## What to include in every request

Fill in all of the following before submitting a new component request:

```
AntD component name    :
AntD API docs URL      :
AntD theme editor URL  : (https://ant.design/theme-editor#component-size)
Pelagos variant list   : (name + visual intent for each)
Pelagos size list      : (name + target height in px for each)
Foundation tokens      : (colour, spacing, radius, typography excerpts from foundations/)
Figma component link   :
Exclusions             : (AntD features or edge cases to explicitly exclude)
Known prop conflicts   : (any Pelagos prop name that shadows an AntD prop name)
```

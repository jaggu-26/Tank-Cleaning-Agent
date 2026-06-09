# Contributing to Pelagos

## Adding a new component

### 1. Create the folder

All components live under `components/` in the appropriate category:

```
components/primitives/{component-name}/
components/panels/{component-name}/
components/navigations/{component-name}/
```

Use lowercase kebab-case for the folder name.

### 2. Create the three files

Every component folder must contain exactly three files:

```
{ComponentName}.jsx    React implementation
{ComponentName}.scss   Scoped styles
README.md              Props table + usage examples
```

### 3. Use foundation tokens in SCSS

Always reference CSS custom properties — never hardcode values:

```scss
/* ✅ Correct */
color: var(--color-text-default);
border-radius: var(--radius-md);
box-shadow: var(--shadow-card);

/* ❌ Avoid */
color: #1a1d27;
border-radius: 8px;
```

Add component-level tokens at the top of your SCSS if needed, so consumers can override them:

```scss
/* In MyComponent.scss */
.my-component {
  --mc-height: 40px;       /* allow override */
  height: var(--mc-height);
}
```

### 4. Export from the barrel

Add your export to `components/index.js`:

```js
export { MyComponent } from './primitives/my-component/MyComponent';
```

### 5. Add a documentation page

Create a matching HTML page in `pages/`:

```
pages/{prefix}-{name}.html
```

Prefix guide:

| Category      | Prefix   |
| ------------- | -------- |
| Foundations   | `found-` |
| Primitives    | `prim-`  |
| Panels        | `panel-` |
| Navigations   | `nav-`   |
| Forms         | `form-`  |
| Views         | `view-`  |

### 6. Register the page in `script.js`

Add an entry to both `PAGES` and `SEARCH_INDEX`:

```js
// In PAGES object
'prim-mycomponent': { label: 'My Component', nav: 'nav-prim-mycomponent', parent: 'Primitives' },

// In SEARCH_INDEX array
{ title: 'My Component', path: 'prim-mycomponent', icon: '🔲', cat: 'Primitives' },
```

Then add it to `NAV_TREE` so it appears in the sidebar.

---

## Modifying a token

Token changes affect every component that uses them — review the full viewer before shipping.

1. Update the value in `foundations/{colors|typography|spacing}.css`
2. The matching variable in `styles.css` must also be updated (it's the bundled copy used by the viewer)
3. Test in the viewer across all affected pages

---

## Versioning

The design system follows [Semantic Versioning](https://semver.org/):

- **Patch** — bug fixes, style tweaks that don't change the API
- **Minor** — new components or tokens, backwards-compatible additions
- **Major** — breaking changes to props, token names, or HTML structure

Update the version badge in `index.html` (sidebar footer) and `README.md` when releasing.

---

## Code style

- JSX: functional components only, hooks allowed
- SCSS: BEM naming (`.block__element--modifier`)
- Props: prefer explicit defaults over implicit `undefined`
- Accessibility: every interactive element needs a focus style and appropriate ARIA attribute

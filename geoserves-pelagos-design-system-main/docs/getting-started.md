# Getting Started with Pelagos Design System

Pelagos is Geoserves' design system for maritime operations products. It provides a shared visual language, reusable components, and design tokens to build consistent, accessible interfaces.

## What's in the box

```
geoserves-pelagos-design-system/
├── foundations/      CSS design tokens (colors, typography, spacing)
├── components/       React component library
│   ├── primitives/   Buttons, inputs, badges, cards, etc.
│   ├── panels/       Modals, slideouts, popovers
│   └── navigations/  Tabs, pagination, nav bars
├── pages/            Live HTML documentation pages
├── docs/             Developer guides (you are here)
└── Assets/           SVGs, images, fonts, Figma file
```

## Using the documentation viewer

Open `index.html` in your browser (or serve via any HTTP server). The sidebar links to every component and foundation page with live examples.

```bash
# Serve locally with any static server
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Using the React components

### 1. Copy the tokens

Link `foundations/index.css` in your project's global stylesheet or entry point:

```css
/* In your global CSS */
@import '@pelagos/foundations/index.css';
```

Or import individual token files:

```css
@import '@pelagos/foundations/colors.css';
@import '@pelagos/foundations/typography.css';
@import '@pelagos/foundations/spacing.css';
```

### 2. Import components

```jsx
import { Button, Input, Modal } from '@pelagos/components';

// or tree-shake by importing directly:
import { Button } from '@pelagos/components/primitives/button';
```

### 3. Use them

```jsx
function SavePortCall() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Save port call</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm save"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </>
        }
      >
        <p>Save changes to this port call?</p>
      </Modal>
    </>
  );
}
```

## Figma

All components are documented in the [Pelagos Figma file](https://www.figma.com/design/TOLfBpRePgynqwvDVp6fg3/Design-System?node-id=9801-15431). Each component's README links to its Figma frame.

## Next steps

- [Architecture overview](./architecture.md) — how the system is structured
- [Design tokens](./tokens.md) — full token reference
- [Contributing](./contributing.md) — adding or modifying components

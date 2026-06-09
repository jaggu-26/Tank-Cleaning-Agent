# Dropdown

Custom select with a styled listbox.

```jsx
import { Dropdown } from '@pelagos/components/primitives/dropdown';

const ports = [
  { value: 'sgp', label: 'Singapore' },
  { value: 'rot', label: 'Rotterdam' },
];
<Dropdown options={ports} value={port} onChange={setPort} placeholder="Select port…" />
```

Live docs: `/pages/prim-dropdowns.html`

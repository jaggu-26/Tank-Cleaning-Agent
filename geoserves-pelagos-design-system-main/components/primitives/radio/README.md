# Radio

Single-select option within a group.

```jsx
import { Radio } from '@pelagos/components/primitives/radio';

<Radio name="size" label="Small" value="sm" checked={size === 'sm'} onChange={() => setSize('sm')} />
<Radio name="size" label="Large" value="lg" checked={size === 'lg'} onChange={() => setSize('lg')} />
```

Live docs: `/pages/prim-radio.html`

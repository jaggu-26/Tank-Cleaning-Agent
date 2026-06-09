# Card

Surface container for grouped content.

```jsx
import { Card } from '@pelagos/components/primitives/cards';

<Card header={<h3>Vessel Details</h3>} footer={<Button size="sm">View all</Button>}>
  <p>IMO 9123456 · MV Oceanic Dawn</p>
</Card>

<Card interactive onClick={() => navigate('/vessel/123')}>
  Clickable card
</Card>
```

Live docs: `/pages/prim-cards.html`

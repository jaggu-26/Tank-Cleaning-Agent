# Tabs

Section switcher for related content panels.

```jsx
import { Tabs } from '@pelagos/components/navigations/tabs';

<Tabs
  variant="line"
  tabs={[
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'calls',    label: 'Port Calls', count: 12, content: <PortCalls /> },
    { id: 'docs',     label: 'Documents', content: <Documents /> },
  ]}
/>
```

Live docs: `/pages/nav-tabs.html`

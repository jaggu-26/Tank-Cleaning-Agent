# Notification Panel

Dropdown list of system notifications.

```jsx
import { NotificationPanel } from '@pelagos/components/panels/notifications';

<NotificationPanel
  notifications={[
    { id: '1', title: 'Vessel arrived', message: 'MV Oceanic Dawn docked at Singapore.', time: '2 min ago', read: false },
    { id: '2', title: 'Port call updated', time: '1 hr ago', read: true },
  ]}
  onMarkRead={id => markAsRead(id)}
  onClear={() => clearAll()}
/>
```

Live docs: `/pages/panel-notifications.html`

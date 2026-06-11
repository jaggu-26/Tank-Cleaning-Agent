# Badge

Small status or count indicator.

## Usage

```jsx
import { Badge } from '@pelagos/components/primitives/badge';

<Badge>Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="warning" dot>Pending</Badge>
```

## Props

| Prop      | Type                                                           | Default     |
| --------- | -------------------------------------------------------------- | ----------- |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| `size`    | `'sm' \| 'md' \| 'lg'`                                        | `'md'`      |
| `dot`     | `boolean`                                                      | `false`     |

Live docs: `/pages/prim-badge.html`

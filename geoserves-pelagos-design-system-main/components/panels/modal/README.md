# Modal

Focused overlay for confirmations, forms, and detail views.

## Import

```jsx
import { Modal } from '@pelagos/components/panels/modal';
```

## Usage

```jsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  size="sm"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this port call?</p>
</Modal>
```

## Props

| Prop       | Type                                    | Default | Description           |
| ---------- | --------------------------------------- | ------- | --------------------- |
| `open`     | `boolean`                               | —       | Controls visibility   |
| `onClose`  | `function`                              | —       | Close callback        |
| `title`    | `string`                                | —       | Modal heading         |
| `size`     | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  | Width variant         |
| `footer`   | `ReactNode`                             | —       | Action buttons area   |

Keyboard: `Escape` closes. Focus is trapped inside when open.

Live docs: `/pages/panel-modals.html`

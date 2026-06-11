# Slideout (Drawer)

Side panel that slides in from the edge for contextual detail or forms.

## Import

```jsx
import { Slideout } from '@pelagos/components/panels/slideout';
```

## Usage

```jsx
<Slideout
  open={open}
  onClose={() => setOpen(false)}
  title="Vessel details"
  side="right"
  width={520}
  footer={<Button onClick={save}>Save</Button>}
>
  <VesselForm />
</Slideout>
```

## Props

| Prop      | Type                  | Default   | Description          |
| --------- | --------------------- | --------- | -------------------- |
| `open`    | `boolean`             | —         | Controls visibility  |
| `onClose` | `function`            | —         | Close callback       |
| `title`   | `string`              | —         | Panel heading        |
| `side`    | `'right' \| 'left'`  | `'right'` | Which edge to use    |
| `width`   | `number`              | `480`     | Panel width in px    |
| `footer`  | `ReactNode`           | —         | Sticky action area   |

Live docs: `/pages/panel-slideout.html`

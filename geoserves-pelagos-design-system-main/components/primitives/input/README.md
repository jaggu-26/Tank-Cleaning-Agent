# Input (Text Field)

Single-line text input with optional label, helper text, error state, and icons.

## Import

```jsx
import { Input } from '@pelagos/components/primitives/input';
```

## Usage

```jsx
<Input label="Email address" placeholder="you@example.com" />

<Input label="Password" type="password" required />

<Input
  label="Search"
  placeholder="Search vessels..."
  iconLeft={<SearchIcon />}
/>

<Input
  label="Port name"
  errorText="Port name is required"
/>
```

## Props

| Prop          | Type                  | Default | Description                  |
| ------------- | --------------------- | ------- | ---------------------------- |
| `label`       | `string`              | —       | Field label                  |
| `placeholder` | `string`              | —       | Placeholder text             |
| `helperText`  | `string`              | —       | Contextual hint below input  |
| `errorText`   | `string`              | —       | Validation error (shown red) |
| `size`        | `'sm' \| 'lg'`        | `'lg'`  | Height variant               |
| `disabled`    | `boolean`             | `false` | Disables the field           |
| `required`    | `boolean`             | `false` | Marks field as required      |
| `iconLeft`    | `ReactNode`           | —       | Leading icon                 |
| `iconRight`   | `ReactNode`           | —       | Trailing icon                |
| `type`        | `string`              | `'text'`| HTML input type              |

## Live Docs

`/pages/prim-textfields.html` in the design system viewer.

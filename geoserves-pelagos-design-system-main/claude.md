# Pelagos Design System — Claude Instructions
## Reference implementation
Every new component must follow the Button pattern exactly.
- Pattern file    : components/primitives/button/Button.jsx
- Theme pattern   : components/primitives/button/buttonTheme.js
- Global tokens   : pelagosTheme.js
- Rules           : MD files/pelagos-component-prompt.md
## Non-negotiable rules
- Every hex value in a theme file must have an inline // --token comment
- SCSS files must contain zero hardcoded colour values
- All components need both React and Angular implementations
- Angular follows the same pattern as Button.component.ts
- Global tokens are always imported from pelagosTheme.js, never duplicated
## DS viewer
- Component pages live in pages/
- After any component change run python3 rebuild-bundle.py
- Verify at localhost:3456 before marking done
## Component status
- Button : complete — use as reference
- All others : in progress

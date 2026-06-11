/**
 * Pelagos Design System — Component Library
 * components/index.js
 *
 * Central barrel export. Import what you need:
 *
 *   import { Button, Input, Modal } from '@pelagos/components';
 *
 * Or import from a specific package for better tree-shaking:
 *
 *   import { Button } from '@pelagos/components/primitives/button';
 */

// ── Primitives ──────────────────────────────────────────────────────────────
export { Button }              from './primitives/button/Button';
export { Input }               from './primitives/input/Input';
export { Badge }               from './primitives/badge/Badge';
export { Banner }              from './primitives/banners/Banner';
export { Card }                from './primitives/cards/Card';
export { Checkbox }            from './primitives/checkbox/Checkbox';
export { Chip }                from './primitives/chips/Chip';
export { Accordion }           from './primitives/accordion/Accordion';
export { Dropdown }            from './primitives/dropdown/Dropdown';
export { Radio }               from './primitives/radio/Radio';
export { Search }              from './primitives/search/Search';
export { Slider }              from './primitives/slider/Slider';
export { Toast }               from './primitives/toast/Toast';
export { Toggle }              from './primitives/toggle/Toggle';
export { Tooltip }             from './primitives/tooltip/Tooltip';

// ── Panels ──────────────────────────────────────────────────────────────────
export { Modal }               from './panels/modal/Modal';
export { Slideout }            from './panels/slideout/Slideout';
export { Popover }             from './panels/popover/Popover';
export { NotificationPanel }   from './panels/notifications/NotificationPanel';

// ── Navigations ─────────────────────────────────────────────────────────────
export { Tabs }                from './navigations/tabs/Tabs';
export { Pagination }          from './navigations/pagination/Pagination';

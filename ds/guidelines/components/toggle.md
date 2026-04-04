---
name: ds-component-toggle
description: "Toggle/Switch component usage. Use when implementing on/off settings or binary state switches."
disable-model-invocation: false
---

# Toggle

A switch control for toggling a setting on or off. Uses a track-and-thumb design with optional label positioned on either side.

## Skill Boundaries

- **Use this skill** when implementing binary on/off settings that take effect immediately: dark mode, notifications, feature flags.
- **Do not use** for form fields that require a "Save" action -- use Checkbox instead.
- **Do not use** for mutually exclusive groups -- use Radio instead.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming toggle tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all states and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Toggle } from '@ds/components/Toggle';`
2. **Choose size** -- select `size` (sm/md/lg) based on context and prominence.
3. **Configure props** -- set `label`, `labelPosition`, `checked`/`defaultChecked`, `onChange`, `disabled` as needed.
4. **Handle accessibility** -- always provide a `label` or `aria-label`; the component uses `role="switch"` with `aria-checked`.
5. **Verify in both themes** -- confirm toggle renders correctly in Dark and Light modes; check on/off track colors, focus ring, and disabled state in both.

## Reference

### When to Use

- Binary on/off settings: dark mode, notifications, feature flags
- Preferences that take effect immediately without a form submission
- Any boolean control where the current state should be visually obvious

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial state for uncontrolled usage |
| `onChange` | `(checked: boolean) => void` | `undefined` | Called with new checked value |
| `label` | `string` | `undefined` | Text label |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label placement relative to the track |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls track and thumb dimensions |
| `disabled` | `boolean` | `false` | Disables interaction |
| `id` | `string` | `undefined` | ID for the hidden input |
| `name` | `string` | `undefined` | Form field name |
| `value` | `string` | `undefined` | Form field value |
| `aria-label` | `string` | `undefined` | Accessible label (falls back to `label`) |

### Variants

No named visual variants. The toggle switches between off (track muted) and on (track colored) states.

### Sizes

| Size | Track height | Use case |
|------|-------------|----------|
| `sm` | ~20px | Dense settings lists |
| `md` | ~24px | Standard settings |
| `lg` | ~28px | Prominent feature toggles |

### States

| State | Visual |
|-------|--------|
| Off (default) | Track muted, thumb on left |
| On (checked) | Track colored (primary), thumb on right |
| Hover | Track brightness shift |
| Focused | Focus ring around track |
| Disabled | Muted colors, no interaction |

### Accessibility

- Uses `<input type="checkbox" role="switch">` for correct semantics
- `aria-checked` reflects the current state
- `aria-label` falls back to the `label` prop if not explicitly set
- Keyboard: Space toggles the switch
- Wrapped in `<label>` for click-to-toggle on the label text

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-toggle-*` | Track width, height, thumb size, transition |
| `--ds-color-primary-*` | On-state track fill |
| `--ds-color-border-*` | Off-state track color |
| `--ds-color-foreground-*` | Label text, thumb color |
| `--ds-color-focus-ring` | Focus ring |

## Best Practices

- **Do** use Toggle for settings that apply immediately. If the change requires a "Save" action, use Checkbox in a form instead.
- **Do** provide a `label` or `aria-label` -- a bare switch with no text is inaccessible.
- **Don't** use Toggle for mutually exclusive groups -- use Radio for that.
- **Don't** nest Toggle inside a form submit flow where the user expects to review before applying.

### Code Example

```tsx
import { Toggle } from '@ds/components/Toggle';

// Uncontrolled with label
<Toggle label="Dark mode" defaultChecked />

// Controlled
<Toggle
  label="Notifications"
  checked={notificationsOn}
  onChange={setNotificationsOn}
/>

// Label on left
<Toggle label="Auto-save" labelPosition="left" size="sm" />

// Disabled
<Toggle label="Beta features" disabled checked />

// Without visible label
<Toggle aria-label="Enable sound" size="lg" />
```

---
name: ds-component-button
description: "Button component usage. Use when implementing buttons, choosing button variants, or configuring button props."
disable-model-invocation: false
---

# Button

A clickable element that triggers actions. The primary interactive control for forms, dialogs, and page flows.

## Skill Boundaries

- **Use this skill** when implementing any clickable action trigger: form submissions, dialog confirmations, navigation actions, destructive operations, or icon-only toolbar actions.
- **Do not use** for navigation links that change the URL -- use an anchor or Link component instead.
- **Do not use** for toggle states (on/off) -- use Toggle or Checkbox instead.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming button tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all variants, states, and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Button } from '@ds/components/Button';`
2. **Choose variant and size** -- select `variant` (primary/secondary/tertiary/destructive/ghost) and `size` (sm/md/lg) based on hierarchy and context.
3. **Configure props** -- set `pill`, `fullWidth`, `loading`, `iconOnly`, `leftIcon`, `rightIcon` as needed. All optional booleans default to `false`.
4. **Handle accessibility** -- add `aria-label` on `iconOnly` buttons; ensure only one `primary` button per view.
5. **Verify in both themes** -- confirm button renders correctly in Dark and Light modes; check focus ring and disabled states in both.

## Reference

### When to Use

- Submitting forms or confirming dialogs
- Triggering navigation or page-level actions
- Inline actions like "Add item" or "Remove"
- Destructive actions like "Delete" or "Cancel subscription"
- Icon-only compact actions in toolbars or table rows

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'destructive' \| 'ghost' \| 'tertiary'` | `'primary'` | Visual style of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height and font size |
| `pill` | `boolean` | `false` | Applies full border-radius for rounded shape |
| `fullWidth` | `boolean` | `false` | Stretches button to fill container width |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction, sets `aria-busy` |
| `iconOnly` | `boolean` | `false` | Removes text padding for square icon buttons |
| `leftIcon` | `ReactNode` | `undefined` | Icon rendered before children |
| `rightIcon` | `ReactNode` | `undefined` | Icon rendered after children |
| `children` | `ReactNode` | `undefined` | Button label content |
| `disabled` | `boolean` | `false` | Disables interaction and applies muted styling |

Extends `React.ButtonHTMLAttributes<HTMLButtonElement>` via `React.forwardRef`.

### Variants

| Variant | Purpose | Visual |
|---------|---------|--------|
| `primary` | Main call-to-action | Solid brand fill, white text |
| `secondary` | Supporting actions | Border outline, no fill |
| `tertiary` | Low-emphasis actions | Subtle background fill |
| `destructive` | Dangerous/irreversible actions | Red fill or red text |
| `ghost` | Minimal footprint actions | No background, no border, text only |

### Sizes

| Size | Height | Use case |
|------|--------|----------|
| `sm` | 32px | Dense UIs, tables, inline actions |
| `md` | 40px | Default for most contexts |
| `lg` | 48px | Hero sections, prominent CTAs |

### States

| State | Behavior |
|-------|----------|
| Default | Resting appearance |
| Hover | Background/border color shift |
| Focus | Focus ring via `--ds-color-focus-ring` |
| Loading | Spinner replaces icons, button disabled, `aria-busy="true"` |
| Disabled | Reduced opacity, `pointer-events: none` |

When `loading` is true, the button is functionally disabled (`disabled={disabled || loading}`). Icons are hidden during loading.

### Accessibility

- Uses native `<button>` element with full keyboard support
- `aria-busy="true"` set during loading state
- Icons are marked `aria-hidden="true"`
- Focus ring adapts per theme via `--ds-color-focus-ring`
- When using `iconOnly`, provide an `aria-label` for screen readers

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-button-*` | Component-level tokens (padding, border-radius, font-size per size) |
| `--c-button-{variant}-*` | Variant-specific fills, borders, text colors |
| `--ds-color-focus-ring` | Focus ring color |
| `--p-space-*` | Internal spacing between icon and label |

## Best Practices

- **Do** use `primary` for a single main action per view. Use `secondary` or `tertiary` for supporting actions.
- **Do** set `aria-label` on `iconOnly` buttons so screen readers announce the action.
- **Don't** put two `primary` buttons side by side -- demote one to `secondary`.
- **Don't** use `ghost` for important actions that users must notice.

### Code Example

```tsx
import { Button } from '@ds/components/Button';

// Standard primary
<Button variant="primary" size="md">Save Changes</Button>

// Loading state
<Button variant="primary" loading>Saving...</Button>

// Icon + text
<Button variant="secondary" leftIcon={<PlusIcon />}>Add Item</Button>

// Icon-only with accessibility label
<Button variant="ghost" iconOnly aria-label="Close dialog">
  <CloseIcon />
</Button>

// Destructive, full width
<Button variant="destructive" fullWidth>Delete Account</Button>

// Pill shape
<Button variant="primary" pill>Get Started</Button>
```

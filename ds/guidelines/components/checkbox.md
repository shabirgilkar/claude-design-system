---
name: ds-component-checkbox
description: "Checkbox component usage. Use when implementing boolean selections, multi-select lists, or agreement confirmations."
disable-model-invocation: false
---

# Checkbox

A toggle control for selecting or deselecting a single option. Supports checked, unchecked, and indeterminate states with optional label and description.

## Skill Boundaries

- **Use this skill** when implementing binary choices (agree/disagree, enable/disable), multi-select lists, or "select all" patterns using the indeterminate state.
- **Do not use** for mutually exclusive choices -- use Radio instead.
- **Do not use** for immediate on/off settings -- use Toggle instead (Toggle applies immediately; Checkbox is for form submissions).

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming checkbox tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all states and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Checkbox } from '@ds/components/Checkbox';`
2. **Choose size** -- select `size` (sm/md/lg) based on form density and context.
3. **Configure props** -- set `label`, `description`, `checked`, `indeterminate`, `disabled` as needed.
4. **Handle accessibility** -- always provide a `label` or `aria-label`; use `indeterminate` only as a visual hint (underlying value is still boolean).
5. **Verify in both themes** -- confirm checkbox renders correctly in Dark and Light modes; check checked fill, focus ring, and disabled state in both.

## Reference

### When to Use

- Binary choices: agree to terms, enable a setting, opt into a feature
- Multi-select lists where users can pick zero or more items
- "Select all" patterns using the indeterminate state
- Form fields that need a boolean value with a visible label

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Text label next to the checkbox |
| `description` | `string` | `undefined` | Secondary text below the label |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls box size and text size |
| `indeterminate` | `boolean` | `false` | Shows a horizontal dash instead of a checkmark |
| `checked` | `boolean` | `undefined` | Controlled checked state |
| `disabled` | `boolean` | `false` | Disables interaction |

Extends `React.InputHTMLAttributes<HTMLInputElement>` (excluding native `size` and `type`) via `React.forwardRef`.

### Variants

No named visual variants. The checkbox adapts visually based on state (checked, indeterminate, disabled).

### Sizes

| Size | Box dimension | Use case |
|------|---------------|----------|
| `sm` | 16px | Dense lists, table rows |
| `md` | 20px | Standard forms |
| `lg` | 24px | Prominent settings, onboarding |

### States

| State | Visual |
|-------|--------|
| Default (unchecked) | Empty bordered box |
| Hover | Border color highlight |
| Focused | Focus ring around box |
| Checked | Filled box with stroke-based checkmark SVG |
| Indeterminate | Filled box with horizontal dash |
| Disabled | Muted colors, no interaction |

The `indeterminate` state is set via `inputRef.indeterminate` (DOM property, not an HTML attribute). It visually overrides the checked icon.

### Accessibility

- Uses native `<input type="checkbox">` for full keyboard and screen reader support
- Wrapped in a `<label>` element linking text to the input
- `indeterminate` property is set programmatically on the DOM node
- Description text provides additional context to sighted users

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-checkbox-*` | Box size, border-radius, border-width, colors |
| `--ds-color-border-*` | Box border in default, hover, focus states |
| `--ds-color-primary-*` | Checked/indeterminate fill color |
| `--ds-color-foreground-*` | Label and description text colors |
| `--ds-color-focus-ring` | Focus ring |

## Best Practices

- **Do** use `indeterminate` for "select all" checkboxes when only some children are checked.
- **Do** provide a `label` -- if the label must be hidden visually, use `aria-label` on the input.
- **Don't** use Checkbox for mutually exclusive choices -- use Radio instead.
- **Don't** rely on `indeterminate` as a third value; it is a visual hint, not a form value. The underlying `checked` state is still true or false.

### Code Example

```tsx
import { Checkbox } from '@ds/components/Checkbox';

// Basic
<Checkbox label="I agree to the terms" />

// With description
<Checkbox
  label="Email notifications"
  description="Receive weekly digest emails"
  checked={emailEnabled}
  onChange={(e) => setEmailEnabled(e.target.checked)}
/>

// Indeterminate (select all)
<Checkbox
  label="Select all"
  indeterminate={someChecked && !allChecked}
  checked={allChecked}
  onChange={handleSelectAll}
/>

// Small, disabled
<Checkbox size="sm" label="Archived" disabled checked />
```

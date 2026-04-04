---
name: ds-component-textarea
description: "Textarea component usage. Use when implementing multi-line text fields, comment boxes, or description inputs."
disable-model-invocation: false
---

# Textarea

A multi-line text field for longer form input. Supports labels, hints, error messages, character count, and optional resize control.

## Skill Boundaries

- **Use this skill** when implementing multi-line text entry: comments, descriptions, feedback, notes, or any field where content spans multiple lines.
- **Do not use** for single-line text -- use Input instead.
- **Do not use** for rich text editing -- use a dedicated rich text editor component.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming textarea tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all states and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Textarea } from '@ds/components/Textarea';`
2. **Choose initial height** -- set `rows` to match expected content length.
3. **Configure props** -- set `label`, `hint`, `error`, `maxLength`, `showCharCount`, `resize`, `required` as needed.
4. **Handle accessibility** -- always provide a `label`; use `error` prop for validation (auto-sets `aria-invalid`).
5. **Verify in both themes** -- confirm textarea renders correctly in Dark and Light modes; check focus ring, error state, and character count in both.

## Reference

### When to Use

- Collecting multi-line text: comments, descriptions, feedback, notes
- Fields that benefit from character count limits
- Any input where content is expected to span multiple lines

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label text above the textarea |
| `hint` | `string` | `undefined` | Helper text below (hidden when `error` is set) |
| `error` | `string` | `undefined` | Error message; triggers error styling and replaces hint |
| `maxLength` | `number` | `undefined` | Character limit (native `maxLength` on textarea) |
| `showCharCount` | `boolean` | `false` | Shows `N/maxLength` counter in footer |
| `resize` | `boolean` | `true` | Allows vertical resizing; `false` locks the height |
| `required` | `boolean` | `false` | Shows asterisk on label, sets `required` on textarea |
| `rows` | `number` | browser default | Number of visible text rows |

Extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>` via `React.forwardRef`.

### Variants

No named variants. Appearance changes via state (error, disabled) and optional elements (label, hint, char count).

### Sizes

The current implementation does not expose a `size` prop. Height is controlled by the `rows` attribute and whether `resize` is enabled.

### States

| State | Trigger | Visual |
|-------|---------|--------|
| Default | No interaction | Subtle border |
| Hover | Mouse over | Border color shift |
| Focused | Keyboard/click focus | Focus ring + border highlight |
| Typing | User entering text | Same as focused, char count updates live |
| Filled | Has value, not focused | Default border, value visible |
| Error | `error` prop set | Red border, error message, `aria-invalid="true"` |
| Disabled | `disabled` prop | Muted colors, no interaction |
| Read-only | `readOnly` prop | Value visible, no editing |

When `showCharCount` is true and `charCount > maxLength`, the counter turns red (`charCountOver` class).

### Accessibility

- `<label>` linked to textarea via `htmlFor`/`id`
- `aria-invalid="true"` when `error` is present
- Error message uses `role="alert"`
- Required asterisk is `aria-hidden="true"`

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-textarea-*` | Border, radius, padding, font tokens |
| `--ds-color-border-*` | Border colors for default, hover, focus, error |
| `--ds-color-foreground-*` | Label, value, placeholder, hint, error text |
| `--ds-color-background-*` | Textarea background |
| `--ds-color-focus-ring` | Focus ring |

## Best Practices

- **Do** set `maxLength` and `showCharCount` together so users see remaining capacity.
- **Do** use `rows` to give an appropriate initial height matching expected content length.
- **Don't** use Textarea for single-line input -- use Input instead.
- **Don't** disable `resize` unless the layout genuinely cannot accommodate height changes.

### Code Example

```tsx
import { Textarea } from '@ds/components/Textarea';

// Basic with label
<Textarea label="Description" placeholder="Enter a description..." rows={4} />

// With character count
<Textarea
  label="Bio"
  maxLength={280}
  showCharCount
  hint="Brief description for your profile"
/>

// With error
<Textarea label="Comments" error="Comments must not be empty" required />

// Non-resizable
<Textarea label="Notes" resize={false} rows={3} />
```

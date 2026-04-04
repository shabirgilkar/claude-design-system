---
name: ds-component-input
description: "Text Input component usage. Use when implementing text fields, form inputs, or search bars."
disable-model-invocation: false
---

# Input

A single-line text field for capturing user input. Supports labels, hints, error messages, and leading/trailing icons.

## Skill Boundaries

- **Use this skill** when implementing single-line text entry: names, emails, search queries, URLs, or any short-form text field with optional label, hint, and validation.
- **Do not use** for multi-line text -- use Textarea instead.
- **Do not use** for selecting from a predefined list -- use Dropdown or Radio instead.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming input tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all states and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Input } from '@ds/components/Input';`
2. **Choose size** -- select `size` (sm/md/lg) based on form density and context.
3. **Configure props** -- set `label`, `hint`, `error`, `placeholder`, `leftIcon`, `rightIcon`, `required`, `disabled` as needed.
4. **Handle accessibility** -- always provide a `label` or `aria-label`; use `error` prop for validation (auto-sets `aria-invalid`).
5. **Verify in both themes** -- confirm input renders correctly in Dark and Light modes; check focus ring, error state, and disabled state in both.

## Reference

### When to Use

- Collecting short text values: names, emails, search queries, URLs
- Form fields that need validation feedback
- Fields with contextual icons (search magnifier, currency symbol)
- Any single-line text entry with optional label and hint

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label text rendered above the input |
| `hint` | `string` | `undefined` | Helper text below the input (hidden when `error` is set) |
| `error` | `string` | `undefined` | Error message; triggers error styling and replaces hint |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls input height and font size |
| `leftIcon` | `ReactNode` | `undefined` | Icon rendered inside the input, left side |
| `rightIcon` | `ReactNode` | `undefined` | Icon rendered inside the input, right side |
| `required` | `boolean` | `false` | Shows asterisk on label, sets `required` on input |
| `disabled` | `boolean` | `false` | Disables the input |
| `placeholder` | `string` | `undefined` | Placeholder text |

Extends `React.InputHTMLAttributes<HTMLInputElement>` (excluding native `size`) via `React.forwardRef`.

### Variants

The Input does not have named visual variants. Appearance changes are driven by state (error, disabled) and the presence of optional elements (label, hint, icons).

### Sizes

| Size | Height | Use case |
|------|--------|----------|
| `sm` | 32px | Compact forms, table filters |
| `md` | 40px | Standard forms |
| `lg` | 48px | Prominent fields, onboarding flows |

### States

| State | Trigger | Visual |
|-------|---------|--------|
| Default | No interaction | Subtle border |
| Hover | Mouse over | Border color shift |
| Focused | Keyboard/click focus | Focus ring + border highlight |
| Typing | User entering text | Same as focused |
| Filled | Has value, not focused | Default border, value visible |
| Error | `error` prop set | Red border, error message below, `aria-invalid="true"` |
| Disabled | `disabled` prop | Muted colors, no interaction |
| Read-only | `readOnly` prop | Value visible, no editing |

### Accessibility

- `<label>` element is linked to input via `htmlFor`/`id`
- `aria-invalid="true"` set when `error` is present
- `aria-describedby` links to error or hint element
- Error message uses `role="alert"` for screen reader announcements
- Required asterisk is `aria-hidden="true"` (the `required` attribute conveys this to assistive tech)
- Icons are `aria-hidden="true"`

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-input-*` | Component tokens: border, radius, padding, height per size |
| `--ds-color-border-*` | Border colors for default, hover, focus, error |
| `--ds-color-foreground-*` | Label, value, placeholder, hint text colors |
| `--ds-color-background-*` | Input background |
| `--ds-color-focus-ring` | Focus ring |

## Best Practices

- **Do** always provide a `label` for form inputs. If the label must be visually hidden, use `aria-label` instead.
- **Do** use `error` for validation -- it automatically sets `aria-invalid` and shows the message with `role="alert"`.
- **Don't** use `hint` and `error` simultaneously -- error takes precedence by design.
- **Don't** put interactive elements inside `leftIcon`/`rightIcon` -- they are decorative and marked `aria-hidden`.

### Code Example

```tsx
import { Input } from '@ds/components/Input';

// Basic labeled input
<Input label="Email" placeholder="you@example.com" required />

// With error
<Input label="Username" error="Username is already taken" value={username} />

// With hint and icon
<Input
  label="Search"
  hint="Type at least 3 characters"
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>

// Small size, no label
<Input size="sm" placeholder="Filter..." aria-label="Filter items" />
```

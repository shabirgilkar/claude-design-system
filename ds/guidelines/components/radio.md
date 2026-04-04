---
name: ds-component-radio
description: "Radio component usage. Use when implementing single-select from mutually exclusive options."
disable-model-invocation: false
---

# Radio

A selection control for choosing exactly one option from a group. Always used within a RadioGroup for mutual exclusion.

## Skill Boundaries

- **Use this skill** when implementing mutually exclusive choices where the user must pick exactly one option from a visible set of 2-5 options.
- **Do not use** for multi-select -- use Checkbox instead.
- **Do not use** for binary on/off -- use Toggle or Checkbox instead.
- **Do not use** for long option lists (6+) -- use Dropdown instead.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming radio tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all states and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the components** -- `import { Radio, RadioGroup } from '@ds/components/Radio';`
2. **Wrap in RadioGroup** -- always use `<RadioGroup label="...">` to provide group semantics and `aria-label`.
3. **Configure props** -- set `name` (same for all radios in a group), `value`, `label`, `description`, `disabled` as needed.
4. **Handle accessibility** -- ensure all radios share the same `name`; provide a descriptive `label` on RadioGroup.
5. **Verify in both themes** -- confirm radio renders correctly in Dark and Light modes; check selected fill, focus ring, and disabled state in both.

## Reference

### When to Use

- Mutually exclusive choices where only one option can be selected
- Settings with 2-5 clearly defined options
- When the user needs to see all options at once before choosing
- Form fields where the selection must be explicit (no default)

### Props

#### Radio

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Text label next to the radio circle |
| `description` | `string` | `undefined` | Secondary text below the label |
| `checked` | `boolean` | `undefined` | Controlled selected state |
| `disabled` | `boolean` | `false` | Disables this radio option |
| `name` | `string` | `undefined` | Groups radios for mutual exclusion |
| `value` | `string` | `undefined` | Value submitted when selected |

Extends `React.InputHTMLAttributes<HTMLInputElement>` (excluding `type`) via `React.forwardRef`.

#### RadioGroup

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Group label (used as `aria-label`) |
| `children` | `ReactNode` | required | Radio elements |
| `className` | `string` | `undefined` | Additional CSS class |

### Variants

No named visual variants. Appearance changes based on state (selected, disabled).

### Sizes

The current implementation does not expose a `size` prop on Radio. The circle and text sizes follow the default component sizing tokens.

### States

| State | Visual |
|-------|--------|
| Default (unselected) | Empty bordered circle |
| Hover | Border color highlight |
| Focused | Focus ring around circle |
| Selected | Filled circle with inner dot |
| Disabled | Muted colors, no interaction |

### Accessibility

- Uses native `<input type="radio">` for full keyboard and screen reader support
- `RadioGroup` wrapper has `role="radiogroup"` with `aria-label`
- Radios sharing the same `name` attribute are mutually exclusive
- Arrow keys navigate between radios in a group (native browser behavior)
- Wrapped in `<label>` linking text to input

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-radio-*` | Circle size, border-width, dot size |
| `--ds-color-border-*` | Circle border in default, hover, focus states |
| `--ds-color-primary-*` | Selected circle and dot fill |
| `--ds-color-foreground-*` | Label and description text colors |
| `--ds-color-focus-ring` | Focus ring |

## Best Practices

- **Do** always wrap Radio components in a RadioGroup with a descriptive `label`.
- **Do** give all radios in a group the same `name` so the browser enforces mutual exclusion.
- **Don't** use Radio for multi-select -- use Checkbox instead.
- **Don't** use Radio for binary on/off -- use Toggle or Checkbox for that.

### Code Example

```tsx
import { Radio, RadioGroup } from '@ds/components/Radio';

// Basic radio group
<RadioGroup label="Plan">
  <Radio name="plan" value="free" label="Free" description="Up to 3 projects" />
  <Radio name="plan" value="pro" label="Pro" description="Unlimited projects" />
  <Radio name="plan" value="team" label="Team" description="Collaboration features" />
</RadioGroup>

// Controlled
<RadioGroup label="Priority">
  <Radio
    name="priority"
    value="low"
    label="Low"
    checked={priority === 'low'}
    onChange={() => setPriority('low')}
  />
  <Radio
    name="priority"
    value="high"
    label="High"
    checked={priority === 'high'}
    onChange={() => setPriority('high')}
  />
</RadioGroup>

// With disabled option
<RadioGroup label="Shipping">
  <Radio name="ship" value="standard" label="Standard" />
  <Radio name="ship" value="express" label="Express" disabled />
</RadioGroup>
```

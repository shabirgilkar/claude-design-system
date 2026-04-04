---
name: ds-component-dropdown
description: "Dropdown/Select component usage. Use when implementing select menus, option pickers, or filtered lists."
disable-model-invocation: false
---

# Dropdown

A select control that displays a list of options in a popover panel. Supports controlled and uncontrolled usage.

## Skill Boundaries

- **Use this skill** when implementing selection from a predefined list of 4+ options, replacing native `<select>` with a styled control, or when options need icons or disabled states.
- **Do not use** for fewer than 4 options -- use Radio or a segmented control instead.
- **Do not use** for free-text entry -- use Input instead.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming dropdown tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all states and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Dropdown } from '@ds/components/Dropdown';`
2. **Choose controlled or uncontrolled** -- use `value` + `onChange` for controlled, or `defaultValue` for uncontrolled.
3. **Configure props** -- define `options` array with `value`, `label`, optional `disabled` and `icon`; set `label`, `placeholder`.
4. **Handle accessibility** -- provide a `label` for form contexts so the listbox is properly announced.
5. **Verify in both themes** -- confirm trigger, panel, and selected state render correctly in Dark and Light modes.

## Reference

### When to Use

- Selecting one value from a predefined list of 4+ options
- Form fields where free text is not appropriate
- Replacing native `<select>` with a styled, consistent control
- When options need icons or disabled states

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownOption[]` | required | Array of selectable options |
| `value` | `string` | `undefined` | Controlled selected value |
| `defaultValue` | `string` | `''` | Initial value for uncontrolled usage |
| `placeholder` | `string` | `'Select...'` | Text shown when no value is selected |
| `label` | `string` | `undefined` | Label text above the trigger |
| `disabled` | `boolean` | `false` | Disables the dropdown |
| `onChange` | `(value: string) => void` | `undefined` | Called when selection changes |
| `className` | `string` | `undefined` | Additional CSS class |
| `id` | `string` | `undefined` | ID for the trigger button |

#### DropdownOption

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Option value |
| `label` | `string` | required | Display text |
| `disabled` | `boolean` | `false` | Disables this option |
| `icon` | `ReactNode` | `undefined` | Icon shown before label |

### Variants

No named variants. Visual state changes based on open/closed, selected/empty, and disabled.

### Sizes

The current implementation does not expose a `size` prop. The trigger height follows the default component sizing tokens. If sizes are needed, they should be added to match the sm/md/lg pattern (32px/40px/48px).

### States

| State | Trigger | Visual |
|-------|---------|--------|
| Default | No interaction | Trigger with placeholder or selected label, chevron icon |
| Hover | Mouse over trigger | Border/background color shift |
| Focused | Keyboard focus on trigger | Focus ring |
| Open | Click or Enter/Space/ArrowDown | Panel visible below trigger, chevron rotated |
| Filled | Value selected, closed | Selected label replaces placeholder |
| Disabled | `disabled` prop | Muted colors, no interaction |

Selected option shows a checkmark icon in the panel.

### Accessibility

- Trigger uses `aria-haspopup="listbox"` and `aria-expanded`
- Options panel has `role="listbox"` with `aria-label` matching the label prop
- Each option has `role="option"` and `aria-selected`
- Keyboard: Enter/Space/ArrowDown opens, Escape closes
- Closes on outside click
- Disabled options have `disabled` attribute

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-dropdown-*` | Trigger border, radius, padding, panel shadow |
| `--ds-color-border-*` | Border colors for default, hover, focus |
| `--ds-color-background-*` | Trigger and panel backgrounds |
| `--ds-color-foreground-*` | Label, value, placeholder, option text |
| `--ds-color-focus-ring` | Focus ring |

## Best Practices

- **Do** provide a `label` for form contexts so the listbox is properly announced.
- **Do** use controlled mode (`value` + `onChange`) when the parent needs to manage selection state.
- **Don't** use Dropdown for fewer than 4 options -- use Radio or segmented control instead.
- **Don't** put long text in options -- keep labels concise for scannability.

### Code Example

```tsx
import { Dropdown } from '@ds/components/Dropdown';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia', disabled: true },
];

// Uncontrolled
<Dropdown label="Country" options={options} placeholder="Choose a country" />

// Controlled
<Dropdown
  label="Country"
  options={options}
  value={country}
  onChange={setCountry}
/>

// With icons
const iconOptions = [
  { value: 'slack', label: 'Slack', icon: <SlackIcon /> },
  { value: 'email', label: 'Email', icon: <MailIcon /> },
];
<Dropdown label="Notify via" options={iconOptions} />
```

---
name: ds-component-tooltip
description: "Tooltip component usage. Use when implementing hover hints, icon explanations, or contextual help."
disable-model-invocation: false
---

# Tooltip

A floating label that appears on hover or focus to provide additional context about a trigger element. Supports simple (title only) and descriptive (title + content) modes.

## Skill Boundaries

- **Use this skill** when implementing supplementary context on hover/focus: icon-only button explanations, truncated label full text, abbreviation definitions, or keyboard shortcut hints.
- **Do not use** for essential information that users must see -- tooltip content is inaccessible on touch devices.
- **Do not use** for interactive content (links, buttons) -- use a Popover instead.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming tooltip tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all states and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Tooltip } from '@ds/components/Tooltip';`
2. **Choose theme and placement** -- select `theme` (dark/light) and `placement` (top/bottom/left/right) based on page background and available space.
3. **Configure props** -- set `content` (text or structured JSX), `delay`, `disabled` as needed.
4. **Handle accessibility** -- ensure the trigger element is keyboard-focusable; do not place tooltips on disabled elements (use a wrapper).
5. **Verify in both themes** -- confirm tooltip renders correctly in Dark and Light modes; check tooltip background and text contrast in both.

## Reference

### When to Use

- Explaining icon-only buttons or controls
- Showing full text for truncated labels
- Providing supplementary context without cluttering the UI
- Clarifying abbreviations or technical terms

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | required | Tooltip body (text or structured content) |
| `children` | `ReactElement` | required | Trigger element that the tooltip attaches to |
| `theme` | `'dark' \| 'light'` | `'dark'` | Tooltip background theme |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to trigger |
| `disabled` | `boolean` | `false` | Prevents tooltip from appearing |
| `delay` | `number` | `300` | Delay in ms before showing |

### Variants

| Variant | Visual | Use case |
|---------|--------|----------|
| Dark theme | Dark background, light text | Default; works on light page backgrounds |
| Light theme | Light background, dark text | Use on dark page backgrounds |

The Figma component also distinguishes "simple" (title only) from "descriptive" (title + description). In code, this is achieved by passing plain text vs. structured JSX as `content`.

### Sizes

Tooltip does not have size variants. Padding and font size are fixed. Width adapts to content with a max-width constraint.

### States

| State | Trigger | Visual |
|-------|---------|--------|
| Hidden | Default | Nothing rendered |
| Visible | Hover or focus on trigger (after delay) | Floating panel with arrow pointing at trigger |

### Accessibility

- Tooltip element has `role="tooltip"`
- Triggered by both `mouseenter`/`mouseleave` and `focus`/`blur` for keyboard access
- Tooltip content is not interactive -- it disappears on mouse leave or blur
- For interactive content (links, buttons), use a popover instead
- Trigger element must be focusable for keyboard users to access the tooltip

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-tooltip-*` | Padding, border-radius, max-width, arrow size |
| `--c-tooltip-dark-*` | Dark theme background and text colors |
| `--c-tooltip-light-*` | Light theme background and text colors |
| `--ds-color-foreground-*` | Text colors |

## Best Practices

- **Do** use tooltips for supplementary info that is not essential to the task.
- **Do** ensure the trigger element is keyboard-focusable (button, link, input, or element with `tabIndex={0}`).
- **Don't** put essential information only in a tooltip -- users on touch devices cannot hover.
- **Don't** use tooltips on disabled elements (they cannot receive focus); place the tooltip on a wrapper instead.

### Code Example

```tsx
import { Tooltip } from '@ds/components/Tooltip';

// Simple text tooltip
<Tooltip content="Save your changes" placement="top">
  <button aria-label="Save"><SaveIcon /></button>
</Tooltip>

// Descriptive with structured content
<Tooltip
  content={
    <div>
      <strong>Keyboard shortcut</strong>
      <p>Press Cmd+S to save</p>
    </div>
  }
  placement="bottom"
  theme="light"
>
  <span tabIndex={0}>Shortcut info</span>
</Tooltip>

// With delay
<Tooltip content="Delete item" delay={500} placement="right">
  <button><TrashIcon /></button>
</Tooltip>

// Disabled tooltip
<Tooltip content="Hidden" disabled>
  <button>No tooltip</button>
</Tooltip>
```

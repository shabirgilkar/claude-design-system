---
name: ds-component-badge
description: "Badge component usage. Use when displaying status indicators, counts, or category labels."
disable-model-invocation: false
---

# Badge

A small status indicator label. Used to communicate counts, categories, or states inline with other content.

## Skill Boundaries

- **Use this skill** when displaying status labels (success, error, warning), category tags, notification counts, or brand-colored indicators.
- **Do not use** as an interactive element -- Badge is purely presentational; use Button or a clickable chip instead.
- **Do not use** for long text content -- keep to 1-2 words or a number.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming badge tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all variants, states, and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Badge } from '@ds/components/Badge';`
2. **Choose variant and size** -- select `variant` (neutral/success/warning/error/info/brand) and `size` (sm/md/lg) based on meaning and context.
3. **Configure props** -- set `shape` (pill/rect), `dot`, `icon` as needed. Note: `dot` takes precedence over `icon`.
4. **Handle accessibility** -- Badge is a `<span>` with no implicit role; ensure surrounding context communicates status meaning to screen readers.
5. **Verify in both themes** -- confirm badge renders correctly in Dark and Light modes; check tinted backgrounds and text contrast in both.

## Reference

### When to Use

- Showing status: success, warning, error, info
- Labeling categories or tags
- Indicating counts (notifications, unread items)
- Adding brand-colored labels

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'neutral' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'brand'` | `'neutral'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height and font size |
| `shape` | `'pill' \| 'rect'` | `'pill'` | Border-radius style |
| `dot` | `boolean` | `false` | Shows a small colored circle before text |
| `icon` | `ReactNode` | `undefined` | Icon before text (ignored when `dot` is true) |
| `children` | `ReactNode` | required | Badge label content |
| `className` | `string` | `undefined` | Additional CSS class |

Badge is a `<span>` element. It is not interactive.

### Variants

| Variant | Color | Use case |
|---------|-------|----------|
| `neutral` | Gray | Default, generic labels |
| `success` | Green | Completed, active, online |
| `warning` | Amber | Pending, attention needed |
| `error` | Red | Failed, offline, blocked |
| `info` | Blue | Informational, new |
| `brand` | Purple | Brand-related tags, premium |

Each variant sets a tinted background and matching text/icon color.

### Sizes

| Size | Height | Use case |
|------|--------|----------|
| `sm` | ~22px | Table cells, dense lists |
| `md` | ~26px | Standard inline usage |
| `lg` | ~30px | Prominent status indicators |

### States

Badge has no interactive states. It is a purely presentational element.

### Accessibility

- Badge is a `<span>` with no implicit ARIA role
- If the badge conveys meaningful status, the surrounding context should communicate that meaning to screen readers
- `dot` and `icon` are marked `aria-hidden="true"`
- For notification counts, pair with `aria-label` on the parent element (e.g., "3 unread messages")

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-badge-*` | Padding, border-radius, font-size per size |
| `--c-badge-{variant}-*` | Background, text, dot/icon colors per variant |
| `--ds-color-{status}-*` | Semantic status colors feeding variant tokens |

## Best Practices

- **Do** use semantic variants (`success`, `error`, etc.) to match the meaning of the status.
- **Do** keep badge text short -- 1-2 words or a number.
- **Don't** use badges as buttons. They are not interactive.
- **Don't** use `dot` and `icon` together -- `dot` takes precedence and `icon` is ignored.

### Code Example

```tsx
import { Badge } from '@ds/components/Badge';

// Status badges
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning" dot>Pending</Badge>

// With icon
<Badge variant="info" icon={<StarIcon />}>New</Badge>

// Rectangular shape
<Badge variant="neutral" shape="rect" size="sm">Draft</Badge>

// Brand badge
<Badge variant="brand" size="lg">Premium</Badge>
```

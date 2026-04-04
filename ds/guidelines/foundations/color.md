---
name: ds-color-system
description: "Color palettes, semantic color categories, and status color mapping. Use when choosing colors, creating color tokens, or checking contrast requirements."
disable-model-invocation: false
---

# Color

The design system defines 7 primitive color palettes, mapped to semantic purposes through the token architecture. Components never reference palette colors directly.

## Skill Boundaries

- **Use this skill** when choosing colors, creating color tokens, mapping status colors, or checking contrast requirements.
- **Use ds-token-architecture instead** for the 3-tier chain rule and naming conventions.
- **Use ds-modes-theming instead** for how colors adapt between Dark and Light modes and how to add light-mode overrides.

## Prerequisites

- Understand the 3-tier token architecture (see ds-token-architecture)
- Know that components never consume primitive color tokens directly

## Reference

### Primitive Palettes

| Palette | CSS prefix | Purpose |
|---------|-----------|---------|
| **Deep Purple** | `--p-color-deep-purple-*` | Brand, primary actions, accents |
| **Crimson Pink** | `--p-color-crimson-pink-*` | Error states, destructive actions |
| **Coral Red** | `--p-color-coral-red-*` | Secondary accent, highlights |
| **Warm Yellow** | `--p-color-warm-yellow-*` | Warning states, caution indicators |
| **Medium Gray** | `--p-color-medium-gray-*` | Neutral surfaces, borders, disabled states |
| **Emerald Green** | `--p-color-emerald-green-*` | Success states, positive indicators |
| **Steel Blue** | `--p-color-steel-blue-*` | Informational states, links |

#### Palette Stops

Every palette has the same set of stops, from lightest to darkest:

```
100 -> 200 -> 300 -> 400 -> 500 -> base -> 700 -> 800 -> 900 -> 1000
```

Additionally, two standalone neutral values exist:
- `--p-color-neutral-white` (`#FFFFFF`)
- `--p-color-neutral-black` (`#000000`)

The `base` stop is the primary reference value for each palette (e.g., `--p-color-deep-purple-base: #8C59FF`).

### Semantic Color Categories

Semantic tokens assign meaning to primitive colors. They are the only tokens that change between Dark and Light modes.

#### Background

| Token | Purpose |
|-------|---------|
| `--ds-color-background-page` | Main page/app background |
| `--ds-color-background-surface` | Card, panel, and container backgrounds |
| `--ds-color-background-subtle` | Secondary surfaces, alternating rows |
| `--ds-color-background-overlay` | Modal/dialog backdrop |

#### Foreground (Text & Icons)

| Token | Purpose |
|-------|---------|
| `--ds-color-foreground-default` | Primary text, headings |
| `--ds-color-foreground-muted` | Secondary text, descriptions |
| `--ds-color-foreground-subtle` | Tertiary text, placeholders, metadata |
| `--ds-color-foreground-on-brand` | Text on brand-colored backgrounds |
| `--ds-color-foreground-brand` | Brand-colored text (links, labels) |

#### Border

| Token | Purpose |
|-------|---------|
| `--ds-color-border-default` | Standard borders |
| `--ds-color-border-subtle` | Light dividers, separators |
| `--ds-color-border-strong` | Emphasized borders, active states |
| `--ds-color-border-focus` | Focus ring borders |
| `--ds-color-border-brand` | Brand-colored borders |

#### Action

| Token | Purpose |
|-------|---------|
| `--ds-color-action-primary-bg-default` | Primary button background |
| `--ds-color-action-primary-bg-hover` | Primary button hover |
| `--ds-color-action-primary-bg-active` | Primary button pressed |
| `--ds-color-action-primary-fg-default` | Primary button text |
| `--ds-color-action-secondary-bg-default` | Secondary button background |
| `--ds-color-action-secondary-bg-hover` | Secondary button hover |
| `--ds-color-action-destructive-bg-default` | Destructive action background |
| `--ds-color-action-destructive-bg-hover` | Destructive action hover |

#### Status

Each status has three sub-tokens: `fg` (text/icon), `bg` (background fill), `border`.

| Status | Palette | Tokens |
|--------|---------|--------|
| **Success** | Emerald Green | `--ds-color-status-success-fg`, `--ds-color-status-success-bg`, `--ds-color-status-success-border` |
| **Warning** | Warm Yellow | `--ds-color-status-warning-fg`, `--ds-color-status-warning-bg`, `--ds-color-status-warning-border` |
| **Error** | Crimson Pink | `--ds-color-status-error-fg`, `--ds-color-status-error-bg`, `--ds-color-status-error-border` |
| **Info** | Steel Blue | `--ds-color-status-info-fg`, `--ds-color-status-info-bg`, `--ds-color-status-info-border` |

### Light Mode Contrast Considerations

Dark mode is the default. Some primitive colors that have good contrast on dark backgrounds fail on light backgrounds. This is why components must always use semantic tokens, never primitives directly.

| Color | Dark mode | Light mode | Problem on light |
|-------|-----------|------------|------------------|
| Warm Yellow (`base`) | `#FFBF33` | `#8B6914` | `#FFBF33` is nearly invisible on white |
| Emerald Green (`base`) | `#4DD98C` | `#0A8A42` | `#4DD98C` fails 4.5:1 on white |
| Steel Blue (`base`) | `#4DCCFF` | `#1A7FA3` | `#4DCCFF` fails 4.5:1 on white |
| Deep Purple (`base`) | `#8C59FF` | `#8C59FF` | Passes in both modes |
| Crimson Pink (`base`) | `#E15249` | `#E15249` | Passes in both modes |

The semantic tier handles this automatically: `--ds-color-status-warning-fg` resolves to `#FFBF33` in dark mode and `#8B6914` in light mode. Components using the semantic token get correct contrast in both themes without any changes.

### Contrast Requirements (WCAG 2.1 AA)

| Element type | Minimum ratio |
|-------------|---------------|
| Normal text (< 18px, or < 14px bold) | 4.5:1 |
| Large text (>= 18px, or >= 14px bold) | 3.0:1 |
| UI components and graphical objects | 3.0:1 |
| Decorative elements | No requirement |

Always verify contrast against the actual background token, not an assumed color. Background tokens change between themes.

### Usage Examples

```css
/* CORRECT -- semantic tokens in component variables */
--c-badge-bg-success: var(--ds-color-status-success-bg);
--c-badge-fg-success: var(--ds-color-status-success-fg);
--c-badge-border-success: var(--ds-color-status-success-border);

/* CORRECT -- using component tokens in styles */
.success {
  background-color: var(--c-badge-bg-success);
  color: var(--c-badge-fg-success);
  border: 1px solid var(--c-badge-border-success);
}
```

```css
/* WRONG -- primitive token directly (won't adapt to light mode) */
.success {
  color: var(--p-color-emerald-green-base);
}

/* WRONG -- hardcoded hex */
.success {
  color: #4DD98C;
}
```

## Best Practices

**Do:**
- Use semantic status tokens (`--ds-color-status-*`) for all status-related colors
- Check contrast in both Dark and Light modes before shipping
- Use `--ds-color-foreground-*` tokens for text -- never palette colors
- Use `--ds-color-background-*` tokens for surfaces -- never raw grays

**Don't:**
- Use `--p-color-warm-yellow-base` for warning text (fails contrast in light mode)
- Assume a color that works in dark mode also works in light mode
- Mix palettes for a single status (e.g., don't use emerald-green for success text but steel-blue for success border)
- Use `--p-color-neutral-white` for text -- use `--ds-color-foreground-default` instead
- Create custom one-off colors outside the 7 palettes

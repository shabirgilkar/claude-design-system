---
name: ds-spacing-sizing
description: "Spacing scale, sizing tokens, and border radius. Use when setting padding, gaps, margins, dimensions, or border-radius values."
disable-model-invocation: false
---

# Spacing & Sizing

All dimensions in the design system sit on a **2px grid**. Every spacing, sizing, padding, and radius value must be an even number. No exceptions.

## Skill Boundaries

- **Use this skill** when setting padding, gaps, margins, component dimensions, icon sizes, avatar sizes, or border-radius values.
- **Use ds-token-architecture instead** for how spacing tokens fit into the 3-tier chain.
- **Use ds-typography instead** for font sizes and line heights (those are typographic tokens, not spacing).

## Prerequisites

- Understand the 3-tier token architecture (see ds-token-architecture)
- Know the 2px grid rule: every numeric dimension must be divisible by 2

## Reference

### The 2px Grid Rule

Every numeric dimension -- margin, padding, gap, width, height, border-radius -- must be divisible by 2.

```
VALID:   2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64
INVALID: 1, 3, 5, 7, 9, 11, 13, 15
```

The only exception is `1px` borders (a standard CSS convention for hairline rules). All other values follow the grid.

### Spacing Categories

Spacing tokens are grouped by where they are used. Never mix categories.

#### Component Spacing -- Gaps within components

Internal gaps between elements inside a component (icon-to-label gap, items in a group).

| Token | Typical value | Use case |
|-------|--------------|----------|
| `--ds-spacing-component-xs` | 2px | Tight icon-text gap |
| `--ds-spacing-component-sm` | 4px | Compact element gap |
| `--ds-spacing-component-md` | 8px | Default internal gap |
| `--ds-spacing-component-lg` | 12px | Relaxed internal gap |
| `--ds-spacing-component-xl` | 16px | Wide internal gap |
| `--ds-spacing-component-2xl` | 24px | Maximum internal gap |

#### Layout Spacing -- Page-level spacing

Margins and gaps between sections, cards, and major page regions.

| Token | Typical value | Use case |
|-------|--------------|----------|
| `--ds-spacing-layout-xs` | 8px | Tight section gap |
| `--ds-spacing-layout-sm` | 16px | Compact section gap |
| `--ds-spacing-layout-md` | 24px | Default section gap |
| `--ds-spacing-layout-lg` | 32px | Relaxed section gap |
| `--ds-spacing-layout-xl` | 48px | Wide section gap |
| `--ds-spacing-layout-2xl` | 64px | Maximum section gap |

#### Inset Spacing -- Padding

Internal padding of containers, cards, dialogs, and inputs.

| Token | Typical value | Use case |
|-------|--------------|----------|
| `--ds-spacing-inset-sm` | 8px | Compact padding (badges, chips) |
| `--ds-spacing-inset-md` | 12px | Default padding (inputs, small cards) |
| `--ds-spacing-inset-lg` | 16px | Relaxed padding (cards, dialogs) |
| `--ds-spacing-inset-xl` | 24px | Wide padding (panels, hero sections) |
| `--ds-spacing-inset-2xl` | 32px | Maximum padding (page containers) |

### Sizing Tokens

#### Icon sizes

| Token | Value | Usage |
|-------|-------|-------|
| `--ds-sizing-icon-sm` | 14px | Inline icons, small component icons |
| `--ds-sizing-icon-md` | 16px | Default component icons |
| `--ds-sizing-icon-lg` | 20px | Large/emphasized icons |
| `--ds-sizing-icon-xl` | 24px | Hero icons, standalone icons |

#### Component heights

Components use size-specific height tokens to maintain vertical rhythm:

```css
--c-btn-height-sm     /* e.g., 32px */
--c-btn-height-md     /* e.g., 40px */
--c-btn-height-lg     /* e.g., 48px */

--c-input-height-sm   /* e.g., 32px */
--c-input-height-md   /* e.g., 40px */
--c-input-height-lg   /* e.g., 48px */
```

#### Avatar sizes

Avatars follow their own scale but stay on the 2px grid:

```css
--ds-sizing-avatar-sm    /* e.g., 24px */
--ds-sizing-avatar-md    /* e.g., 32px */
--ds-sizing-avatar-lg    /* e.g., 40px */
--ds-sizing-avatar-xl    /* e.g., 48px */
```

### Border Radius

| Token | Typical value | Use case |
|-------|--------------|----------|
| `--ds-radius-sm` | 4px | Badges, chips, small elements |
| `--ds-radius-md` | 6px | Buttons, inputs, cards |
| `--ds-radius-lg` | 8px | Dialogs, panels |
| `--ds-radius-xl` | 12px | Large cards, feature blocks |
| `--ds-radius-pill` | 9999px | Pill-shaped buttons, tags |

All radius values are even numbers (except `pill` which uses `9999px` as a CSS convention for full rounding).

### Common Spacing Patterns

#### Card

```css
.card {
  padding: var(--ds-spacing-inset-lg);          /* internal padding */
  gap: var(--ds-spacing-component-md);           /* gap between children */
  border-radius: var(--ds-radius-lg);
}
```

#### Form field

```css
.field {
  gap: var(--ds-spacing-component-sm);           /* label-to-input gap */
  margin-bottom: var(--ds-spacing-layout-sm);    /* space between fields */
}

.input {
  padding: var(--ds-spacing-inset-md);
  border-radius: var(--ds-radius-md);
}
```

#### Page section

```css
.section {
  padding: var(--ds-spacing-inset-xl);
  margin-bottom: var(--ds-spacing-layout-lg);
}

.sectionContent {
  gap: var(--ds-spacing-layout-sm);
}
```

#### Button with icon

```css
.button {
  gap: var(--ds-spacing-component-sm);           /* icon-to-label gap */
  padding: 0 var(--ds-spacing-inset-md);
  height: var(--c-btn-height-md);
  border-radius: var(--ds-radius-md);
}
```

## Best Practices

**Do:**
- Use component spacing for gaps *inside* a component
- Use layout spacing for gaps *between* components or sections
- Use inset spacing for *padding* inside containers
- Verify all values are even numbers (2px grid)
- Use `--ds-radius-*` tokens for all border-radius values
- Use `--ds-sizing-icon-*` tokens to size icons

**Don't:**
- Use arbitrary spacing values (`margin: 13px`, `padding: 7px`)
- Mix spacing categories (don't use layout tokens for internal component gaps)
- Use `border-radius: 8px` directly -- use `var(--ds-radius-lg)`
- Invent new spacing values outside the scale
- Use `gap: 0` when you mean "no gap" -- omit the `gap` property entirely or use `--ds-spacing-component-xs` for minimal spacing
- Forget the 2px grid when defining component-specific height/width tokens

---
name: ds-token-architecture
description: "3-tier token architecture (Primitives → Semantic → Components). Use when creating tokens, debugging token chains, or understanding CSS custom property naming."
disable-model-invocation: false
---

# Token Architecture

> The foundational concept of this design system. Read this before any other guide.

## Skill Boundaries

- **Use this skill** when creating new tokens, debugging token resolution, understanding the CSS custom property naming system, or auditing token chain compliance.
- **Use ds-color-system instead** for specific palette values, status color mapping, or contrast requirements.
- **Use ds-spacing-sizing instead** for spacing scale values, sizing tokens, or border radius.

## Prerequisites

- Read ds-guidelines-overview for the critical rules
- Access to `ds/src/styles/tokens.css`

## Required Workflow

1. Check if the token already exists in `tokens.css` before creating a new one.
2. If a primitive is needed, create it in the `:root` block first.
3. Create the semantic token aliasing the primitive.
4. Create the component token aliasing the semantic token.
5. If the token affects theming, add a `[data-theme="light"]` override for the semantic token.

## Reference

The design system uses a strict 3-tier token architecture. Every visual value flows through this chain. No tier may be skipped.

```
Primitives (--p-*)  →  Semantic (--ds-*)  →  Components (--c-*)
   raw values          purpose/intent          scoped to component
```

---

## Tier Overview

| Tier | Prefix | Purpose | Example |
|------|--------|---------|---------|
| **Primitive** | `--p-*` | Raw palette values, font weights, base sizes. Never consumed directly by components. | `--p-color-deep-purple-base: #8C59FF` |
| **Semantic** | `--ds-*` | Assigns meaning to primitives. Describes *why* a value is used, not *what* it is. Theme-aware — values change between Dark and Light modes. | `--ds-color-action-primary-bg-default: var(--p-color-deep-purple-base)` |
| **Component** | `--c-*` | Scoped to a single component. Aliases a semantic token. Enables per-component overrides without breaking the system. | `--c-btn-bg-primary: var(--ds-color-action-primary-bg-default)` |

---

## The Chain Rule

Components consume `--c-*` tokens. Component tokens alias `--ds-*` tokens. Semantic tokens alias `--p-*` tokens.

```css
/* Primitive tier — raw value */
--p-color-deep-purple-base: #8C59FF;

/* Semantic tier — aliases a primitive */
--ds-color-action-primary-bg-default: var(--p-color-deep-purple-base);

/* Component tier — aliases a semantic token */
--c-btn-bg-primary: var(--ds-color-action-primary-bg-default);
```

A component's CSS Module file uses only `--c-*` variables:

```css
/* Button.module.css */
.primary {
  background-color: var(--c-btn-bg-primary);
  color: var(--c-btn-fg-primary);
  border-radius: var(--c-btn-radius);
  padding: var(--c-btn-padding-md);
}
```

---

## No Raw Values

Hardcoded hex, rgb, px, or rem values are forbidden in the semantic and component tiers. Every value must resolve through the chain.

```css
/* WRONG — hardcoded value in component tier */
--c-btn-bg-primary: #8C59FF;

/* WRONG — skipping semantic, pointing directly at primitive */
--c-btn-bg-primary: var(--p-color-deep-purple-base);

/* CORRECT — full chain */
--c-btn-bg-primary: var(--ds-color-action-primary-bg-default);
```

The only place raw hex/rgb values appear is in primitive token definitions.

---

## Naming Conventions

### Color tokens

```
{component}/color/{state}/{property}
```

| Segment | Values |
|---------|--------|
| `component` | `btn`, `input`, `badge`, `toggle`, etc. |
| `state` | `default`, `hover`, `active`, `focus`, `disabled`, `error` |
| `property` | `bg`, `fg`, `border`, `ring`, `icon` |

CSS variable form: `--c-{component}-{property}-{state}`

Examples:
```
--c-btn-bg-primary          (default state implied)
--c-btn-bg-primary-hover
--c-btn-fg-primary-disabled
--c-input-border-error
--c-input-border-focus
```

### Size/spacing tokens

```
{component}/size/{size}/{property}
```

| Segment | Values |
|---------|--------|
| `size` | `sm`, `md`, `lg` |
| `property` | `height`, `padding`, `font-size`, `icon-size`, `gap`, `radius` |

Examples:
```
--c-btn-height-sm
--c-btn-height-md
--c-btn-height-lg
--c-btn-padding-sm
--c-btn-font-size-lg
```

---

## Full Token Chain Examples

### Button primary background

```
--p-color-deep-purple-base: #8C59FF
    ↓
--ds-color-action-primary-bg-default: var(--p-color-deep-purple-base)
    ↓
--c-btn-bg-primary: var(--ds-color-action-primary-bg-default)
```

### Input border on error

```
--p-color-crimson-pink-base: #E15249
    ↓
--ds-color-status-error-border: var(--p-color-crimson-pink-base)
    ↓
--c-input-border-error: var(--ds-color-status-error-border)
```

### Body font size

```
--p-font-size-16: 1rem
    ↓
--ds-font-size-body-default: var(--p-font-size-16)
    ↓
--c-input-font-size-md: var(--ds-font-size-body-default)
```

---

## Common Mistakes

| Mistake | Why it breaks | Fix |
|---------|---------------|-----|
| Using `--p-*` directly in a `.module.css` file | Bypasses semantic meaning; won't adapt to theme changes | Create or use an existing `--ds-*` token, then alias it in `--c-*` |
| Using `--ds-*` directly in a `.module.css` file | Bypasses component scoping; makes overrides impossible | Create a `--c-*` token that aliases the `--ds-*` token |
| Hardcoding `#8C59FF` in a component's CSS | Breaks theming entirely; invisible to token tooling | Trace the chain: find the right `--p-*` → `--ds-*` → `--c-*` path |
| Creating a `--c-*` token without a `--ds-*` backing | Breaks the chain; value has no semantic meaning | Always create the semantic token first |
| Naming a token by its visual value (`--c-btn-purple`) | Breaks when the brand color changes | Name by purpose: `--c-btn-bg-primary` |
| Skipping the component tier for "simple" components | Inconsistent architecture; harder to override later | Every component gets its own `--c-*` tokens, no exceptions |

---

## Best Practices

**Do:**
- Trace the full chain before creating any new token
- Check if a semantic token already exists before creating a new one
- Use the naming convention exactly as specified
- Define component tokens in the component's CSS Module file
- Keep primitive definitions in `tokens.css` only

**Don't:**
- Use raw hex, rgb, or hsl values outside of primitive definitions
- Skip any tier in the chain
- Create semantic tokens that are only used by one component (that's what the component tier is for)
- Name tokens after their visual appearance instead of their purpose
- Assume a token exists without checking first

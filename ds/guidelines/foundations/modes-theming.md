---
name: ds-modes-theming
description: "Dark/Light mode theming system. Use when implementing theme switching, debugging theme issues, or verifying both-mode compliance."
disable-model-invocation: false
---

# Modes & Theming

The design system is dark-theme-first. Dark mode is the default. Light mode is supported through CSS overrides and Figma variable modes. Every component must work correctly in both themes.

## Skill Boundaries

- **Use this skill** when implementing theme switching, adding light-mode token overrides, debugging theme issues, or verifying both-mode compliance.
- **Use ds-color-system instead** for color palette details, semantic color categories, and contrast ratio requirements.
- **Use ds-token-architecture instead** for the 3-tier chain rule and how tokens are structured.

## Prerequisites

- Understand the 3-tier token architecture (see ds-token-architecture)
- Know that semantic tokens (`--ds-*`) are the only tier that changes between themes
- Know that `tokens.css` is the single file for all token definitions (see ds-setup)

## Required Workflow

When adding a new semantic token that involves color:

1. Define the dark mode value in the `:root` block of `tokens.css`.
2. Check if the value needs to change in light mode (test contrast against light background).
3. If yes, add the override in the `[data-theme="light"]` block.
4. Test contrast against both `--ds-color-background-page` values (dark and light).
5. Verify visually in both Figma modes and Storybook themes.

## Reference

### How Theming Works

#### CSS (Code)

Theme values are defined in `tokens.css` in two blocks:

```css
/* Dark mode -- default (no attribute needed) */
:root {
  --ds-color-background-page: var(--p-color-medium-gray-1000);
  --ds-color-foreground-default: var(--p-color-neutral-white);
  --ds-color-focus-ring: var(--p-color-deep-purple-base);
  /* ... all semantic tokens ... */
}

/* Light mode -- overrides */
[data-theme="light"] {
  --ds-color-background-page: var(--p-color-neutral-white);
  --ds-color-foreground-default: var(--p-color-medium-gray-1000);
  --ds-color-focus-ring: var(--p-color-deep-purple-700);
  /* ... only the tokens that change ... */
}
```

The `data-theme` attribute is set on the `<html>` element:

```html
<html data-theme="light">  <!-- light mode -->
<html>                      <!-- dark mode (default) -->
```

#### Figma

The Semantic variable collection has two modes:

| Mode | Mode ID | Purpose |
|------|---------|---------|
| Dark | `5:0` | Default mode |
| Light | `175:0` | Light theme overrides |

Switching a frame's mode:

```javascript
// Switch to Light mode
frame.setExplicitVariableModeForCollection(semanticCollectionId, "175:0");

// Switch to Dark mode
frame.setExplicitVariableModeForCollection(semanticCollectionId, "5:0");
```

### Theme Provider Architecture

The app uses a `ThemeProvider` component that wraps the entire application. A `ThemeToggle` component sits in the layout topbar.

```
<ThemeProvider>              <- manages theme state
  <Layout>
    <Topbar>
      <ThemeToggle />        <- user toggle control
    </Topbar>
    <Content />
  </Layout>
</ThemeProvider>
```

#### Theme detection priority

1. **localStorage** -- if the user has previously chosen a theme, that choice persists
2. **`prefers-color-scheme`** -- if no stored preference, the OS/browser setting is respected
3. **Dark mode** -- fallback default if neither of the above yields a result

### Storybook Integration

Storybook uses a global theme toolbar decorator configured in `.storybook/preview.ts`. The decorator sets `data-theme` on the `<html>` element, matching exactly how the production app works.

No separate background addon or story-level theme wrapper is needed. The global decorator handles everything.

```typescript
// .storybook/preview.ts -- theme decorator
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        items: ['dark', 'light'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.setAttribute(
        'data-theme',
        context.globals.theme
      );
      return Story();
    },
  ],
};
```

### Showcases Are Mode-Switchable

Figma showcase frames are **single frames** with all structural elements bound to semantic variables. They are NOT separate dark/light frames.

To verify both themes:
1. Build the showcase with all elements bound to semantic variables
2. Switch to Light mode (`175:0`) and screenshot
3. Switch back to Dark mode (`5:0`) and verify no changes from original

#### Showcase variable binding checklist

| Element | Bound to |
|---------|----------|
| Frame background | `color/background/page` |
| Hero/footer backgrounds | `color/background/subtle` |
| Title text | `color/foreground/default` |
| Subtitle/description text | `color/foreground/muted` |
| Secondary text (tokens, properties) | `color/foreground/subtle` |
| Divider rectangles | `color/border/subtle` |
| Accent labels | `color/foreground/brand` |
| Component instances | Own token chain (auto-adapts) |

### What Adapts and What Does Not

| Token tier | Adapts per theme? | Explanation |
|-----------|-------------------|-------------|
| Primitive (`--p-*`) | No | Raw values, always the same |
| Semantic (`--ds-*`) | Yes | Reassigned in `[data-theme="light"]` |
| Component (`--c-*`) | Yes (inherited) | They alias semantic tokens, so they adapt automatically |

This is why components must never consume primitive tokens directly. A component using `--p-color-deep-purple-base` will show the same color in both themes. A component using `--ds-color-action-primary-bg-default` (which aliases the same primitive in dark mode) will correctly switch to a different value in light mode if needed.

### Colors That Need Light Mode Variants

Some colors that pass contrast on dark backgrounds fail on light backgrounds. The semantic tier handles this by mapping to darker primitive stops in light mode.

| Color | Dark mode value | Light mode value | Notes |
|-------|----------------|-----------------|-------|
| Success (fg) | `#4DD98C` (emerald-green base) | `#0A8A42` (emerald-green 800) | Base green fails 4.5:1 on white |
| Warning (fg) | `#FFBF33` (warm-yellow base) | `#8B6914` (warm-yellow 800) | Base yellow is nearly invisible on white |
| Info (fg) | `#4DCCFF` (steel-blue base) | `#1A7FA3` (steel-blue 800) | Base blue fails 4.5:1 on white |
| Error (fg) | `#E15249` (crimson-pink base) | `#E15249` (same) | Passes in both modes |
| Brand (fg) | `#8C59FF` (deep-purple base) | `#8C59FF` (same) | Passes in both modes |
| Focus ring | `--p-color-deep-purple-base` | `--p-color-deep-purple-700` | Needs to be visible on light surfaces |
| Dot pattern | deep-purple-700 | `#D8D6E0` | Decorative patterns adapt |

### Adding New Tokens -- Theme Cascade

When adding a new semantic token:

1. Define the dark mode value in `:root` block
2. Check if the value needs to change in light mode
3. If yes, add the override in `[data-theme="light"]` block
4. Test contrast against both `--ds-color-background-page` values (dark and light)

```css
/* Step 1: Dark mode (default) */
:root {
  --ds-color-new-token: var(--p-color-emerald-green-base);
}

/* Step 2-3: Light mode override (only if needed) */
[data-theme="light"] {
  --ds-color-new-token: var(--p-color-emerald-green-800);
}
```

### Testing Requirement

Every component must be visually verified in both themes. After any component modification:

1. Verify Figma component renders correctly in both variable modes (Dark + Light)
2. Verify showcase readability in Dark mode
3. Verify showcase readability in Light mode -- pay special attention to muted text
4. If new tokens were added, verify CSS overrides exist in `[data-theme="light"]`
5. Verify Storybook stories render correctly with the theme toolbar set to both `dark` and `light`

### Common Pitfalls

| Pitfall | What goes wrong | Fix |
|---------|----------------|-----|
| Using `--p-*` tokens in components | Color doesn't change between themes | Use `--ds-*` or `--c-*` tokens |
| Forgetting `[data-theme="light"]` override | Color that works in dark fails contrast in light | Add the override with a darker primitive stop |
| Creating separate dark/light showcase frames | Double maintenance, frames drift out of sync | Single frame with semantic variable bindings |
| Testing only in dark mode | Light mode has contrast failures users will see | Always screenshot both modes |
| Hardcoding `background: #1a1a2e` | Completely breaks in light mode | Use `var(--ds-color-background-page)` |
| Using `@media (prefers-color-scheme: light)` in components | Conflicts with the `data-theme` attribute system | Theme switching is handled by `ThemeProvider` only |

## Best Practices

**Do:**
- Define dark mode values in `:root`, light overrides in `[data-theme="light"]`
- Test every component in both themes before marking it complete
- Use semantic tokens for any color that should adapt between themes
- Bind showcase elements to semantic Figma variables
- Check contrast ratios against the actual theme background

**Don't:**
- Use primitive tokens in component CSS (they don't adapt)
- Create separate dark and light showcase frames in Figma
- Skip the `[data-theme="light"]` override when adding warm-yellow, emerald-green, or steel-blue semantic tokens
- Use `@media (prefers-color-scheme)` in component stylesheets
- Assume dark mode contrast automatically means light mode contrast passes
- Hardcode any color values in component CSS -- always use token variables

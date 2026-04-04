---
name: ds-icons
description: "Stroke-based icon system, sizing, and color binding. Use when adding icons, troubleshooting icon rendering, or setting icon colors."
disable-model-invocation: false
---

# Icons

All icons in the design system are **stroke-based** (outlined paths). They are not filled shapes. This is a fundamental constraint that affects both Figma construction and React implementation.

## Skill Boundaries

- **Use this skill** when adding icons to components, troubleshooting icon rendering issues, setting icon colors, or implementing icon components in React or Figma.
- **Use ds-color-system instead** for which color tokens to apply to icons (foreground tokens).
- **Use ds-spacing-sizing instead** for icon size token values (`--ds-sizing-icon-*`).

## Prerequisites

- Understand that this system uses stroke-based icons exclusively -- no filled icons
- Know the 3-tier token architecture for color binding (see ds-token-architecture)

## Reference

### Stroke-Based Architecture

Icons use stroked paths to draw their shapes. The parent `<svg>` element must have `fill="none"` to prevent any accidental fills. Color is applied via the `stroke` attribute.

```
CORRECT: Outlined paths with stroke color, no fill
WRONG:   Solid filled shapes
```

### SVG Attributes

Every icon SVG must use these standard attributes:

| Attribute | Value | Notes |
|-----------|-------|-------|
| `viewBox` | `0 0 24 24` | Standard 24x24 coordinate space |
| `fill` | `none` | Always `none` on the parent `<svg>` |
| `stroke` | `currentColor` | Inherits color from CSS `color` property |
| `strokeWidth` | `1.5` | Standard stroke thickness |
| `strokeLinecap` | `round` | Rounded line endings |
| `strokeLinejoin` | `round` | Rounded corner joins |

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v14M5 12h14" />
</svg>
```

### Icon Sizes

Icons are displayed at four standard sizes, controlled by the `width` and `height` CSS properties or the `--ds-sizing-icon-*` tokens.

| Size | Pixel value | Token | Usage |
|------|-------------|-------|-------|
| Small | 14px | `--ds-sizing-icon-sm` | Inline with small text, compact UI |
| Default | 16px | `--ds-sizing-icon-md` | Inside buttons, inputs, badges |
| Large | 20px | `--ds-sizing-icon-lg` | Emphasized actions, navigation |
| Hero | 24px | `--ds-sizing-icon-xl` | Standalone icons, empty states |

```css
.icon {
  width: var(--ds-sizing-icon-md);
  height: var(--ds-sizing-icon-md);
}
```

The SVG `viewBox` is always `0 0 24 24` regardless of display size. CSS `width`/`height` scales the icon.

### Coloring Icons

Icons inherit color from their parent via `currentColor`. Set the color using CSS on the icon element or its container.

```css
/* Icon takes its color from the parent component's text color */
.button {
  color: var(--c-btn-fg-primary);
}

/* Or set icon color explicitly */
.icon {
  color: var(--ds-color-foreground-muted);
}
```

Never set color via the `fill` attribute on icon paths. Never use inline `style` attributes.

### Figma Implementation

In Figma, icons are vector nodes. Apply color to the **stroke**, not the fill.

```javascript
// CORRECT -- stroke-based coloring
vec.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
vec.fills = [];  // Always clear fills

// WRONG -- fill-based coloring
vec.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
```

When binding to variables in Figma, bind the **stroke** color, not the fill color:

```javascript
vec.setBoundVariable('strokes', 0, 'color', variableId);
vec.fills = [];  // Ensure fills are empty
```

### React Implementation

Wrap icons in a `<span>` for consistent sizing and alignment. Add `aria-hidden="true"` when the icon is decorative (paired with text).

```tsx
/* Decorative icon (has adjacent text label) */
<button>
  <span className={styles.icon} aria-hidden="true">
    <PlusIcon />
  </span>
  Add item
</button>

/* Meaningful icon (no text label -- needs accessible name) */
<button aria-label="Close dialog">
  <span className={styles.icon}>
    <CloseIcon />
  </span>
</button>
```

Icon component pattern:

```tsx
interface IconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

function PlusIcon({ size = 'md', className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: `var(--ds-sizing-icon-${size})`,
        height: `var(--ds-sizing-icon-${size})`,
      }}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
```

### Common Mistakes

| Mistake | Result | Fix |
|---------|--------|-----|
| Setting `fill` on SVG paths | Icon becomes a solid blob instead of an outline | Set `fill="none"` on `<svg>`, use `stroke="currentColor"` |
| Missing `fill="none"` on parent `<svg>` | Default SVG fill is black -- icon paths render as filled shapes | Always include `fill="none"` on the `<svg>` element |
| Using `strokeWidth: 2` or `strokeWidth: 1` | Inconsistent visual weight across the icon set | Use `strokeWidth: 1.5` for all icons |
| Hardcoding a hex color on `stroke` | Icon won't adapt to themes or component states | Use `stroke="currentColor"` and control via CSS `color` |
| Using `viewBox="0 0 16 16"` for small icons | Misaligned paths, blurry rendering | Always use `viewBox="0 0 24 24"`, scale with CSS |
| Forgetting `aria-hidden="true"` on decorative icons | Screen readers announce meaningless SVG content | Add `aria-hidden="true"` when a text label exists nearby |

## Best Practices

**Do:**
- Set `fill="none"` on every icon's `<svg>` element
- Use `stroke="currentColor"` for all icon coloring
- Size icons with `--ds-sizing-icon-*` tokens
- Use `strokeWidth={1.5}`, `strokeLinecap="round"`, `strokeLinejoin="round"`
- Clear fills in Figma vectors (`vec.fills = []`)
- Add `aria-hidden="true"` on decorative icons

**Don't:**
- Set `fill` on icon SVG paths
- Use `fill="currentColor"` -- this system uses strokes
- Hardcode colors on icon strokes or fills
- Change the `viewBox` based on display size
- Use icon-only buttons without an `aria-label`
- Mix stroke-based and fill-based icons in the same interface

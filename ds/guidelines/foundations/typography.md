---
name: ds-typography
description: "Font families, type scale, and text style tokens. Use when setting typography, choosing text styles, or creating text elements."
disable-model-invocation: false
---

# Typography

All typography in the design system uses IBM Plex. Two families are loaded: a sans-serif for UI text and a monospace for code and technical content.

## Skill Boundaries

- **Use this skill** when setting typography properties, choosing text styles, creating text elements, or looking up font size / weight / line-height tokens.
- **Use ds-token-architecture instead** for how typography tokens fit into the 3-tier chain (primitive -> semantic -> component).
- **Use ds-spacing-sizing instead** for spacing between text elements (margins, gaps).

## Prerequisites

- Understand the 3-tier token architecture (see ds-token-architecture)
- Know that all typographic values must use CSS custom properties, never raw values

## Reference

### Font Families

| Family | Weights loaded | CSS variable | Usage |
|--------|---------------|-------------|-------|
| **IBM Plex Sans** | Regular (400), Medium (500), SemiBold (600), Bold (700) | `--ds-font-family-sans` | All UI text |
| **IBM Plex Mono** | Regular (400), Medium (500) | `--ds-font-family-mono` | Code blocks, token names, technical values |

```css
font-family: var(--ds-font-family-sans);
font-family: var(--ds-font-family-mono);
```

### Type Scale

#### Display -- Hero headers, landing pages

| Style | Size | Weight | Line height |
|-------|------|--------|-------------|
| Display Large | 52px | Bold (700) | 1.15 |
| Display Medium | 44px | Bold (700) | 1.18 |
| Display Small | 36px | Bold (700) | 1.22 |

#### Title -- Section headers, page titles

| Style | Size | Weight | Line height |
|-------|------|--------|-------------|
| Title 1 | 32px | SemiBold (600) | 1.25 |
| Title 2 | 28px | SemiBold (600) | 1.28 |
| Title 3 | 24px | SemiBold (600) | 1.33 |

#### Headline -- Subsection headers

| Style | Size | Weight | Line height |
|-------|------|--------|-------------|
| Headline | 20px | SemiBold (600) | 1.4 |

#### Body -- Content text

| Style | Size | Weight | Line height |
|-------|------|--------|-------------|
| Body Large | 18px | Regular (400) | 1.55 |
| Body Default | 16px | Regular (400) | 1.5 |
| Body Emphasized | 16px | Medium (500) | 1.5 |

#### Callout -- Secondary content, descriptions

| Style | Size | Weight | Line height |
|-------|------|--------|-------------|
| Callout | 14px | Regular (400) | 1.43 |

#### Footnote -- Small print, legal

| Style | Size | Weight | Line height |
|-------|------|--------|-------------|
| Footnote | 12px | Regular (400) | 1.33 |

#### Caption -- Labels, metadata

| Style | Size | Weight | Line height |
|-------|------|--------|-------------|
| Caption | 12px | Medium (500) | 1.33 |

#### Label -- Buttons, form labels, badges

| Style | Size | Weight | Line height |
|-------|------|--------|-------------|
| Label Large | 14px | SemiBold (600) | 1.43 |
| Label Medium | 12px | SemiBold (600) | 1.33 |
| Label Small | 10px | SemiBold (600) | 1.2 |

#### Code -- Tokens, code blocks, technical text

| Style | Size | Weight | Font |
|-------|------|--------|------|
| Code Default | 14px | Regular (400) | IBM Plex Mono |
| Code Small | 12px | Regular (400) | IBM Plex Mono |
| Code Emphasized | 14px | Medium (500) | IBM Plex Mono |

### When to Use Each Style

| Style | Use for |
|-------|---------|
| Display | Hero sections, marketing headers, splash screens |
| Title 1 | Page titles, primary headings |
| Title 2 | Major section headings |
| Title 3 | Card titles, dialog titles |
| Headline | Subsection headings, sidebar group titles |
| Body Large | Introductory paragraphs, feature descriptions |
| Body Default | General content, form descriptions, paragraphs |
| Body Emphasized | Inline emphasis within body text |
| Callout | Helper text, secondary descriptions, tooltips |
| Footnote | Legal text, timestamps, fine print |
| Caption | Image captions, metadata labels, table headers |
| Label Large | Primary button text, navigation items |
| Label Medium | Secondary buttons, tabs, badges |
| Label Small | Compact badges, overline text |
| Code Default | Code blocks, token names in docs |
| Code Small | Inline code, compact technical text |
| Code Emphasized | Highlighted code, important token references |

### CSS Variable Naming

#### Font size

```
--ds-font-size-{style}
```

Examples:
```css
--ds-font-size-display-large
--ds-font-size-title-1
--ds-font-size-body-default
--ds-font-size-caption
--ds-font-size-code-default
```

#### Font weight

```
--p-font-weight-{weight}
```

Examples:
```css
--p-font-weight-regular    /* 400 */
--p-font-weight-medium     /* 500 */
--p-font-weight-semibold   /* 600 */
--p-font-weight-bold       /* 700 */
```

#### Line height

```
--p-line-height-{style}
```

Examples:
```css
--p-line-height-display
--p-line-height-title
--p-line-height-body
--p-line-height-caption
```

### Usage in Components

```css
/* CORRECT -- tokens for all typographic properties */
.title {
  font-family: var(--ds-font-family-sans);
  font-size: var(--ds-font-size-title-2);
  font-weight: var(--p-font-weight-semibold);
  line-height: var(--p-line-height-title);
  color: var(--c-card-title-fg);
}

.codeBlock {
  font-family: var(--ds-font-family-mono);
  font-size: var(--ds-font-size-code-default);
  font-weight: var(--p-font-weight-regular);
  line-height: var(--p-line-height-body);
}
```

```css
/* WRONG -- raw values */
.title {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.28;
}
```

## Best Practices

**Do:**
- Use `--ds-font-family-sans` for all UI text
- Use `--ds-font-family-mono` for code, token names, and technical content
- Pick the closest style from the type scale -- do not invent intermediate sizes
- Use Label styles for interactive controls (buttons, links, tabs)
- Use Caption/Footnote for metadata and secondary information

**Don't:**
- Use raw `px`, `rem`, or `em` values for font size, weight, or line height
- Write `font-family: 'IBM Plex Sans'` directly -- always use the CSS variable
- Use Display styles inside components -- they are for page-level headers only
- Mix weights arbitrarily -- each type style has a prescribed weight
- Use Body styles for button text (use Label instead)
- Use more than 2 type styles in a single component (typically one heading + one body/label)

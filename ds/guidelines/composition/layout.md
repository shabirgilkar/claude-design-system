---
name: ds-composition-layout
description: "Page layout patterns. Use when structuring pages, creating card grids, establishing surface hierarchy, or setting up responsive layouts."
disable-model-invocation: false
---

# Layout Patterns

Guidelines for composing page layouts, content containers, and surface hierarchy. All layouts use CSS Modules with token variables.

## Skill Boundaries

**Use this skill when:**
- Structuring a page shell (sidebar, topbar, main content area)
- Creating card layouts, content containers, or section groupings
- Establishing surface/background hierarchy (page, surface, subtle, overlay)
- Building responsive grids or flex-based component groups
- Adding dot-pattern playground backgrounds
- Deciding which spacing tokens to use for page-level vs component-level gaps

**Do NOT use this skill when:**
- Laying out form fields within a form -- use `ds-composition-forms`
- Implementing toast placement or notification stacking -- use `ds-composition-notifications`
- Building an individual component (Button, Input, Badge) -- use the component-specific skill

## Prerequisites

- **Foundation skills:** `ds-foundation-spacing`, `ds-foundation-color`, `ds-foundation-radius`, `ds-foundation-shadow` -- token variables must be defined in `tokens.css`
- **Theme setup:** `[data-theme="light"]` overrides must exist for all `--ds-color-bg-*`, `--ds-color-border-*`, `--ds-color-fg-*`, and `--ds-shadow-*` tokens
- **CSS Modules:** all layout styles must be authored as `.module.css` files -- no inline styles, no Tailwind

## Required Workflow

1. **Choose page structure** -- determine shell regions (sidebar, topbar, main) using CSS Grid
2. **Set content container** -- pick `960px` (text-heavy), `1200px` (dashboard), or full-width
3. **Establish surface hierarchy** -- assign background tokens: page > surface > subtle > overlay
4. **Build sections** -- group content into sections with consistent spacing (`--ds-spacing-layout-xl` between major sections)
5. **Add cards/grids** -- use CSS Grid for equal-width columns, flexbox for inline groups
6. **Apply spacing tokens** -- component tokens inside components, inset tokens for container padding, layout tokens between page regions
7. **Verify themes** -- test layout in both Dark and Light modes; confirm all background, border, and text tokens resolve correctly

## Reference

### Page Structure

The standard page layout is a three-region shell: fixed sidebar, topbar, and scrollable main content.

```
+------------------+----------------------------------------+
|                  |  Topbar (breadcrumb + theme toggle)     |
|   Sidebar        +----------------------------------------+
|   (240px fixed)  |                                        |
|                  |  Main Content (scrollable)              |
|                  |                                        |
|                  |                                        |
+------------------+----------------------------------------+
```

```css
/* AppLayout.module.css */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background-color: var(--ds-color-bg-page);
}

.sidebar {
  grid-row: 1 / -1;
  background-color: var(--ds-color-bg-surface);
  border-right: 1px solid var(--ds-color-border-default);
  padding: var(--ds-spacing-inset-lg);
  overflow-y: auto;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ds-spacing-inset-md) var(--ds-spacing-inset-lg);
  border-bottom: 1px solid var(--ds-color-border-default);
  background-color: var(--ds-color-bg-surface);
}

.main {
  overflow-y: auto;
  padding: var(--ds-spacing-inset-xl);
}
```

### Do

- Use `grid-template-columns: 240px 1fr` for the sidebar layout.
- Keep the sidebar width fixed. Content fills the remaining space.
- Apply `overflow-y: auto` to the main area, not the entire page.

### Don't

- Don't set a `max-width` on the main area at the layout level. Let content containers handle their own max-width.
- Don't use absolute positioning for the sidebar. CSS Grid handles this cleanly.

---

### Content Containers

Content within the main area should be constrained by a container. The container does not set its own background -- it inherits from the page.

```css
.contentContainer {
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
}

.contentContainerWide {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.contentContainerFull {
  width: 100%;
}
```

Use `contentContainer` (960px) for documentation and text-heavy pages. Use `contentContainerWide` (1200px) for dashboards or grid-heavy pages.

---

### Surface Hierarchy

Surfaces layer from deepest (page) to topmost (overlay). Each level gets progressively lighter in dark mode and progressively more shadowed/elevated in light mode.

| Level | Token | Usage |
|-------|-------|-------|
| Page | `--ds-color-bg-page` | Root background, deepest layer |
| Surface | `--ds-color-bg-surface` | Cards, panels, sidebar, topbar |
| Subtle | `--ds-color-bg-subtle` | Section headers, footers, secondary areas |
| Overlay | `--ds-color-bg-overlay` | Dropdowns, modals, tooltips, toasts |

### Do

- Follow the hierarchy strictly: page contains surfaces, surfaces contain subtle areas.
- Use `--ds-color-bg-overlay` only for floating elements that sit above the main content.

### Don't

- Don't place a `surface` inside another `surface`. If you need nesting, use `subtle` inside `surface`.
- Don't use `overlay` for static content areas.

---

### Card Pattern

Cards are the primary surface container for grouping related content.

```css
/* Card.module.css */
.card {
  background-color: var(--ds-color-bg-surface);
  border: 1px solid var(--ds-color-border-default);
  border-radius: var(--ds-radius-lg);
  padding: var(--ds-spacing-inset-lg);
}

.cardHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--ds-spacing-component-md);
  border-bottom: 1px solid var(--ds-color-border-subtle);
  margin-bottom: var(--ds-spacing-component-md);
}

.cardTitle {
  font-weight: 600;
  color: var(--ds-color-fg-default);
}

.cardBody {
  color: var(--ds-color-fg-muted);
}
```

```tsx
<div className={styles.card}>
  <div className={styles.cardHeader}>
    <h3 className={styles.cardTitle}>Section Title</h3>
    <Badge variant="info">New</Badge>
  </div>
  <div className={styles.cardBody}>
    {/* Card content */}
  </div>
</div>
```

---

### Section Pattern

Major content sections on a page are separated by vertical spacing and optional title separators.

```css
/* Section.module.css */
.section {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-component-lg);
}

.sections {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-layout-xl); /* Large gap between major sections */
}

.sectionHeader {
  padding-bottom: var(--ds-spacing-component-sm);
  border-bottom: 1px solid var(--ds-color-border-subtle);
}

.sectionTitle {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ds-color-fg-default);
}

.sectionDescription {
  color: var(--ds-color-fg-muted);
  margin-top: var(--ds-spacing-component-xs);
}
```

```tsx
<div className={styles.sections}>
  <section className={styles.section}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>General</h2>
      <p className={styles.sectionDescription}>Basic account settings</p>
    </div>
    {/* Section content */}
  </section>

  <section className={styles.section}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Notifications</h2>
    </div>
    {/* Section content */}
  </section>
</div>
```

---

### Grid Pattern

Use CSS Grid for card grids, feature grids, or any layout needing equal-width columns.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--ds-spacing-component-lg);
}

.gridTwoCol {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--ds-spacing-component-lg);
}

.gridThreeCol {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--ds-spacing-component-lg);
}
```

### Do

- Use `auto-fill` with `minmax` for responsive grids that don't need a fixed column count.
- Use `gap` (not margin) for grid spacing.
- Use `--ds-spacing-component-lg` for grid gaps.

### Don't

- Don't mix grid gap tokens. Pick one and use it consistently within a grid.
- Don't use flexbox for equal-width column layouts. CSS Grid is the correct tool.

---

### Flex Pattern

Use flexbox for horizontal groups: button rows, badge groups, tab bars, and inline elements.

```css
.buttonGroup {
  display: flex;
  gap: var(--ds-spacing-component-md);
  align-items: center;
}

.badgeRow {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-spacing-component-sm);
}

.inlineGroup {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-component-sm);
}
```

```tsx
{/* Button group */}
<div className={styles.buttonGroup}>
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</div>

{/* Badge row */}
<div className={styles.badgeRow}>
  <Badge variant="success">Active</Badge>
  <Badge variant="info">v2.1</Badge>
  <Badge variant="neutral">Draft</Badge>
</div>

{/* Inline: Avatar + name */}
<div className={styles.inlineGroup}>
  <Avatar src={user.avatar} size="sm" />
  <span>{user.name}</span>
</div>
```

---

### Dot Pattern Background

Used for playground and preview areas to visually distinguish interactive zones.

```css
.playground {
  background-color: var(--ds-color-bg-page);
  background-image: radial-gradient(
    circle,
    var(--ds-color-dot-pattern) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  border: 1px solid var(--ds-color-border-default);
  border-radius: var(--ds-radius-lg);
  padding: var(--ds-spacing-inset-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Do

- Use the dot pattern only for interactive preview/playground areas.
- Always use the `--ds-color-dot-pattern` token so the pattern adapts to theme.

### Don't

- Don't use hardcoded dot colors. They will break in light mode.
- Don't apply dot patterns to content containers or cards.

---

### Theme Considerations

All layout tokens respond to `[data-theme="light"]` overrides in `tokens.css`. No additional work is needed if you follow these rules:

| Element | Token class |
|---------|-------------|
| Backgrounds | `--ds-color-bg-*` |
| Borders | `--ds-color-border-*` |
| Text | `--ds-color-fg-*` |
| Shadows | `--ds-shadow-*` |

### Do

- Use token variables for every color, border, and shadow.
- Test layouts in both dark and light themes.

### Don't

- Don't hardcode `rgba()`, `#hex`, or `hsl()` values anywhere in layout CSS.
- Don't use `background: transparent` when you mean `background: var(--ds-color-bg-page)` -- transparent inherits from the parent, which may not be what you want.

---

### Spacing Reference

| Context | Token | Typical value |
|---------|-------|---------------|
| Inside components (gaps) | `--ds-spacing-component-{xs\|sm\|md\|lg\|xl}` | 4-32px |
| Padding (inset) | `--ds-spacing-inset-{sm\|md\|lg\|xl\|2xl}` | 8-48px |
| Between page sections | `--ds-spacing-layout-{xs\|sm\|md\|lg\|xl\|2xl}` | 16-96px |

Use component tokens within components, inset tokens for container padding, and layout tokens for spacing between major page regions.

## Best Practices

### Do

- Use CSS Grid for page shells and equal-width column layouts.
- Use flexbox for inline groups (button rows, badge groups, avatar + name).
- Follow surface hierarchy strictly: page > surface > subtle > overlay.
- Constrain content with containers (`960px` for text, `1200px` for dashboards).
- Use `gap` (not margin) for all grid and flex spacing.
- Apply `overflow-y: auto` to the main content area, not the entire page.
- Use token variables for every color, border, shadow, and spacing value.
- Test all layouts in both Dark and Light themes.

### Don't

- Don't nest `surface` inside `surface` -- use `subtle` inside `surface` instead.
- Don't use `overlay` backgrounds for static content areas.
- Don't hardcode any `rgba()`, `#hex`, or `hsl()` values in layout CSS.
- Don't use absolute positioning for sidebars -- CSS Grid handles this cleanly.
- Don't set `max-width` on the main area at the layout level -- let content containers handle it.
- Don't use `background: transparent` when you mean `var(--ds-color-bg-page)`.
- Don't mix spacing token scales within a single context.

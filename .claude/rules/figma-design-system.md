# Design System Rules — Figma MCP Integration

> Formalized rules for AI tools working with this design system via the Figma MCP server.
> Source of truth: `DESIGN-SYSTEM-STANDARDS.md` and `CLAUDE.md` at project root.

---

## Component Organization

- All components live in `ds/src/components/{Name}/`
- File structure per component:
  ```
  {Name}/
  ├── {Name}.tsx           # React component (forwardRef pattern)
  ├── {Name}.module.css    # CSS Modules styles (token variables only)
  ├── index.ts             # Public export (component + types)
  └── {Name}.figma.js      # Code Connect template (Figma mapping)
  ```
- Stories in `ds/src/stories/{Name}.stories.tsx`
- Doc pages in `ds/src/docs/pages/{Name}Page.tsx`
- Exports: named export of component + type export of props interface

---

## Styling Approach

IMPORTANT: CSS Modules exclusively — zero inline styles, zero Tailwind, zero CSS-in-JS.

- All values via 3-tier token variables:
  - `--c-*` (component tier) → consumed in `.module.css` files
  - `--ds-*` (semantic tier) → consumed by component tokens and shared styles
  - `--p-*` (primitive tier) → raw values, never consumed directly by components
- Token definitions in single file: `ds/src/styles/tokens.css`
- Light mode overrides in `[data-theme="light"]` block within `tokens.css`
- Never create additional token files

---

## Figma MCP Integration Flow

IMPORTANT: Always follow this sequence when implementing from Figma:

1. **Get design context** — Call `get_design_context` with `fileKey` and `nodeId` to fetch design specs
2. **Capture screenshot** — Call `get_screenshot` to capture visual reference
3. **Download assets** — Download any required assets (icons, images); use localhost sources if provided by Figma MCP server
4. **Translate to project conventions** — Figma output defaults to React + Tailwind; translate to CSS Modules with token variables
5. **Validate visual parity** — Compare implementation against screenshot for 1:1 fidelity
6. **Verify both themes** — Render in Dark AND Light mode; confirm WCAG AA contrast in both

IMPORTANT: Never skip the translation step (#4). Raw Figma-generated code uses Tailwind classes and hardcoded values — these MUST be replaced with CSS Modules and `var(--token)` references.

---

## Design Token Usage

IMPORTANT: Never hardcode colors, spacing, or sizing values in any component or style file.

| Category | Token Pattern | Example |
|----------|--------------|---------|
| **Colors** | `var(--c-{component}-{property}-{state})` | `var(--c-btn-bg-primary)` |
| **Spacing (gaps)** | `var(--ds-spacing-component-{size})` | `var(--ds-spacing-component-md)` |
| **Spacing (padding)** | `var(--ds-spacing-inset-{size})` | `var(--ds-spacing-inset-lg)` |
| **Spacing (sections)** | `var(--ds-spacing-layout-{size})` | `var(--ds-spacing-layout-xl)` |
| **Icon sizing** | `var(--ds-sizing-icon-{size})` | `var(--ds-sizing-icon-md)` |
| **Component heights** | `var(--c-{component}-height-{size})` | `var(--c-btn-height-md)` |
| **Border radius** | `var(--ds-radius-{size})` or `var(--c-{component}-radius-{size})` | `var(--ds-radius-md)` |
| **Typography** | `var(--ds-font-size-{style})`, `var(--p-font-weight-{weight})` | `var(--ds-font-size-body-default)` |
| **Shadows** | `var(--ds-shadow-{level})` | `var(--ds-shadow-3)` |
| **Motion** | `var(--ds-duration-{speed})`, `var(--ds-easing-{type})` | `var(--ds-duration-fast)` |

Token chain rule: Component (`--c-*`) → Semantic (`--ds-*`) → Primitive (`--p-*`). No tier may be skipped.

---

## Component Architecture

IMPORTANT: Props must exactly mirror Figma variant properties (same names, same options).

- All boolean props default to `false`
- `React.forwardRef` pattern on every component
- `displayName` set on every component
- Size variants: `sm` (32px), `md` (40px), `lg` (48px)
- All dimensions on a 2px grid (even numbers only)
- All components must work in both Dark and Light themes
- Never add features beyond what Figma specifies

### Variant Mapping (Figma → Code)

| Figma Property | Figma Values (Title Case) | Code Values (lowercase) |
|---------------|--------------------------|------------------------|
| Size | SM, MD, LG | `'sm'`, `'md'`, `'lg'` |
| Type/Variant | Primary, Secondary, etc. | `'primary'`, `'secondary'`, etc. |
| State | Default, Hover, Focused, etc. | Handled via CSS pseudo-classes + props |

---

## Asset Handling

- **Icons**: Stroke-based (outlined paths), NOT fill-based
  - Always set `fill="none"` on parent `<svg>`
  - Color via `stroke="currentColor"` and CSS `color` property
  - Standard: `viewBox="0 0 24 24"`, `strokeWidth={1.5}`, `strokeLinecap="round"`, `strokeLinejoin="round"`
- **Icon library**: Lucide React (already installed)
- **Fonts**: IBM Plex Sans (UI text) + IBM Plex Mono (code/labels), loaded via `global.css`
- **Images**: Use `<img>` with `alt` text; no external CDN dependencies

---

## Accessibility (WCAG 2.1 AA)

IMPORTANT: Every component must meet these requirements in BOTH themes:

| Requirement | Standard | Our Implementation |
|-------------|----------|-------------------|
| Text contrast | ≥ 4.5:1 | Semantic color tokens adapt per theme |
| UI element contrast | ≥ 3.0:1 | Border and action tokens theme-aware |
| Touch targets | ≥ 24px min | SM=32px, MD=40px, LG=48px |
| Focus indicators | Visible on Tab | `--ds-color-focus-ring` token, adapts per theme |
| ARIA attributes | On all interactive elements | `aria-busy`, `aria-invalid`, `role="alert"`, etc. |
| Keyboard navigation | Full support | Semantic HTML + `forwardRef` for focus management |
| Screen readers | Decorative elements hidden | `aria-hidden="true"` on icons, spinners |

---

## Theme System

- **Dark mode** is the default (`:root` block in `tokens.css`)
- **Light mode** via `[data-theme="light"]` CSS overrides in `tokens.css`
- `ThemeProvider` wraps the app; `ThemeToggle` in layout topbar
- `data-theme` attribute set on `<html>` element
- `prefers-color-scheme` media query respected as default; `localStorage` persists user choice

IMPORTANT: Primitive tokens (`--p-*`) do NOT adapt per theme — only semantic tokens (`--ds-*`) do. Never use primitive tokens directly for text or UI elements that must work in both themes.

### Theme-Critical Colors

| Color | Dark Mode | Light Mode | Notes |
|-------|-----------|------------|-------|
| Warm-yellow text | `#F6D56D` | Use `--ds-color-status-warning-fg` | Raw yellow invisible on light bg |
| Emerald-green text | `#4DD98C` | Use `--ds-color-status-success-fg` | Raw green fails contrast on light |
| Steel-blue text | `#4DCCFF` | Use `--ds-color-status-info-fg` | Raw blue fails contrast on light |

---

## Project-Specific Conventions

| Aspect | Convention |
|--------|-----------|
| Framework | React 18 + TypeScript 5 + Vite |
| Routing | react-router-dom |
| Testing | Vitest + Storybook 10.3 + Playwright |
| Storybook stories | 5 required per component: Default, AllVariants, AllSizes, AllStates, Interactive |
| Doc portal | 13-section pages using shared `<DocHero>`, `<DocOverview>`, etc. components |
| Playground | Always Storybook iframe — never custom React state |
| Code Connect | Parserless `.figma.js` templates alongside components |

---

## Code Connect (Parserless Templates)

IMPORTANT: Code Connect maps Figma components → React source so Dev Mode shows ready-to-paste snippets with the selected variant values injected. All templates use the **parserless `.figma.js` format**, co-located with the component source.

### File Format

`ds/src/components/{Name}/{Name}.figma.js`:

```js
// url=<Figma frame URL with node-id>
// source=ds/src/components/{Name}/{Name}.tsx
// component={ComponentName}
const figma = require('figma')
const instance = figma.selectedInstance

const size = instance.getEnum('Size', { SM: 'sm', MD: 'md', LG: 'lg' })
const state = instance.getEnum('State', {
  Default: '',
  Disabled: 'disabled',
  Error: 'error',
})

export default {
  example: figma.tsx`<Component
  size="${size}"${state === 'disabled' ? `\n  disabled` : ''}${state === 'error' ? `\n  error="Error message"` : ''}
/>`,
  imports: ['import { Component } from "@ds/components/Component"'],
  id: 'component',
  metadata: { nestable: true },
}
```

### Do's

IMPORTANT: Always verify actual Figma variant property names BEFORE writing or editing a template.

- **Fetch real property names first** — call `mcp__figma-console__figma_get_component_details` with the component name; the `variantAxes` array is the authoritative source
- **Mirror Figma's exact casing** — if Figma says `Type`, use `getEnum('Type', ...)` — NOT `Variant`
- **Mirror Figma's exact value labels** — if Figma uses `Small/Medium/Large` for size values, map those, NOT `SM/MD/LG`
- **Treat `State` as an enum, not booleans** — states like `Checked`, `Disabled`, `Selected`, `Active`, `Error`, `ReadOnly` are usually **variant values**, not separate boolean properties. Use `getEnum('State', ...)` and derive boolean JSX props via template conditionals.
- **Always republish after edits** — from the `ds/` folder run `npx figma connect publish --token <FIGMA_PAT>`
- **Verify in Dev Mode** — open the component in Figma Dev Mode and confirm variant values resolve to real strings (not empty `""`)
- **Keep templates minimal** — render only what exists in Figma; stub children text inline (e.g., `"Button"`, `"Tooltip content"`)

### Don'ts

- **Never assume property names** — `Variant`, `SM/MD/LG`, `Placement` may actually be `Type`, `Small/Medium/Large`, `Position` in Figma. Always verify.
- **Never use `instance.findInstance('Icon')`** — causes `sectionsToAdd is not iterable` errors during publish. Omit icons from templates or use instance swap instead.
- **Never add `getString`/`getBoolean` calls for properties that don't exist in Figma** — they silently return empty values and produce broken output like `variant=""`. Use literal strings in the template instead.
- **Never include extra booleans that don't exist as variant axes** (e.g., `ShowIcon`, `ShowDot`) unless they are genuine component-level boolean properties in Figma.
- **Never skip republish** — local edits to `.figma.js` don't update Dev Mode until `figma connect publish` runs successfully.

### Actual Figma Variant Axes (this design system)

| Component | Variant axes | Notes |
|-----------|-------------|-------|
| Button | `Type` (Primary/Secondary/Tertiary/Destructive/Ghost) + `Size` (**Small/Medium/Large**) + `State` | Size values spelled out, not abbreviations |
| Badge | `Size` (SM/MD/LG) + `Type` (Neutral/Info/Success/Warning/Error/Brand) + `Shape` (Pill/Rect) | `Type` not `Variant` |
| Input (TextInput) | `Size` + `State` (Default/Hover/Focused/Typing/Filled/Error/Disabled/ReadOnly) | |
| Textarea (TextArea) | Same axes as Input | |
| Dropdown | `Size` + `State` (…Open/Selected/Error/ReadOnly) | |
| Checkbox | `Size` + `State` (…Checked/Indeterminate/Error) | Checked is a State, NOT a boolean |
| Radio | `Size` + `State` (…Selected/Error) | Selected is a State, NOT a boolean |
| Toggle | `Size` + `State` (…Active/Error) | Active (= "on") is a State, NOT a boolean |
| Avatar | `Size` (XS/SM/MD/LG/**XL** — no 2XL) + `Type` (Image/Initials/Icon) | No `Color` axis |
| Toast | `Type` only (Success/Error/Warning/Info/Neutral) | `Type` not `Variant` |
| Tooltip | `Position` (Top/Bottom/Left/Right) + `Style` (Dark/Light) + `Type` (Simple/Descriptive) | `Position` not `Placement`; `Style` not `Theme` |
| Tabs (TabItem) | `Size` + `State` + `Direction` (Horizontal/Vertical) | |

### Debugging Workflow

| Symptom | Cause | Fix |
|---------|-------|-----|
| `sectionsToAdd is not iterable` at publish time | `findInstance()` call on icon/child | Remove all `findInstance` calls |
| Empty values in Dev Mode (`variant=""`, `size=""`) | Property name mismatch | Run `figma_get_component_details`, rename enum key |
| State prop not applied in snippet | Treating state as boolean | Switch to `getEnum('State', ...)` + conditional template string |
| Dev Mode still shows old snippet | Didn't republish | `npx figma connect publish --token <PAT>` from `ds/` |

### Authentication

- Figma Personal Access Token must have **Code Connect: Write** scope
- Token passed via `--token <PAT>` flag or `FIGMA_ACCESS_TOKEN` env var
- Never commit the token — pass it inline per publish session

---

## File Locations Quick Reference

```
ds/src/styles/tokens.css           ← Single source of truth for all CSS tokens
ds/src/components/{Name}/          ← Component implementations
ds/src/stories/{Name}.stories.tsx  ← Storybook stories
ds/src/docs/pages/{Name}Page.tsx   ← Doc portal pages
ds/guidelines/                     ← Figma Skills design system guidelines
ds/figma.config.json               ← Code Connect configuration
.claude/skills/                    ← Official Figma MCP skills
.claude/rules/                     ← This file (project rules for MCP tools)
CLAUDE.md                          ← AI automation lifecycle rules
DESIGN-SYSTEM-STANDARDS.md         ← Comprehensive design standards
```

# Claude MCP Design System

> A comprehensive, enterprise-grade design system built with a dark-theme-first philosophy, strict accessibility compliance, and a three-tier token architecture — designed for consistency at scale.
>
> **Author:** Shabir Ahmad Gilkar
> **Repository:** [github.com/shabirgilkar/claude-design-system](https://github.com/shabirgilkar/claude-design-system)

---

## Table of Contents

- [Philosophy](#philosophy)
- [Architecture](#architecture)
- [Token System](#token-system)
- [Component Library](#component-library)
- [Accessibility](#accessibility)
- [Theming](#theming)
- [Tech Stack](#tech-stack)
- [Best Practices](#best-practices)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Design System Portal](#design-system-portal)
- [Storybook](#storybook)
- [Contributing](#contributing)
- [Changelog](#changelog)

---

## Philosophy

This design system was built with five core principles:

### 1. Dark-First, Light-Ready
The system is designed dark-first — deep purple backgrounds, light text, rich contrast. But every component and token simultaneously supports a full light mode. We don't maintain two separate systems; we maintain one system with two expressions, switchable at runtime via a single `data-theme` attribute.

### 2. Token-Driven, Not Value-Driven
No component ever references a raw color, spacing value, or font size directly. Every visual property flows through a three-tier token chain: **Primitives** (raw values) → **Semantic** (purpose-mapped) → **Components** (scoped per component). This makes global changes trivial and theme switching automatic.

### 3. Accessibility Is Not Optional
Every component meets WCAG 2.1 AA standards in both themes. This means 4.5:1 contrast ratios for text, 3:1 for UI elements, keyboard navigation on every interactive element, ARIA attributes for screen readers, and touch targets that meet minimum size requirements. Accessibility was built in from day one, not retrofitted.

### 4. Figma and Code Are Equal Citizens
The design system lives equally in Figma and in code. Figma components have the same variants, states, and properties as their React counterparts. Code Connect files map every Figma component to its React implementation. Changes cascade: Figma → Code → Storybook → Documentation.

### 5. Precision Over Convenience
Every dimension sits on a 2px grid. Every token follows the naming convention. Every component uses CSS Modules — no inline styles, no utility classes, no shortcuts. This precision ensures that the system scales cleanly as the team and product grow.

---

## Architecture

### The Three-Tier Token System

```
┌─────────────────────────────────────────────────────────┐
│                    COMPONENTS (821 tokens)                │
│         Scoped per component, consumed in CSS Modules     │
│         --c-btn-bg-primary, --c-input-border-error        │
│                          ↓ aliases                        │
├─────────────────────────────────────────────────────────┤
│                    SEMANTIC (236 tokens)                   │
│         Purpose-mapped, theme-aware (Dark + Light)        │
│         --ds-color-action-primary-bg-default              │
│                          ↓ aliases                        │
├─────────────────────────────────────────────────────────┤
│                   PRIMITIVES (307 tokens)                  │
│         Raw values only, hidden from design pickers       │
│         --p-color-deep-purple-base: #3A1F5D               │
└─────────────────────────────────────────────────────────┘
```

**Why three tiers?**

- **Primitives** are the raw palette — they never change based on theme or context. They're hidden from Figma's property pickers so designers always work with purposeful tokens.
- **Semantic tokens** assign meaning. `color/background/page` resolves to deep-purple-1000 in dark mode and deep-purple-50 in light mode. Change the semantic mapping, and every component updates automatically.
- **Component tokens** scope values to individual components. `button/color/primary/default/background` aliases a semantic token but can be overridden per-component without breaking the rest of the system.

### Token Flow Example

```
Button background:
  --p-color-deep-purple-base: #3A1F5D          (Primitive: raw hex)
       ↓
  --ds-color-action-primary-bg-default          (Semantic: "primary action background")
       ↓
  --c-btn-bg-primary                            (Component: "button primary bg")
       ↓
  .primary { background: var(--c-btn-bg-primary) }   (CSS Module consumption)
```

---

## Token System

### By the Numbers

| Metric | Count |
|--------|-------|
| Total Figma variables | 1,364 |
| CSS custom properties | 621 |
| Variable collections | 3 (Primitives, Semantic, Components) |
| Theme modes | 2 (Dark, Light) |
| Color palettes | 7 + neutrals |
| Component token sets | 12 |

### Color Palettes

| Palette | Role | Usage |
|---------|------|-------|
| **Deep Purple** | Brand | Primary actions, backgrounds, accents |
| **Crimson Pink** | Error/Danger | Error states, destructive actions, validation |
| **Coral Red** | Secondary Accent | Emphasis, secondary highlights |
| **Warm Yellow** | Warning | Caution states, attention indicators |
| **Medium Gray** | Neutral | Disabled states, muted text, borders |
| **Emerald Green** | Success | Confirmation, completion, positive states |
| **Steel Blue** | Information | Informational states, links, focused elements |

Each palette provides 10 stops (100–1000) plus a base value, giving designers precise control over lightness and saturation.

### Spacing System

All dimensions align to a **2px grid** — heights, padding, gaps, margins, and border-radius values are always even numbers.

Three spacing categories serve different purposes:

| Category | Token Pattern | Purpose |
|----------|--------------|---------|
| **Component** | `--ds-spacing-component-{xs..3xl}` | Gaps within components (icon-to-label, field-to-hint) |
| **Inset** | `--ds-spacing-inset-{xs..2xl}` | Padding inside containers (cards, sections, modals) |
| **Layout** | `--ds-spacing-layout-{xs..2xl}` | Margins between major sections and page regions |

### Typography

Two typeface families serve distinct purposes:

| Family | Weights | Usage |
|--------|---------|-------|
| **IBM Plex Sans** | Regular, Medium, SemiBold, Bold | All UI text — labels, body copy, headings, buttons |
| **IBM Plex Mono** | Regular, Medium | Code blocks, token names, technical annotations |

The type scale spans 19 styles from Display Large (52px Bold) down to Caption (12px Medium), each with matching line-height and letter-spacing tokens.

---

## Component Library

12 production-ready components, each with full variant coverage, accessibility built in, and both theme support:

| Component | Variants | Sizes | States | Props | Figma Tokens |
|-----------|----------|-------|--------|-------|-------------|
| **Button** | Primary, Secondary, Tertiary, Destructive, Ghost | SM/MD/LG | Default, Hover, Focus, Loading, Disabled | 11 | 108 |
| **Input** | Text field with label, hint, char count | SM/MD/LG | Default, Hover, Focused, Typing, Filled, Error, Disabled, ReadOnly | 12 | 87 |
| **Dropdown** | Select menu with option list | SM/MD/LG | Default, Hover, Focused, Open, Selected, Error, Disabled, ReadOnly | 10 | 96 |
| **Textarea** | Multi-line text field with resize handle | SM/MD/LG | Default, Hover, Focused, Typing, Filled, Error, Disabled, ReadOnly | 11 | 78 |
| **Checkbox** | Box with optional label and description | SM/MD/LG | Default, Hover, Focused, Checked, Indeterminate, Error, Disabled | 8 | 50 |
| **Radio** | Circle with mutual exclusion (RadioGroup) | SM/MD/LG | Default, Hover, Focused, Selected, Error, Disabled | 7 | 45 |
| **Toggle** | Switch with track and thumb | SM/MD/LG | Default, Hover, Focused, Checked, Disabled | 7 | 44 |
| **Badge** | Status indicator with pill/rounded shapes | SM/MD/LG | Success, Warning, Error, Info, Neutral, Brand | 7 | 45 |
| **Avatar** | User display (initials, icon, image) | XS–2XL | Initials, Icon, Image types | 5 | 29 |
| **Toast** | Notification banner with auto-close | — | Success, Warning, Error, Info, Neutral | 7 | 44 |
| **Tooltip** | Hover hint with arrow (Simple, Descriptive) | — | 4 placements x 2 types | 6 | 22 |
| **Tabs** | Tabbed navigation (horizontal/vertical) | SM/MD/LG | Default, Hover, Active, Focused, Disabled | 9 | 49 |

### Shared Sub-Components

- **ThemeProvider** — React context for theme state management
- **ThemeToggle** — Dark/Light mode switcher with system preference detection
- **InputLabel** — Shared label component used across all form fields
- **HintText** — Shared hint/error message component with icon variants

### Component Architecture Patterns

Every component follows these patterns:

```typescript
// React.forwardRef for focus management
export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ prop1, prop2 = 'default', ...props }, ref) => {
    // CSS class composition from module
    const classes = [styles.base, styles[variant], styles[size]]
      .filter(Boolean).join(' ');

    return <element ref={ref} className={classes} {...props} />;
  }
);
Component.displayName = 'Component';
```

```css
/* CSS Modules — every value is a token variable */
.base {
  background: var(--c-component-bg);
  color: var(--c-component-fg);
  border: var(--c-component-border-width) solid var(--c-component-border);
  border-radius: var(--c-component-radius);
  padding: 0 var(--c-component-padding-x);
  height: var(--c-component-height);
  font-size: var(--c-component-font-size);
  transition: all var(--ds-duration-fast) var(--ds-easing-standard);
}
```

---

## Accessibility

### Standards Met

| Standard | Requirement | Implementation |
|----------|------------|----------------|
| **WCAG 2.1 AA** | Text contrast ≥ 4.5:1 | All text tokens verified in both themes |
| **WCAG 2.1 AA** | UI contrast ≥ 3.0:1 | Borders, icons, and controls verified |
| **WCAG 2.5.8** | Touch targets ≥ 24px | SM=32px, MD=40px, LG=48px |
| **ARIA** | Roles and attributes | `role="alert"`, `aria-busy`, `aria-invalid`, `aria-describedby`, etc. |
| **Keyboard** | Full navigation | Semantic HTML, `forwardRef`, visible focus rings |
| **Screen Reader** | Decorative elements hidden | `aria-hidden="true"` on icons, spinners, accents |
| **Motion** | Reduced motion support | `prefers-reduced-motion` respected via `--ds-duration-reduced: 0` |

### Dual-Theme Accessibility

Some colors that pass contrast in dark mode fail in light mode. The system handles this at the semantic token level:

| Color | Dark Mode | Light Mode | Strategy |
|-------|-----------|------------|----------|
| Warm Yellow | #F6D56D (11.2:1 on dark) | Fails on light bg | Semantic token resolves to dark amber in light mode |
| Emerald Green | #4DD98C (8.7:1 on dark) | Fails on light bg | Semantic token resolves to #0A8A42 in light mode |
| Steel Blue | #4DCCFF (9.6:1 on dark) | Fails on light bg | Semantic token resolves to #1A7FA3 in light mode |

Designers never need to think about this — the semantic tokens handle it automatically via mode-specific aliases.

### ARIA Patterns by Component

| Component | Key ARIA | Keyboard |
|-----------|----------|----------|
| Button | `aria-busy` (loading), `aria-disabled` | Enter/Space to activate |
| Input | `aria-invalid`, `aria-describedby` (hint/error) | Standard text input |
| Dropdown | `role="listbox"`, `aria-expanded` | Arrow keys, Enter, Escape |
| Toast | `role="alert"`, `aria-live="polite"` | Dismiss via close button |
| Checkbox | Native `<input type="checkbox">`, `indeterminate` | Space to toggle |
| Radio | `role="radiogroup"`, native radio inputs | Arrow keys within group |
| Toggle | `role="switch"`, `aria-checked` | Space to toggle |
| Tooltip | `role="tooltip"` on content | Appears on focus + hover |
| Tabs | `role="tablist"`, `role="tab"`, `aria-selected` | Arrow keys, Home/End |

---

## Theming

### How It Works

```
┌──────────────────────────────────────┐
│  :root { }                            │  ← Dark mode (default)
│    --ds-color-bg-page: #0E071C       │     All semantic tokens defined here
│    --ds-color-fg-default: #FFFFFF    │
├──────────────────────────────────────┤
│  [data-theme="light"] { }             │  ← Light mode overrides
│    --ds-color-bg-page: #F8F7FC       │     Only semantic tokens that change
│    --ds-color-fg-default: #0E071C    │
└──────────────────────────────────────┘
```

- **ThemeProvider** wraps the app and manages theme state
- **ThemeToggle** lets users switch between Dark/Light
- `prefers-color-scheme` is respected as the initial default
- User preference persists in `localStorage`
- Storybook has a global theme toolbar for testing both modes

### In Figma

The Semantic variable collection has two modes: **Dark** (default) and **Light**. Showcase frames are mode-switchable — a single frame with all structural elements bound to semantic variables. Switch the collection mode and every text, background, and border adapts automatically.

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| UI Framework | React | 18.3 | Component rendering |
| Language | TypeScript | 5.5 | Type safety, prop interfaces |
| Build Tool | Vite | 5.4 | Fast dev server, production builds |
| Styling | CSS Modules | — | Scoped styles, zero runtime overhead |
| Component Stories | Storybook | 10.3 | Interactive component playground |
| Icon Library | Lucide React | 0.441 | Stroke-based icons (outline style) |
| Routing | react-router-dom | 6.26 | Doc portal navigation |
| Testing | Vitest + Playwright | 4.1 | Unit + visual regression tests |
| Visual Regression | Chromatic | — | Storybook screenshot diffing |
| Design Tool | Figma | — | Source of truth for visual design |
| Design-Code Bridge | Figma MCP + Code Connect | — | Bidirectional sync |

### Why These Choices

- **CSS Modules over Tailwind**: Token-driven systems need explicit variable references (`var(--c-btn-bg-primary)`), not utility classes. CSS Modules give us scoped styles with zero runtime cost and full token control.
- **IBM Plex over system fonts**: IBM Plex provides consistent rendering across platforms, excellent readability at small sizes, and a professional but approachable character that matches the enterprise context.
- **Stroke-based icons over filled**: Outlined icons feel lighter and more refined in dark UIs. They color via `stroke="currentColor"`, inheriting text color naturally. Fill-based icons create heavy visual weight that doesn't match the system's aesthetic.
- **Storybook over custom playground**: Storybook gives us auto-generated controls, addon ecosystem (a11y, designs, chromatic), and a standard developer experience. The doc portal embeds Storybook as iframes rather than reimplementing interactivity.

---

## Best Practices Followed

This design system was audited against the **Official Figma MCP Skills** (7 skills, 45 reference files) and achieved full compliance:

### Token Architecture
- 100% alias compliance — zero raw values in Semantic or Component tiers
- All 1,364 Figma variables have explicit scopes (not `ALL_SCOPES`)
- All variables have WEB code syntax set (`var(--prefix-name)`)
- Primitives hidden from design pickers (scope = `[]`)
- Semantic colors scoped by purpose (FRAME_FILL, TEXT_FILL, STROKE_COLOR, etc.)

### Component Quality
- Props exactly mirror Figma variant properties
- Zero hardcoded color values across all component CSS files
- Zero inline styles in production components
- All boolean props default to `false`
- `React.forwardRef` on every component for focus management
- `displayName` set on every component for dev tools

### Design-Code Sync
- Code Connect (`.figma.js`) files for all 12 components
- Figma design links in all 12 Storybook story files
- 23 custom Figma Skills guideline files (foundations, components, composition)
- Design system rules formalized in `.claude/rules/figma-design-system.md`

### Naming Consistency
- Figma audit: 100/100 Naming & Semantics score
- Figma audit: 100/100 Consistency score
- Slash-hierarchy variable naming (`color/background/page`)
- CSS variable prefixes by tier (`--p-*`, `--ds-*`, `--c-*`)

---

## Project Structure

```
├── README.md                             ← You are here
├── CLAUDE.md                             ← AI automation lifecycle rules
├── DESIGN-SYSTEM-STANDARDS.md            ← Comprehensive design standards
├── .claude/
│   ├── rules/
│   │   └── figma-design-system.md        ← MCP integration rules
│   └── skills/                           ← Official Figma MCP skills (7 skills, 45 files)
└── ds/
    ├── figma.config.json                 ← Code Connect configuration
    ├── package.json                      ← Dependencies and scripts
    ├── src/
    │   ├── components/                   ← 14 React components
    │   │   ├── Button/
    │   │   │   ├── Button.tsx            ← Component implementation
    │   │   │   ├── Button.module.css     ← Scoped styles (token variables only)
    │   │   │   ├── Button.figma.js       ← Code Connect template
    │   │   │   └── index.ts             ← Public export
    │   │   ├── Input/
    │   │   ├── Dropdown/
    │   │   ├── Textarea/
    │   │   ├── Checkbox/
    │   │   ├── Radio/
    │   │   ├── Toggle/
    │   │   ├── Badge/
    │   │   ├── Avatar/
    │   │   ├── Toast/
    │   │   ├── Tooltip/
    │   │   ├── Tabs/
    │   │   ├── ThemeProvider/            ← Theme context + provider
    │   │   └── ThemeToggle/              ← Dark/Light mode switcher
    │   ├── docs/
    │   │   ├── layout/                   ← Portal shell (sidebar, topbar)
    │   │   ├── components/               ← Shared doc page section components
    │   │   └── pages/                    ← 12 component pages + foundation pages
    │   ├── stories/                      ← 12 Storybook story files
    │   └── styles/
    │       ├── tokens.css                ← All 621 CSS custom properties
    │       ├── reset.css                 ← CSS reset
    │       └── global.css                ← Font imports, base styles
    ├── guidelines/                       ← 23 Figma Skills guideline files
    │   ├── Guidelines.md                 ← Entry point and reading order
    │   ├── setup.md                      ← Technical configuration
    │   ├── foundations/                   ← Token architecture, color, typography, spacing, icons, theming
    │   ├── components/                   ← Per-component usage guides
    │   └── composition/                  ← Form, layout, and notification patterns
    ├── dist/                             ← Production build output (portal)
    └── storybook-static/                 ← Production build output (Storybook)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/shabirgilkar/claude-design-system.git
cd ds

# Install dependencies
npm install
```

### Development

```bash
# Start the documentation portal
npm run dev
# → http://localhost:5173

# Start Storybook
npm run storybook
# → http://localhost:6006
```

### Using Components in Your Project

```bash
# Install the component library
npm install @shabir/claude-design-system
```

```typescript
// Import components
import { Button, Input, Badge } from '@shabir/claude-design-system';
import '@shabir/claude-design-system/tokens.css';

// Use them
function MyForm() {
  return (
    <form>
      <Input label="Email" placeholder="you@example.com" required />
      <Input label="Password" type="password" required />
      <Button variant="primary" size="md">Sign In</Button>
    </form>
  );
}
```

### Theme Setup

Wrap your app with the ThemeProvider:

```typescript
import { ThemeProvider, ThemeToggle } from '@shabir/claude-design-system';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

---

## Design System Portal

The documentation portal provides interactive documentation for every component:

**URL:** [https://shabirgilkar.github.io/claude-design-system/](https://shabirgilkar.github.io/claude-design-system/)

Each component page includes 13 sections:
1. **Hero** — Component name, description, status badge, stats
2. **Overview** — When to use / when not to use
3. **Playground** — Interactive Storybook iframe with controls
4. **Anatomy** — Exploded view with numbered callouts
5. **Variants** — All visual variants side by side
6. **States** — Every interactive state demonstrated
7. **Guidelines** — Do/Don't usage guidance
8. **Accessibility** — ARIA roles, keyboard nav, contrast, screen readers
9. **Props** — Complete prop table (single source of truth)
10. **Tokens** — Design tokens consumed by the component
11. **Specs** — Exact measurements per size variant
12. **Related** — Links to similar/alternative components
13. **Changelog** — Version history

---

## Storybook

Interactive component playground with full controls:

**URL:** [https://shabirgilkar.github.io/claude-design-system/storybook/](https://shabirgilkar.github.io/claude-design-system/storybook/)

Every component has 5 required stories:
- **Default** — Single instance with default props
- **AllVariants** — Every type/variant side by side
- **AllSizes** — SM, MD, LG comparison
- **AllStates** — Every interactive state
- **Interactive** — Full controls panel (used in doc portal iframes)

Features:
- Theme toolbar (Dark/Light switching)
- Accessibility addon (a11y checks)
- Figma design links (links to source Figma frames)
- Auto-generated controls from TypeScript prop types

---

## Contributing

### Adding a New Component

Follow the 4-stage lifecycle defined in `CLAUDE.md`:

1. **Figma** — Design with all variants, states, tokens, Code Connect
2. **Code** — React + CSS Modules, consuming existing token variables
3. **Storybook** — 5 required stories covering all variants/states
4. **Doc Portal** — Full 13-section documentation page

### Rules

- Read `DESIGN-SYSTEM-STANDARDS.md` before making design decisions
- Read the relevant `guidelines/` files before implementing
- Props must mirror Figma variant properties exactly
- All styles via CSS Modules with token variables — no exceptions
- Both themes must pass WCAG AA contrast requirements
- Update the completion log in `DESIGN-SYSTEM-STANDARDS.md` after finishing all 4 stages

### Code Style

- TypeScript strict mode
- `React.forwardRef` on all components
- All boolean props default to `false`
- CSS class composition via array filter pattern
- Zero inline styles in production components

---

## Changelog

### v1.0.0 — Initial Release

**Components (12):**
Button, Input, Dropdown, Textarea, Checkbox, Radio, Toggle, Badge, Avatar, Toast, Tooltip, Tabs

**Tokens:**
- 1,364 Figma variables across 3 collections
- 621 CSS custom properties
- Full Dark + Light theme support

**Infrastructure:**
- Documentation portal with 13-section component pages
- Storybook with theme switching and a11y testing
- Code Connect templates for all 12 components
- 23 Figma Skills guideline files
- Figma MCP integration with scoped variables and code syntax

**Accessibility:**
- WCAG 2.1 AA compliance in both themes
- Full keyboard navigation
- ARIA attributes on all interactive components
- Touch targets meet minimum size requirements
- Reduced motion support

---

*Built with precision, tested in both themes, documented for humans and machines alike.*

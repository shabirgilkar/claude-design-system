---
name: ds-guidelines-overview
description: "Entry point for the design system. Use when starting work on any design system task, to understand structure, critical rules, and reading order."
disable-model-invocation: false
---

# Design System Guidelines

> Entry point for AI-assisted design and development with this design system.
> These guidelines teach tools how to correctly use components, tokens, and patterns.

## Skill Boundaries

- **Use this skill** when starting any design system task, to understand the overall structure, critical rules, and which guide to read next.
- **Use a foundation skill instead** (ds-token-architecture, ds-color-system, ds-typography, ds-spacing-sizing, ds-icons, ds-modes-theming) when you need detailed reference on a specific foundation topic.
- **Use ds-setup instead** when you need technical configuration, dependency, or file-location details.

## Prerequisites

- No prerequisites -- this is the starting point for all design system work.

## Required Workflow

1. Read this file to understand the product character and critical rules.
2. Follow the **Reading Order** below to build foundational knowledge.
3. Reference individual component or composition guides as needed for specific tasks.

## Reference

### Product Character

This is an enterprise-grade product design system built with a **dark-theme-first** philosophy and full light mode support. It uses IBM Plex Sans and IBM Plex Mono typefaces, a three-tier token architecture, and strict WCAG 2.1 AA accessibility compliance.

**Visual identity:** Deep purple brand palette, crimson-pink accents, clean edges, generous spacing, professional but not sterile. Components feel weighty and considered in dark mode, crisp and airy in light mode.

### Reading Order

Start with these foundational guides before diving into components:

1. **[Setup](./setup.md)** -- Technical configuration, dependencies, project structure
2. **[Foundations: Token Architecture](./foundations/token-architecture.md)** -- The 3-tier variable system (read this first!)
3. **[Foundations: Color](./foundations/color.md)** -- Palettes, semantic mapping, status colors
4. **[Foundations: Typography](./foundations/typography.md)** -- Type scale, font families, text styles
5. **[Foundations: Spacing](./foundations/spacing.md)** -- Spacing scale, inset/component/layout usage
6. **[Foundations: Icons](./foundations/icons.md)** -- Stroke-based icons, sizing, color binding
7. **[Foundations: Modes & Theming](./foundations/modes-theming.md)** -- Dark/Light mode, theme switching

Then reference individual component guides as needed:

8. **[Components](./components/)** -- One guide per component (Button, Input, Dropdown, etc.)
9. **[Composition](./composition/)** -- Layout patterns, form construction, page templates

### Critical Rules (Always Follow)

1. **Never use hardcoded color values** -- Always use CSS custom properties (`--ds-*`, `--p-*`, `--c-*`)
2. **Never skip token tiers** -- Components reference Semantic tokens, Semantic references Primitives
3. **All dimensions on a 2px grid** -- Heights, padding, gaps, border-radius: always even numbers
4. **Both themes must work** -- Every component and page must pass WCAG AA in Dark AND Light mode
5. **CSS Modules only** -- No inline styles, no Tailwind, no CSS-in-JS
6. **Props mirror Figma** -- React component props must exactly match Figma variant properties
7. **Stroke-based icons** -- Icons use `stroke`, not `fill`. Set `fill="none"` on parent SVG
8. **IBM Plex only** -- Sans for UI text, Mono for code and labels

### File Structure

```
ds/
├── guidelines/           # You are here
│   ├── Guidelines.md     # This file (entry point)
│   ├── setup.md          # Technical setup
│   ├── foundations/       # Token system, color, type, spacing, icons, theming
│   ├── components/        # Per-component usage guides
│   └── composition/       # Layout patterns and page templates
├── src/
│   ├── components/        # React component library
│   ├── docs/              # Documentation portal (Vite app)
│   ├── stories/           # Storybook stories
│   └── styles/            # tokens.css (single source of truth for CSS tokens)
├── .storybook/            # Storybook configuration
└── CLAUDE.md              # AI automation rules (lifecycle, sync, standards)
```

## Best Practices

**Do:**
- Read this file first before any design system work
- Follow the reading order sequentially for foundational knowledge
- Reference the critical rules list before every implementation task

**Don't:**
- Skip directly to component guides without reading foundations
- Assume any rule can be bent -- all 8 critical rules are absolute
- Start coding a component without first checking its Figma design

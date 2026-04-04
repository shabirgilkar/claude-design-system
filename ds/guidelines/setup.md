---
name: ds-setup
description: "Technical setup for the design system. Use when configuring the project, understanding the tech stack, or locating files."
disable-model-invocation: false
---

# Setup

> Technical configuration, dependencies, and project structure for the design system.

## Skill Boundaries

- **Use this skill** when configuring the project, installing dependencies, understanding the tech stack, or locating files and directories.
- **Use ds-guidelines-overview instead** for an introduction to the design system and its critical rules.
- **Use ds-token-architecture instead** for details on how the 3-tier token system works within `tokens.css`.

## Prerequisites

- Node.js installed
- Familiarity with the design system's critical rules (see ds-guidelines-overview)

## Required Workflow

1. Run `cd ds && npm install` to install dependencies.
2. Start the development server with `npm run dev` (Doc Portal) or `npm run storybook` (Storybook).
3. All token additions go into `ds/src/styles/tokens.css` -- never create additional token files.
4. Follow the component file convention for every new component.

## Reference

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.x |
| Language | TypeScript | 5.x |
| Build | Vite | 6.x |
| Styling | CSS Modules | -- |
| Stories | Storybook | 10.3.x |
| Routing | react-router-dom | 7.x |
| Fonts | IBM Plex Sans, IBM Plex Mono | -- |

### Installation

```bash
cd ds
npm install
```

#### Development server (Doc Portal)
```bash
npm run dev          # Vite dev server -> http://localhost:5173
```

#### Storybook
```bash
npm run storybook    # Storybook dev -> http://localhost:6006
```

#### Build
```bash
npm run build        # Production build -> ds/dist/
```

### Project Structure

```
ds/src/
├── components/              # React component library
│   ├── Button/
│   │   ├── Button.tsx       # Component implementation
│   │   ├── Button.module.css # Styles (CSS Modules)
│   │   └── index.ts         # Public export
│   ├── Input/
│   ├── Dropdown/
│   ├── Textarea/
│   ├── Checkbox/
│   ├── Radio/
│   ├── Toggle/
│   ├── Badge/
│   ├── Avatar/
│   ├── Toast/
│   ├── Tooltip/
│   ├── Tabs/
│   ├── ThemeProvider/       # Theme context + provider
│   └── ThemeToggle/         # Dark/Light mode switcher
├── docs/
│   ├── layout/              # Shell layout (sidebar, topbar)
│   ├── components/          # Shared doc page section components
│   └── pages/               # Individual documentation pages
├── stories/                 # Storybook stories (one per component)
└── styles/
    ├── tokens.css           # All CSS custom properties (primitives + semantic + components)
    ├── reset.css            # CSS reset
    └── global.css           # Global styles, font imports
```

### Token File

All design tokens live in a single file:

```
ds/src/styles/tokens.css
```

This file contains three tiers in dependency order:
1. **`:root`** -- Primitive tokens (`--p-*`) + Semantic tokens (`--ds-*`) + Component tokens (`--c-*`)
2. **`[data-theme="light"]`** -- Semantic overrides for light mode

Never create additional token files. All token additions go into `tokens.css`.

### Component File Convention

Every component follows this pattern:

```typescript
// ComponentName.tsx
import React from 'react';
import styles from './ComponentName.module.css';

export interface ComponentNameProps { /* ... */ }

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  ({ prop1, prop2, ...props }, ref) => {
    // ...
  }
);

ComponentName.displayName = 'ComponentName';
```

```typescript
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### Storybook Configuration

Stories live in `ds/src/stories/` (not co-located with components). The Storybook config at `ds/.storybook/preview.ts` includes:

- Theme toolbar decorator (sets `data-theme` on `<html>`)
- Centered layout by default
- Token CSS imported globally
- Figma design addon parameters

### Key Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build static Storybook |

## Best Practices

**Do:**
- Keep all tokens in the single `tokens.css` file
- Follow the component folder structure exactly (`{Name}.tsx`, `{Name}.module.css`, `index.ts`)
- Use the `forwardRef` pattern for all components
- Export both the component and its props type from `index.ts`

**Don't:**
- Create additional token files outside `tokens.css`
- Co-locate stories with components -- stories go in `ds/src/stories/`
- Use inline styles, Tailwind, or CSS-in-JS -- CSS Modules only
- Skip the `displayName` assignment on components

# CLAUDE.md — Design System Automation Rules

> Auto-loaded by Claude in every session. These rules are law — follow them without being asked.
> Last updated: March 2026

---

## 1. Component Lifecycle — Always Follow This Order

Every component must go through all four stages in sequence. Never skip a stage. Never build the next stage before the previous is complete.

```
STAGE 1: FIGMA          → Design with all variants, states, tokens, Code Connect
STAGE 2: CODE           → React + CSS Modules, consuming existing token variables
STAGE 3: STORYBOOK      → Stories covering all variants/states, Figma frame linked
STAGE 4: DOC PORTAL     → Full 13-section documentation page, playground = Storybook iframe
```

### Stage entry criteria

| Stage | Must be true before starting |
|-------|------------------------------|
| Code | Figma component has all variants, states, tokens, Code Connect mapping |
| Storybook | React component implemented, all props typed, CSS Modules consuming token variables |
| Doc Portal | Storybook stories written and deployed (or dev server running) |

---

## 2. Figma Rules (Stage 1)

- Always read `DESIGN-SYSTEM-STANDARDS.md` before touching Figma
- Check token existence before using — never assume a token exists
- Token chain must be complete: Component → Semantic → Primitive (no skipping)
- Component variants: SM/MD/LG sizes × all applicable states
- Run showcase screen creation after every component build (§7 of standards)
- Run documentation template creation after every component build (§8.4 of standards)
- After `figma_arrange_component_set`: ALWAYS re-apply fill/stroke variable bindings — arrange strips them
- ALWAYS add properties AFTER arranging, never before
- Never modify hardcoded colors in stable dark showcases — make them variable-bound to semantic variables instead
- Showcases are mode-switchable: single frame, all structural elements bound to semantic vars, switch Semantic collection mode (Dark `5:0` / Light `175:0`) to verify both themes

---

## 3. Code Rules (Stage 2)

- Read the Figma component before writing any code — never assume prop shape
- Props must exactly mirror Figma variant properties (same names, same options)
- All styles via CSS Modules — zero inline styles, zero Tailwind, zero hardcoded values
- Colors/spacing/sizing via CSS token variables (`--ds-*`, `--p-*`) only
- Component folder structure:
  ```
  ds/src/components/{ComponentName}/
  ├── {ComponentName}.tsx
  ├── {ComponentName}.module.css
  └── index.ts
  ```
- All optional boolean props default to `false`
- Never add features beyond what Figma specifies

---

## 4. Storybook Rules (Stage 3)

- One stories file per component: `{ComponentName}.stories.tsx`
- Required stories for every component:
  - `Default` — single instance, default props
  - `AllVariants` — all types/variants side by side
  - `AllSizes` — SM, MD, LG
  - `AllStates` — every interactive state
  - `Interactive` — fully wired with Controls (used for doc portal iframe)
- Link Figma frame to every story via `parameters.design`
- Story args must use exact prop names from the React component
- Controls must be auto-generated from TypeScript prop types (no manual argTypes unless needed)

---

## 5. Doc Portal Rules (Stage 4)

Every component page in the doc portal **must** contain all 13 sections in this exact order:

| # | Section component | Content source |
|---|-------------------|----------------|
| — | `<DocHero>` | Figma doc page — Hero section |
| 01 | `<DocOverview>` | Figma doc page — §01 |
| 02 | `<DocPlayground>` | Storybook iframe — Interactive story |
| 03 | `<DocAnatomy>` | Figma doc page — §02 |
| 04 | `<DocVariants>` | Figma doc page — §03 |
| 05 | `<DocStates>` | Figma doc page — §04 |
| 06 | `<DocGuidelines>` | Figma doc page — §05 |
| 07 | `<DocAccessibility>` | Figma doc page — §06 |
| 08 | `<DocProps>` | Component TypeScript types |
| 09 | `<DocTokens>` | Figma doc page — §07 |
| 10 | `<DocSpecs>` | Figma doc page — §08 |
| 11 | `<DocRelated>` | Figma doc page — §09 |
| 12 | `<DocChangelog>` | Figma doc page — §10 |

**Rules:**
- Never build one-off layouts — always use the shared section components
- Content must match the Figma documentation page exactly
- `<DocPlayground>` is always a Storybook iframe — never custom React state
- `<DocProps>` is the single source of truth for prop definitions
- `<DocTokens>` lists only tokens that the component actually consumes
- `<DocChangelog>` must be updated every time the component changes

---

## 6. Sync Rules — Keeping Everything in Sync

When a component changes at any stage, cascade the update through all downstream stages:

| Changed at | Update required in |
|------------|--------------------|
| Figma (tokens/variants) | Code CSS vars → Storybook story args → Doc portal content |
| Code (new prop) | Storybook args + Controls → Doc portal Props section |
| Storybook (new story) | Doc portal Playground iframe src |
| Figma doc page | Doc portal section content |

---

## 7. Standards File

The authoritative reference for all design decisions is:
```
/DESIGN-SYSTEM-STANDARDS.md
```

Read relevant sections before making decisions. Update the completion log (§9) after every component is finished through all 4 stages.

---

## 8. File Locations

```
/                                    ← project root
├── CLAUDE.md                        ← this file
├── DESIGN-SYSTEM-STANDARDS.md       ← design standards & token architecture (single source of truth)
└── ds/
    └── src/
        ├── components/              ← React components
        │   └── {Name}/
        │       ├── {Name}.tsx
        │       ├── {Name}.module.css
        │       └── index.ts
        ├── docs/
        │   └── pages/               ← doc portal pages
        │       └── {Name}Page.tsx
        └── stories/                 ← Storybook stories (all 12 components)
            └── {Name}.stories.tsx
```

---

## 9. Accessibility & Theme Rules (MUST-FOLLOW)

### 9.1 Dual-theme requirement
Every component and showcase must work in **both** Dark and Light modes:
- Semantic collection has two modes: Dark (mode `5:0`, default) and Light (mode `175:0`)
- Both modes must independently meet WCAG 2.1 AA (4.5:1 text, 3.0:1 UI contrast)
- All showcase structural elements (text, dividers, backgrounds) must use semantic variables — never hardcoded colors
- Showcases are **mode-switchable**: single frame with variable-bound structural elements, NOT separate dark/light frames

### 9.2 Showcase variable binding checklist
Before marking any showcase frame complete, verify:
- [ ] Frame background → bound to `color/background/page`
- [ ] Hero/Footer backgrounds → bound to `color/background/subtle`
- [ ] Title text (component name, section headings) → bound to `color/foreground/default`
- [ ] Subtitle/description text → bound to `color/foreground/muted`
- [ ] Secondary text (token lists, property rows, footer) → bound to `color/foreground/subtle`
- [ ] Divider rectangles → bound to `color/border/subtle`
- [ ] Purple eyebrow/section labels → bound to `color/foreground/brand`
- [ ] Component instances inside showcase → consuming own token chain (auto-adapts)
- [ ] Switch to Light mode (`frame.setExplicitVariableModeForCollection(collection, "175:0")`) → screenshot and verify
- [ ] Switch back to Dark mode → verify no visual changes from original

### 9.3 Theme-aware accent colors
Some status label colors that work on dark backgrounds fail contrast on light backgrounds:
| Color | Dark mode hex | Light mode hex | Usage |
|-------|--------------|---------------|-------|
| Purple | #8C59FF | #8C59FF (same) | Eyebrow labels, accent bars, size badges |
| Green | #4DD98C | #0A8A42 | Success/checked state labels |
| Amber | #FFBF33 | #8B6914 | Warning/readonly state labels |
| Blue | #4DCCFF | #1A7FA3 | Info/focused state labels |
| Red | #E15249 | #E15249 (same) | Error state labels |
| Gray | #8C8CB2 | #8C8CB2 (same) | Neutral/disabled labels, badge text |

### 9.4 Code-side theme rules
- All CSS colors via token variables (`--ds-*`, `--p-*`, `--c-*`) — zero hardcoded rgba/hex
- `[data-theme="light"]` overrides in `tokens.css` are the single source of truth for light mode
- ThemeProvider wraps the app; ThemeToggle in layout topbar
- `prefers-color-scheme` respected as default; localStorage persists user choice
- Focus ring colors adapt per theme via `--ds-color-focus-ring`
- Code block tokens (`--ds-color-code-*`) handle bg, header, border, text, label, and button hover for both themes
- Storybook uses a global theme toolbar decorator in `.storybook/preview.ts` that sets `data-theme` on `<html>` — no separate background addon needed

### 9.5 When a component changes
After any component modification, cascade theme checks:
1. Verify Figma component renders correctly in both variable modes (Dark + Light)
2. Verify dark showcase readability
3. Verify light showcase readability — screenshot and check muted text areas
4. Verify CSS token overrides exist in `[data-theme="light"]` block if new tokens were added
5. Verify Storybook stories render in both themes (when decorator is set up)

---

## 10. Code Connect Rules

Code Connect is what makes Figma Dev Mode show real React snippets with the selected variant values injected. Full details in `.claude/rules/figma-design-system.md` → §Code Connect.

### 10.1 Hard rules
- **Before writing or editing** `{Name}.figma.js`: call `mcp__figma-console__figma_get_component_details` and read the authoritative `variantAxes` — never assume property names
- **Mirror Figma's exact casing** on enum keys (`Type` vs `Variant`, `Position` vs `Placement`, `Style` vs `Theme`)
- **Mirror Figma's exact value labels** on enum options (`Small/Medium/Large` vs `SM/MD/LG` — Button uses the former)
- **States are enums, not booleans** — `Checked`, `Disabled`, `Selected`, `Active`, `Error`, `ReadOnly` are usually `State` variant values in this system. Use `getEnum('State', ...)` and derive JSX boolean props via template conditionals.
- **Never call `findInstance()`** — breaks publish with `sectionsToAdd is not iterable`
- **Never add `getString`/`getBoolean` for properties that don't exist in Figma** — produces broken `variant=""` output
- **Always republish after changes** — `cd ds && npx figma connect publish --token <PAT>` — then verify in Dev Mode

### 10.2 Publish & verify loop
1. Edit `.figma.js` templates
2. `cd ds && npx figma connect publish --token <FIGMA_PAT>`
3. Open component instance in Figma → Dev Mode panel
4. Confirm snippet renders with real values (no empty `""`)
5. Commit + push the `.figma.js` changes

### 10.3 When a component's Figma variants change
Cascade the update:
1. `figma_get_component_details` → compare new `variantAxes` to current `.figma.js`
2. Update enum keys/values to match
3. Republish
4. Update React component props if variant axes themselves changed
5. Update Storybook stories + doc portal Props section

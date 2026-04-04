# Standards & Rules — Design System Rulebook

> **Last updated:** March 20, 2026
> **System:** Enterprise-grade product design system
> **File:** Claude MCP (Figma)
> **Font families:** IBM Plex Sans, IBM Plex Mono

---

## 1. Token Architecture

### 1.1 Three-tier variable chain (MUST-FOLLOW)
Every variable follows the chain: **Components → Semantic → Primitives**.

- **Primitives** — Raw values only. Colors (5 palettes × 10 stops + neutrals), spacing (2–100, step 2), sizing (1–120), radius (2–100), typography primitives (font-family, font-weight, line-height, letter-spacing).
- **Semantic** — Purpose-mapped tokens aliasing Primitives. Categories: background, foreground, border, action, status, data viz, spacing (component/layout/inset), sizing (icon/component/avatar), typography scales, motion, elevation, z-index, opacity.
- **Components** — Per-component tokens aliasing Semantic (or Primitives for component-specific sizing with no semantic equivalent). Categories: color/{state}/{property}, size/{size}/{property}, typography/{size}/{property}.

### 1.2 No raw values in Components or Semantic (MUST-FOLLOW)
- Zero hardcoded numbers, colors, or strings allowed in Components or Semantic collections.
- If a needed primitive doesn't exist, **create it first** in Primitives, then alias to it.
- Verified: Both collections are at **100% alias compliance** (450 + 236 = 686 variables, all aliased).

### 1.3 Naming convention
**Component tokens:**
```
{component}/color/{state}/{property}      — e.g. input/color/default/background
{component}/size/{size}/{property}         — e.g. input/size/sm/height
{component}/typography/{size}/{property}   — e.g. input/typography/md/size
{component}/{sub}/typography/{size?}/{prop} — e.g. input/label/typography/sm/size
{component}/border/width/{variant}         — e.g. input/border/width/default
{component}/radius/{size}                  — e.g. input/radius/md
```

**Key rules:**
- Size dimension goes **before** the attribute name: `size/sm/height` not ~~`size/height/sm`~~
- Use full words: `background` not ~~`bg`~~
- No parallel namespaces for the same concept (no ~~`theme/*`~~ alongside `color/*`)
- Shared field tokens live under the originating component (e.g. `input/border/*` consumed by dropdown and textarea)

---

## 2. Grid System

### 2.1 Two-pixel grid (MUST-FOLLOW)
- All sizing, spacing, padding, and positioning values must align to a **2px grid**.
- All component dimensions use even numbers.
- Resize handle dots: 2×2px with 2px gaps.

---

## 3. Component Architecture

### 3.1 Component structure pattern
Every form-field component follows this architecture:
```
Root (VERTICAL auto-layout, gap=4, HUG both axes)
├── _LabelRow     → InputLabel instance (from Textbox page)
├── _Field        → Bordered container (VERTICAL auto-layout, clipped)
│   ├── [content area]   — Component-specific
│   ├── _Footer          — HORIZONTAL, char count, etc.
│   └── [absolute children] — Resize handle, etc.
└── _HintRow      → HintText instance (Default or Error variant)
```

### 3.2 Sub-component reuse (MUST-FOLLOW)
- **InputLabel** and **HintText** are shared sub-components — always instantiate from the Textbox page, never recreate.
- **HintText** must be used for ALL hint/helper text across all components (TextInput, Dropdown, TextArea, Checkbox, Radio, etc.) to ensure consistency.
- **Icons** must be used as instances from the Icons page, never duplicated or recreated.
- Icon instances must render as proper outlined vectors, never filled square boxes.

### 3.2.1 Icon color assignment (MUST-FOLLOW)
Icons in this design system are **stroke-based** (outlined paths, no fills). When setting icon colors programmatically:
- **Correct:** Set color on the vector's **strokes** → `vec.strokes = [setBoundVariableForPaint(paint, 'color', variable)]`
- **Correct:** Clear any fills → `vec.fills = []`
- **WRONG:** ~~Setting color via fills~~ → This turns the icon into a filled solid rectangle
- Always check the original icon component's vector structure before coloring — verify whether it uses fills, strokes, or both.

### 3.2.2 Content toggle pattern (MUST-FOLLOW)
Components with inline labels (Checkbox, Radio, Toggle, etc.) must wrap the label + hint in a `_Content` frame with a **Show Content** boolean property. This allows designers to:
- Use the full component (box + label + hint) in forms and settings
- Hide the content for compact use cases like table row checkboxes, where only the control is needed
- The `_Content` frame controls visibility of ALL label-related layers in one toggle

### 3.2.3 Edge case thinking (MUST-FOLLOW)
Before building any component, consider these usage contexts:
- **Forms:** Full component with label, hint, validation
- **Tables:** Compact/box-only mode (no label)
- **Settings pages:** Full label + long description
- **Grouped contexts:** Multiple instances stacked (checkbox groups, radio groups)
- **Header/toolbar:** Inline with other controls, minimal chrome
- **Mobile touch:** Touch target size compliance even in compact mode

### 3.2.4 Component container background (MUST-FOLLOW)
The arrange/grid container for component variants must use **dark background** (`#0E071C`) to match the page theme, not white. All label/header text in the container must be light-colored. This ensures components are visible as designed in their dark-theme context.

### 3.3 Variant axes
- **Size:** SM, MD, LG (always these three)
- **State:** Default, Hover, Focused, Typing, Filled, Error, Disabled, ReadOnly (8 states for form fields)
- **Type:** Component-specific (e.g. Button: Primary, Secondary, Tertiary, Destructive, Ghost)

### 3.4 Exposed properties
Every component must expose these properties (as applicable):
- **Text properties:** Label, Placeholder, Hint, CharCount, Value
- **Boolean properties:** Show Label, Show Hint, Show Char Count, Required, plus component-specific (e.g. Resizable, Show Leading Icon)
- **Variant properties:** Size, State, Type

### 3.5 Property ordering — contextual grouping (MUST-FOLLOW)
Component properties must be ordered so that each **toggle sits directly next to the content it controls**. This helps designers find corresponding properties quickly and improves design hygiene.

**Canonical order for form-field components:**
```
1. Show Label      (bool)   — toggle for label visibility
2. Label           (text)   — label content
3. Required        (bool)   — asterisk on label
4. Placeholder     (text)   — placeholder/value content
5. Show Hint       (bool)   — toggle for hint visibility
6. Hint            (text)   — hint content
7. Show Char Count (bool)   — toggle for char count
8. CharCount       (text)   — char count content
9. [component-specific booleans]  — e.g. Resizable, Show Leading Icon
```

**Key principle:** A boolean toggle and its related text/content property are **never separated** by unrelated properties. Group by feature, not by type.

**Implementation note:** Figma's plugin API determines property order by creation order. To reorder, delete all non-variant properties and recreate them in the desired sequence, then re-wire `componentPropertyReferences` across all variants.

**CRITICAL WARNING — `figma_arrange_component_set` strips custom properties:**
The arrange tool recreates the component set (new node ID), which **deletes all custom properties** (TEXT, BOOLEAN) and their wiring. Only variant properties (Size, State, Type) survive. **Always add properties and wire them AFTER arranging, never before.** The correct build order is:
1. Create component variants
2. Combine as variants (`combineAsVariants`)
3. Run `figma_arrange_component_set`
4. **Then** add custom properties and wire them
5. **REAPPLY all fill/stroke color variable bindings** — `figma_arrange_component_set` recreates nodes and strips paint variable bindings. After arrange, iterate every variant and re-call `figma.variables.setBoundVariableForPaint()` on all text fills, frame fills, stroke fills, and icon vectors. This is the #1 cause of "raw color values instead of variables" bugs.
6. Verify wiring + color bindings with a diagnostic check

### 3.6 Property wiring (MUST-FOLLOW)
All exposed properties must be wired to the internal layers that they control. There are two wiring methods:

**Direct wiring (programmatic via plugin API):**
- Text nodes → `componentPropertyReferences.characters` = property key
- Frame/node visibility → `componentPropertyReferences.visible` = boolean property key
- Applies to: `_Placeholder`, `_Value`, `_CharCount`, `_Footer`, `_ResizeHandle`, and any direct child layers

**Nested instance wiring (manual in Figma UI):**
- Instance sub-properties cannot be wired programmatically — Figma's plugin API does not support `componentPropertyReferences` for instance-exposed props like `Input Label#23:6`.
- These require the Figma UI "Expose property from nested instance" action.
- Applies to: `_LabelRow` → Label text & Required toggle, `_HintRow` → Hint text
- **After programmatic component creation, always manually nest-expose:** Label, Hint, Required, and Show Label through their respective sub-component instances.

### 3.7 State differentiation rules
| State | Border | Background | Opacity | Notes |
|-------|--------|------------|---------|-------|
| Default | 1px default border | Surface | 100% | — |
| Hover | 1px hover border | Surface | 100% | — |
| Focused | 2px focus border | Surface | 100% | Focus ring visible |
| Typing | 2px focus border | Surface | 100% | Active input state |
| Filled | 1px default border | Surface | 100% | Has content |
| Error | 1px error border | Error tint bg | 100% | Error hint variant |
| Disabled | 0 or 1px | Surface | 50% field | `aria-disabled="true"` |
| ReadOnly | 0px (no border) | Subtle bg | 100% | Focusable |

---

## 4. Accessibility (WCAG 2.1 AA)

### 4.1 Color contrast (MUST-FOLLOW)
- **Text on backgrounds:** ≥ 4.5:1 ratio
- **UI components & borders:** ≥ 3.0:1 ratio
- **Disabled elements:** ≥ 3.0:1 minimum (relaxed per WCAG)
- All 31 audited color pairs pass. Run contrast checks when adding new color tokens.

### 4.2 Touch targets
- Minimum target size: 24×24px (WCAG 2.5.8 AA)
- SM components: 32px minimum height
- MD: 40px, LG: 48px (meets AAA at LG)

### 4.3 Focus management
- `color/foreground/focus-visible` token exists for keyboard navigation
- `color/border/focus` for focus rings
- All interactive states must show visible focus indicator on Tab

### 4.4 Motion
- `motion/duration/reduced` token (value: 0) for `prefers-reduced-motion` support
- All animations wrapped in `@media (prefers-reduced-motion: no-preference)`

### 4.5 Component descriptions (MUST-FOLLOW)
Every component set must have a description documenting:
- ARIA roles and attributes
- Keyboard interactions
- Contrast compliance
- Touch target sizes

### 4.6 Dual-theme accessibility (MUST-FOLLOW)
Every component and showcase must meet WCAG AA in **both** Dark and Light modes:

- **Per-mode contrast:** 4.5:1 text and 3.0:1 UI ratios apply independently in each mode — a color pair that passes in dark mode must also pass in light mode.
- **Variable-bound showcase elements:** ALL text, dividers, and backgrounds in showcase frames must use semantic variables (`fgDefault`, `fgMuted`, `fgSubtle`, `borderDefault`, `bgPage`, `bgSurface`) so they adapt automatically when the mode switches.
- **Decorative accent colors:** Purple (#8C59FF), emerald-green, crimson-pink, warm-yellow, and steel-blue accent colors used in showcase labels and badges are permitted as hardcoded values ONLY if they pass ≥ 3.0:1 contrast against both `bgPage` values (Dark: #0E071C, Light: #F8F7FC).
- **No white or near-black hardcoded text:** Never use hardcoded `#FFFFFF` or `#000000` for text in showcase frames — always bind to a semantic foreground variable.
- **Contrast audit on new tokens:** When adding new semantic color tokens, verify contrast ratios against both mode backgrounds before use.
- **Component instances inherit:** Actual component instances inside showcases consume their own component-tier tokens, which alias through the semantic chain — these adapt automatically and do not need manual binding.

**Verified accent color contrast (both modes):**
| Color | Hex | vs Dark bg (#0E071C) | vs Light bg (#F8F7FC) | Status |
|-------|-----|---------------------|----------------------|--------|
| Purple | #8C59FF | 5.2:1 | 3.4:1 | ✅ Pass (UI) |
| Green | #4DD98C | 8.7:1 | 2.5:1 | ⚠️ Use bold/large only on light |
| Red | #E15249 | 4.8:1 | 3.6:1 | ✅ Pass |
| Amber | #FFBF33 | 11.2:1 | 1.8:1 | ⚠️ Use dark amber #B8860B on light |
| Blue | #4DCCFF | 9.6:1 | 2.2:1 | ⚠️ Use dark blue #2196C4 on light |
| Gray | #8C8CB2 | 4.5:1 | 3.1:1 | ✅ Pass |

---

## 5. Typography

### 5.1 Font families
- **Sans:** IBM Plex Sans (Regular, Medium, SemiBold, Bold)
- **Mono:** IBM Plex Mono (Regular, Medium)

### 5.2 Text styles (19 total)
| Category | Styles | Size range | Weight |
|----------|--------|------------|--------|
| Display | Large, Medium, Small | 36–52px | Bold |
| Title | 1, 2, 3 | 24–32px | SemiBold |
| Headline | — | 20px | SemiBold |
| Body | Large, Default, Emphasized | 16–18px | Regular/SemiBold |
| Callout | — | 14px | Regular |
| Footnote | — | 12px | Regular |
| Caption | — | 12px | Medium |
| Label | Large, Medium, Small | 10–14px | SemiBold |
| Code | Default, Small, Emphasized | 12–14px | Regular/Medium |

### 5.3 Text style values match semantic typography variables
All text style values must stay in sync with `typography/*` semantic variables. If a variable changes, update the corresponding text style.

### 5.4 Typography variable binding in components (MUST-FOLLOW)
**All text nodes in all components must bind ALL typography properties to variables — never use raw values.** This ensures global typography changes propagate to every component automatically.

**Full binding list (from TextInput gold standard):**
For each component text node, bind these properties via `setBoundVariable()`:
- `fontSize` → component typography token → semantic `typography/size/*`
- `lineHeight` → component typography token → semantic `typography/line-height/*`
- `fontFamily` → semantic `typography/family/sans` (or `typography/family/mono`)
- `letterSpacing` → component typography token → semantic `typography/letter-spacing/*`

**Note:** `fontStyle`/`fontWeight` cannot be bound via `setBoundVariable()` for STRING variable types in the plugin API. These are set via `fontName` property at build time.

**Binding verification:** After building a component, check every text node:
```
node.boundVariables.fontSize → must be truthy
node.boundVariables.lineHeight → must be truthy
node.boundVariables.fontFamily → must be truthy (where possible)
```

**Audit finding:** Components built from TextArea onward (Checkbox, Radio, Toggle, Badge, Avatar) had incomplete typography bindings. Badge and Avatar now fixed. Checkbox/Radio/Toggle need retroactive fix.

---

## 6. Color System

### 6.1 Seven primitive palettes
- **deep-purple:** Brand color (100–1000 + base)
- **crimson-pink:** Error/danger states
- **coral-red:** Accent/secondary emphasis
- **warm-yellow:** Warning states (amber/yellow)
- **medium-gray:** Neutral/disabled states
- **emerald-green:** Success states (100–1000 + base) — INDUSTRY STANDARD
- **steel-blue:** Informational states (100–1000 + base) — INDUSTRY STANDARD
- Plus: `neutral/white`, `neutral/black`

### 6.2 Status color mapping (MUST-FOLLOW — industry standard)
| Status | Primitive palette | Industry convention |
|--------|------------------|---------------------|
| **Success** | emerald-green | Green = positive, confirmed, complete |
| **Warning** | warm-yellow | Yellow/amber = caution, attention needed |
| **Error** | crimson-pink | Red/pink = failure, danger, critical |
| **Info** | steel-blue | Blue = informational, neutral-positive |
| **Neutral** | medium-gray | Gray = default, inactive, disabled |
| **Brand** | deep-purple | Purple = brand accent, primary action |

### 6.3 Dark-theme-first
The current "Light" mode is a dark UI (page bg: `#0E0716`). Semantic tokens map lighter primitive stops to foreground and darker stops to backgrounds.

---

## 7. Showcase Screens (MUST-FOLLOW)

### 7.1 Every component gets a showcase screen
When a component is created or rebuilt, a **Component Showcase** screen must be created on the same page, following this 7-section structure:

1. **Hero** — Title, description, stat badges (sizes, states, properties, tokens)
2. **States** — All states shown at medium size
3. **Sizes** — All sizes shown at default state
4. **Spotlight** — State × Size deep dive (Error, Focused, Filled, ReadOnly × SM/MD/LG)
5. **Matrix** — Complete variant grid (all sizes × all states, in rows of 4)
6. **Tokens** — Design token architecture (color, dimension, typography token lists)
7. **Properties** — All exposed component properties with types, defaults, descriptions

### 7.2 Showcase specs (MUST-FOLLOW — every value is exact)

**Frame:**
- Width: 1440px fixed, height: auto (HUG)
- Background: Bound to `color/background/page` semantic variable (resolves to `#0E071C` in Dark, `#F8F7FC` in Light)
- Vertical auto-layout, itemSpacing: 0

**Section padding (all 7 sections):**
- Top: 80px, Bottom: 88px, Left: 80px, Right: 80px
- itemSpacing: 32px (except Hero = 20px, Properties = 24px)

**Hero section:**
- 48×4px accent bar (purple #8C59FF, radius 2)
- Title: 40px IBM Plex Sans SemiBold, white — format: `{ComponentName} Component`
- Subtitle: 16px Regular, muted `rgb(160,160,190)` — one-line component description
- Badge row: horizontal, 10px gap, border-only pills (NO fill), 1px stroke, cornerRadius 14, padding 12h/4v
- Badge text: 11px Medium, color-coded (purple=sizes, green=states, amber=props, blue=tokens, gray=other)

**Section headers (sections 2–7):**
- 32×3px accent bar (purple, radius 2)
- Eyebrow: 10px SemiBold, purple, letterSpacing 1.5px, UPPERCASE
- Title: 22px SemiBold, white

**Section eyebrow + title names (exact):**
| # | Eyebrow | Title |
|---|---------|-------|
| 2 | STATES | All {N} Input States — Medium Size |
| 3 | SIZES | SM · MD · LG — All Sizes Compared |
| 4 | SPOTLIGHT | State × Size Deep Dive |
| 5 | MATRIX | Complete Variant Matrix — All Sizes × All States |
| 6 | TOKENS | Design Token Architecture |
| 7 | PROPERTIES | {N} Component Properties |

**State labels in sections 2 and 4:**
- 11px SemiBold, color-coded: Default=purple, Hover=gray, Focused=blue, Typing/Open/Checked=green, Filled/Selected=green, Error=red, Disabled=gray, ReadOnly=amber

**Size badges in sections 3 and 5:**
- Pill: border-only, 1px purple stroke, cornerRadius 10, padding 8h/2v
- Text: 10px Medium, purple

### 7.3 Mode-Switchable Showcase (MUST-FOLLOW)
Every showcase is a **single frame** with ALL structural elements bound to semantic variables. Switch the Semantic collection mode (Dark/Light) on the frame to verify both themes — do NOT create separate dark and light frames.

**How it works:**
- Semantic collection has two modes: **Dark** (default, mode `5:0`) and **Light** (mode `175:0`)
- Set mode on a frame via `frame.setExplicitVariableModeForCollection(collection, modeId)`
- All structural elements (backgrounds, text, dividers) auto-adapt via their semantic variable bindings
- Component instances inside showcases adapt automatically via their own token chains

**Variable binding requirements (ALL mandatory for structural elements):**
| Element | Semantic variable | Dark resolves to | Light resolves to |
|---------|-------------------|------------------|-------------------|
| Frame background | `color/background/page` | deep-purple/1000 | deep-purple/50 (#F8F7FC) |
| Hero/Footer background | `color/background/subtle` | deep-purple/900 | deep-purple/75 (#EFEDF4) |
| Title text | `color/foreground/default` | neutral/white | deep-purple/1000 |
| Subtitle/description text | `color/foreground/muted` | medium-gray/200 | medium-gray/700 |
| Token list text, footer | `color/foreground/subtle` | medium-gray/400 | medium-gray/500 |
| Divider rectangles | `color/border/subtle` | deep-purple/800 | deep-purple/75 |
| Purple eyebrow/section labels | `color/foreground/brand` | deep-purple/200 | deep-purple/base |
| Component instances | Own token chain | Auto-adapts | Auto-adapts |

**What NOT to bind (keep hardcoded):**
- Color swatch rectangles on Colors page (they ARE the raw palette data)
- Category accent colors on Icons page (they ARE the category identity)
- Variant accent colors on component pages (PRIMARY blue, DESTRUCTIVE red, etc.)
- State-tinted frame backgrounds in showcase sections

**Never modify stable dark showcases directly.** Make them variable-bound instead — this preserves the dark appearance while enabling Light mode through variable resolution.

**After creating a light showcase:**
1. Screenshot the frame to verify all text is readable
2. Check muted text sections (tokens, properties, footer) for sufficient contrast
3. Verify component instances render correctly in light mode
4. Confirm accent colors don't clash with the light background

---

## 8. Design System Hygiene

### 8.1 File organization
- Each component type gets its own page
- Sub-components (InputLabel, HintText) live on the parent page (Textbox)
- Icons live on the Icons page
- Archive page for deprecated components

### 8.2 Before creating a component
1. Check if tokens exist in the Components collection
2. If not, create them following the naming convention
3. Verify all tokens alias through the chain (no raw values)
4. Check that required primitive values exist

### 8.3 After creating a component
1. Set accessibility description on the component set
2. Create the showcase screen
3. Create the documentation page (§8.4)
4. Verify icon rendering (not filled squares)
5. Verify 2px grid alignment
6. Run contrast checks on new color combinations

### 8.4 Component Documentation Template (MUST-FOLLOW)
Every component must have a documentation page on the Documentation page. Use the Button documentation as the reference template.

**Structure: 12 sections, alternating light/dark backgrounds**

| # | Section | Background | Purpose |
|---|---------|-----------|---------|
| — | Hero | Dark (#0E071C) | Component name (56px Bold), tagline, description, stat badges (Types/Sizes/States/Variants), Stable/Beta badge, version |
| 01 | Overview | Light (#F8F7FC) | Two columns: "When to use" (✓ green) + "When not to use" (✗ red) |
| 02 | Anatomy | Dark | Exploded component instance + numbered callout list (name + description) |
| 03 | Variants & Properties | White | Live component instances per type + properties card grid with type badges |
| 04 | Interactive States | Dark | All states in a row with labels below each |
| 05 | Usage Guidelines | White | Do/Don't cards (green/red) with pattern lists |
| 06 | Accessibility | Dark | 4-card grid: ARIA Roles, Keyboard Nav, Color Contrast, Screen Readers |
| 07 | Token Architecture | Light | 3-column grid: Color Tokens, Size Tokens, Typography Tokens |
| 08 | Design Specifications | Dark | Size cards (SM/MD/LG) with exact measurements per property |
| 09 | Related Components | White | Cards linking to similar/alternative components |
| 10 | Changelog | Dark | Version badges + date + change description |
| — | Footer | Darkest | System name, version, date |

**Layout specs:**
- Width: 1440px fixed
- Section padding: 80px top/bottom, 120px left/right
- Section header: `IBM Plex Mono` 12px number (purple) + `IBM Plex Sans SemiBold` 32px title
- Body text: 15px Regular, 24px line-height
- Item spacing within sections: 32px
- Breadcrumb: "Design System → Components → {Name}"

---

## 9. Completed Recommendations Log

| # | Recommendation | Status | Date |
|---|----------------|--------|------|
| 2 | Accessibility — contrast, touch targets, focus tokens, descriptions | ✅ Complete | Mar 20, 2026 |
| 4 | Token naming consistency — normalize duplicates, remove orphans (49 tokens removed) | ✅ Complete | Mar 20, 2026 |
| — | Variable chain enforcement — no raw values in Components/Semantic (9 fixed) | ✅ Complete | Mar 20, 2026 |
| 5 | Typography text styles — 19 text styles created referencing typography variables | ✅ Complete | Mar 20, 2026 |
| 3 | Component coverage — TextArea rebuilt (24 variants, 10 properties, showcase) | 🔄 In progress | Mar 20, 2026 |
| 3 | Component coverage — Checkbox built (21 variants, 6 properties, 50 tokens, showcase) | 🔄 In progress | Mar 20, 2026 |
| 3 | Component coverage — Radio built (18 variants, 6 properties, 45 tokens, showcase) | 🔄 In progress | Mar 20, 2026 |
| 3 | Component coverage — Toggle built (18 variants, 6 properties, 44 tokens, showcase) | 🔄 In progress | Mar 20, 2026 |
| 3 | Component coverage — Badge rebuilt (36 variants, 8 properties, 45 tokens, 2 shapes, showcase) | 🔄 In progress | Mar 20, 2026 |
| 3 | Component coverage — Avatar rebuilt (15 variants, 3 properties, 29 tokens, Image type, showcase) | 🔄 In progress | Mar 20, 2026 |
| — | Typography variable binding — retroactive fix for Checkbox/Radio/Toggle/Badge/Avatar _Label nodes | ✅ Complete | Mar 20, 2026 |
| — | Status colors remapped — emerald-green (Success), steel-blue (Info), warm-yellow (Warning) | ✅ Complete | Mar 20, 2026 |
| 3 | Component coverage — Toast built (5 variants, 7 properties, 44 tokens, showcase) | 🔄 In progress | Mar 20, 2026 |
| 3 | Component coverage — Tooltip rebuilt (16 variants, 6 properties, 22 tokens, Simple+Descriptive types, soft-edge arrows, showcase) | 🔄 In progress | Mar 20, 2026 |
| 3 | Component coverage — TabItem rebuilt (24 variants, 11 properties, 49 tokens, H/V direction, icons, dot, descriptive, showcase) | 🔄 In progress | Mar 20, 2026 |

## 10. Remaining Recommendations

| # | Recommendation | Priority |
|---|----------------|----------|
| 1 | Dark mode support — add Dark mode to Semantic + Components | Critical |
| 3 | Component coverage — Modal/Dialog, Table | Critical |

---

## 11. Component Lifecycle — Design-First Workflow (MUST-FOLLOW)

Every component must pass through all four stages in order. No stage may be skipped.

```
STAGE 1: FIGMA       Design with all variants, states, tokens, Code Connect mapping
            ↓
STAGE 2: CODE        React + CSS Modules, props mirror Figma variants exactly
            ↓
STAGE 3: STORYBOOK   Stories for all variants/states, Figma frame linked per story
            ↓
STAGE 4: DOC PORTAL  Full 13-section documentation page, playground = Storybook iframe
```

### 11.1 Stage 1 exit criteria (Figma → Code)
Before writing any code:
- [ ] All variants exist (SM/MD/LG × all states)
- [ ] All tokens wired through full chain (Component → Semantic → Primitive)
- [ ] No raw values in Components or Semantic collections
- [ ] Showcase screen created (§7)
- [ ] Documentation page created (§8.4)
- [ ] Code Connect mapping file written

### 11.2 Stage 2 exit criteria (Code → Storybook)
Before writing stories:
- [ ] All Figma variant properties have matching React props
- [ ] All styles use CSS token variables only (`--ds-*`, `--p-*`)
- [ ] All optional boolean props default to `false`
- [ ] Component renders correctly at all sizes and states

### 11.3 Stage 3 exit criteria (Storybook → Doc Portal)
Before building the doc portal page:
- [ ] `Default`, `AllVariants`, `AllSizes`, `AllStates`, `Interactive` stories exist
- [ ] Figma frame URL linked in story `parameters.design`
- [ ] A11y addon passes with no critical violations
- [ ] `Interactive` story has full Controls panel working

### 11.4 Sync — when a component changes

| Changed at | Must also update |
|------------|-----------------|
| Figma tokens/variants | Code CSS vars, Storybook story args, Doc portal content sections |
| Code (new prop) | Storybook args/Controls, Doc portal Props section |
| Storybook story | Doc portal Playground iframe src |
| Figma documentation page | Matching doc portal section content |

---

## 12. Storybook Standards (MUST-FOLLOW)

### 12.1 File location and naming
```
ds/src/stories/{ComponentName}.stories.tsx
```

### 12.2 Required stories — every component must have all five

| Story name | Purpose | Used by |
|------------|---------|---------|
| `Default` | Single instance, default props | Quick reference |
| `AllVariants` | All types/variants side by side | Visual QA |
| `AllSizes` | SM, MD, LG comparison | Visual QA |
| `AllStates` | Every interactive state | Visual QA, a11y audit |
| `Interactive` | Full Controls panel, all props exposed | Doc portal iframe |

### 12.3 Story template
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../components/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...?node-id=...', // link to Figma component
    },
  },
};
export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = { args: { /* default props */ } };
export const AllVariants: Story = { /* render all variants */ };
export const AllSizes: Story = { /* render SM/MD/LG */ };
export const AllStates: Story = { /* render all states */ };
export const Interactive: Story = { args: { /* all props exposed */ } };
```

### 12.4 Controls
- Controls are auto-generated from TypeScript prop types — never define argTypes manually unless a prop needs a custom control type
- All boolean props use `control: 'boolean'`
- All enum/union props use `control: 'select'`

### 12.5 Addons required
- `@storybook/addon-designs` — Figma frame linking
- `@storybook/addon-a11y` — accessibility audits
- `@storybook/addon-controls` — interactive controls (built-in)

---

## 13. Figma Code Connect (MUST-FOLLOW)

Code Connect maps Figma components to their React equivalents. When a designer inspects a component in Figma Dev Mode, it shows the actual code snippet instead of raw CSS.

### 13.1 File location
```
ds/src/components/{ComponentName}/{ComponentName}.figma.tsx
```

### 13.2 Mapping template
```tsx
import figma from '@figma/code-connect';
import { ComponentName } from './ComponentName';

figma.connect(ComponentName, 'FIGMA_COMPONENT_URL', {
  props: {
    // Map Figma variant property → React prop
    variant: figma.enum('Type', {
      Primary: 'primary',
      Secondary: 'secondary',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    label: figma.string('Label'),
  },
  example: ({ variant, size, disabled, label }) => (
    <ComponentName variant={variant} size={size} disabled={disabled}>
      {label}
    </ComponentName>
  ),
});
```

### 13.3 CLI command
```bash
npx figma connect publish --token $FIGMA_ACCESS_TOKEN
```
Run this after creating or updating any `.figma.tsx` mapping file.

---

## 14. Doc Portal Page Standards (MUST-FOLLOW)

### 14.1 Every component page must contain all 13 sections in order

| Order | Section component | Maps to Figma | Content |
|-------|-------------------|---------------|---------|
| — | `<DocHero>` | § Hero | Breadcrumb, status, title, tagline, description, stat badges |
| 01 | `<DocOverview>` | § 01 Overview | When to use ✓ / When not to use ✗ (2 columns) |
| 02 | `<DocPlayground>` | — | Storybook `Interactive` story iframe |
| 03 | `<DocAnatomy>` | § 02 Anatomy | Component diagram + numbered callout list |
| 04 | `<DocVariants>` | § 03 Variants & Properties | Variant grid + property cards |
| 05 | `<DocStates>` | § 04 Interactive States | All states rendered in a row with labels |
| 06 | `<DocGuidelines>` | § 05 Usage Guidelines | Do/Don't cards |
| 07 | `<DocAccessibility>` | § 06 Accessibility | ARIA, keyboard, contrast, screen reader cards |
| 08 | `<DocProps>` | — | Auto-generated from TypeScript prop types |
| 09 | `<DocTokens>` | § 07 Token Architecture | Color / Size / Typography token tables |
| 10 | `<DocSpecs>` | § 08 Design Specifications | SM/MD/LG measurement tables |
| 11 | `<DocRelated>` | § 09 Related Components | Cards linking to related components |
| 12 | `<DocChangelog>` | § 10 Changelog | Version history |

### 14.2 Section component rules
- **Never** build one-off layouts — every section uses the shared component
- Content must match the Figma documentation page exactly — Figma is the source of truth
- `<DocPlayground>` is always a Storybook iframe — never custom React state or controls
- `<DocProps>` is derived from TypeScript types, not manually authored
- `<DocTokens>` lists only tokens the component actually consumes (from the Figma token architecture section)
- `<DocChangelog>` must be updated every time the component or its documentation changes

### 14.3 Button documentation — reference content (extracted from Figma)

The Button page is the canonical reference implementation. All other component pages follow the same pattern with component-specific content.

**Hero:**
- Title: "Button" | Tagline: "The fundamental interaction primitive."
- Description: "Buttons communicate actionable intent, establish visual hierarchy, and guide users through task flows. Available in 5 types, 3 sizes, and 7 interactive states."
- Stats: 5 Types · 3 Sizes · 7 States · 105 Variants

**Overview — When to use:**
- Triggering an action — form submit, dialog open, navigation
- Establishing hierarchy — Primary for main CTA, Ghost for tertiary
- Confirming or canceling — dialog confirmations, destructive actions
- Inline actions — table row actions, card footers, toolbars

**Overview — When not to use:**
- Navigation links — use a text link or anchor instead
- Toggling state — use Toggle, Checkbox, or Radio instead
- Displaying status — use Badge or Tag instead
- Filtering content — use Tabs or Filter chips instead

**Anatomy (5 elements):**
1. Container — Defines size, fill, border, and corner radius. Adapts per variant type and state.
2. Leading Icon — Optional. 16–20px icon left-aligned. Reinforces the action meaning.
3. Label — Required text. Maximum 4 words for clarity and scannability.
4. Trailing Icon — Optional. Used for directional cues or dropdown indicators.
5. Focus Ring — 2px offset border. Visible on keyboard navigation. Uses focus token.

**Variants:** Primary (strongest CTA, one per section) · Secondary (pairs with Primary) · Tertiary (subtle links, back nav) · Destructive (irreversible actions only) · Ghost (toolbar, dense context)

**States:** Default · Hover · Focused · Pressed · Disabled · Loading · Error

**Guidelines — Do:**
- Use one Primary button per section to establish clear CTA hierarchy
- Write labels as action verbs: "Save changes", "Add item", "Confirm"
- Pair Primary + Secondary for two-action dialogs (Confirm + Cancel)
- Use Destructive only for irreversible actions — require confirmation
- Ensure minimum touch target: 48px height at LG for mobile

**Guidelines — Don't:**
- Don't use two Primary buttons side by side — only one dominant action
- Don't use vague labels: "Click here", "Submit", "OK" without context
- Don't disable a button without explaining why the action is unavailable
- Don't place buttons less than 8px apart — risk misclicks on touch
- Don't use Ghost type in high-visibility areas — too subtle for CTAs

**Accessibility:**
- ARIA: `<button>` or `<a role="button">`. Icon-only requires `aria-label`. Loading: `aria-busy="true"`. Disabled: `aria-disabled="true"`.
- Keyboard: Tab to focus, Enter/Space to activate, Escape to cancel (dialog context)
- Contrast: Text ≥ 4.5:1, UI/border ≥ 3.0:1, Disabled ≥ 3.0:1
- Screen readers: Label announces purpose, state changes announced live, spinner `aria-hidden="true"`, disabled buttons remain focusable

**Token Architecture:**
- Color: `button/color/{type}/{state}/background|border|text|icon`, `button/color/focus-ring`
- Size: `button/size/{size}/height|padding-x|gap|icon`, `button/radius/{size}`
- Typography: `button/typography/{size}/size|line-height`, `button/typography/font-family|font-weight|letter-spacing`

**Design Specifications:**
| Property | SM | MD | LG |
|----------|----|----|-----|
| Height | 32px | 40px | 48px |
| Padding X | 12px | 16px | 20px |
| Gap | 6px | 8px | 10px |
| Radius | 6px | 8px | 10px |
| Font size | 12px | 14px | 16px |
| Icon size | 14px | 16px | 20px |

**Related Components:** Badge (status display) · Toggle (binary state) · TabItem (content switching) · Toast (uses Ghost Button instances)

**Changelog:** v1.0 — Mar 2026 — Initial release. 5 types × 3 sizes × 7 states = 105 variants. Full token architecture, typography binding, accessibility description.

### 14.4 Shared section component location
```
ds/src/docs/components/sections/
├── DocHero.tsx
├── DocOverview.tsx
├── DocPlayground.tsx
├── DocAnatomy.tsx
├── DocVariants.tsx
├── DocStates.tsx
├── DocGuidelines.tsx
├── DocAccessibility.tsx
├── DocProps.tsx          ← refactor from existing PropsTable
├── DocTokens.tsx
├── DocSpecs.tsx
├── DocRelated.tsx
├── DocChangelog.tsx
└── index.ts
```

### 14.5 Component page build order
Build pages in this order — Button first as the reference implementation, then roll out to all others:
1. Button (reference — build all 13 sections first, validate, then use as template)
2. Input
3. Textarea
4. Dropdown
5. Checkbox
6. Radio
7. Toggle
8. Badge
9. Avatar
10. Tabs
11. Toast
12. Tooltip

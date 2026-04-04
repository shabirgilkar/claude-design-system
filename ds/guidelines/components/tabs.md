---
name: ds-component-tabs
description: "Tabs component usage. Use when implementing tabbed navigation, content switching, or sectioned views."
disable-model-invocation: false
---

# Tabs

A navigation control for switching between content panels. Supports horizontal and vertical layouts with optional icons, descriptions, and dot indicators.

## Skill Boundaries

- **Use this skill** when organizing content into distinct sections within a single view: settings categories, dashboard data views, or any context where users switch between related panels.
- **Do not use** for primary navigation between pages -- use a nav bar or sidebar instead.
- **Do not use** for more than 6-7 items in horizontal layout -- switch to vertical or use a different pattern.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming tabs tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all variants, states, and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the component** -- `import { Tabs } from '@ds/components/Tabs';`
2. **Choose direction and size** -- select `direction` (horizontal/vertical) and `size` (sm/md/lg) based on layout and context.
3. **Configure props** -- define `tabs` array with `id`, `label`, optional `description`, `icon`, `disabled`, `content`; set `activeTab`/`defaultTab` and `onChange`.
4. **Handle accessibility** -- the component uses `role="tablist"`, `role="tab"`, and `role="tabpanel"` automatically; disabled tabs get `aria-disabled`.
5. **Verify in both themes** -- confirm tabs render correctly in Dark and Light modes; check active indicator, focus ring, and disabled state in both.

## Reference

### When to Use

- Organizing content into distinct sections within a single view
- Settings pages with multiple categories
- Dashboards with parallel data views
- Any context where users switch between related panels without navigating away

### Props

#### Tabs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | required | Array of tab definitions |
| `activeTab` | `string` | `undefined` | Controlled active tab ID |
| `defaultTab` | `string` | first tab ID | Initial active tab for uncontrolled usage |
| `onChange` | `(id: string) => void` | `undefined` | Called when active tab changes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls tab height and font size |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `showIcon` | `boolean` | `true` | Shows tab icons when provided |
| `showDescription` | `boolean` | `false` | Shows description text under tab labels |
| `showDot` | `boolean` | `false` | Shows dot indicator next to tab labels |
| `className` | `string` | `undefined` | Additional CSS class |

#### TabItem

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique identifier |
| `label` | `string` | required | Tab label text |
| `description` | `string` | `undefined` | Subtitle shown when `showDescription` is true |
| `icon` | `ReactNode` | `undefined` | Icon shown when `showIcon` is true |
| `disabled` | `boolean` | `false` | Disables this tab |
| `content` | `ReactNode` | `undefined` | Panel content rendered when tab is active |

### Variants

| Direction | Visual |
|-----------|--------|
| Horizontal | Tabs in a row, active indicator is a bottom border, panel below |
| Vertical | Tabs in a column, active indicator is a left border, panel to the right |

### Sizes

| Size | Tab height | Use case |
|------|-----------|----------|
| `sm` | ~32px | Dense UIs, secondary navigation |
| `md` | ~40px | Standard tab bars |
| `lg` | ~48px | Prominent page-level navigation |

### States

| State | Visual |
|-------|--------|
| Default | Muted text |
| Hover | Text color shift |
| Active | Bold text, sliding indicator bar (animated) |
| Focused | Focus ring around tab |
| Disabled | Muted text, `tabIndex={-1}`, no click handler |

The active indicator animates position and size using `useLayoutEffect` to measure the active tab button.

### Accessibility

- Tab list has `role="tablist"`
- Each tab button has `role="tab"`, `aria-selected`, and `aria-controls`
- Active panel has `role="tabpanel"` with `aria-labelledby` linking to the tab
- Disabled tabs use `aria-disabled` and `tabIndex={-1}`
- Keyboard: standard tab panel pattern (Tab moves to panel, arrow keys move between tabs)

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-tabs-*` | Tab padding, gap, indicator height/width, transition |
| `--ds-color-primary-*` | Active indicator color, active text color |
| `--ds-color-foreground-*` | Default, hover, disabled tab text colors |
| `--ds-color-border-*` | Tab list bottom/left border |
| `--ds-color-focus-ring` | Focus ring |

## Best Practices

- **Do** provide `content` in each TabItem for automatic panel rendering, or handle panel rendering yourself using `onChange` and `activeTab`.
- **Do** use `defaultTab` or `activeTab` to control which tab is initially visible.
- **Don't** use Tabs for primary navigation between pages -- use a nav bar or sidebar instead.
- **Don't** put more than 6-7 tabs in a horizontal layout; switch to vertical or use a different pattern.

### Code Example

```tsx
import { Tabs } from '@ds/components/Tabs';

// Basic horizontal tabs
<Tabs
  tabs={[
    { id: 'overview', label: 'Overview', content: <OverviewPanel /> },
    { id: 'settings', label: 'Settings', content: <SettingsPanel /> },
    { id: 'billing', label: 'Billing', content: <BillingPanel /> },
  ]}
/>

// Vertical with icons and descriptions
<Tabs
  direction="vertical"
  showDescription
  tabs={[
    { id: 'general', label: 'General', description: 'Basic settings', icon: <GearIcon />, content: <GeneralPanel /> },
    { id: 'security', label: 'Security', description: 'Password & 2FA', icon: <LockIcon />, content: <SecurityPanel /> },
  ]}
/>

// Controlled with dot indicators
<Tabs
  activeTab={currentTab}
  onChange={setCurrentTab}
  showDot
  tabs={[
    { id: 'inbox', label: 'Inbox' },
    { id: 'sent', label: 'Sent' },
    { id: 'drafts', label: 'Drafts', disabled: true },
  ]}
/>

// Small size
<Tabs size="sm" tabs={tabItems} />
```

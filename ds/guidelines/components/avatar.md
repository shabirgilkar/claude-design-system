---
name: ds-component-avatar
description: "Avatar component usage. Use when displaying user photos, initials, or placeholder icons."
disable-model-invocation: false
---

# Avatar

A circular display element representing a user or entity. Shows an image, initials, or a fallback person icon.

## Skill Boundaries

- **Use this skill** when displaying user profile pictures, participant lists, team member indicators, or any circular user/entity representation.
- **Do not use** as a button -- wrap Avatar in a clickable element if interaction is needed.
- **Do not use** for non-user imagery -- use a standard image or icon component instead.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming avatar tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- Figma component must have all variants, states, and tokens mapped before writing code (Stage 1 complete per CLAUDE.md).

## Required Workflow

1. **Import the components** -- `import { Avatar, AvatarGroup } from '@ds/components/Avatar';`
2. **Choose size** -- select `size` (xs/sm/md/lg/xl/2xl) based on context and prominence.
3. **Configure props** -- set `src` and `alt` for image avatars; set `initials` as fallback; optionally set `color`.
4. **Handle accessibility** -- always provide `alt` text for image avatars; provide `initials` as fallback when `src` might fail.
5. **Verify in both themes** -- confirm avatar renders correctly in Dark and Light modes; check initials background colors and fallback icon in both.

## Reference

### When to Use

- User profile pictures in headers, comments, or cards
- Participant lists and team member displays
- Placeholder for users who have not uploaded a photo
- Grouped avatar stacks showing multiple participants

### Props

#### Avatar

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Image URL; triggers image mode |
| `alt` | `string` | `''` | Alt text for the image |
| `initials` | `string` | `undefined` | 1-2 letter initials; triggers initials mode |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Circle diameter |
| `color` | `'purple' \| 'pink' \| 'red' \| 'green' \| 'blue'` | auto | Background color for non-image avatars (auto-derived from initials) |
| `className` | `string` | `undefined` | Additional CSS class |

#### AvatarGroup

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Avatar elements |
| `className` | `string` | `undefined` | Additional CSS class |

### Variants (Display Types)

| Type | Trigger | Visual |
|------|---------|--------|
| Image | `src` provided and loads | Photo fills the circle |
| Initials | `initials` provided, no `src` (or image fails) | 1-2 uppercase letters on colored background |
| Icon (fallback) | Neither `src` nor `initials` | Generic person silhouette SVG |

When an image fails to load (`onError`), the avatar falls back to initials mode (if `initials` is set) or icon mode.

### Sizes

| Size | Diameter | Use case |
|------|----------|----------|
| `xs` | ~24px | Inline mentions, compact lists |
| `sm` | ~32px | Comment threads, table cells |
| `md` | ~40px | Cards, standard lists |
| `lg` | ~48px | Profile headers |
| `xl` | ~56px | Profile pages |
| `2xl` | ~64px | Hero profile sections |

### States

Avatar has no interactive states. It is a display-only element.

### Accessibility

- `aria-label` is set to `alt` or `initials` on the outer `<span>`
- Image has an `alt` attribute
- Fallback SVG icon is decorative and inherits the `aria-label` from the wrapper
- For AvatarGroup, ensure surrounding context describes who the avatars represent

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-avatar-*` | Sizes (width/height), font-size per size, border-radius |
| `--c-avatar-{color}-*` | Background and text colors for each color variant |
| `--ds-color-foreground-*` | Fallback icon color |

## Best Practices

- **Do** always provide `alt` text for image avatars describing the person.
- **Do** provide `initials` as a fallback when `src` might fail to load.
- **Don't** use Avatar as a button -- wrap it in a clickable element if interaction is needed.
- **Don't** show more than 5-6 avatars in an AvatarGroup; use a "+N" overflow indicator.

### Code Example

```tsx
import { Avatar, AvatarGroup } from '@ds/components/Avatar';

// Image avatar
<Avatar src="/photos/jane.jpg" alt="Jane Smith" size="lg" />

// Initials (color auto-derived)
<Avatar initials="JS" size="md" />

// Explicit color
<Avatar initials="AB" color="blue" size="sm" />

// Fallback icon (no src, no initials)
<Avatar alt="Unknown user" size="md" />

// Grouped avatars
<AvatarGroup>
  <Avatar src="/photos/jane.jpg" alt="Jane" />
  <Avatar initials="TK" />
  <Avatar initials="RD" />
</AvatarGroup>
```

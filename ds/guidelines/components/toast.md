---
name: ds-component-toast
description: "Toast notification component usage. Use when implementing transient feedback messages, success/error alerts, or system notifications."
disable-model-invocation: false
---

# Toast

A brief notification banner that appears temporarily to inform users of an event outcome. Managed via a provider/hook pattern.

## Skill Boundaries

- **Use this skill** when implementing transient feedback messages: action confirmations, async error reports, warning notices, or informational updates.
- **Do not use** for actions requiring user decisions -- use a Dialog/Modal instead.
- **Do not use** for persistent messages that must remain visible -- use an inline alert or banner instead.

## Prerequisites

- `ds-token-architecture` skill: understand primitive, semantic, and component token layers before consuming toast tokens.
- `ds-setup` skill: project must have the design system package installed and token CSS loaded.
- `ToastProvider` must wrap the application root before `useToast` can be called in any child component.

## Required Workflow

1. **Wrap app root** -- `<ToastProvider><App /></ToastProvider>`
2. **Import the hook** -- `import { useToast } from '@ds/components/Toast';`
3. **Configure toast** -- call `addToast({ variant, title, description, duration })` with appropriate variant and message.
4. **Handle accessibility** -- toasts use `role="alert"` and `aria-live="polite"` automatically; keep titles under 5 words.
5. **Verify in both themes** -- confirm toast renders correctly in Dark and Light modes; check accent bar colors and text contrast in both.

## Reference

### When to Use

- Confirming a completed action: "Changes saved", "Item deleted"
- Reporting errors from async operations: "Upload failed"
- Warning about non-blocking issues: "Connection unstable"
- Informational updates: "New version available"

### Props

#### ToastItem (data passed to `addToast`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info' \| 'neutral'` | `'neutral'` | Color and icon variant |
| `title` | `string` | required | Bold heading text |
| `description` | `string` | `undefined` | Secondary detail text |
| `duration` | `number` | `4000` | Auto-dismiss delay in ms; `0` disables auto-dismiss |

#### ToastProvider

Wrap your app in `<ToastProvider>` to enable the toast system. It renders a fixed container for toast cards.

#### useToast hook

| Method | Signature | Description |
|--------|-----------|-------------|
| `addToast` | `(toast: Omit<ToastItem, 'id'>) => void` | Queues a new toast |
| `dismissToast` | `(id: string) => void` | Removes a specific toast |
| `toasts` | `ToastItem[]` | Current toast list |

#### ToastPreview

A static, non-animated version for documentation and Storybook. Same visual output without the provider.

### Variants

| Variant | Color | Icon | Use case |
|---------|-------|------|----------|
| `neutral` | Gray | None | Generic notifications |
| `success` | Green | Checkmark circle | Confirmations |
| `warning` | Amber | Triangle exclamation | Caution messages |
| `error` | Red | X circle | Failure messages |
| `info` | Blue | Info circle | Informational updates |

Each variant shows a colored left accent bar and matching icon.

### Sizes

Toast does not have size variants. Dimensions are fixed for consistency across all notification types.

### States

| State | Visual |
|-------|--------|
| Entering | Slide-in animation from edge |
| Visible | Static card with accent bar, icon, content, close button |
| Exiting | Slide-out animation (200ms), then removed from DOM |

### Accessibility

- Each toast has `role="alert"` and `aria-live="polite"`
- Close button has `aria-label="Dismiss {variant} notification"`
- Variant icons are `aria-hidden="true"` (status conveyed by role and text)
- Container has `aria-label="Notifications"`

### Token Usage

| Prefix | Purpose |
|--------|---------|
| `--c-toast-*` | Card padding, border-radius, shadow, animation duration |
| `--c-toast-{variant}-*` | Accent bar color, icon color, background tint |
| `--ds-color-background-*` | Card background |
| `--ds-color-foreground-*` | Title and description text colors |

## Best Practices

- **Do** use `ToastProvider` at the app root so `useToast` works everywhere.
- **Do** keep titles under 5 words and descriptions under one sentence.
- **Don't** use toasts for actions that require user decisions -- use a dialog instead.
- **Don't** set `duration` to 0 for success messages; they should auto-dismiss.

### Code Example

```tsx
import { ToastProvider, useToast } from '@ds/components/Toast';

// Wrap app root
<ToastProvider>
  <App />
</ToastProvider>

// Inside any component
function SaveButton() {
  const { addToast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      addToast({ variant: 'success', title: 'Saved', description: 'Your changes are live.' });
    } catch {
      addToast({ variant: 'error', title: 'Save failed', description: 'Please try again.' });
    }
  };

  return <button onClick={handleSave}>Save</button>;
}

// Static preview (Storybook / docs)
import { ToastPreview } from '@ds/components/Toast';
<ToastPreview variant="warning" title="Connection unstable" description="Some features may be slow." />
```

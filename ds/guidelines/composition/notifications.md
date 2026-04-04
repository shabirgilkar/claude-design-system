---
name: ds-composition-notifications
description: "Notification and feedback patterns. Use when implementing toast messages, tooltips, validation feedback, loading states, or empty states."
disable-model-invocation: false
---

# Notification & Feedback Patterns

Guidelines for composing Toast, Tooltip, Badge, and validation components to provide user feedback. All patterns use CSS Modules with token variables.

## Skill Boundaries

**Use this skill when:**
- Implementing toast notifications (success, error, warning, info)
- Adding tooltips to icon-only buttons, truncated text, or settings labels
- Using badges as status indicators in tables, navigation, or inline groups
- Building inline validation or form-level error summaries
- Creating loading states (button spinners, skeleton placeholders)
- Designing empty states with icon, message, and CTA
- Wiring a complete form submission flow (validate, load, toast)

**Do NOT use this skill when:**
- Building the Toast, Tooltip, or Badge component itself -- use the component-specific skill
- Laying out form fields and sections -- use `ds-composition-forms`
- Structuring page layout (sidebar, topbar, grids) -- use `ds-composition-layout`

## Prerequisites

- **Component skills:** `ds-component-toast`, `ds-component-tooltip`, `ds-component-badge`, `ds-component-button`, `ds-component-input`, `ds-component-hint-text` -- feedback components must be implemented before composing patterns
- **Foundation skills:** `ds-foundation-spacing`, `ds-foundation-color`, `ds-foundation-radius` -- token variables must be available in `tokens.css`
- **Theme setup:** `[data-theme="light"]` overrides must exist for all `--ds-color-*` tokens used (especially `--ds-color-fg-error`, `--ds-color-border-error`, `--ds-color-bg-overlay`)

## Required Workflow

1. **Identify feedback type** -- determine which pattern applies: toast (transient), tooltip (supplementary), badge (persistent status), inline validation (field-level), or loading/empty state
2. **Choose variant** -- map to the correct semantic variant (success, error, warning, info, neutral, brand)
3. **Set placement** -- toasts go top-right fixed; tooltips prefer `top` with viewport fallback; badges are inline
4. **Configure timing** -- success/info toasts auto-dismiss at 5s, warning at 8s, error persists
5. **Wire accessibility** -- add `role="alert"`, `aria-live`, `aria-describedby`, `aria-invalid`, `aria-disabled`, `aria-busy` as appropriate
6. **Handle the flow** -- for form submission: validate > loading > API call > success toast or error toast
7. **Verify themes** -- test all feedback patterns in both Dark and Light modes

## Reference

### Toast Notifications

Use the Toast component for transient system feedback: confirmations, errors, and informational updates.

#### When to Use

| Scenario | Toast variant | Example |
|----------|--------------|---------|
| Action succeeded | `success` | "Changes saved" |
| Action failed | `error` | "Failed to save. Please try again." |
| Background update | `info` | "New version available" |
| Potential issue | `warning` | "You have unsaved changes" |

#### Placement

Toasts appear in the **top-right corner** of the viewport, stacked vertically with a gap.

```css
/* ToastContainer.module.css */
.toastContainer {
  position: fixed;
  top: var(--ds-spacing-inset-lg);
  right: var(--ds-spacing-inset-lg);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-component-sm);
  pointer-events: none;
}

.toastContainer > * {
  pointer-events: auto;
}
```

#### Timing

| Variant | Auto-close | Rationale |
|---------|------------|-----------|
| `success` | 5 seconds | User confirmed action, no follow-up needed |
| `info` | 5 seconds | Informational, not blocking |
| `warning` | 8 seconds | Needs attention but not critical |
| `error` | Persistent | Requires user acknowledgment or action |

### Do

- Keep toast messages short -- one sentence, no paragraphs.
- Include an action button when the user can fix the error (e.g., "Retry").
- Use `role="alert"` so screen readers announce the toast immediately.
- Dismiss success/info toasts automatically. Don't require manual close for routine confirmations.

### Don't

- Don't use toasts for information the user needs to reference later. Use inline messages instead.
- Don't stack more than 3 toasts. If a 4th arrives, dismiss the oldest.
- Don't use toasts for form validation errors. Use inline validation.
- Don't show identical toasts in rapid succession. Debounce or deduplicate.

---

### Toast Composition Example

```tsx
import { Toast } from '@ds/components/Toast';

// Toast manager hook (simplified)
function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (toast: Omit<ToastData, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto-dismiss non-error toasts
    if (toast.variant !== 'error') {
      const delay = toast.variant === 'warning' ? 8000 : 5000;
      setTimeout(() => removeToast(id), delay);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}

// In the layout
function AppLayout({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className={styles.layout}>
      {children}
      <div className={styles.toastContainer} aria-live="polite">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            message={toast.message}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

---

### Tooltip

Tooltips provide supplementary context on hover or focus. They are not for critical information.

#### When to Use

| Use case | Example |
|----------|---------|
| Icon-only buttons | Hover over a trash icon shows "Delete item" |
| Truncated text | Hover over "John Sm..." shows "John Smith" |
| Additional context | Hover over a setting label shows a longer explanation |

#### Placement

Prefer `top`. Fall back to `bottom`, `left`, or `right` if the tooltip would overflow the viewport.

```tsx
<Tooltip content="Delete this item" placement="top">
  <Button variant="ghost" icon="trash" aria-label="Delete this item" />
</Tooltip>
```

### Do

- Attach tooltips only to focusable elements (buttons, links, inputs). This ensures keyboard users can trigger them.
- Keep tooltip text to one short sentence.
- Use `aria-label` on icon-only buttons even when a tooltip is present. The tooltip is a visual enhancement, not a replacement for accessible labeling.

### Don't

- Don't put interactive content (links, buttons) inside tooltips. Users can't reliably click them.
- Don't use tooltips for error messages or validation. Use inline error states.
- Don't attach tooltips to non-focusable elements like `<div>` or `<span>` unless they have `tabIndex={0}` and a role.
- Don't show tooltips on touch devices. They have no hover state.

---

### Badge as Status Indicator

Badges communicate status at a glance. Map badge variants to semantic meanings consistently across the application.

#### Variant-to-Status Mapping

| Badge variant | Status meaning | Example context |
|---------------|---------------|-----------------|
| `success` | Confirmed, active, complete | User active, payment confirmed, build passed |
| `warning` | Pending, needs attention | Awaiting review, expiring soon |
| `error` | Failed, blocked, critical | Build failed, payment declined |
| `info` | New, updated, informational | New message, recently updated |
| `neutral` | Draft, inactive, archived | Draft document, disabled feature |
| `brand` | Featured, promoted, premium | Featured item, pro plan |

#### Composition Patterns

```tsx
{/* Badge on a data row */}
<tr>
  <td>{user.name}</td>
  <td>{user.email}</td>
  <td>
    <Badge variant={user.active ? 'success' : 'neutral'}>
      {user.active ? 'Active' : 'Inactive'}
    </Badge>
  </td>
</tr>

{/* Badge next to an avatar */}
<div className={styles.inlineGroup}>
  <Avatar src={user.avatar} size="md" />
  <span>{user.name}</span>
  <Badge variant="brand" size="sm">Pro</Badge>
</div>

{/* Badge in navigation */}
<nav>
  <a href="/inbox" className={styles.navLink}>
    Inbox
    <Badge variant="info" size="sm">3</Badge>
  </a>
</nav>
```

### Do

- Use the same variant for the same semantic meaning everywhere. `success` always means confirmed/active.
- Use `size="sm"` for badges in tight spaces (table rows, nav items).

### Don't

- Don't use more than one badge per item unless they represent different dimensions (e.g., status + plan tier).
- Don't use badges for long text. Keep labels to 1-2 words.

---

### Validation Feedback

#### Inline Validation

The primary validation pattern. Each form field shows its own error state and message.

```tsx
<Input
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  onBlur={() => validateUsername(username)}
  error={!!errors.username}
  hint={errors.username || 'Must be 3-20 characters'}
  required
/>
```

**Timing:** Validate on blur (when the user leaves the field). Don't validate on every keystroke.

#### Form-Level Error Summary

For complex forms with many fields, show an error summary at the top of the form on submit failure.

```tsx
{Object.keys(errors).length > 0 && (
  <div className={styles.errorSummary} role="alert">
    <p className={styles.errorSummaryTitle}>
      Please fix {Object.keys(errors).length} error(s):
    </p>
    <ul className={styles.errorSummaryList}>
      {Object.entries(errors).map(([field, message]) => (
        <li key={field}>
          <a href={`#${field}`} className={styles.errorSummaryLink}>
            {message}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
```

```css
.errorSummary {
  background-color: var(--ds-color-bg-surface);
  border: 1px solid var(--ds-color-border-error);
  border-radius: var(--ds-radius-md);
  padding: var(--ds-spacing-inset-md);
}

.errorSummaryTitle {
  font-weight: 600;
  color: var(--ds-color-fg-error);
  margin-bottom: var(--ds-spacing-component-sm);
}

.errorSummaryLink {
  color: var(--ds-color-fg-error);
  text-decoration: underline;
}
```

---

### Loading States

#### Button Loading

Use the `loading` prop on Button to show a spinner during async operations. The button is disabled while loading.

```tsx
<Button
  variant="primary"
  loading={isSubmitting}
  onClick={handleSave}
>
  Save
</Button>
```

#### Content Loading (Skeleton)

For content areas that load asynchronously, show skeleton placeholders that match the shape of the expected content.

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--ds-color-bg-subtle) 25%,
    var(--ds-color-bg-surface) 50%,
    var(--ds-color-bg-subtle) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--ds-radius-sm);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeletonLine {
  composes: skeleton;
  height: 16px;
  width: 100%;
}

.skeletonCircle {
  composes: skeleton;
  width: 40px;
  height: 40px;
  border-radius: var(--ds-radius-pill);
}
```

---

### Empty States

When a section has no data to display, show a centered empty state with an icon, message, and optional CTA.

```css
.emptyState {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--ds-spacing-inset-2xl);
  text-align: center;
  gap: var(--ds-spacing-component-md);
}

.emptyStateIcon {
  color: var(--ds-color-fg-subtle);
  width: 48px;
  height: 48px;
}

.emptyStateTitle {
  font-weight: 600;
  color: var(--ds-color-fg-default);
}

.emptyStateDescription {
  color: var(--ds-color-fg-muted);
  max-width: 360px;
}
```

```tsx
<div className={styles.emptyState}>
  <InboxIcon className={styles.emptyStateIcon} />
  <p className={styles.emptyStateTitle}>No messages yet</p>
  <p className={styles.emptyStateDescription}>
    When you receive messages, they will appear here.
  </p>
  <Button variant="primary" size="sm" onClick={onCompose}>
    Compose Message
  </Button>
</div>
```

---

### Combined Pattern: Form Submission Flow

A complete submission flow chains validation, loading, and toast feedback.

```
User clicks Submit
  |
  v
Validate all fields (inline errors)
  |
  +-- Errors found --> Set field error states, focus first error, stop
  |
  +-- No errors --> Set button to loading state
                      |
                      v
                    API call
                      |
                      +-- Success --> Dismiss loading
                      |               Show success toast
                      |               Navigate or reset form
                      |
                      +-- Failure --> Dismiss loading
                                      Show error toast with retry action
```

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Step 1: Validate
  const newErrors = validate(formData);
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    const firstError = document.querySelector('[aria-invalid="true"]');
    (firstError as HTMLElement)?.focus();
    return;
  }

  // Step 2: Loading
  setIsSubmitting(true);

  try {
    // Step 3: API call
    await saveData(formData);

    // Step 4a: Success
    addToast({ variant: 'success', message: 'Changes saved successfully' });
    router.push('/dashboard');
  } catch (error) {
    // Step 4b: Failure
    addToast({
      variant: 'error',
      message: 'Failed to save changes. Please try again.',
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### Accessibility Summary

| Pattern | Requirement |
|---------|-------------|
| Toast | `role="alert"` or wrap container in `aria-live="polite"` |
| Tooltip | Trigger must be focusable; content exposed via `aria-describedby` |
| Badge | Use semantic color + text label (never color alone) |
| Error messages | Linked to field via `aria-describedby`; `aria-invalid="true"` on field |
| Loading button | `aria-disabled="true"` + `aria-busy="true"` while loading |
| Empty state | No special ARIA needed; content is visible text |
| Error summary | `role="alert"` so screen readers announce it on appearance |

## Best Practices

### Do

- Keep toast messages short -- one sentence maximum.
- Include a "Retry" action button on error toasts when the user can fix the issue.
- Auto-dismiss success/info toasts; persist error toasts until acknowledged.
- Attach tooltips only to focusable elements for keyboard accessibility.
- Use `aria-label` on icon-only buttons even when a tooltip is present.
- Map badge variants to consistent semantic meanings across the entire application.
- Validate on blur for individual fields; validate all on submit as a safety net.
- Focus the first invalid field after form-level validation fails.
- Show skeleton placeholders that match the shape of expected content during loading.
- Always include text labels alongside status colors -- never rely on color alone.
- Test all feedback patterns in both Dark and Light themes.

### Don't

- Don't use toasts for form validation errors -- use inline validation instead.
- Don't stack more than 3 toasts; dismiss the oldest if a 4th arrives.
- Don't show identical toasts in rapid succession -- debounce or deduplicate.
- Don't put interactive content (links, buttons) inside tooltips.
- Don't show tooltips on touch devices -- they have no hover state.
- Don't use badges for long text -- keep labels to 1-2 words.
- Don't validate on every keystroke -- validate on blur instead.
- Don't show error messages before the user has interacted with a field.
- Don't hardcode any color values -- use `--ds-color-*` tokens exclusively.

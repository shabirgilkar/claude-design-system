---
name: ds-composition-forms
description: "Form layout patterns. Use when building forms, configuring validation, grouping form fields, or setting up form actions."
disable-model-invocation: false
---

# Form Patterns

Guidelines for composing form components. All forms in this design system use CSS Modules with token variables for consistent spacing, validation, and accessibility.

## Skill Boundaries

**Use this skill when:**
- Building a new form (login, settings, contact, registration, etc.)
- Deciding how to lay out form fields, sections, and action buttons
- Implementing inline or form-level validation
- Choosing spacing between labels, fields, hints, and sections
- Making forms responsive (single-column to multi-column)

**Do NOT use this skill when:**
- Building an individual form component (Input, Dropdown, Checkbox) -- use the component-specific skill instead
- Setting up page-level layout (sidebar, topbar, content area) -- use `ds-composition-layout`
- Implementing toast/notification feedback after form submission -- use `ds-composition-notifications`

## Prerequisites

- **Component skills:** `ds-component-input`, `ds-component-dropdown`, `ds-component-textarea`, `ds-component-checkbox`, `ds-component-toggle`, `ds-component-button`, `ds-component-hint-text`, `ds-component-input-label` -- all form field components must be implemented before composing forms
- **Foundation skills:** `ds-foundation-spacing`, `ds-foundation-color` -- token variables for spacing and color must be available in `tokens.css`
- **Theme setup:** `[data-theme="light"]` overrides must exist for all `--ds-color-*` and `--ds-spacing-*` tokens used

## Required Workflow

1. **Choose fields** -- identify which form components are needed (Input, Dropdown, Textarea, Checkbox, Toggle, etc.)
2. **Set layout** -- decide single-column vs multi-column; group related fields into sections with `<fieldset>` and `<legend>`
3. **Apply spacing** -- use `--ds-spacing-component-lg` between fields, `--ds-spacing-layout-md` between sections
4. **Add validation** -- implement inline validation (on blur) and form-level validation (on submit); wire error states and HintText
5. **Configure actions** -- place the action bar at the bottom with border-top; primary button on right, secondary on left
6. **Handle submission** -- set button loading state during async; show toast on success/failure (see `ds-composition-notifications`)
7. **Verify themes** -- test form in both Dark and Light modes; confirm all tokens resolve correctly

## Reference

### Form Field Anatomy

Every form field follows the same vertical structure:

```
Label (InputLabel)
Field (Input / Dropdown / Textarea / etc.)
Hint  (HintText -- help text or validation message)
```

All three sub-elements stack vertically with `gap: var(--ds-spacing-component-xs)` between label and field, and between field and hint.

---

### Form Layout

Forms use a vertical stack of form fields. The gap between fields is the single most important spacing decision.

```css
/* FormLayout.module.css */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-component-lg); /* 16-20px between fields */
}

.formSection {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-component-lg);
}

.formSectionTitle {
  font-weight: 600;
  color: var(--ds-color-fg-default);
  padding-bottom: var(--ds-spacing-component-sm);
  border-bottom: 1px solid var(--ds-color-border-subtle);
  margin-bottom: var(--ds-spacing-component-sm);
}

.formSections {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-layout-md); /* Larger gap between sections */
}

.formActions {
  display: flex;
  justify-content: flex-end;
  gap: var(--ds-spacing-component-md);
  padding-top: var(--ds-spacing-component-lg);
  border-top: 1px solid var(--ds-color-border-subtle);
}
```

### Do

- Use `--ds-spacing-component-lg` for gaps between form fields within a section.
- Use `--ds-spacing-layout-md` for gaps between form sections.
- Place the primary action button on the right, secondary/cancel on the left.

### Don't

- Don't use inconsistent spacing between fields. Every field gap must use the same token.
- Don't put form actions inline with fields. Always separate them with a border-top.
- Don't mix spacing tokens (e.g., `--ds-spacing-layout-*` for field gaps).

---

### Spacing Reference

| Context | Token | Typical value |
|---------|-------|---------------|
| Between label and field | `--ds-spacing-component-xs` | 4px |
| Between field and hint | `--ds-spacing-component-xs` | 4px |
| Between form fields | `--ds-spacing-component-lg` | 16-20px |
| Between form sections | `--ds-spacing-layout-md` | 32px |
| Form padding (in a card) | `--ds-spacing-inset-lg` | 24px |
| Actions top padding | `--ds-spacing-component-lg` | 16-20px |

---

### Validation Patterns

#### Inline Validation

Each field validates independently. On error, the field enters its `error` state and the HintText switches to the error variant.

```tsx
<Input
  label="Email"
  type="email"
  error={!!errors.email}
  required
/>
{errors.email && (
  <HintText variant="error">{errors.email}</HintText>
)}
```

#### Form-Level Validation

For complex forms, validate all fields on submit. On failure:

1. Prevent submission.
2. Set error state on all invalid fields.
3. Focus the first invalid field.
4. Optionally show a form-level error summary above the form.

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const newErrors = validate(formData);

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    // Focus first invalid field
    const firstErrorField = document.querySelector('[aria-invalid="true"]');
    (firstErrorField as HTMLElement)?.focus();
    return;
  }

  onSubmit(formData);
};
```

### Do

- Validate on blur for individual fields when possible.
- Validate all fields on submit as a safety net.
- Focus the first invalid field after form-level validation fails.

### Don't

- Don't validate on every keystroke -- it creates a poor experience for the user.
- Don't show error messages before the user has interacted with a field.
- Don't rely solely on color to indicate errors. Always include error text.

---

### Required Fields

Use the `required` prop on form field components. This adds an asterisk to the label and sets `aria-required="true"` on the input.

```tsx
<Input label="Email" required />
```

If most fields in a form are required, mark the optional ones instead with "(optional)" in the label text.

---

### Form Actions

The action bar sits at the bottom of the form, separated by a top border.

```tsx
<div className={styles.formActions}>
  <Button variant="secondary" onClick={onCancel}>
    Cancel
  </Button>
  <Button variant="primary" type="submit" loading={isSubmitting}>
    Save Changes
  </Button>
</div>
```

**Button order:** Secondary (cancel/back) on the left, primary (submit/save) on the right.

---

### Responsive Forms

Single column by default. Use CSS Grid for two-column layouts on wider screens.

```css
.formGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--ds-spacing-component-lg);
}

@media (min-width: 640px) {
  .formGrid {
    grid-template-columns: 1fr 1fr;
  }
}

.fullWidth {
  grid-column: 1 / -1;
}
```

Fields that need full width (Textarea, long descriptions) use the `.fullWidth` class to span both columns.

---

### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Semantic form element | Wrap in `<form>` with `onSubmit` handler |
| Label association | Every field has a `<label>` with `htmlFor` matching the input `id` |
| Field grouping | Related fields wrapped in `<fieldset>` with `<legend>` |
| Error announcement | Error messages linked via `aria-describedby` on the input |
| Invalid state | `aria-invalid="true"` on fields with errors |
| Required indication | `aria-required="true"` plus visible asterisk |
| Focus management | Focus first invalid field on validation failure |
| Submit with Enter | Native `<form>` + `<button type="submit">` handles this |

---

### Composition Examples

#### Login Form

```tsx
import styles from './LoginForm.module.css';
import { Input } from '@ds/components/Input';
import { Checkbox } from '@ds/components/Checkbox';
import { Button } from '@ds/components/Button';

function LoginForm({ onSubmit, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    await onSubmit({ email, password, rememberMe });
    setIsSubmitting(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        hint={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        hint={errors.password}
        required
      />

      <Checkbox
        label="Remember me"
        checked={rememberMe}
        onChange={(checked) => setRememberMe(checked)}
      />

      <div className={styles.formActions}>
        <Button
          variant="ghost"
          type="button"
          onClick={onForgotPassword}
        >
          Forgot password?
        </Button>
        <Button
          variant="primary"
          type="submit"
          loading={isSubmitting}
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}
```

#### Settings Form (Multi-Section)

```tsx
<form className={styles.formSections} onSubmit={handleSubmit}>
  {/* Section 1: Profile */}
  <fieldset className={styles.formSection}>
    <legend className={styles.formSectionTitle}>Profile</legend>
    <Input label="Display name" value={name} onChange={...} required />
    <Input label="Email" type="email" value={email} onChange={...} required />
    <Dropdown
      label="Timezone"
      options={timezones}
      value={timezone}
      onChange={...}
    />
  </fieldset>

  {/* Section 2: Preferences */}
  <fieldset className={styles.formSection}>
    <legend className={styles.formSectionTitle}>Preferences</legend>
    <Toggle
      label="Email notifications"
      checked={emailNotifs}
      onChange={...}
    />
    <Toggle
      label="Dark mode"
      checked={darkMode}
      onChange={...}
    />
  </fieldset>

  <div className={styles.formActions}>
    <Button variant="secondary" type="button" onClick={onCancel}>
      Cancel
    </Button>
    <Button variant="primary" type="submit" loading={isSubmitting}>
      Save Changes
    </Button>
  </div>
</form>
```

#### Contact Form (Mixed Fields)

```tsx
<form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles.formGrid}>
    <Input label="First name" value={firstName} onChange={...} required />
    <Input label="Last name" value={lastName} onChange={...} required />
  </div>

  <Input label="Email" type="email" value={email} onChange={...} required />

  <Dropdown
    label="Subject"
    options={subjectOptions}
    value={subject}
    onChange={...}
    required
  />

  <Textarea
    label="Message"
    value={message}
    onChange={...}
    rows={5}
    required
  />

  <Checkbox
    label="I agree to the terms and conditions"
    checked={agreedToTerms}
    onChange={...}
    required
  />

  <div className={styles.formActions}>
    <Button variant="primary" type="submit" loading={isSubmitting}>
      Send Message
    </Button>
  </div>
</form>
```

## Best Practices

### Do

- Always wrap forms in a semantic `<form>` element with an `onSubmit` handler.
- Use `<fieldset>` and `<legend>` to group related fields in multi-section forms.
- Validate on blur for individual fields and on submit as a safety net.
- Focus the first invalid field after form-level validation fails.
- Place primary action button on the right, secondary/cancel on the left.
- Use consistent spacing tokens throughout: `--ds-spacing-component-lg` between fields, `--ds-spacing-layout-md` between sections.
- Test forms in both Dark and Light themes to confirm token resolution.

### Don't

- Don't validate on every keystroke -- it creates a poor user experience.
- Don't show error messages before the user has interacted with a field.
- Don't rely solely on color to indicate errors -- always include error text.
- Don't use inconsistent spacing between fields.
- Don't put form actions inline with fields -- always separate with a border-top.
- Don't mix spacing token scales (e.g., layout tokens for field gaps).
- Don't hardcode colors -- use `--ds-color-*` tokens exclusively.

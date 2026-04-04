import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { ToastPreview, useToast } from '../../components/Toast/Toast';
import { Button } from '../../components/Button/Button';
import { SelectControl, TextControl } from '../components/DocPage';

const ToastTrigger: React.FC = () => {
  const { addToast } = useToast();
  const [variant, setVariant] = React.useState('success');
  const [title, setTitle] = React.useState('Action completed');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState('4000');

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Variant" value={variant} onChange={setVariant}
            options={[
              { value: 'success', label: 'Success' }, { value: 'error', label: 'Error' },
              { value: 'warning', label: 'Warning' }, { value: 'info', label: 'Info' },
              { value: 'neutral', label: 'Neutral' },
            ]} />
          <SelectControl label="Duration" value={duration} onChange={setDuration}
            options={[{ value: '2000', label: '2s' }, { value: '4000', label: '4s' }, { value: '8000', label: '8s' }, { value: '0', label: 'Persistent' }]} />
          <TextControl label="Title" value={title} onChange={setTitle} />
          <TextControl label="Description" value={description} onChange={setDescription} />
        </>
      }
    >
      <Button
        variant="primary"
        onClick={() => addToast({ variant: variant as any, title, description: description || undefined, duration: parseInt(duration, 10) })}
      >
        Show {variant} toast
      </Button>
    </DocPlayground>
  );
};

export const ToastPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Toast"
      tagline="Ephemeral notifications that confirm and alert."
      description="Toast delivers short-lived feedback notifications — confirmations, errors, warnings, and info messages. Driven by a context API, rendered globally via ToastProvider. Auto-dismisses with configurable duration."
      status="stable"
      version="v1.1"
      stats={[
        { value: 5, label: 'Variants' },
        { value: 4, label: 'Icons' },
        { value: 4000, label: 'Default ms' },
        { value: '∞', label: 'Concurrent' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Confirming completed actions — "Changes saved", "File uploaded"' },
        { text: 'Surfacing errors that don\'t block the current flow' },
        { text: 'Warning about pending issues — "Session expiring in 5 minutes"' },
        { text: 'Informational updates — "New version available"' },
      ]}
      dontUse={[
        { text: 'Critical errors that block the user — use a Dialog or inline error' },
        { text: 'Content that requires user decision — use Dialog instead' },
        { text: 'Long messages — keep to 1-2 short sentences' },
        { text: 'Replacing form validation errors — use inline field errors' },
      ]}
    />

    <ToastTrigger />

    <DocCodeExample code={`import { ToastProvider, useToast } from '@ds/components';

// 1. Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <MyApp />
    </ToastProvider>
  );
}

// 2. Use the hook anywhere
function SaveButton() {
  const { addToast } = useToast();

  return (
    <Button onClick={() => addToast({
      variant: 'success',
      title: 'Changes saved',
      description: 'Your settings have been updated.',
      duration: 4000,
    })}>
      Save
    </Button>
  );
}`} />

    <DocAnatomy
      description="A Toast is built from a colored left accent, an icon, title, optional description, and a close button."
      preview={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 360 }}>
          <ToastPreview variant="success" title="Changes saved" description="Your settings have been updated." />
        </div>
      }
      callouts={[
        { name: 'Accent bar', description: 'Left border in variant color — quick visual identification.' },
        { name: 'Icon', description: 'Variant-specific icon — checkmark, X, warning triangle, info circle.' },
        { name: 'Title', description: 'Primary message. Short, action-confirming or status-describing.' },
        { name: 'Description', description: 'Optional supporting text for additional context.' },
        { name: 'Close button', description: 'X button for manual dismissal before auto-dismiss.' },
      ]}
    />

    <DocVariants
      description="Five variants map to semantic message types. Each has a distinct icon and accent color."
      variants={[
        { label: 'Success', description: 'Action confirmed, operation complete.',   preview: <ToastPreview variant="success" title="Changes saved" description="Your settings have been updated." /> },
        { label: 'Error',   description: 'Operation failed, action required.',      preview: <ToastPreview variant="error"   title="Upload failed" description="Check your connection and retry." /> },
        { label: 'Warning', description: 'Potential issue, attention needed.',      preview: <ToastPreview variant="warning" title="Session expiring" description="You'll be signed out in 5 minutes." /> },
        { label: 'Info',    description: 'Neutral information, new update.',        preview: <ToastPreview variant="info"    title="Update available" description="A new version is ready to install." /> },
        { label: 'Neutral', description: 'Generic notification, no semantic bias.', preview: <ToastPreview variant="neutral" title="Notification" description="Something happened you should know about." /> },
      ]}
    />

    <DocStates
      description="Toast has two content states: title only and title with description."
      states={[
        { label: 'Title only',       colorKey: 'default',  preview: <ToastPreview variant="success" title="Changes saved" /> },
        { label: 'With description', colorKey: 'default',  preview: <ToastPreview variant="info"    title="Update available" description="A new version is ready to install." /> },
        { label: 'Error variant',    colorKey: 'error',    preview: <ToastPreview variant="error"   title="Request failed" description="Please try again." /> },
        { label: 'Warning variant',  colorKey: 'warning',  preview: <ToastPreview variant="warning" title="Low storage" description="Clean up files to free space." /> },
      ]}
    />

    <DocGuidelines
      description="Write toast titles as past-tense confirmations or present-tense alerts. Keep them under 8 words."
      dos={[
        'Write titles as past-tense confirmations — "Changes saved", "File deleted"',
        'Keep title under 8 words — toasts are glanceable, not readable',
        'Use description only when additional context adds real value',
        'Match variant to message type — don\'t use success for warnings',
      ]}
      donts={[
        "Don't show toasts for every micro-interaction — reserve for meaningful feedback",
        "Don't use toasts for errors that block the user — use Dialog",
        "Don't stack more than 3-4 toasts at once — reduce or batch them",
        "Don't require interaction to dismiss — use Dialog for that",
      ]}
    />

    <DocAccessibility
      description="Toast uses role='status' for live announcements and supports manual dismissal via keyboard."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Container uses aria-live="polite" for announcements', 'Error toasts use aria-live="assertive"', 'role="status" on the toast element', 'Close button has aria-label="Dismiss notification"'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Toast close button receives Tab focus', 'Escape can dismiss the focused toast', 'Toasts do not steal focus on appear', 'Auto-dismiss does not interrupt keyboard flow'] },
        { icon: '◐', title: 'Color Contrast', items: ['Title text: ≥ 4.5:1 on toast background', 'Description text: ≥ 4.5:1 on toast background', 'Accent bar color: ≥ 3.0:1 on toast background'] },
        { icon: '📢', title: 'Screen Readers', items: ['Title and description announced on appear via aria-live', 'Error toasts interrupt with assertive live region', 'Close button accessible by name', 'Duration not announced — auto-dismiss is silently handled'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'variant',     type: "'success' | 'error' | 'warning' | 'info' | 'neutral'", default: "'neutral'", description: 'Semantic color accent and icon.' },
        { name: 'title',       type: 'string',  required: true,                               description: 'Primary notification message.' },
        { name: 'description', type: 'string',  default: '—',                                 description: 'Optional supporting detail text.' },
        { name: 'duration',    type: 'number',  default: '4000',                              description: 'Auto-dismiss delay in ms. Set to 0 to persist until manually closed.' },
      ]}
    />

    <DocTokens
      description="Toast tokens cover the panel, accent bar, and each variant's colors."
      groups={[
        { title: 'Variant Colors', tokens: ['toast/color/{variant}/accent', 'toast/color/{variant}/icon', 'toast/color/{variant}/background'] },
        { title: 'Panel Tokens',   tokens: ['toast/panel/background', 'toast/panel/border', 'toast/panel/shadow', 'toast/panel/border-radius'] },
        { title: 'Typography',     tokens: ['toast/typography/title/font-size', 'toast/typography/title/font-weight', 'toast/typography/description/font-size'] },
      ]}
    />

    <DocSpecs
      description="Toast panel dimensions and layout measurements."
      sizes={[
        { label: 'Panel',   badge: 'PN', rows: [{ label: 'min-width', value: '300px' }, { label: 'max-width', value: '400px' }, { label: 'padding', value: '12px 16px' }, { label: 'radius', value: '8px' }] },
        { label: 'Accent',  badge: 'AC', rows: [{ label: 'width', value: '3px' }, { label: 'height', value: '100%' }, { label: 'radius', value: '3px 0 0 3px' }, { label: 'position', value: 'left edge' }] },
        { label: 'Content', badge: 'CT', rows: [{ label: 'icon', value: '16px' }, { label: 'title-font', value: '14px' }, { label: 'desc-font', value: '13px' }, { label: 'gap', value: '4px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Button',   description: 'Buttons typically trigger addToast() on click.',     href: '#/button' },
      { name: 'Badge',    description: 'For static status display, not ephemeral feedback.', href: '#/badge' },
      { name: 'Tooltip',  description: 'For hover-triggered hints, not notifications.',      href: '#/tooltip' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.1', date: 'Apr 2026', description: 'Added variant icons (success checkmark, error X, warning triangle, info circle), exit animation (slide-out), improved close button aria-label.' },
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — 5 variants, ToastProvider context, configurable duration, auto-dismiss, persistent mode, full ARIA live region support.' },
    ]} />
  </DocPage>
);

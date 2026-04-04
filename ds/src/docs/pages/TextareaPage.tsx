import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Textarea } from '../../components/Textarea/Textarea';
import { SelectControl, ToggleControl } from '../components/DocPage';

const TextareaPlayground: React.FC = () => {
  const [rows, setRows] = React.useState('4');
  const [hasLabel, setHasLabel] = React.useState(true);
  const [hasHint, setHasHint] = React.useState(false);
  const [showCount, setShowCount] = React.useState(false);
  const [resize, setResize] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Rows" value={rows} onChange={setRows}
            options={[{ value: '2', label: '2 rows' }, { value: '4', label: '4 rows' }, { value: '6', label: '6 rows' }, { value: '8', label: '8 rows' }]} />
          <ToggleControl label="Label"      checked={hasLabel}   onChange={setHasLabel} />
          <ToggleControl label="Hint"       checked={hasHint}    onChange={setHasHint} />
          <ToggleControl label="Char Count" checked={showCount}  onChange={setShowCount} />
          <ToggleControl label="Resize"     checked={resize}     onChange={setResize} />
          <ToggleControl label="Error"      checked={hasError}   onChange={setHasError} />
          <ToggleControl label="Disabled"   checked={disabled}   onChange={setDisabled} />
        </>
      }
    >
      <div style={{ width: 320 }}>
        <Textarea
          label={hasLabel ? 'Description' : undefined}
          placeholder="Write a description…"
          hint={hasHint && !hasError ? 'Keep it under 200 characters.' : undefined}
          error={hasError ? 'Description is required.' : undefined}
          maxLength={200}
          showCharCount={showCount}
          disabled={disabled}
          resize={resize}
          rows={parseInt(rows, 10)}
        />
      </div>
    </DocPlayground>
  );
};

export const TextareaPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Textarea"
      tagline="Multi-line text entry with smart constraints."
      description="Textarea handles longer-form text input — bio, notes, descriptions. Supports optional character counting, error states, label, hint text, and resize control."
      status="stable"
      version="v1.0"
      stats={[
        { value: 4, label: 'States' },
        { value: 200, label: 'Max chars (default)' },
        { value: 1, label: 'Resize axis' },
        { value: '∞', label: 'Row count' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Long-form text — bio, notes, descriptions, feedback' },
        { text: 'Form fields where content length varies unpredictably' },
        { text: 'Message composition — comments, replies, support tickets' },
        { text: 'When character limits need to be surfaced to the user' },
      ]}
      dontUse={[
        { text: 'Single-line input — use Input instead' },
        { text: 'Code editors — use a syntax-aware component' },
        { text: 'Rich text — use a WYSIWYG editor' },
        { text: 'Selection from a list — use Dropdown or Radio' },
      ]}
    />

    <TextareaPlayground />

    <DocCodeExample code={`import { Textarea } from '@ds/components';

<Textarea
  label="Description"
  placeholder="Write a description…"
  maxLength={200}
  showCharCount
  rows={4}
/>

<Textarea
  label="Notes"
  hint="Keep it under 200 characters."
  rows={3}
  resize={false}
/>

<Textarea
  label="Bio"
  error="Bio is required."
  rows={3}
/>`} />

    <DocAnatomy
      description="Textarea is composed of a label, the native textarea element, and a footer row for hint/error and character count."
      preview={
        <div style={{ width: 280 }}>
          <Textarea label="Bio" placeholder="Tell us about yourself…" hint="Keep it under 200 characters." maxLength={200} showCharCount rows={3} />
        </div>
      }
      callouts={[
        { name: 'Label', description: 'Optional field label above the textarea.' },
        { name: 'Textarea Field', description: 'Native <textarea> with vertical resize handle (when enabled).' },
        { name: 'Hint / Error', description: 'Hint shown by default; replaced by error message on invalid state.' },
        { name: 'Character Count', description: 'Optional remaining character counter in the bottom-right corner.' },
      ]}
    />

    <DocVariants
      description="Textarea does not have semantic variants — it adapts to its state. Row count and resize control visual size."
      variants={[
        { label: 'Default',           description: 'Label, placeholder, vertical resize enabled.',    preview: <div style={{ width: 220 }}><Textarea placeholder="Default" rows={3} /></div> },
        { label: 'With label & hint', description: 'Guidance text below for format or constraints.', preview: <div style={{ width: 220 }}><Textarea label="Notes" hint="Optional, max 200 chars." rows={3} /></div> },
        { label: 'With char count',   description: 'Shows remaining characters on the right.',       preview: <div style={{ width: 220 }}><Textarea label="Bio" maxLength={200} showCharCount rows={3} /></div> },
        { label: 'No resize',         description: 'Fixed height, no user resize handle.',           preview: <div style={{ width: 220 }}><Textarea placeholder="Fixed" resize={false} rows={3} /></div> },
      ]}
    />

    <DocStates
      description="Textarea shares the same four states as Input — default, focused, error, and disabled."
      states={[
        { label: 'Default',    colorKey: 'default',  preview: <div style={{ width: 190 }}><Textarea placeholder="Default" rows={3} /></div> },
        { label: 'With label', colorKey: 'default',  preview: <div style={{ width: 190 }}><Textarea label="Notes" placeholder="With label" rows={3} /></div> },
        { label: 'Error',      colorKey: 'error',    preview: <div style={{ width: 190 }}><Textarea label="Bio" error="Bio is required." rows={3} /></div> },
        { label: 'Disabled',   colorKey: 'disabled', preview: <div style={{ width: 190 }}><Textarea placeholder="Disabled" disabled rows={3} /></div> },
      ]}
    />

    <DocGuidelines
      description="Use Textarea when users need more than one line. Keep maxLength generous — let users express themselves."
      dos={[
        'Set rows to match the expected content length — 3 for short, 6+ for long',
        'Show char count when length is limited and the limit matters to the user',
        'Use hint text to clarify format — e.g. "Include context for reviewers"',
        'Display error inline and immediately after the field on blur',
      ]}
      donts={[
        "Don't set maxLength too short — it frustrates users mid-sentence",
        "Don't disable resize without a good reason — users adjust to their content",
        "Don't use Textarea for a single short field — use Input instead",
        "Don't show character count for unlimited fields — it adds confusion",
      ]}
    />

    <DocAccessibility
      description="Textarea is built on a native <textarea> element with full ARIA and keyboard support."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Native <textarea> element — no custom role needed', 'aria-invalid set automatically on error state', 'aria-describedby links textarea to hint or error text'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Tab focuses the textarea', 'Enter creates a new line (native browser behaviour)', 'Shift+Tab moves backwards', 'Resize handle is keyboard-accessible'] },
        { icon: '◐', title: 'Color Contrast', items: ['Placeholder text: ≥ 4.5:1 on textarea background', 'Error border: ≥ 3.0:1 on page background', 'Char count muted color still meets ≥ 4.5:1'] },
        { icon: '📢', title: 'Screen Readers', items: ['Label linked via htmlFor/id', 'Error or hint announced via aria-describedby', 'Character count change announced via aria-live polite'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'label',         type: 'string',   default: '—',     description: 'Label rendered above the textarea.' },
        { name: 'hint',          type: 'string',   default: '—',     description: 'Helper text below the textarea.' },
        { name: 'error',         type: 'string',   default: '—',     description: 'Error message with red border and aria-invalid. Replaces hint.' },
        { name: 'placeholder',   type: 'string',   default: '—',     description: 'Placeholder text shown when empty.' },
        { name: 'rows',          type: 'number',   default: '3',     description: 'Number of visible text lines.' },
        { name: 'maxLength',     type: 'number',   default: '—',     description: 'Maximum character count.' },
        { name: 'showCharCount', type: 'boolean',  default: 'false', description: 'Shows remaining characters in the bottom-right.' },
        { name: 'resize',        type: 'boolean',  default: 'true',  description: 'Allows vertical resize by the user.' },
        { name: 'required',      type: 'boolean',  default: 'false', description: 'Shows asterisk on label and sets required attribute.' },
        { name: 'disabled',      type: 'boolean',  default: 'false', description: 'Prevents interaction and dims the field.' },
      ]}
    />

    <DocTokens
      description="Textarea shares the same token structure as Input for consistent visual language."
      groups={[
        { title: 'Color Tokens', tokens: ['textarea/color/background', 'textarea/color/border/default', 'textarea/color/border/error', 'textarea/color/border/focus', 'textarea/color/placeholder'] },
        { title: 'Size Tokens',  tokens: ['textarea/size/padding-x', 'textarea/size/padding-y', 'textarea/size/font-size', 'textarea/size/border-radius'] },
        { title: 'Typography',   tokens: ['textarea/typography/font-size', 'textarea/typography/line-height', 'textarea/typography/label/font-weight'] },
      ]}
    />

    <DocSpecs
      description="Textarea has a single size — rows control apparent height."
      sizes={[
        { label: '2 rows',  badge: '2R', rows: [{ label: 'min-height', value: '~60px' },  { label: 'padding-x', value: '12px' }, { label: 'padding-y', value: '10px' }, { label: 'font', value: '14px' }] },
        { label: '4 rows',  badge: '4R', rows: [{ label: 'min-height', value: '~96px' },  { label: 'padding-x', value: '12px' }, { label: 'padding-y', value: '10px' }, { label: 'font', value: '14px' }] },
        { label: '6 rows',  badge: '6R', rows: [{ label: 'min-height', value: '~132px' }, { label: 'padding-x', value: '12px' }, { label: 'padding-y', value: '10px' }, { label: 'font', value: '14px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Input',     description: 'For single-line text entry.',            href: '#/input' },
      { name: 'Dropdown',  description: 'For selecting from a list of options.',  href: '#/dropdown' },
      { name: 'Checkbox',  description: 'For multi-option selection.',            href: '#/checkbox' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — label, hint, error, char count, resize control, full ARIA support.' },
    ]} />
  </DocPage>
);

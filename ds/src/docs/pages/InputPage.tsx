import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Input } from '../../components/Input/Input';
import { SelectControl, ToggleControl } from '../components/DocPage';

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
    <ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" strokeWidth="1.25"/>
    <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.25"/>
  </svg>
);

const InputPlayground: React.FC = () => {
  const [size, setSize] = React.useState('md');
  const [hasLabel, setHasLabel] = React.useState(true);
  const [hasHint, setHasHint] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [hasLeftIcon, setHasLeftIcon] = React.useState(false);
  const [hasRightIcon, setHasRightIcon] = React.useState(false);
  const [required, setRequired] = React.useState(false);

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Size" value={size} onChange={setSize}
            options={[{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }]} />
          <ToggleControl label="Label"      checked={hasLabel}     onChange={setHasLabel} />
          <ToggleControl label="Hint"       checked={hasHint}      onChange={setHasHint} />
          <ToggleControl label="Required"   checked={required}     onChange={setRequired} />
          <ToggleControl label="Left Icon"  checked={hasLeftIcon}  onChange={setHasLeftIcon} />
          <ToggleControl label="Right Icon" checked={hasRightIcon} onChange={setHasRightIcon} />
          <ToggleControl label="Error"      checked={hasError}     onChange={setHasError} />
          <ToggleControl label="Disabled"   checked={disabled}     onChange={setDisabled} />
        </>
      }
    >
      <div style={{ width: 280 }}>
        <Input
          label={hasLabel ? 'Email address' : undefined}
          hint={hasHint && !hasError ? "We'll never share your email." : undefined}
          error={hasError ? 'Please enter a valid email address.' : undefined}
          placeholder="Enter email"
          size={size as any}
          disabled={disabled}
          required={required}
          leftIcon={hasLeftIcon ? <SearchIcon /> : undefined}
          rightIcon={hasRightIcon ? <EyeIcon /> : undefined}
          type="email"
        />
      </div>
    </DocPlayground>
  );
};

export const InputPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Input"
      tagline="Single-line text collection, built for clarity."
      description="The Input component handles all single-line text entry. Supports labels, hint text, error states, required indicators, and leading/trailing icons — in three sizes."
      status="stable"
      version="v1.0"
      stats={[
        { value: 3, label: 'Sizes' },
        { value: 4, label: 'States' },
        { value: 2, label: 'Icon slots' },
        { value: 12, label: 'Input types' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Single-line text entry — name, email, search, URL' },
        { text: 'Form fields with validation feedback (error state)' },
        { text: 'Search boxes — use leftIcon for the search icon' },
        { text: 'Password fields — use rightIcon for show/hide toggle' },
      ]}
      dontUse={[
        { text: 'Multi-line input — use Textarea instead' },
        { text: 'Option selection — use Dropdown or Radio instead' },
        { text: 'Binary choices — use Toggle or Checkbox instead' },
        { text: 'Rich text — use a dedicated editor component' },
      ]}
    />

    <InputPlayground />

    <DocCodeExample code={`import { Input } from '@ds/components';

<Input
  label="Email address"
  placeholder="Enter email"
  hint="We'll never share your email."
  type="email"
/>

<Input
  label="Search"
  placeholder="Search..."
  size="sm"
  leftIcon={<SearchIcon />}
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters."
  rightIcon={<EyeIcon />}
/>`} />

    <DocAnatomy
      description="An Input is built from up to five layers. Label and hint are optional; error replaces hint when set."
      preview={
        <div style={{ width: 260 }}>
          <Input label="Email address" placeholder="Enter email" hint="We'll never share your email." leftIcon={<SearchIcon />} />
        </div>
      }
      callouts={[
        { name: 'Label', description: 'Optional field label above the input. Asterisk added when required.' },
        { name: 'Left Icon', description: 'Optional icon slot — search, email, user glyphs.' },
        { name: 'Input Field', description: 'The native input element. Full keyboard and ARIA support.' },
        { name: 'Right Icon', description: 'Optional trailing icon — password toggle, clear button.' },
        { name: 'Hint / Error', description: 'Hint text shown by default; replaced by error message on invalid state.' },
      ]}
    />

    <DocVariants
      description="Input derives its visual treatment from state, not semantic variant. The three sizes control height and font."
      variants={[
        { label: 'Small',  description: 'Compact forms, dense tables, filter bars.',     preview: <div style={{ width: 200 }}><Input size="sm" placeholder="Small" /></div> },
        { label: 'Medium', description: 'Default. Most forms and modal inputs.',          preview: <div style={{ width: 200 }}><Input size="md" placeholder="Medium" /></div> },
        { label: 'Large',  description: 'Hero search bars, prominent form entry points.', preview: <div style={{ width: 200 }}><Input size="lg" placeholder="Large" /></div> },
      ]}
    />

    <DocStates
      description="Input has four interactive states. Error state coexists with focus and typing."
      states={[
        { label: 'Default',   colorKey: 'default',  preview: <div style={{ width: 180 }}><Input placeholder="Default" /></div> },
        { label: 'With label',colorKey: 'default',  preview: <div style={{ width: 180 }}><Input label="Name" placeholder="With label" /></div> },
        { label: 'Error',     colorKey: 'error',    preview: <div style={{ width: 180 }}><Input label="Email" placeholder="Error state" error="Invalid email." /></div> },
        { label: 'Disabled',  colorKey: 'disabled', preview: <div style={{ width: 180 }}><Input placeholder="Disabled" disabled /></div> },
        { label: 'With icons',colorKey: 'default',  preview: <div style={{ width: 180 }}><Input placeholder="Search" leftIcon={<SearchIcon />} rightIcon={<EyeIcon />} /></div> },
        { label: 'Required',  colorKey: 'active',   preview: <div style={{ width: 180 }}><Input label="Email" placeholder="Required" required /></div> },
      ]}
    />

    <DocGuidelines
      description="Write labels as short nouns. Reserve hint text for format guidance, not repetition of the label."
      dos={[
        'Write labels as short, clear nouns — "Email address", "Full name"',
        'Use hint text to clarify format — e.g. "MM/DD/YYYY" for date fields',
        'Show error messages inline, immediately after blur or submit',
        'Use leftIcon for input type context (search, email, lock)',
      ]}
      donts={[
        "Don't rely on placeholder as the label — it disappears on type",
        "Don't show error before the user has interacted with the field",
        "Don't use right icon for decoration — only actionable or semantic icons",
        "Don't use Input for numeric steppers — use a dedicated number input",
      ]}
    />

    <DocAccessibility
      description="Input is built on a native <input> element with full ARIA and keyboard support."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Native <input> element — no custom role needed', 'aria-invalid set automatically on error state', 'aria-required set when required prop is true', 'aria-describedby links input to hint or error text'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Tab moves focus to and from the input', 'Type to enter text as expected', 'Shift+Tab to move backwards', 'Right icon button receives its own Tab stop'] },
        { icon: '◐', title: 'Color Contrast', items: ['Placeholder text: ≥ 4.5:1 on input background', 'Error border: ≥ 3.0:1 on page background', 'Icon color matches text — inherits currentColor'] },
        { icon: '📢', title: 'Screen Readers', items: ['Label is programmatically linked via htmlFor/id', 'Error message announced via aria-describedby', 'Required asterisk is aria-hidden — "required" in label'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'label',     type: 'string',                  default: '—',      description: 'Field label rendered above the input.' },
        { name: 'hint',      type: 'string',                  default: '—',      description: 'Helper text rendered below the input.' },
        { name: 'error',     type: 'string',                  default: '—',      description: 'Error message; sets aria-invalid and red border. Replaces hint.' },
        { name: 'size',      type: "'sm' | 'md' | 'lg'",      default: "'md'",   description: 'Controls height and padding.' },
        { name: 'leftIcon',  type: 'React.ReactNode',         default: '—',      description: 'Icon displayed inside the left edge.' },
        { name: 'rightIcon', type: 'React.ReactNode',         default: '—',      description: 'Icon displayed inside the right edge.' },
        { name: 'required',  type: 'boolean',                 default: 'false',  description: 'Shows asterisk on label and sets required attribute.' },
        { name: 'disabled',  type: 'boolean',                 default: 'false',  description: 'Prevents interaction and dims the field.' },
        { name: 'type',      type: 'string',                  default: "'text'", description: 'Native input type — email, password, search, url, etc.' },
        { name: 'placeholder', type: 'string',               default: '—',      description: 'Placeholder text shown when empty.' },
      ]}
    />

    <DocTokens
      description="All Input visual properties flow through the three-tier token chain."
      groups={[
        { title: 'Color Tokens', tokens: ['input/color/background', 'input/color/border/default', 'input/color/border/error', 'input/color/border/focus', 'input/color/placeholder', 'input/color/text'] },
        { title: 'Size Tokens',  tokens: ['input/size/{size}/height', 'input/size/{size}/padding-x', 'input/size/{size}/font-size', 'input/size/{size}/icon-size'] },
        { title: 'Typography',   tokens: ['input/typography/font-size', 'input/typography/line-height', 'input/typography/label/font-weight'] },
      ]}
    />

    <DocSpecs
      description="Exact measurements for all Input sizes."
      sizes={[
        { label: 'Small',  badge: 'SM', rows: [{ label: 'height', value: '32px' }, { label: 'padding-x', value: '10px' }, { label: 'font', value: '13px' }, { label: 'icon', value: '14px' }] },
        { label: 'Medium', badge: 'MD', rows: [{ label: 'height', value: '40px' }, { label: 'padding-x', value: '12px' }, { label: 'font', value: '14px' }, { label: 'icon', value: '16px' }] },
        { label: 'Large',  badge: 'LG', rows: [{ label: 'height', value: '48px' }, { label: 'padding-x', value: '14px' }, { label: 'font', value: '16px' }, { label: 'icon', value: '18px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Textarea',  description: 'For multi-line text entry.',               href: '#/textarea' },
      { name: 'Dropdown',  description: 'For selecting from a list of options.',    href: '#/dropdown' },
      { name: 'Checkbox',  description: 'For boolean or multi-select choices.',     href: '#/checkbox' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — 3 sizes, error/hint/label/icon slots, full ARIA support.' },
    ]} />
  </DocPage>
);

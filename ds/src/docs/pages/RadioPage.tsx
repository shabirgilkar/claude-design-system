import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Radio, RadioGroup } from '../../components/Radio/Radio';
import { ToggleControl } from '../components/DocPage';

const RadioPlayground: React.FC = () => {
  const [value, setValue] = React.useState('email');
  const [disabled, setDisabled] = React.useState(false);
  const [hasDescriptions, setHasDescriptions] = React.useState(false);
  const [hasGroupLabel, setHasGroupLabel] = React.useState(true);

  const options = [
    { value: 'email', label: 'Email',             description: 'Receive updates via email' },
    { value: 'sms',   label: 'SMS',               description: 'Get text messages on your phone' },
    { value: 'push',  label: 'Push notification', description: 'In-app notifications only' },
  ];

  return (
    <DocPlayground
      controls={
        <>
          <ToggleControl label="Group Label"   checked={hasGroupLabel}   onChange={setHasGroupLabel} />
          <ToggleControl label="Descriptions"  checked={hasDescriptions} onChange={setHasDescriptions} />
          <ToggleControl label="Disabled"      checked={disabled}        onChange={setDisabled} />
        </>
      }
    >
      <RadioGroup label={hasGroupLabel ? 'Preferred contact method' : undefined}>
        {options.map((o) => (
          <Radio
            key={o.value}
            name="contact-playground"
            value={o.value}
            label={o.label}
            description={hasDescriptions ? o.description : undefined}
            checked={value === o.value}
            disabled={disabled}
            onChange={() => setValue(o.value)}
          />
        ))}
      </RadioGroup>
    </DocPlayground>
  );
};

export const RadioPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Radio"
      tagline="Mutually exclusive selection from a visible set."
      description="Radio buttons allow users to select exactly one option from a group. Use RadioGroup to associate buttons semantically. Supports optional description text per option and a disabled state."
      status="stable"
      version="v1.0"
      stats={[
        { value: 3, label: 'States' },
        { value: 2, label: 'Label lines' },
        { value: '2–7', label: 'Ideal group size' },
        { value: 1, label: 'Selection per group' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Mutually exclusive choices — exactly one option must be selected' },
        { text: '2–7 options — visible at once, no scrolling needed' },
        { text: 'Settings with descriptions — plan selection, notification preferences' },
        { text: 'Form fields where the default value must be explicit' },
      ]}
      dontUse={[
        { text: 'More than 7 options — use Dropdown to save space' },
        { text: 'Multi-select — use Checkbox instead' },
        { text: 'Immediate-effect toggles — use Toggle instead' },
        { text: 'Navigation — use Tabs or links' },
      ]}
    />

    <RadioPlayground />

    <DocCodeExample code={`import { Radio, RadioGroup } from '@ds/components';

<RadioGroup label="Preferred contact method">
  <Radio
    name="contact"
    value="email"
    label="Email"
    description="Receive updates via email"
    checked={value === 'email'}
    onChange={() => setValue('email')}
  />
  <Radio
    name="contact"
    value="sms"
    label="SMS"
    checked={value === 'sms'}
    onChange={() => setValue('sms')}
  />
</RadioGroup>`} />

    <DocAnatomy
      description="A Radio consists of the circular control, a label, and an optional description. RadioGroup wraps multiple Radios with a shared fieldset and legend."
      preview={
        <RadioGroup label="Plan type">
          <Radio name="plan-demo" value="starter" label="Starter"     description="For individuals and small projects." checked onChange={() => {}} />
          <Radio name="plan-demo" value="pro"     label="Pro"         description="For teams that need more power." />
          <Radio name="plan-demo" value="ent"     label="Enterprise"  description="Custom limits and SLA." />
        </RadioGroup>
      }
      callouts={[
        { name: 'Group Label', description: 'The RadioGroup legend — names the question being answered.' },
        { name: 'Control', description: 'Circular input with filled dot when selected.' },
        { name: 'Label', description: 'Option name. Clickable — clicking toggles selection.' },
        { name: 'Description', description: 'Optional supporting text below the label for context.' },
      ]}
    />

    <DocVariants
      description="Radio groups adapt to context through label and description configuration."
      variants={[
        { label: 'Labels only',       description: 'Compact — no descriptions.',                    preview: <RadioGroup><Radio name="v1" value="a" label="Option A" checked onChange={() => {}} /><Radio name="v1" value="b" label="Option B" /></RadioGroup> },
        { label: 'With descriptions', description: 'Each option has supporting detail text.',        preview: <RadioGroup><Radio name="v2" value="a" label="Starter" description="Free forever." checked onChange={() => {}} /><Radio name="v2" value="b" label="Pro" description="$12/month." /></RadioGroup> },
        { label: 'With group label',  description: 'Fieldset legend provides question context.',    preview: <RadioGroup label="Contact method"><Radio name="v3" value="email" label="Email" checked onChange={() => {}} /><Radio name="v3" value="sms" label="SMS" /></RadioGroup> },
        { label: 'Mixed disabled',    description: 'Individual options can be non-selectable.',     preview: <RadioGroup><Radio name="v4" value="a" label="Available" checked onChange={() => {}} /><Radio name="v4" value="b" label="Unavailable" disabled /></RadioGroup> },
      ]}
    />

    <DocStates
      description="Individual Radio buttons have three states: unselected, selected, and disabled."
      states={[
        { label: 'Unselected',        colorKey: 'default',  preview: <Radio label="Unselected"       name="ds" value="a" /> },
        { label: 'Selected',          colorKey: 'active',   preview: <Radio label="Selected"         name="ds" value="b" checked onChange={() => {}} /> },
        { label: 'Disabled',          colorKey: 'disabled', preview: <Radio label="Disabled"         name="ds" value="c" disabled /> },
        { label: 'Disabled selected', colorKey: 'disabled', preview: <Radio label="Disabled selected" name="ds" value="d" disabled checked onChange={() => {}} /> },
        { label: 'With description',  colorKey: 'active',   preview: <Radio label="With description" description="Context text." name="ds" value="e" checked onChange={() => {}} /> },
      ]}
    />

    <DocGuidelines
      description="Group Radios with RadioGroup always. Never use a standalone Radio without an associated group."
      dos={[
        'Always wrap Radios in a RadioGroup — this provides fieldset/legend for accessibility',
        'Pre-select a default value when one option is the obvious best choice',
        'Limit groups to 2–7 options — use Dropdown for longer lists',
        'Write option labels as nouns, not sentences',
      ]}
      donts={[
        "Don't use Radio when more than one option can be selected — use Checkbox",
        "Don't leave groups with no default — users expect one to be pre-selected",
        "Don't use Radio for binary yes/no — use Toggle or a single Checkbox",
        "Don't nest Radio groups — use a separate set of inputs",
      ]}
    />

    <DocAccessibility
      description="Radio is built on native <input type='radio'> inside a <fieldset>/<legend> structure."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Native radio input — role="radio" implicit', 'RadioGroup renders <fieldset> + <legend>', 'aria-checked reflects selected state', 'aria-describedby links to description when present'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Tab to focus first Radio in group', 'Arrow keys to move between options', 'Space to select focused option', 'Tab to move out of the group'] },
        { icon: '◐', title: 'Color Contrast', items: ['Filled dot: ≥ 4.5:1 on selected background', 'Border: ≥ 3.0:1 on page background', 'Label text: ≥ 4.5:1 on page background'] },
        { icon: '📢', title: 'Screen Readers', items: ['Group question announced via legend', 'State announced as "selected" or "not selected"', 'Description read as accessible description', 'Arrow key movement announced automatically'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'label',       type: 'string',                   default: '—',     description: 'Radio: Label rendered next to the radio button.' },
        { name: 'description', type: 'string',                   default: '—',     description: 'Radio: Secondary text below the label.' },
        { name: 'value',       type: 'string',  required: true,                    description: 'Radio: Value submitted with the form.' },
        { name: 'name',        type: 'string',  required: true,                    description: 'Radio: Group name — all radios in a group share the same name.' },
        { name: 'checked',     type: 'boolean',                  default: '—',     description: 'Radio: Controlled checked state.' },
        { name: 'defaultChecked', type: 'boolean',               default: 'false', description: 'Radio: Uncontrolled initial checked state.' },
        { name: 'onChange',    type: '(e: ChangeEvent) => void', default: '—',     description: 'Radio: Fired when this option is selected.' },
        { name: 'disabled',    type: 'boolean',                  default: 'false', description: 'Radio: Prevents interaction.' },
        { name: 'label',       type: 'string',                   default: '—',     description: 'RadioGroup: Legend text rendered above the radio group (fieldset).' },
        { name: 'children',    type: 'React.ReactNode', required: true,            description: 'RadioGroup: Radio components to render inside the group.' },
      ]}
    />

    <DocTokens
      description="Radio tokens cover the control, label, description, and focus ring."
      groups={[
        { title: 'Color Tokens',  tokens: ['radio/color/border/unselected', 'radio/color/border/selected', 'radio/color/dot/selected', 'radio/color/label', 'radio/color/description'] },
        { title: 'Size Tokens',   tokens: ['radio/size/control', 'radio/size/dot', 'radio/size/label-font', 'radio/size/gap'] },
        { title: 'Focus & State', tokens: ['radio/focus/ring-color', 'radio/focus/ring-width', 'radio/state/disabled-opacity'] },
      ]}
    />

    <DocSpecs
      description="Radio control and layout measurements (single size)."
      sizes={[
        { label: 'Control', badge: 'CT', rows: [{ label: 'outer', value: '16px' }, { label: 'dot', value: '8px' }, { label: 'border', value: '1.5px' }, { label: 'gap', value: '8px' }] },
        { label: 'Label',   badge: 'LB', rows: [{ label: 'font', value: '14px' }, { label: 'line-h', value: '20px' }, { label: 'desc-font', value: '13px' }, { label: 'stack-gap', value: '2px' }] },
        { label: 'Group',   badge: 'GR', rows: [{ label: 'legend-font', value: '13px' }, { label: 'item-gap', value: '12px' }, { label: 'legend-mb', value: '8px' }, { label: 'border', value: 'none' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Checkbox', description: 'For multi-selection from a group.',        href: '#/checkbox' },
      { name: 'Toggle',   description: 'For immediate binary switches.',           href: '#/toggle' },
      { name: 'Dropdown', description: 'For selecting from a long list.',          href: '#/dropdown' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — RadioGroup with fieldset/legend, description text per option, disabled state, full keyboard navigation.' },
    ]} />
  </DocPage>
);

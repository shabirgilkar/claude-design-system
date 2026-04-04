import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { SelectControl, ToggleControl } from '../components/DocPage';

const CheckboxPlayground: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [size, setSize] = React.useState('md');
  const [hasDescription, setHasDescription] = React.useState(false);

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Size" value={size} onChange={setSize}
            options={[{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }]} />
          <ToggleControl label="Checked"       checked={checked}        onChange={setChecked} />
          <ToggleControl label="Indeterminate" checked={indeterminate}  onChange={setIndeterminate} />
          <ToggleControl label="Description"   checked={hasDescription} onChange={setHasDescription} />
          <ToggleControl label="Disabled"      checked={disabled}       onChange={setDisabled} />
        </>
      }
    >
      <Checkbox
        label="I agree to the terms and conditions"
        description={hasDescription ? 'By checking this box you accept our Terms of Service and Privacy Policy.' : undefined}
        size={size as any}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={(e) => { setChecked(e.target.checked); setIndeterminate(false); }}
      />
    </DocPlayground>
  );
};

export const CheckboxPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Checkbox"
      tagline="Independent boolean input with clear selection states."
      description="Checkbox allows users to select one or more options independently. Supports checked, indeterminate (partial selection), and disabled states — in three sizes with optional description text."
      status="stable"
      version="v1.0"
      stats={[
        { value: 3, label: 'Sizes' },
        { value: 3, label: 'States' },
        { value: 2, label: 'Label lines' },
        { value: 9, label: 'Combos' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Multi-select — enabling several options from a list independently' },
        { text: 'Terms acceptance — "I agree to the terms and conditions"' },
        { text: 'Settings toggles — when the action takes effect on form submit' },
        { text: 'Select all / partial — parent checkbox with indeterminate state' },
      ]}
      dontUse={[
        { text: 'Mutually exclusive choices — use Radio instead' },
        { text: 'Immediate-effect toggles — use Toggle instead' },
        { text: 'Selecting from a long list — use a multi-select Dropdown' },
        { text: 'Navigation — use links or Tabs' },
      ]}
    />

    <CheckboxPlayground />

    <DocCodeExample code={`import { Checkbox } from '@ds/components';

<Checkbox
  label="I agree to the terms"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

<Checkbox
  label="Enable feature flag"
  description="All users will see the new experience."
  size="lg"
/>

// Parent checkbox with indeterminate state
<Checkbox
  label="Select all"
  indeterminate={someChecked && !allChecked}
  checked={allChecked}
  onChange={handleSelectAll}
/>`} />

    <DocAnatomy
      description="A Checkbox is built from the control box, an optional checkmark or dash indicator, and a label with optional description."
      preview={
        <Checkbox
          label="Enable feature flag"
          description="When enabled, all users in this workspace will see the new experience."
          size="md"
          checked
          onChange={() => {}}
        />
      }
      callouts={[
        { name: 'Control Box', description: 'Square input with variant-specific border, background, and radius.' },
        { name: 'Check Icon', description: 'Checkmark shown on checked. Dash icon shown on indeterminate.' },
        { name: 'Label', description: 'Primary text. Semibold. Clickable — clicking label toggles the checkbox.' },
        { name: 'Description', description: 'Optional secondary text below the label for additional context.' },
      ]}
    />

    <DocVariants
      description="Checkbox has three sizes. All sizes support all three states."
      variants={[
        { label: 'Small',  description: 'Dense lists, table rows, compact forms.',  preview: <Checkbox label="Small"  size="sm" checked onChange={() => {}} /> },
        { label: 'Medium', description: 'Default. Standard form use.',              preview: <Checkbox label="Medium" size="md" checked onChange={() => {}} /> },
        { label: 'Large',  description: 'Touch targets, accessibility-first forms.', preview: <Checkbox label="Large"  size="lg" checked onChange={() => {}} /> },
      ]}
    />

    <DocStates
      description="Three interactive states — unchecked, checked, and indeterminate — plus a disabled overlay."
      states={[
        { label: 'Unchecked',         colorKey: 'default',  preview: <Checkbox label="Unchecked" /> },
        { label: 'Checked',           colorKey: 'active',   preview: <Checkbox label="Checked" checked onChange={() => {}} /> },
        { label: 'Indeterminate',     colorKey: 'active',   preview: <Checkbox label="Indeterminate" indeterminate onChange={() => {}} /> },
        { label: 'Disabled',          colorKey: 'disabled', preview: <Checkbox label="Disabled" disabled /> },
        { label: 'Disabled checked',  colorKey: 'disabled', preview: <Checkbox label="Disabled checked" disabled checked onChange={() => {}} /> },
        { label: 'With description',  colorKey: 'default',  preview: <Checkbox label="With description" description="Secondary context." checked onChange={() => {}} /> },
      ]}
    />

    <DocGuidelines
      description="Labels should complete the sentence 'I want to…' or describe the setting being toggled."
      dos={[
        'Write labels as positive statements — "Send me email updates" not "Don\'t send emails"',
        'Use indeterminate state for parent checkboxes when children are partially selected',
        'Group related checkboxes with a fieldset and legend for screen readers',
        'Make the entire label area clickable — users expect this',
      ]}
      donts={[
        "Don't use Checkbox for a single yes/no that takes immediate effect — use Toggle",
        "Don't use negative labels — confusing when checked means \"don't do this\"",
        "Don't show more than 7-8 checkboxes without grouping or search",
        "Don't rely on indeterminate state as a permanent visual — it's a transitional state",
      ]}
    />

    <DocAccessibility
      description="Checkbox is built on native <input type='checkbox'> for full browser and assistive tech compatibility."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Native checkbox input — role="checkbox" implicit', 'aria-checked: "true", "false", or "mixed" (indeterminate)', 'aria-describedby links to description text when present'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Tab to focus', 'Space to toggle checked state', 'Label click also toggles (native htmlFor)', 'Shift+Tab to move backwards'] },
        { icon: '◐', title: 'Color Contrast', items: ['Check icon: ≥ 4.5:1 on checked background', 'Border: ≥ 3.0:1 on page background', 'Label text: ≥ 4.5:1 on page background'] },
        { icon: '📢', title: 'Screen Readers', items: ['State announced as "checked", "not checked", or "mixed"', 'Label text read as accessible name', 'Description read as accessible description', 'Group context provided via fieldset/legend'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'label',         type: 'string',                      default: '—',     description: 'Label text next to the checkbox.' },
        { name: 'description',   type: 'string',                      default: '—',     description: 'Secondary text below the label.' },
        { name: 'size',          type: "'sm' | 'md' | 'lg'",          default: "'md'",  description: 'Controls checkbox box size.' },
        { name: 'indeterminate', type: 'boolean',                     default: 'false', description: 'Shows dash icon for partial selection (mixed state).' },
        { name: 'checked',       type: 'boolean',                     default: '—',     description: 'Controlled checked state.' },
        { name: 'defaultChecked',type: 'boolean',                     default: 'false', description: 'Uncontrolled initial checked state.' },
        { name: 'onChange',      type: '(e: ChangeEvent) => void',    default: '—',     description: 'Fired when checked state changes.' },
        { name: 'disabled',      type: 'boolean',                     default: 'false', description: 'Prevents interaction.' },
      ]}
    />

    <DocTokens
      description="Checkbox tokens cover the control box, indicator, label, and focus ring."
      groups={[
        { title: 'Color Tokens',  tokens: ['checkbox/color/border/unchecked', 'checkbox/color/border/checked', 'checkbox/color/background/checked', 'checkbox/color/check-icon', 'checkbox/color/label'] },
        { title: 'Size Tokens',   tokens: ['checkbox/size/{size}/box', 'checkbox/size/{size}/icon', 'checkbox/size/{size}/label-font', 'checkbox/size/{size}/gap'] },
        { title: 'Focus & State', tokens: ['checkbox/focus/ring-color', 'checkbox/focus/ring-width', 'checkbox/state/disabled-opacity'] },
      ]}
    />

    <DocSpecs
      description="Exact measurements for all Checkbox sizes."
      sizes={[
        { label: 'Small',  badge: 'SM', rows: [{ label: 'box', value: '14px' }, { label: 'icon', value: '10px' }, { label: 'label', value: '13px' }, { label: 'gap', value: '8px' }] },
        { label: 'Medium', badge: 'MD', rows: [{ label: 'box', value: '16px' }, { label: 'icon', value: '12px' }, { label: 'label', value: '14px' }, { label: 'gap', value: '8px' }] },
        { label: 'Large',  badge: 'LG', rows: [{ label: 'box', value: '20px' }, { label: 'icon', value: '14px' }, { label: 'label', value: '15px' }, { label: 'gap', value: '10px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Radio',    description: 'For mutually exclusive single-selection.',    href: '#/radio' },
      { name: 'Toggle',   description: 'For immediate-effect binary switches.',       href: '#/toggle' },
      { name: 'Dropdown', description: 'For selecting from a long list of options.',  href: '#/dropdown' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — 3 sizes, indeterminate state, description text, full ARIA support.' },
    ]} />
  </DocPage>
);

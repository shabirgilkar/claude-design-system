import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { SelectControl, ToggleControl, TextControl } from '../components/DocPage';

const FrameworkIcon: React.FC<{ letter: string; color: string }> = ({ letter, color }) => (
  <svg viewBox="0 0 16 16" width="14" height="14">
    <circle cx="8" cy="8" r="7" fill={color} opacity="0.2" />
    <text x="8" y="11.5" textAnchor="middle" fontSize="9" fontWeight="700" fill={color} fontFamily="monospace">{letter}</text>
  </svg>
);

const OPTS_PLAIN = [
  { value: 'react',   label: 'React' },
  { value: 'vue',     label: 'Vue' },
  { value: 'angular', label: 'Angular', disabled: true },
  { value: 'svelte',  label: 'Svelte' },
  { value: 'solid',   label: 'Solid' },
];

const OPTS_ICONS = [
  { value: 'react',   label: 'React',   icon: <FrameworkIcon letter="R" color="#61DAFB" /> },
  { value: 'vue',     label: 'Vue',     icon: <FrameworkIcon letter="V" color="#42B883" /> },
  { value: 'angular', label: 'Angular', icon: <FrameworkIcon letter="A" color="#DD0031" />, disabled: true },
  { value: 'svelte',  label: 'Svelte',  icon: <FrameworkIcon letter="S" color="#FF3E00" /> },
  { value: 'solid',   label: 'Solid',   icon: <FrameworkIcon letter="S" color="#2C4F7C" /> },
];

const DropdownPlayground: React.FC = () => {
  const [disabled, setDisabled] = React.useState(false);
  const [hasLabel, setHasLabel] = React.useState(true);
  const [showIcons, setShowIcons] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState('Pick a framework');
  const [val, setVal] = React.useState('');

  return (
    <DocPlayground
      controls={
        <>
          <TextControl   label="Placeholder"  value={placeholder} onChange={setPlaceholder} />
          <ToggleControl label="Label"        checked={hasLabel}  onChange={setHasLabel} />
          <ToggleControl label="Option Icons" checked={showIcons} onChange={setShowIcons} />
          <ToggleControl label="Disabled"     checked={disabled}  onChange={setDisabled} />
        </>
      }
    >
      <div style={{ width: 220 }}>
        <Dropdown
          label={hasLabel ? 'Framework' : undefined}
          options={showIcons ? OPTS_ICONS : OPTS_PLAIN}
          value={val}
          onChange={setVal}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </DocPlayground>
  );
};

export const DropdownPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Dropdown"
      tagline="Compact option selection with keyboard and icon support."
      description="Dropdown lets users select one option from a collapsible list. Supports optional icons per option, disabled options, label, controlled and uncontrolled modes."
      status="stable"
      version="v1.0"
      stats={[
        { value: 4, label: 'States' },
        { value: 2, label: 'Modes' },
        { value: '∞', label: 'Options' },
        { value: 1, label: 'Selection' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Selecting one option from 4+ choices — more than Radio can comfortably display' },
        { text: 'Filtering or sorting lists — status, category, date range' },
        { text: 'Form fields where space is limited' },
        { text: 'Navigation selectors — country, language, timezone' },
      ]}
      dontUse={[
        { text: 'Fewer than 3 options — use Radio instead' },
        { text: 'Multi-select — use a dedicated multi-select component' },
        { text: 'Navigation links — use a nav component or links' },
        { text: 'Boolean toggles — use Toggle or Checkbox instead' },
      ]}
    />

    <DropdownPlayground />

    <DocCodeExample code={`import { Dropdown } from '@ds/components';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue',   label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

<Dropdown
  label="Framework"
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Pick a framework"
/>

// With icons per option
const iconOptions = [
  { value: 'react', label: 'React', icon: <ReactIcon /> },
  { value: 'vue',   label: 'Vue',   icon: <VueIcon /> },
];

<Dropdown options={iconOptions} placeholder="Select" />`} />

    <DocAnatomy
      description="Dropdown is built from a trigger and a floating menu panel. The panel opens on trigger click and closes on selection or outside click."
      preview={
        <div style={{ width: 200 }}>
          <Dropdown label="Framework" options={OPTS_PLAIN} placeholder="Pick a framework" />
        </div>
      }
      callouts={[
        { name: 'Label', description: 'Optional field label above the trigger.' },
        { name: 'Trigger', description: 'Button-like element showing selected value or placeholder, with chevron icon.' },
        { name: 'Menu Panel', description: 'Floating list of options. Positions below trigger, scrollable on overflow.' },
        { name: 'Option', description: 'Each row: optional icon, label text, disabled state.' },
        { name: 'Chevron', description: 'Rotates 180° when menu is open.' },
      ]}
    />

    <DocVariants
      description="Dropdown adapts to context through option configuration rather than visual variants."
      variants={[
        { label: 'Plain options',    description: 'Text-only options — the default.',              preview: <div style={{ width: 180 }}><Dropdown options={OPTS_PLAIN} placeholder="Select" /></div> },
        { label: 'With icons',       description: 'Icon precedes each option label.',              preview: <div style={{ width: 180 }}><Dropdown options={OPTS_ICONS} placeholder="Select" /></div> },
        { label: 'With label',       description: 'Label above the trigger for form context.',     preview: <div style={{ width: 180 }}><Dropdown options={OPTS_PLAIN} label="Framework" placeholder="Select" /></div> },
        { label: 'Disabled options', description: 'Individual options can be non-selectable.',    preview: <div style={{ width: 180 }}><Dropdown options={OPTS_PLAIN} placeholder="Select (Angular disabled)" /></div> },
      ]}
    />

    <DocStates
      description="Dropdown has four interactive states."
      states={[
        { label: 'Default',  colorKey: 'default',  preview: <div style={{ width: 170 }}><Dropdown options={OPTS_PLAIN} placeholder="Default" /></div> },
        { label: 'Selected', colorKey: 'active',   preview: <div style={{ width: 170 }}><Dropdown options={OPTS_PLAIN} defaultValue="react" placeholder="Select" /></div> },
        { label: 'Disabled', colorKey: 'disabled', preview: <div style={{ width: 170 }}><Dropdown options={OPTS_PLAIN} placeholder="Disabled" disabled /></div> },
        { label: 'With label',colorKey: 'default', preview: <div style={{ width: 170 }}><Dropdown options={OPTS_PLAIN} label="Framework" placeholder="Select" /></div> },
      ]}
    />

    <DocGuidelines
      description="Order options logically — alphabetical, frequency of use, or semantic grouping."
      dos={[
        'Order options alphabetically or by frequency of use',
        'Write option labels as nouns or noun phrases — not sentences',
        'Use a clear placeholder that communicates the action — "Select a country"',
        'Disable options that are unavailable rather than hiding them',
      ]}
      donts={[
        "Don't use Dropdown for fewer than 3-4 options — use Radio instead",
        "Don't put critical actions inside a Dropdown — use visible Buttons",
        "Don't use placeholder as a permanent label — it disappears after selection",
        "Don't nest dropdowns — use a different UI pattern for hierarchical data",
      ]}
    />

    <DocAccessibility
      description="Dropdown implements the ARIA combobox pattern with full keyboard navigation."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Trigger uses role="combobox"', 'Menu uses role="listbox"', 'Options use role="option" with aria-selected', 'aria-expanded reflects open/closed state'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Tab to focus the trigger', 'Enter/Space to open the menu', 'Arrow keys to navigate options', 'Enter to select, Escape to close'] },
        { icon: '◐', title: 'Color Contrast', items: ['Option text: ≥ 4.5:1 on menu background', 'Disabled options: still readable, not invisible', 'Focus indicator: ≥ 3.0:1 on background'] },
        { icon: '📢', title: 'Screen Readers', items: ['Selected value announced on close', 'Option count announced on open', 'Disabled state communicated via aria-disabled', 'Label linked to trigger via aria-labelledby'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'options',      type: 'DropdownOption[]', required: true, description: 'Array of { value, label, disabled?, icon? }.' },
        { name: 'value',        type: 'string',           default: '—',         description: 'Controlled selected value.' },
        { name: 'defaultValue', type: 'string',           default: '—',         description: 'Uncontrolled initial value.' },
        { name: 'placeholder',  type: 'string',           default: "'Select…'", description: 'Placeholder shown when nothing is selected.' },
        { name: 'label',        type: 'string',           default: '—',         description: 'Label rendered above the trigger.' },
        { name: 'onChange',     type: '(value: string) => void', default: '—',  description: 'Fired when selection changes.' },
        { name: 'disabled',     type: 'boolean',          default: 'false',     description: 'Disables the trigger and prevents opening.' },
      ]}
    />

    <DocTokens
      description="Dropdown tokens cover both the trigger and the floating menu panel."
      groups={[
        { title: 'Trigger Tokens', tokens: ['dropdown/trigger/background', 'dropdown/trigger/border', 'dropdown/trigger/text', 'dropdown/trigger/chevron'] },
        { title: 'Menu Tokens',    tokens: ['dropdown/menu/background', 'dropdown/menu/border', 'dropdown/menu/shadow', 'dropdown/option/hover'] },
        { title: 'Size Tokens',    tokens: ['dropdown/size/height', 'dropdown/size/padding-x', 'dropdown/size/font-size', 'dropdown/size/border-radius'] },
      ]}
    />

    <DocSpecs
      description="Dropdown trigger and menu measurements."
      sizes={[
        { label: 'Trigger', badge: 'TR', rows: [{ label: 'height', value: '40px' }, { label: 'padding-x', value: '12px' }, { label: 'font', value: '14px' }, { label: 'radius', value: '8px' }] },
        { label: 'Menu',    badge: 'MN', rows: [{ label: 'max-height', value: '240px' }, { label: 'padding-y', value: '4px' }, { label: 'option-h', value: '36px' }, { label: 'shadow', value: 'lg' }] },
        { label: 'Option',  badge: 'OP', rows: [{ label: 'height', value: '36px' }, { label: 'padding-x', value: '12px' }, { label: 'icon-gap', value: '8px' }, { label: 'font', value: '14px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Radio',    description: 'For 3 or fewer mutually exclusive options.',     href: '#/radio' },
      { name: 'Input',    description: 'For free-form text entry.',                     href: '#/input' },
      { name: 'Checkbox', description: 'For multi-selection from a list.',              href: '#/checkbox' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — controlled/uncontrolled modes, icon options, disabled state, full keyboard navigation.' },
    ]} />
  </DocPage>
);

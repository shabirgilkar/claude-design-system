import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Toggle, ToggleSize } from '../../components/Toggle/Toggle';
import { SelectControl, ToggleControl } from '../components/DocPage';

const TogglePlayground: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  const [size, setSize] = React.useState('md');
  const [disabled, setDisabled] = React.useState(false);
  const [labelPosition, setLabelPosition] = React.useState('right');

  return (
    <DocPlayground
      controls={
        <>
          <ToggleControl label="On"           checked={checked}  onChange={setChecked} />
          <SelectControl label="Size"         value={size}       onChange={setSize}
            options={[{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }]} />
          <SelectControl label="Label Side"   value={labelPosition} onChange={setLabelPosition}
            options={[{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }]} />
          <ToggleControl label="Disabled"     checked={disabled} onChange={setDisabled} />
        </>
      }
    >
      <Toggle
        checked={checked}
        onChange={setChecked}
        label="Enable notifications"
        size={size as ToggleSize}
        disabled={disabled}
        labelPosition={labelPosition as 'left' | 'right'}
      />
    </DocPlayground>
  );
};

export const TogglePage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Toggle"
      tagline="Instant binary switch for settings and preferences."
      description="Toggle is an on/off switch that takes immediate effect — no submit required. Use it for settings, preferences, and feature flags. Supports 3 sizes and configurable label position."
      status="stable"
      version="v1.0"
      stats={[
        { value: 3, label: 'Sizes' },
        { value: 2, label: 'Label positions' },
        { value: 2, label: 'States' },
        { value: 12, label: 'Combos' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Settings that take immediate effect — no form submit needed' },
        { text: 'Feature flags and preferences — dark mode, notifications, visibility' },
        { text: 'Binary choices where the current state must be obvious' },
        { text: 'App configuration panels and settings pages' },
      ]}
      dontUse={[
        { text: 'Choices that require form submission — use Checkbox instead' },
        { text: 'Mutually exclusive groups — use Radio instead' },
        { text: 'Multi-select — use Checkboxes instead' },
        { text: 'Navigation — use Tabs or links' },
      ]}
    />

    <TogglePlayground />

    <DocCodeExample code={`import { Toggle } from '@ds/components';

<Toggle
  checked={checked}
  onChange={setChecked}
  label="Enable notifications"
/>

<Toggle
  label="Dark mode"
  size="sm"
  labelPosition="left"
/>

<Toggle
  label="Maintenance mode"
  size="lg"
  disabled
/>`} />

    <DocAnatomy
      description="Toggle is built from a track, a thumb (the moving indicator), and an optional label."
      preview={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Toggle label="Notifications" size="md" defaultChecked />
          <Toggle label="Dark mode" size="md" />
        </div>
      }
      callouts={[
        { name: 'Track', description: 'The pill-shaped background. Color indicates on (brand) or off (muted).' },
        { name: 'Thumb', description: 'The circular handle that slides between positions.' },
        { name: 'Label', description: 'Optional text. Appears left or right of the track.' },
        { name: 'Focus Ring', description: 'Visible keyboard focus indicator around the track.' },
      ]}
    />

    <DocVariants
      description="Three sizes control track and thumb dimensions. Label position adapts to layout context."
      variants={[
        { label: 'Small',       description: 'Compact settings panels, dense lists.',        preview: <Toggle label="Small"  size="sm" defaultChecked /> },
        { label: 'Medium',      description: 'Default. Standard settings pages.',            preview: <Toggle label="Medium" size="md" defaultChecked /> },
        { label: 'Large',       description: 'Prominent toggles, touch-first interfaces.',   preview: <Toggle label="Large"  size="lg" defaultChecked /> },
        { label: 'Label left',  description: 'Label precedes the toggle — for right-aligned layouts.', preview: <Toggle label="Left label" size="md" labelPosition="left" defaultChecked /> },
      ]}
    />

    <DocStates
      description="Toggle has two interactive states (off/on) plus a disabled overlay."
      states={[
        { label: 'Off',             colorKey: 'default',  preview: <Toggle label="Off" size="md" /> },
        { label: 'On',              colorKey: 'active',   preview: <Toggle label="On" size="md" defaultChecked /> },
        { label: 'Disabled off',    colorKey: 'disabled', preview: <Toggle label="Disabled off" size="md" disabled /> },
        { label: 'Disabled on',     colorKey: 'disabled', preview: <Toggle label="Disabled on" size="md" disabled defaultChecked /> },
      ]}
    />

    <DocGuidelines
      description="Use Toggle only when the change takes effect immediately. If form submission is required, use Checkbox."
      dos={[
        'Use for settings that activate immediately — dark mode, push notifications',
        'Label the current state, not the action — "Notifications" not "Enable notifications"',
        'Place Toggles in a settings panel where users expect immediate changes',
        'Use size="lg" for touch-primary interfaces or important settings',
      ]}
      donts={[
        "Don't use Toggle inside a form that requires a submit button — use Checkbox",
        "Don't use Toggle for destructive actions without a confirmation step",
        "Don't remove the label — always provide text context for the control",
        "Don't combine multiple Toggles into a radio-like exclusive group — use Radio",
      ]}
    />

    <DocAccessibility
      description="Toggle uses role='switch' to communicate binary on/off semantics to assistive technology."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['role="switch" with aria-checked for on/off state', 'Distinct from role="checkbox" — announces as "on/off" not "checked"', 'aria-label or visible label required'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Tab to focus the toggle track', 'Space to toggle state', 'Shift+Tab to move backwards', 'No arrow key navigation needed — single control'] },
        { icon: '◐', title: 'Color Contrast', items: ['On track: brand color ≥ 3.0:1 on page background', 'Thumb: white ≥ 4.5:1 on track background', 'Label text: ≥ 4.5:1 on page background'] },
        { icon: '📢', title: 'Screen Readers', items: ['"On" / "Off" announced on state change', 'Label read as accessible name', 'Disabled state communicated via aria-disabled', 'State change triggers immediate announcement'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'checked',        type: 'boolean',                      default: '—',      description: 'Controlled checked state.' },
        { name: 'defaultChecked', type: 'boolean',                      default: 'false',  description: 'Uncontrolled initial state.' },
        { name: 'onChange',       type: '(checked: boolean) => void',   default: '—',      description: 'Fired when state changes.' },
        { name: 'label',          type: 'string',                       default: '—',      description: 'Text label next to the toggle.' },
        { name: 'labelPosition',  type: "'left' | 'right'",             default: "'right'", description: 'Whether the label appears before or after the track.' },
        { name: 'size',           type: "'sm' | 'md' | 'lg'",           default: "'md'",   description: 'Controls track and thumb dimensions.' },
        { name: 'disabled',       type: 'boolean',                      default: 'false',  description: 'Prevents interaction and dims the control.' },
        { name: 'id',             type: 'string',                       default: '—',      description: 'HTML id attribute for the hidden input element.' },
        { name: 'name',           type: 'string',                       default: '—',      description: 'Form field name for form submission.' },
        { name: 'value',          type: 'string',                       default: '—',      description: 'Form field value submitted when checked.' },
        { name: 'aria-label',     type: 'string',                       default: '—',      description: 'Accessible label when no visible label is provided.' },
      ]}
    />

    <DocTokens
      description="Toggle tokens cover the track, thumb, label, and animated transition."
      groups={[
        { title: 'Color Tokens',  tokens: ['toggle/color/track/off', 'toggle/color/track/on', 'toggle/color/thumb', 'toggle/color/label'] },
        { title: 'Size Tokens',   tokens: ['toggle/size/{size}/track-width', 'toggle/size/{size}/track-height', 'toggle/size/{size}/thumb', 'toggle/size/{size}/gap'] },
        { title: 'Motion',        tokens: ['toggle/motion/duration', 'toggle/motion/easing'] },
      ]}
    />

    <DocSpecs
      description="Exact measurements for all Toggle sizes."
      sizes={[
        { label: 'Small',  badge: 'SM', rows: [{ label: 'track-w', value: '28px' }, { label: 'track-h', value: '16px' }, { label: 'thumb', value: '12px' }, { label: 'gap', value: '8px' }] },
        { label: 'Medium', badge: 'MD', rows: [{ label: 'track-w', value: '36px' }, { label: 'track-h', value: '20px' }, { label: 'thumb', value: '16px' }, { label: 'gap', value: '8px' }] },
        { label: 'Large',  badge: 'LG', rows: [{ label: 'track-w', value: '44px' }, { label: 'track-h', value: '24px' }, { label: 'thumb', value: '20px' }, { label: 'gap', value: '10px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Checkbox', description: 'For choices that need form submit to take effect.', href: '#/checkbox' },
      { name: 'Radio',    description: 'For mutually exclusive single-selection.',          href: '#/radio' },
      { name: 'Dropdown', description: 'For selecting from a list of options.',             href: '#/dropdown' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — 3 sizes, configurable label position, role="switch" ARIA, animated thumb transition.' },
    ]} />
  </DocPage>
);

import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Button } from '../../components/Button/Button';
import { SelectControl, ToggleControl } from '../components/DocPage';

// ── Inline icons ───────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ── Content data (sourced from Figma Documentation page) ──────────────────

const OVERVIEW_USE = [
  { text: 'Triggering an action — form submit, dialog open, navigation' },
  { text: 'Establishing hierarchy — Primary for main CTA, Ghost for tertiary' },
  { text: 'Confirming or canceling — dialog confirmations, destructive actions' },
  { text: 'Inline actions — table row actions, card footers, toolbars' },
];

const OVERVIEW_DONT = [
  { text: 'Navigation links — use a text link or anchor instead' },
  { text: 'Toggling state — use Toggle, Checkbox, or Radio instead' },
  { text: 'Displaying status — use Badge or Tag instead' },
  { text: 'Filtering content — use Tabs or Filter chips instead' },
];

const ANATOMY_CALLOUTS = [
  { name: 'Container', description: 'Defines size, fill, border, and corner radius. Adapts per variant type and state.' },
  { name: 'Leading Icon', description: 'Optional. 16–20px icon left-aligned. Reinforces the action meaning.' },
  { name: 'Label', description: 'Required text. Maximum 4 words for clarity and scannability.' },
  { name: 'Trailing Icon', description: 'Optional. Used for directional cues or dropdown indicators.' },
  { name: 'Focus Ring', description: '2px offset border. Visible on keyboard navigation. Uses focus token.' },
];

const VARIANTS = [
  { label: 'Primary',     description: 'The strongest CTA. Use one per section.',          preview: <Button variant="primary"     size="sm">Button</Button> },
  { label: 'Secondary',   description: 'Pairs with Primary for secondary actions.',         preview: <Button variant="secondary"   size="sm">Button</Button> },
  { label: 'Tertiary',    description: 'Subtle links, back navigation.',                    preview: <Button variant="tertiary"    size="sm">Button</Button> },
  { label: 'Destructive', description: 'Irreversible or destructive actions only.',         preview: <Button variant="destructive" size="sm">Button</Button> },
  { label: 'Ghost',       description: 'Toolbar, dense context, compact UI.',              preview: <Button variant="ghost"       size="sm">Button</Button> },
];

const STATES = [
  { label: 'Default',     colorKey: 'default',  preview: <Button variant="primary" size="sm">Button</Button> },
  { label: 'Focused',     colorKey: 'focused',  preview: <Button variant="primary" size="sm" style={{ outline: '2px solid var(--ds-color-border-focus)', outlineOffset: '2px' }}>Button</Button> },
  { label: 'Disabled',    colorKey: 'disabled', preview: <Button variant="primary" size="sm" disabled>Button</Button> },
  { label: 'Loading',     colorKey: 'loading',  preview: <Button variant="primary" size="sm" loading>Button</Button> },
  { label: 'Destructive', colorKey: 'error',    preview: <Button variant="destructive" size="sm">Button</Button> },
  { label: 'With Icons',  colorKey: 'default',  preview: <Button variant="primary" size="sm" leftIcon={<PlusIcon />} rightIcon={<ChevronIcon />}>Button</Button> },
  { label: 'Pill',        colorKey: 'default',  preview: <Button variant="primary" size="sm" pill>Button</Button> },
];

const A11Y_CARDS = [
  {
    icon: '♿',
    title: 'ARIA Roles',
    items: [
      'Renders as <button> or <a role="button">',
      'Icon-only buttons require aria-label',
      'Loading state: aria-busy="true"',
      'Disabled: aria-disabled="true" (not HTML disabled)',
    ],
  },
  {
    icon: '⌨',
    title: 'Keyboard Navigation',
    items: [
      'Tab — Focus next/previous button',
      'Enter / Space — Activate button',
      'Escape — Cancel (in dialog context)',
      'Focus ring visible on all interactive states',
    ],
  },
  {
    icon: '◐',
    title: 'Color Contrast',
    items: [
      'Text on fill: ≥ 4.5:1 ratio (all types)',
      'Border / UI elements: ≥ 3.0:1 ratio',
      'Disabled state: ≥ 3.0:1 minimum',
      'Focus ring: 2px offset, high contrast',
    ],
  },
  {
    icon: '📢',
    title: 'Screen Readers',
    items: [
      'Label announces button purpose',
      'State changes announced live',
      'Loading spinner gets aria-hidden="true"',
      'Disabled buttons remain focusable',
    ],
  },
];

const TOKEN_GROUPS = [
  {
    title: 'Color Tokens',
    tokens: [
      'button/color/{type}/{state}/background',
      'button/color/{type}/{state}/border',
      'button/color/{type}/{state}/text',
      'button/color/{type}/{state}/icon',
      'button/color/focus-ring',
    ],
  },
  {
    title: 'Size Tokens',
    tokens: [
      'button/size/{size}/height (32 / 40 / 48)',
      'button/size/{size}/padding-x',
      'button/size/{size}/gap',
      'button/size/{size}/icon',
      'button/radius/{size}',
    ],
  },
  {
    title: 'Typography Tokens',
    tokens: [
      'button/typography/{size}/size',
      'button/typography/{size}/line-height',
      'button/typography/font-family',
      'button/typography/font-weight',
      'button/typography/letter-spacing',
    ],
  },
];

const SPECS = [
  {
    label: 'Small', badge: 'SM',
    rows: [
      { label: 'height',    value: '32px' },
      { label: 'padding-x', value: '12px' },
      { label: 'gap',       value: '6px'  },
      { label: 'radius',    value: '6px'  },
      { label: 'font',      value: '12px' },
      { label: 'icon',      value: '14px' },
    ],
  },
  {
    label: 'Medium', badge: 'MD',
    rows: [
      { label: 'height',    value: '40px' },
      { label: 'padding-x', value: '16px' },
      { label: 'gap',       value: '8px'  },
      { label: 'radius',    value: '8px'  },
      { label: 'font',      value: '14px' },
      { label: 'icon',      value: '16px' },
    ],
  },
  {
    label: 'Large', badge: 'LG',
    rows: [
      { label: 'height',    value: '48px' },
      { label: 'padding-x', value: '20px' },
      { label: 'gap',       value: '10px' },
      { label: 'radius',    value: '10px' },
      { label: 'font',      value: '16px' },
      { label: 'icon',      value: '20px' },
    ],
  },
];

const RELATED = [
  { name: 'Badge',    description: 'For displaying status — not for triggering actions.',        href: '#/badge' },
  { name: 'Toggle',   description: 'For switching binary state — not for one-time actions.',    href: '#/toggle' },
  { name: 'Tabs',     description: 'For content switching navigation — similar visual weight.', href: '#/tabs' },
  { name: 'Toast',    description: 'Actions in Toast use Ghost Button instances.',              href: '#/toast' },
];

const CHANGELOG = [
  {
    version: 'v1.0',
    date: 'Mar 2026',
    description: 'Initial release — 5 types × 3 sizes × 7 states = 105 variants. Full token architecture, typography binding, accessibility description. Ghost Button used in Toast actions.',
  },
];

const PROPS = [
  { name: 'variant',   type: "'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost'", default: "'primary'",  description: 'Visual hierarchy type of the button.' },
  { name: 'size',      type: "'sm' | 'md' | 'lg'",                                              default: "'md'",       description: 'Size variant controlling height, padding, and font size.' },
  { name: 'disabled',  type: 'boolean',                                                          default: 'false',      description: 'Disables the button and prevents interaction.' },
  { name: 'loading',   type: 'boolean',                                                          default: 'false',      description: 'Shows a loading spinner and sets aria-busy="true".' },
  { name: 'pill',      type: 'boolean',                                                          default: 'false',      description: 'Applies fully rounded (pill) border radius.' },
  { name: 'fullWidth', type: 'boolean',                                                          default: 'false',      description: 'Stretches button to fill its container width.' },
  { name: 'iconOnly',  type: 'boolean',                                                          default: 'false',      description: 'Square aspect ratio for icon-only buttons. Requires aria-label.' },
  { name: 'leftIcon',  type: 'React.ReactNode',                                                  default: '—',          description: 'Icon rendered before the label.' },
  { name: 'rightIcon', type: 'React.ReactNode',                                                  default: '—',          description: 'Icon rendered after the label.' },
  { name: 'children',  type: 'React.ReactNode',                                                  default: '—',          description: 'Button label content.' },
  { name: 'onClick',   type: 'React.MouseEventHandler',                                          default: '—',          description: 'Click handler.' },
];

// ── Playground ─────────────────────────────────────────────────────────────

const ButtonPlayground: React.FC = () => {
  const [variant, setVariant]   = React.useState('primary');
  const [size, setSize]         = React.useState('md');
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading]   = React.useState(false);
  const [pill, setPill]         = React.useState(false);
  const [leftIcon, setLeftIcon] = React.useState(false);
  const [rightIcon, setRightIcon] = React.useState(false);
  const [iconOnly, setIconOnly] = React.useState(false);

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Variant" value={variant} onChange={setVariant}
            options={[
              { value: 'primary',     label: 'Primary' },
              { value: 'secondary',   label: 'Secondary' },
              { value: 'tertiary',    label: 'Tertiary' },
              { value: 'destructive', label: 'Destructive' },
              { value: 'ghost',       label: 'Ghost' },
            ]}
          />
          <SelectControl label="Size" value={size} onChange={setSize}
            options={[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
            ]}
          />
          <ToggleControl label="Disabled"   checked={disabled}  onChange={setDisabled} />
          <ToggleControl label="Loading"    checked={loading}   onChange={setLoading} />
          <ToggleControl label="Pill"       checked={pill}      onChange={setPill} />
          <ToggleControl label="Left Icon"  checked={leftIcon}  onChange={setLeftIcon} />
          <ToggleControl label="Right Icon" checked={rightIcon} onChange={setRightIcon} />
          <ToggleControl label="Icon Only"  checked={iconOnly}  onChange={setIconOnly} />
        </>
      }
    >
      <Button
        variant={variant as any}
        size={size as any}
        disabled={disabled}
        loading={loading}
        pill={pill}
        iconOnly={iconOnly}
        leftIcon={leftIcon || iconOnly ? <PlusIcon /> : undefined}
        rightIcon={rightIcon ? <ArrowIcon /> : undefined}
        aria-label={iconOnly ? 'Add' : undefined}
      >
        {!iconOnly && 'Button'}
      </Button>
    </DocPlayground>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────

export const ButtonPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Button"
      tagline="The fundamental interaction primitive."
      description="Buttons communicate actionable intent, establish visual hierarchy, and guide users through task flows. Available in 5 types, 3 sizes, and 7 interactive states."
      status="stable"
      version="v1.0"
      stats={[
        { value: 5,   label: 'Types'    },
        { value: 3,   label: 'Sizes'    },
        { value: 7,   label: 'States'   },
        { value: 105, label: 'Variants' },
      ]}
    />

    <DocOverview use={OVERVIEW_USE} dontUse={OVERVIEW_DONT} />

    <ButtonPlayground />

    <DocCodeExample code={`import { Button } from '@ds/components';

<Button variant="primary" size="md">
  Save changes
</Button>

<Button variant="destructive" leftIcon={<TrashIcon />}>
  Delete
</Button>

<Button variant="ghost" size="sm" iconOnly aria-label="Add">
  <PlusIcon />
</Button>`} />

    <DocAnatomy
      description="A Button is composed of five distinct elements, each playing a specific role in communicating action, affordance, and hierarchy."
      preview={<Button variant="primary" size="md" leftIcon={<PlusIcon />} rightIcon={<ChevronIcon />}>Button</Button>}
      callouts={ANATOMY_CALLOUTS}
    />

    <DocVariants
      description="Five types establish a visual hierarchy — from high-emphasis Primary actions to minimal Ghost controls."
      variants={VARIANTS}
    />

    <DocStates
      description="Seven states cover every stage of the interaction lifecycle. All must be implemented to ensure an accessible, predictable user experience."
      states={STATES}
    />

    <DocGuidelines
      description="Proven patterns and anti-patterns from production. Follow these to maintain a consistent, accessible, and intuitive Button experience."
      dos={[
        'Use one Primary button per section to establish clear CTA hierarchy',
        'Write labels as action verbs: "Save changes", "Add item", "Confirm"',
        'Pair Primary + Secondary for two-action dialogs (Confirm + Cancel)',
        'Use Destructive only for irreversible actions — require confirmation',
        'Ensure minimum touch target: 48px height at LG for mobile',
      ]}
      donts={[
        "Don't use two Primary buttons side by side — only one dominant action",
        'Don\'t use vague labels: "Click here", "Submit", "OK" without context',
        "Don't disable a button without explaining why the action is unavailable",
        "Don't place buttons less than 8px apart — risk misclicks on touch",
        "Don't use Ghost type in high-visibility areas — too subtle for CTAs",
      ]}
    />

    <DocAccessibility
      description="Every Button variant meets WCAG 2.1 AA requirements. Implementation must follow these specifications to maintain accessibility compliance."
      cards={A11Y_CARDS}
    />

    <DocProps props={PROPS} />

    <DocTokens
      description="All visual properties flow through a three-tier variable chain: Primitives → Semantic → Components. No raw values are used anywhere in the component."
      groups={TOKEN_GROUPS}
    />

    <DocSpecs
      description="Exact measurements governing all Button implementations. Ground truth for both design and engineering teams."
      sizes={SPECS}
    />

    <DocRelated components={RELATED} />

    <DocChangelog entries={CHANGELOG} />
  </DocPage>
);

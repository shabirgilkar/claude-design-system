import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Tabs } from '../../components/Tabs/Tabs';
import { SelectControl, ToggleControl } from '../components/DocPage';

const HomeIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
    <path d="M1 6.5L7 1.5l6 5V13H9.5v-3.5h-5V13H1V6.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
    <path d="M9 2l4 5-4 5M5 2L1 7l4 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
);

const BASIC_TABS = [
  { id: 'overview',  label: 'Overview',  content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>Overview content</p> },
  { id: 'specs',     label: 'Specs',     content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>Specs content</p> },
  { id: 'changelog', label: 'Changelog', content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>Changelog</p> },
  { id: 'disabled',  label: 'Disabled',  disabled: true },
];

const ICON_TABS = [
  { id: 'home',    label: 'Home',    icon: <HomeIcon />,  content: null },
  { id: 'code',    label: 'Code',    icon: <CodeIcon />,  content: null },
  { id: 'history', label: 'History', icon: <ClockIcon />, content: null },
  { id: 'archive', label: 'Archive', disabled: true,      content: null },
];

const DESCRIPTIVE_TABS = [
  { id: 'design',  label: 'Design',  description: 'Visual style, layout, and interaction patterns', icon: <HomeIcon /> },
  { id: 'develop', label: 'Develop', description: 'Implementation details, props API, and code examples', icon: <CodeIcon /> },
  { id: 'test',    label: 'Test',    description: 'Testing strategies and accessibility checks', icon: <ClockIcon /> },
];

const TabsPlayground: React.FC = () => {
  const [size, setSize] = React.useState('md');
  const [showIcons, setShowIcons] = React.useState(false);
  const [showDescription, setShowDescription] = React.useState(false);
  const [showDot, setShowDot] = React.useState(false);
  const [showDisabled, setShowDisabled] = React.useState(true);

  const tabs = [
    { id: 'overview',  label: 'Overview',  description: 'Visual style and layout patterns', icon: showIcons ? <HomeIcon />  : undefined, content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>Overview content.</p> },
    { id: 'specs',     label: 'Specs',     description: 'Implementation details and code', icon: showIcons ? <CodeIcon />  : undefined, content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>Specs content.</p> },
    { id: 'changelog', label: 'Changelog', description: 'Version history and updates', icon: showIcons ? <ClockIcon /> : undefined, content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>Changelog.</p> },
    ...(showDisabled ? [{ id: 'disabled', label: 'Disabled', disabled: true, content: null }] : []),
  ];

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Size" value={size} onChange={setSize}
            options={[{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }]} />
          <ToggleControl label="Icons"        checked={showIcons}       onChange={setShowIcons} />
          <ToggleControl label="Description"  checked={showDescription} onChange={setShowDescription} />
          <ToggleControl label="Dot"          checked={showDot}         onChange={setShowDot} />
          <ToggleControl label="Disabled Tab" checked={showDisabled}    onChange={setShowDisabled} />
        </>
      }
    >
      <div style={{ width: '100%', minWidth: 400 }}>
        <Tabs tabs={tabs} size={size as any} defaultTab="overview" showIcon={showIcons} showDescription={showDescription} showDot={showDot} />
      </div>
    </DocPlayground>
  );
};

export const TabsPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Tabs"
      tagline="Organize content into clear, switchable views."
      description="Tabs divide content into labelled sections that users switch between without a page reload. Supports 3 sizes, horizontal/vertical direction, descriptive tabs with descriptions, notification dots, icons, disabled tabs, and both controlled and uncontrolled modes."
      status="stable"
      version="v1.1"
      stats={[
        { value: 3, label: 'Sizes' },
        { value: 2, label: 'Directions' },
        { value: 8, label: 'Props' },
        { value: '∞', label: 'Tab count' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Organizing related content into logical sections — Overview, Specs, API' },
        { text: 'Settings pages — General, Security, Billing tabs' },
        { text: 'Detail views with multiple data types — Info, Activity, Files' },
        { text: 'Filter-like navigation within a single page context' },
      ]}
      dontUse={[
        { text: 'More than 7 tabs — use a sidebar or secondary navigation' },
        { text: 'Navigation between pages — use links or a nav component' },
        { text: 'Sequential steps — use a Stepper component' },
        { text: 'Collapsing/expanding content — use Accordion' },
      ]}
    />

    <TabsPlayground />

    <DocCodeExample code={`import { Tabs } from '@ds/components';

const tabs = [
  { id: 'overview', label: 'Overview', description: 'Visual style and layout', content: <OverviewPanel /> },
  { id: 'specs',    label: 'Specs',    description: 'Measurements and tokens',  content: <SpecsPanel /> },
  { id: 'history',  label: 'History',  icon: <ClockIcon />, content: <HistoryPanel /> },
  { id: 'archive',  label: 'Archive',  disabled: true },
];

// Basic horizontal tabs
<Tabs tabs={tabs} defaultTab="overview" size="md" />

// Descriptive tabs with icons and notification dot
<Tabs tabs={tabs} defaultTab="overview" showDescription showIcon showDot />

// Vertical direction
<Tabs tabs={tabs} direction="vertical" defaultTab="overview" />

// Controlled
<Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />`} />

    <DocAnatomy
      description="Tabs consist of a tab bar and a content panel. The active tab is underlined; its panel is visible."
      preview={
        <div style={{ width: 400 }}>
          <Tabs tabs={BASIC_TABS} defaultTab="overview" size="md" />
        </div>
      }
      callouts={[
        { name: 'Tab Bar', description: 'Horizontal row of tab triggers. Bottom border separates bar from content.' },
        { name: 'Tab Trigger', description: 'Clickable label. Optional icon precedes the text.' },
        { name: 'Active Indicator', description: 'Brand-colored bottom border on the active tab.' },
        { name: 'Disabled Tab', description: 'Non-interactive tab with reduced opacity.' },
        { name: 'Content Panel', description: 'The content area rendered below the tab bar.' },
      ]}
    />

    <DocVariants
      description="Three sizes, two directions, and optional features (icons, descriptions, notification dots)."
      variants={[
        { label: 'Small',        description: 'Compact tab bars, secondary nav.',           preview: <div style={{ width: 320 }}><Tabs tabs={BASIC_TABS} size="sm" defaultTab="overview" /></div> },
        { label: 'Medium',       description: 'Default. Standard content pages.',           preview: <div style={{ width: 320 }}><Tabs tabs={BASIC_TABS} size="md" defaultTab="overview" /></div> },
        { label: 'Large',        description: 'Prominent page-level navigation.',           preview: <div style={{ width: 320 }}><Tabs tabs={BASIC_TABS} size="lg" defaultTab="overview" /></div> },
        { label: 'With icons',   description: 'Icon precedes each tab label.',             preview: <div style={{ width: 320 }}><Tabs tabs={ICON_TABS} size="md" defaultTab="home" /></div> },
        { label: 'Descriptive',  description: 'Two-line tabs with description text.',       preview: <div style={{ width: 420 }}><Tabs tabs={DESCRIPTIVE_TABS} size="md" defaultTab="design" showDescription showIcon /></div> },
        { label: 'With dot',     description: 'Notification dot on each tab.',             preview: <div style={{ width: 320 }}><Tabs tabs={ICON_TABS.slice(0,3)} size="md" defaultTab="home" showDot /></div> },
        { label: 'Vertical',     description: 'Sidebar-style vertical tab layout.',         preview: <div style={{ width: 320 }}><Tabs tabs={BASIC_TABS.slice(0,3)} size="md" defaultTab="overview" direction="vertical" /></div> },
      ]}
    />

    <DocStates
      description="Tabs have three tab-level states: default (unselected), active (selected), and disabled."
      states={[
        { label: 'Default tabs', colorKey: 'default',  preview: <div style={{ width: 300 }}><Tabs tabs={BASIC_TABS} defaultTab="overview" /></div> },
        { label: 'With icons',   colorKey: 'default',  preview: <div style={{ width: 300 }}><Tabs tabs={ICON_TABS}  defaultTab="home" /></div> },
        { label: 'All sizes',    colorKey: 'default',  preview: <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}><Tabs tabs={BASIC_TABS.slice(0,2)} size="sm" defaultTab="overview" /><Tabs tabs={BASIC_TABS.slice(0,2)} size="md" defaultTab="overview" /><Tabs tabs={BASIC_TABS.slice(0,2)} size="lg" defaultTab="overview" /></div> },
      ]}
    />

    <DocGuidelines
      description="Tab labels should be nouns. Keep them short — 1-2 words. Never change their order dynamically."
      dos={[
        'Write tab labels as short nouns — "Overview", "Settings", "API"',
        'Put the most important/default content in the first tab',
        'Use icons to add meaning, not decoration — each icon should be distinct',
        'Keep content panels in sync with the URL via query params for shareability',
      ]}
      donts={[
        "Don't use more than 7 tabs — consider a sidebar nav instead",
        "Don't change tab labels or order dynamically — confuses users",
        "Don't use tabs for a single pane — remove them if only one tab is ever shown",
        "Don't use tabs to navigate to different pages — use links",
      ]}
    />

    <DocAccessibility
      description="Tabs implement the WAI-ARIA Tabs pattern with full keyboard navigation."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Tab list: role="tablist"', 'Tab triggers: role="tab" with aria-selected', 'Content panel: role="tabpanel"', 'aria-controls links each tab to its panel'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Tab to focus the active tab trigger', 'Arrow left/right to navigate between tabs', 'Home/End to jump to first/last tab', 'Tab again to move into the content panel'] },
        { icon: '◐', title: 'Color Contrast', items: ['Active tab indicator: ≥ 3.0:1 on tab background', 'Tab label text: ≥ 4.5:1 on background', 'Disabled tab: still readable, not invisible'] },
        { icon: '📢', title: 'Screen Readers', items: ['Active panel announced on tab change', 'Tab count and position announced', 'Disabled tabs announced as "dimmed" or "unavailable"', 'Panel content immediately readable after switching'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'tabs',            type: 'TabItem[]',                      required: true,  description: 'Array of tab definitions (id, label, description?, content?, disabled?, icon?).' },
        { name: 'activeTab',       type: 'string',                         default: '—',    description: 'Controlled active tab ID.' },
        { name: 'defaultTab',      type: 'string',                         default: 'tabs[0].id', description: 'Initial active tab for uncontrolled usage.' },
        { name: 'onChange',        type: '(id: string) => void',           default: '—',    description: 'Fired on tab change.' },
        { name: 'size',            type: "'sm' | 'md' | 'lg'",            default: "'md'",  description: 'Controls tab bar height and font size.' },
        { name: 'direction',       type: "'horizontal' | 'vertical'",      default: "'horizontal'", description: 'Layout direction of the tab bar.' },
        { name: 'showIcon',        type: 'boolean',                        default: 'true',  description: 'Show tab icons (when defined on TabItem).' },
        { name: 'showDescription', type: 'boolean',                        default: 'false', description: 'Show description text below each tab label.' },
        { name: 'showDot',         type: 'boolean',                        default: 'false', description: 'Show notification dot next to each tab label.' },
      ]}
    />

    <DocTokens
      description="Tabs tokens cover the tab bar, active indicator, and content panel."
      groups={[
        { title: 'Tab Bar Tokens',  tokens: ['tabs/bar/border-color', 'tabs/bar/border-width', 'tabs/tab/color/default', 'tabs/tab/color/active', 'tabs/tab/color/disabled'] },
        { title: 'Indicator',       tokens: ['tabs/indicator/color', 'tabs/indicator/height', 'tabs/indicator/radius'] },
        { title: 'Size Tokens',     tokens: ['tabs/size/{size}/height', 'tabs/size/{size}/font-size', 'tabs/size/{size}/gap', 'tabs/size/{size}/padding-x'] },
      ]}
    />

    <DocSpecs
      description="Exact measurements for all Tabs sizes."
      sizes={[
        { label: 'Small',  badge: 'SM', rows: [{ label: 'height', value: '32px' }, { label: 'font', value: '13px' }, { label: 'pad-x', value: '10px' }, { label: 'gap', value: '4px' }] },
        { label: 'Medium', badge: 'MD', rows: [{ label: 'height', value: '40px' }, { label: 'font', value: '14px' }, { label: 'pad-x', value: '12px' }, { label: 'gap', value: '6px' }] },
        { label: 'Large',  badge: 'LG', rows: [{ label: 'height', value: '48px' }, { label: 'font', value: '15px' }, { label: 'pad-x', value: '14px' }, { label: 'gap', value: '8px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Button',  description: 'For primary actions within a tab panel.',          href: '#/button' },
      { name: 'Badge',   description: 'Add count badges to tab labels for notifications.',href: '#/badge' },
      { name: 'Tooltip', description: 'Explain disabled tabs on hover.',                  href: '#/tooltip' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.1', date: 'Apr 2026', description: 'Added: vertical direction, descriptive tabs (description per TabItem), notification dot, showIcon/showDescription/showDot boolean props.' },
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — 3 sizes, icon support, disabled tabs, controlled/uncontrolled modes, full ARIA Tabs pattern.' },
    ]} />
  </DocPage>
);

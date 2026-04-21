import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs } from '../components/Tabs/Tabs';

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z"/><path d="M9 22V12h6v10"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const ArchiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="5" rx="1"/><path d="M2 8v11a2 2 0 002 2h16a2 2 0 002-2V8"/><path d="M10 12h4"/>
  </svg>
);

const BASIC_TABS = [
  { id: 'overview', label: 'Overview', content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>Overview content</p> },
  { id: 'usage',    label: 'Usage',    content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>Usage content</p> },
  { id: 'api',      label: 'API',      content: <p style={{ padding: 16, color: 'var(--ds-color-fg-muted)' }}>API reference</p> },
];

const ICON_TABS = [
  { id: 'home',    label: 'Home',    icon: <HomeIcon />, content: null },
  { id: 'code',    label: 'Code',    icon: <CodeIcon />, content: null },
  { id: 'history', label: 'History', icon: <ClockIcon />, content: null },
  { id: 'archive', label: 'Archive', icon: <ArchiveIcon />, disabled: true, content: null },
];

const DESCRIPTIVE_TABS = [
  { id: 'design',  label: 'Design',  description: 'Visual style, layout, and interaction patterns for the component', icon: <HomeIcon /> },
  { id: 'develop', label: 'Develop', description: 'Implementation details, props API, and code examples', icon: <CodeIcon /> },
  { id: 'test',    label: 'Test',    description: 'Testing strategies, accessibility checks, and QA guidelines', icon: <ClockIcon /> },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=83-40444',
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    showIcon: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showDot: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => <Tabs tabs={BASIC_TABS} defaultTab="overview" />,
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: 520 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>Basic</p>
        <Tabs tabs={BASIC_TABS} defaultTab="overview" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>With Icons</p>
        <Tabs tabs={ICON_TABS} defaultTab="home" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>Descriptive</p>
        <Tabs tabs={DESCRIPTIVE_TABS} defaultTab="design" showDescription showIcon />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>With Notification Dot</p>
        <Tabs tabs={ICON_TABS.slice(0, 3)} defaultTab="home" showDot />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>Vertical</p>
        <Tabs tabs={BASIC_TABS} defaultTab="overview" direction="vertical" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 480 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>sm</p>
        <Tabs tabs={BASIC_TABS} defaultTab="overview" size="sm" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>md (default)</p>
        <Tabs tabs={BASIC_TABS} defaultTab="overview" size="md" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>lg</p>
        <Tabs tabs={BASIC_TABS} defaultTab="overview" size="lg" />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 480 }}>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>Default + Active + Disabled</p>
        <Tabs tabs={ICON_TABS} defaultTab="home" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: 'var(--ds-color-fg-subtle)', marginBottom: 8, fontFamily: 'var(--ds-font-family-mono)' }}>With descriptions</p>
        <Tabs tabs={DESCRIPTIVE_TABS} defaultTab="design" showDescription showIcon />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: {
    tabs: DESCRIPTIVE_TABS,
    defaultTab: 'design',
    size: 'md',
    direction: 'horizontal',
    showIcon: true,
    showDescription: false,
    showDot: false,
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

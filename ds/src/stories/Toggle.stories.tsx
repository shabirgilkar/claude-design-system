import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from '../components/Toggle/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-26853',
    },
  },
  argTypes: {
    size:          { control: 'select', options: ['sm', 'md', 'lg'] },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    checked:       { control: 'boolean' },
    disabled:      { control: 'boolean' },
    label:         { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: { label: 'Enable notifications', size: 'md' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Toggle label="Label on right" labelPosition="right" />
      <Toggle label="Label on left"  labelPosition="left" />
      <Toggle label="Checked"        defaultChecked />
      <Toggle label="Disabled"       disabled />
      <Toggle label="Disabled + on"  disabled defaultChecked />
      <Toggle label="No label" aria-label="Toggle feature" />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Toggle size="sm" label="Small toggle"  defaultChecked />
      <Toggle size="md" label="Medium toggle" defaultChecked />
      <Toggle size="lg" label="Large toggle"  defaultChecked />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Toggle label="Off (default)" />
      <Toggle label="On"            defaultChecked />
      <Toggle label="Disabled off"  disabled />
      <Toggle label="Disabled on"   disabled defaultChecked />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { label: 'Toggle label', size: 'md', labelPosition: 'right', checked: false, disabled: false },
};

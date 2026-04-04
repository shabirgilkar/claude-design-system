import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox } from '../components/Checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=0-1',
    },
  },
  argTypes: {
    size:          { control: 'select', options: ['sm', 'md', 'lg'] },
    checked:       { control: 'boolean' },
    disabled:      { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label:         { control: 'text' },
    description:   { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'Accept terms and conditions', size: 'md' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="With description" description="This is additional context about this option." />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox size="sm" label="Small checkbox"  defaultChecked />
      <Checkbox size="md" label="Medium checkbox" defaultChecked />
      <Checkbox size="lg" label="Large checkbox"  defaultChecked />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Default (unchecked)" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { label: 'Checkbox label', size: 'md', checked: false, disabled: false, indeterminate: false },
};

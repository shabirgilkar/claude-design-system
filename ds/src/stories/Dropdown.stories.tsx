import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dropdown } from '../components/Dropdown/Dropdown';

const FRAMEWORKS = [
  { value: 'react',   label: 'React' },
  { value: 'vue',     label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte',  label: 'Svelte' },
  { value: 'solid',   label: 'SolidJS', disabled: true },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=18-3473',
    },
  },
  argTypes: {
    disabled:    { control: 'boolean' },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: { label: 'Framework', placeholder: 'Select a framework', options: FRAMEWORKS },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Dropdown label="Default"    placeholder="Select…"        options={FRAMEWORKS} />
      <Dropdown label="Pre-selected" defaultValue="react"        options={FRAMEWORKS} />
      <Dropdown label="With disabled option" placeholder="Select…" options={FRAMEWORKS} />
      <Dropdown label="Disabled"   placeholder="Select…"        options={FRAMEWORKS} disabled />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Dropdown label="Default" placeholder="Select a framework" options={FRAMEWORKS} />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Dropdown label="Default"      placeholder="Select…"   options={FRAMEWORKS} />
      <Dropdown label="Pre-selected" defaultValue="vue"      options={FRAMEWORKS} />
      <Dropdown label="Disabled"     placeholder="Select…"   options={FRAMEWORKS} disabled />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { label: 'Label', placeholder: 'Select an option', options: FRAMEWORKS, disabled: false },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

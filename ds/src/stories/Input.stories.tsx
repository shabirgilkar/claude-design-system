import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from '../components/Input/Input';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=15-7857',
    },
  },
  argTypes: {
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled:    { control: 'boolean' },
    required:    { control: 'boolean' },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    hint:        { control: 'text' },
    error:       { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com', size: 'md' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input label="Default"  placeholder="Placeholder" />
      <Input label="With hint" placeholder="Placeholder" hint="This is a helper text" />
      <Input label="Error state" placeholder="Placeholder" error="This field is required" />
      <Input label="Disabled" placeholder="Placeholder" disabled />
      <Input label="Required" placeholder="Placeholder" required />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input size="sm" label="Small"  placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large"  placeholder="Large input" />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input label="Default"      placeholder="Default state" />
      <Input label="With value"   defaultValue="Filled value" />
      <Input label="Error"        placeholder="Error state" error="Invalid input" />
      <Input label="Disabled"     placeholder="Disabled" disabled />
      <Input label="With left icon"  leftIcon={<SearchIcon />} placeholder="Search..." />
      <Input label="With right icon" rightIcon={<EyeIcon />}   placeholder="Password" type="password" />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { label: 'Label', placeholder: 'Placeholder', size: 'md', disabled: false, required: false },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Textarea } from '../components/Textarea/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=0-1',
    },
  },
  argTypes: {
    disabled:      { control: 'boolean' },
    required:      { control: 'boolean' },
    resize:        { control: 'boolean' },
    showCharCount: { control: 'boolean' },
    label:         { control: 'text' },
    placeholder:   { control: 'text' },
    hint:          { control: 'text' },
    error:         { control: 'text' },
    rows:          { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: 'Message', placeholder: 'Write your message…', rows: 4 },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <Textarea label="Default"     placeholder="Placeholder" rows={3} />
      <Textarea label="With hint"   placeholder="Placeholder" rows={3} hint="Max 500 characters" />
      <Textarea label="Error"       placeholder="Placeholder" rows={3} error="This field is required" />
      <Textarea label="Disabled"    placeholder="Placeholder" rows={3} disabled />
      <Textarea label="Char count"  placeholder="Placeholder" rows={3} maxLength={200} showCharCount />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <Textarea label="2 rows" placeholder="Compact" rows={2} />
      <Textarea label="4 rows" placeholder="Default" rows={4} />
      <Textarea label="6 rows" placeholder="Expanded" rows={6} />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <Textarea label="Default"     placeholder="Default state" rows={3} />
      <Textarea label="With value"  defaultValue="Some text has been entered here." rows={3} />
      <Textarea label="Error"       placeholder="Error state" rows={3} error="Please enter at least 20 characters" />
      <Textarea label="Disabled"    placeholder="Cannot edit" rows={3} disabled />
      <Textarea label="No resize"   placeholder="Fixed size" rows={3} resize={false} />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { label: 'Message', placeholder: 'Write something…', rows: 4, disabled: false, resize: true, showCharCount: false },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

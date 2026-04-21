import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Radio, RadioGroup } from '../components/Radio/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-25865',
    },
  },
  argTypes: {
    checked:     { control: 'boolean' },
    disabled:    { control: 'boolean' },
    label:       { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <RadioGroup label="Notification preference">
      <Radio name="notif" value="email" label="Email" defaultChecked />
      <Radio name="notif" value="sms"   label="SMS" />
      <Radio name="notif" value="push"  label="Push notification" />
    </RadioGroup>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <RadioGroup label="Without descriptions">
        <Radio name="v1" value="a" label="Option A" defaultChecked />
        <Radio name="v1" value="b" label="Option B" />
        <Radio name="v1" value="c" label="Option C" />
      </RadioGroup>
      <RadioGroup label="With descriptions">
        <Radio name="v2" value="a" label="Standard"  description="Delivery in 5–7 business days" defaultChecked />
        <Radio name="v2" value="b" label="Express"   description="Delivery in 1–2 business days" />
        <Radio name="v2" value="c" label="Overnight" description="Next business day delivery" />
      </RadioGroup>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Radio name="sz" value="a" label="Option A" defaultChecked />
      <Radio name="sz" value="b" label="Option B" />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Radio name="st" value="default"  label="Default (unselected)" />
      <Radio name="st" value="checked"  label="Selected" defaultChecked />
      <Radio name="st" value="disabled" label="Disabled" disabled />
      <Radio name="st" value="dis-sel"  label="Disabled + selected" disabled defaultChecked />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { label: 'Radio option', checked: false, disabled: false },
};

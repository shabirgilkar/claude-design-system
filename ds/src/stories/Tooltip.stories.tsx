import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { Button } from '../components/Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=0-1',
    },
  },
  argTypes: {
    theme:     { control: 'select', options: ['dark', 'light'] },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    disabled:  { control: 'boolean' },
    delay:     { control: 'number' },
    content:   { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip" placement="top">
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', padding: 40 }}>
      <Tooltip content="Dark tooltip (default)" theme="dark">
        <Button variant="secondary" size="sm">Dark</Button>
      </Tooltip>
      <Tooltip content="Light tooltip" theme="light">
        <Button variant="secondary" size="sm">Light</Button>
      </Tooltip>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Placements',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 48 }}>
      <Tooltip content="Appears on top" placement="top">
        <Button variant="secondary" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Appears on bottom" placement="bottom">
        <Button variant="secondary" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Appears on left" placement="left">
        <Button variant="secondary" size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Appears on right" placement="right">
        <Button variant="secondary" size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 40 }}>
      <Tooltip content="Default — hover to see" placement="top">
        <Button variant="secondary" size="sm">Default</Button>
      </Tooltip>
      <Tooltip content="Delayed tooltip" placement="top" delay={1000}>
        <Button variant="secondary" size="sm">Delayed (1s)</Button>
      </Tooltip>
      <Tooltip content="You won't see this" placement="top" disabled>
        <Button variant="secondary" size="sm">Disabled</Button>
      </Tooltip>
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { content: 'Tooltip content', theme: 'dark', placement: 'top', disabled: false, delay: 300 },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
};

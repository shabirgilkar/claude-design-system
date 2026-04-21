import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from '../components/Avatar/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=80-29669',
    },
  },
  argTypes: {
    size:     { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    color:    { control: 'select', options: ['purple', 'pink', 'red', 'green', 'blue'] },
    initials: { control: 'text' },
    alt:      { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: { initials: 'AB', size: 'md', color: 'purple' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar initials="AB" color="purple" />
      <Avatar initials="CD" color="pink" />
      <Avatar initials="EF" color="red" />
      <Avatar initials="GH" color="green" />
      <Avatar initials="IJ" color="blue" />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar initials="XS" size="xs"  color="purple" />
      <Avatar initials="SM" size="sm"  color="purple" />
      <Avatar initials="MD" size="md"  color="purple" />
      <Avatar initials="LG" size="lg"  color="purple" />
      <Avatar initials="XL" size="xl"  color="purple" />
      <Avatar initials="2X" size="2xl" color="purple" />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar initials="AB" color="purple" />
      <Avatar initials="SJ" color="blue" size="lg" />
      <Avatar alt="User avatar" size="md" />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { initials: 'AB', size: 'md', color: 'purple' },
};

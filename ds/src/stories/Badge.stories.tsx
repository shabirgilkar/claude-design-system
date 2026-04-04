import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from '../components/Badge/Badge';

const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=0-1',
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'success', 'warning', 'error', 'info', 'brand'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    shape:   { control: 'select', options: ['pill', 'rect'] },
    dot:     { control: 'boolean' },
    children: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { variant: 'neutral', size: 'md', children: 'Badge' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="brand">Brand</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="brand" size="sm">Small</Badge>
      <Badge variant="brand" size="md">Medium</Badge>
      <Badge variant="brand" size="lg">Large</Badge>
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success">Default pill</Badge>
      <Badge variant="success" shape="rect">Rect shape</Badge>
      <Badge variant="success" dot>With dot</Badge>
      <Badge variant="info" icon={<StarIcon />}>With icon</Badge>
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: { variant: 'neutral', size: 'md', shape: 'pill', dot: false, children: 'Badge' },
};

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToastProvider, useToast } from '../components/Toast/Toast';
import { Button } from '../components/Button/Button';

// Wrapper that provides ToastContext
const ToastDemo: React.FC<{
  variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  title?: string;
  description?: string;
  duration?: number;
  label?: string;
}> = ({ variant = 'success', title = 'Action completed', description, duration = 4000, label = 'Show Toast' }) => {
  const { addToast } = useToast();
  return (
    <Button variant="primary" onClick={() => addToast({ variant, title, description, duration })}>
      {label}
    </Button>
  );
};

const withProvider = (Story: React.ComponentType) => (
  <ToastProvider>
    <Story />
  </ToastProvider>
);

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=0-1',
    },
  },
  decorators: [withProvider],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ToastDemo variant="success" title="Changes saved" description="Your settings have been updated." />,
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <ToastDemo variant="success" title="Success" label="Success" />
      <ToastDemo variant="error"   title="Error"   label="Error" />
      <ToastDemo variant="warning" title="Warning" label="Warning" />
      <ToastDemo variant="info"    title="Info"    label="Info" />
      <ToastDemo variant="neutral" title="Neutral" label="Neutral" />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'With & Without Description',
  render: () => (
    <div style={{ display: 'flex', gap: 10 }}>
      <ToastDemo variant="info" title="Title only" label="Title only" />
      <ToastDemo variant="info" title="With description" description="Providing more context about the action." label="With description" />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <ToastDemo variant="success" title="Item created"  description="Your item was created successfully." label="Success" />
      <ToastDemo variant="error"   title="Upload failed" description="Check your connection and try again." label="Error" />
      <ToastDemo variant="warning" title="Session expiring" description="You'll be signed out in 5 minutes." label="Warning" />
      <ToastDemo variant="info"    title="Update available" description="A new version is ready to install."  label="Info" />
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  args: {
    variant: 'success',
    title: 'Toast notification',
    description: 'This is an optional description.',
    duration: 4000,
    label: 'Trigger Toast',
  },
  argTypes: {
    variant:     { control: 'select', options: ['success', 'error', 'warning', 'info', 'neutral'] },
    title:       { control: 'text' },
    description: { control: 'text' },
    duration:    { control: 'number' },
    label:       { control: 'text' },
  },
  render: (args) => (
    <ToastDemo
      variant={args.variant}
      title={args.title}
      description={args.description}
      duration={args.duration}
      label={args.label}
    />
  ),
};

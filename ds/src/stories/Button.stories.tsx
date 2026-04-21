import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/Button/Button';

// ── Icon helpers ───────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ── Meta ───────────────────────────────────────────────────────────────────
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JHlhHQHU9PslnN7WF3Pfxl/Claude-MCP?node-id=10-1181',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'ghost'],
      description: 'Visual hierarchy type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Component size',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    pill: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── 1. Default ─────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    leftIcon: <PlusIcon />,
  },
};

// ── 2. AllVariants ─────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary"     leftIcon={<PlusIcon />}>Primary</Button>
      <Button variant="secondary"   leftIcon={<PlusIcon />}>Secondary</Button>
      <Button variant="tertiary"    leftIcon={<PlusIcon />}>Tertiary</Button>
      <Button variant="destructive" leftIcon={<PlusIcon />}>Destructive</Button>
      <Button variant="ghost"       leftIcon={<PlusIcon />}>Ghost</Button>
    </div>
  ),
};

// ── 3. AllSizes ────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm" leftIcon={<PlusIcon />}>Small</Button>
      <Button size="md" leftIcon={<PlusIcon />}>Medium</Button>
      <Button size="lg" leftIcon={<PlusIcon />}>Large</Button>
    </div>
  ),
};

// ── 4. AllStates ───────────────────────────────────────────────────────────
export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Default</Button>
      <Button variant="primary" className="pseudo-hover">Hover</Button>
      <Button variant="primary" className="pseudo-focus">Focused</Button>
      <Button variant="primary" loading>Loading</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" rightIcon={<ChevronIcon />}>With Icons</Button>
      <Button variant="primary" pill>Pill</Button>
    </div>
  ),
};

// ── 5. Interactive ─────────────────────────────────────────────────────────
export const Interactive: Story = {
  name: 'Interactive',
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    disabled: false,
    loading: false,
    pill: false,
    fullWidth: false,
    iconOnly: false,
    leftIcon: <PlusIcon />,
    rightIcon: undefined,
  },
  parameters: {
    layout: 'padded',
  },
};

// ── Sizes side by side with variants ──────────────────────────────────────
export const SizeMatrix: Story = {
  name: 'Size × Variant Matrix',
  render: () => {
    const variants = ['primary', 'secondary', 'tertiary', 'destructive', 'ghost'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ds-color-fg-subtle)', width: 28, flexShrink: 0 }}>{size}</span>
            {variants.map((variant) => (
              <Button key={variant} variant={variant} size={size} leftIcon={<PlusIcon />}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

// ── Icon variants ──────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: 'Icon Combinations',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" leftIcon={<PlusIcon />}>Left Icon</Button>
      <Button variant="primary" rightIcon={<ArrowIcon />}>Right Icon</Button>
      <Button variant="primary" leftIcon={<PlusIcon />} rightIcon={<ChevronIcon />}>Both Icons</Button>
      <Button variant="primary" iconOnly leftIcon={<PlusIcon />} aria-label="Add" />
      <Button variant="secondary" iconOnly leftIcon={<PlusIcon />} aria-label="Add" />
    </div>
  ),
};

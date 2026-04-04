import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Tooltip, TooltipTheme, TooltipPlacement } from '../../components/Tooltip/Tooltip';
import { Button } from '../../components/Button/Button';
import { SelectControl, ToggleControl, TextControl } from '../components/DocPage';

const TooltipPlayground: React.FC = () => {
  const [theme, setTheme] = React.useState('dark');
  const [placement, setPlacement] = React.useState('top');
  const [content, setContent] = React.useState('This is a helpful tooltip');
  const [delay, setDelay] = React.useState('300');
  const [disabled, setDisabled] = React.useState(false);

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Theme" value={theme} onChange={setTheme}
            options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]} />
          <SelectControl label="Placement" value={placement} onChange={setPlacement}
            options={[{ value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' }, { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }]} />
          <SelectControl label="Delay" value={delay} onChange={setDelay}
            options={[{ value: '0', label: 'None (0ms)' }, { value: '150', label: 'Fast (150ms)' }, { value: '300', label: 'Normal (300ms)' }, { value: '600', label: 'Slow (600ms)' }]} />
          <TextControl label="Content" value={content} onChange={setContent} />
          <ToggleControl label="Disabled" checked={disabled} onChange={setDisabled} />
        </>
      }
    >
      <div style={{ padding: 40 }}>
        <Tooltip
          content={content}
          theme={theme as TooltipTheme}
          placement={placement as TooltipPlacement}
          delay={parseInt(delay, 10)}
          disabled={disabled}
        >
          <Button variant="secondary">Hover me</Button>
        </Tooltip>
      </div>
    </DocPlayground>
  );
};

export const TooltipPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Tooltip"
      tagline="Contextual hints that surface on hover or focus."
      description="Tooltip reveals a small informational overlay when users hover or focus an element. Available in 2 themes and 4 placement directions with configurable delay. Fully keyboard and screen-reader accessible."
      status="stable"
      version="v1.0"
      stats={[
        { value: 2, label: 'Themes' },
        { value: 4, label: 'Placements' },
        { value: 8, label: 'Combos' },
        { value: 300, label: 'Default delay (ms)' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Explaining icon buttons that have no visible label' },
        { text: 'Clarifying truncated text — "see full content on hover"' },
        { text: 'Surfacing keyboard shortcuts — "Save (⌘S)"' },
        { text: 'Additional context for form fields without taking up space' },
      ]}
      dontUse={[
        { text: 'Critical information — users on touch devices cannot hover' },
        { text: 'Long text or formatted content — use a Popover instead' },
        { text: 'Interactive content (links, buttons) inside the tooltip' },
        { text: 'Error messages — use inline error states instead' },
      ]}
    />

    <TooltipPlayground />

    <DocCodeExample code={`import { Tooltip } from '@ds/components';

<Tooltip content="Save changes (⌘S)" placement="top">
  <Button>Save</Button>
</Tooltip>

<Tooltip content="Light theme" theme="light" placement="bottom">
  <IconButton aria-label="Theme" />
</Tooltip>

// Disabled tooltip
<Tooltip content="Won't show" disabled>
  <Button variant="ghost">Hover me</Button>
</Tooltip>`} />

    <DocAnatomy
      description="Tooltip wraps a trigger element and renders a floating panel. The panel appears on hover or focus with a configurable delay."
      preview={
        <div style={{ padding: 40 }}>
          <Tooltip content="Save your changes (⌘S)" placement="top" delay={0}>
            <Button variant="secondary">Save</Button>
          </Tooltip>
        </div>
      }
      callouts={[
        { name: 'Trigger', description: 'Any element wrapped by Tooltip. Must be focusable for keyboard accessibility.' },
        { name: 'Panel', description: 'Floating overlay. Positions based on placement prop, flips if near viewport edge.' },
        { name: 'Arrow', description: 'Small triangle pointing toward the trigger — reinforces spatial relationship.' },
        { name: 'Content', description: 'Short text. Single line preferred. Max ~60 characters.' },
      ]}
    />

    <DocVariants
      description="Two themes and four placements. Choose dark for most contexts, light for dark-background triggers."
      variants={[
        { label: 'Dark (default)', description: 'Default. Works on most page backgrounds.',    preview: <div style={{ padding: 32 }}><Tooltip content="Dark tooltip" theme="dark" delay={0}><Button variant="secondary" size="sm">Dark</Button></Tooltip></div> },
        { label: 'Light',          description: 'For triggers on very dark backgrounds.',      preview: <div style={{ padding: 32 }}><Tooltip content="Light tooltip" theme="light" delay={0}><Button variant="secondary" size="sm">Light</Button></Tooltip></div> },
        { label: 'Top (default)',  description: 'Appears above the trigger — most common.',   preview: <div style={{ padding: 32 }}><Tooltip content="Appears on top" placement="top" delay={0}><Button variant="secondary" size="sm">Top</Button></Tooltip></div> },
        { label: 'Bottom',         description: 'Appears below the trigger.',                 preview: <div style={{ padding: 32 }}><Tooltip content="Appears on bottom" placement="bottom" delay={0}><Button variant="secondary" size="sm">Bottom</Button></Tooltip></div> },
      ]}
    />

    <DocStates
      description="Tooltip has three modes: hidden (default), visible (on hover/focus), and disabled."
      states={[
        { label: 'Default (hover to see)', colorKey: 'default',  preview: <div style={{ padding: 20 }}><Tooltip content="Default tooltip" placement="top" delay={0}><Button variant="secondary" size="sm">Default</Button></Tooltip></div> },
        { label: 'Delayed',                colorKey: 'default',  preview: <div style={{ padding: 20 }}><Tooltip content="Delayed tooltip" placement="top" delay={1000}><Button variant="secondary" size="sm">Delayed (1s)</Button></Tooltip></div> },
        { label: 'Disabled',               colorKey: 'disabled', preview: <div style={{ padding: 20 }}><Tooltip content="Won't show" placement="top" disabled><Button variant="secondary" size="sm">Disabled</Button></Tooltip></div> },
        { label: 'All placements',         colorKey: 'default',  preview: <div style={{ display: 'flex', gap: 8, padding: 20, flexWrap: 'wrap' }}>{(['top','bottom','left','right'] as TooltipPlacement[]).map(p => <Tooltip key={p} content={p} placement={p} delay={0}><Button variant="secondary" size="sm">{p}</Button></Tooltip>)}</div> },
      ]}
    />

    <DocGuidelines
      description="Keep tooltip content to a single short sentence. If you need more space, use a Popover."
      dos={[
        'Keep content under 60 characters — one short sentence',
        'Use for icon buttons that lack a visible text label',
        'Match placement to the most likely hover approach (usually top)',
        'Add keyboard shortcuts to tooltips — e.g. "Save (⌘S)"',
      ]}
      donts={[
        "Don't include critical info — tooltips aren't visible on touch screens",
        "Don't put interactive elements (links, buttons) inside the tooltip",
        "Don't use tooltip for error messages — use inline error states",
        "Don't trigger tooltips on disabled elements — users need to understand why",
      ]}
    />

    <DocAccessibility
      description="Tooltip follows the ARIA tooltip pattern and is fully keyboard accessible."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Panel uses role="tooltip"', 'Trigger uses aria-describedby pointing to tooltip id', 'Tooltip rendered in DOM at all times (visibility:hidden)', 'Dynamic visibility toggled with aria-hidden'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Tooltip appears when trigger receives focus', 'Tooltip hides when trigger loses focus', 'Escape key hides tooltip', 'No keyboard navigation inside tooltip (content only)'] },
        { icon: '◐', title: 'Color Contrast', items: ['Dark theme text: ≥ 4.5:1 on dark background', 'Light theme text: ≥ 4.5:1 on light background', 'Arrow color matches panel background'] },
        { icon: '📢', title: 'Screen Readers', items: ['Content announced via aria-describedby on trigger focus', 'Role "tooltip" communicates supplementary nature', 'Not announced on hover — only on focus', 'Content should be supplementary, not primary'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'content',   type: 'React.ReactNode', required: true,              description: 'Tooltip text or content.' },
        { name: 'children',  type: 'React.ReactElement', required: true,           description: 'Trigger element — must be focusable.' },
        { name: 'theme',     type: "'dark' | 'light'",       default: "'dark'",    description: 'Color scheme of the tooltip panel.' },
        { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Where the tooltip appears relative to the trigger.' },
        { name: 'delay',     type: 'number',               default: '300',         description: 'Delay in ms before the tooltip appears.' },
        { name: 'disabled',  type: 'boolean',              default: 'false',       description: 'Prevents the tooltip from appearing.' },
      ]}
    />

    <DocTokens
      description="Tooltip tokens cover both themes and the shared panel structure."
      groups={[
        { title: 'Dark Theme',  tokens: ['tooltip/dark/background', 'tooltip/dark/text', 'tooltip/dark/border'] },
        { title: 'Light Theme', tokens: ['tooltip/light/background', 'tooltip/light/text', 'tooltip/light/border', 'tooltip/light/shadow'] },
        { title: 'Structure',   tokens: ['tooltip/padding-x', 'tooltip/padding-y', 'tooltip/border-radius', 'tooltip/font-size', 'tooltip/arrow-size'] },
      ]}
    />

    <DocSpecs
      description="Tooltip panel dimensions and positioning offsets."
      sizes={[
        { label: 'Panel',   badge: 'PN', rows: [{ label: 'pad-x', value: '8px' }, { label: 'pad-y', value: '6px' }, { label: 'font', value: '12px' }, { label: 'radius', value: '6px' }] },
        { label: 'Arrow',   badge: 'AR', rows: [{ label: 'size', value: '6px' }, { label: 'offset', value: '4px' }, { label: 'color', value: 'matches bg' }, { label: 'shape', value: 'triangle' }] },
        { label: 'Trigger offset', badge: 'TO', rows: [{ label: 'top', value: '8px' }, { label: 'bottom', value: '8px' }, { label: 'left', value: '8px' }, { label: 'right', value: '8px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Button',  description: 'Icon buttons are the most common Tooltip trigger.',  href: '#/button' },
      { name: 'Badge',   description: 'Use Tooltip to explain badge status values.',        href: '#/badge' },
      { name: 'Avatar',  description: 'Show user full name via Tooltip on compact avatars.',href: '#/avatar' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — 2 themes, 4 placements, configurable delay, disabled mode, full ARIA tooltip pattern.' },
    ]} />
  </DocPage>
);

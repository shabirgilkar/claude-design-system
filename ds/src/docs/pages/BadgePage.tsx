import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Badge } from '../../components/Badge/Badge';
import { SelectControl, ToggleControl } from '../components/DocPage';

const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const BadgePlayground: React.FC = () => {
  const [variant, setVariant] = React.useState('neutral');
  const [size, setSize]       = React.useState('md');
  const [shape, setShape]     = React.useState('pill');
  const [dot, setDot]         = React.useState(false);
  const [showIcon, setShowIcon] = React.useState(false);

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Variant" value={variant} onChange={setVariant}
            options={['neutral','success','warning','error','info','brand'].map(v => ({ value: v, label: v.charAt(0).toUpperCase()+v.slice(1) }))} />
          <SelectControl label="Size" value={size} onChange={setSize}
            options={[{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }]} />
          <SelectControl label="Shape" value={shape} onChange={setShape}
            options={[{ value: 'pill', label: 'Pill' }, { value: 'rect', label: 'Rect' }]} />
          <ToggleControl label="Dot"  checked={dot}      onChange={setDot} />
          <ToggleControl label="Icon" checked={showIcon} onChange={setShowIcon} />
        </>
      }
    >
      <Badge variant={variant as any} size={size as any} shape={shape as any} dot={dot && !showIcon} icon={showIcon && !dot ? <StarIcon /> : undefined}>
        Badge
      </Badge>
    </DocPlayground>
  );
};

export const BadgePage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Badge"
      tagline="Concise status and metadata at a glance."
      description="Badges communicate status, counts, and categorical labels. Available in 6 variants, 3 sizes, and 2 shapes — with optional dot and icon support."
      status="stable"
      version="v1.0"
      stats={[
        { value: 6, label: 'Variants' },
        { value: 3, label: 'Sizes' },
        { value: 2, label: 'Shapes' },
        { value: 36, label: 'Combos' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'Status indicators — success, error, warning, info states' },
        { text: 'Count labels — unread notifications, item quantities' },
        { text: 'Category tags — content type, version labels' },
        { text: 'Inline metadata — table cells, list items, card headers' },
      ]}
      dontUse={[
        { text: 'Interactive actions — use Button instead' },
        { text: 'Navigation — use Tabs or links instead' },
        { text: 'Long text — badges are for concise labels (1–3 words)' },
        { text: 'Replacing icons entirely — combine icon with text for clarity' },
      ]}
    />

    <BadgePlayground />

    <DocCodeExample code={`import { Badge } from '@ds/components';

<Badge variant="success">Active</Badge>

<Badge variant="error" size="sm" shape="rect">
  Failed
</Badge>

<Badge variant="info" dot>
  Live
</Badge>

<Badge variant="brand" icon={<StarIcon />}>
  Featured
</Badge>`} />

    <DocAnatomy
      description="A Badge is composed of up to four elements. The container and label are always present; dot, icon, and count are optional."
      preview={<Badge variant="brand" size="md" icon={<StarIcon />}>Featured</Badge>}
      callouts={[
        { name: 'Container', description: 'Pill or rect shape with variant-specific fill and border.' },
        { name: 'Dot', description: 'Optional 6px status indicator. Mutually exclusive with icon.' },
        { name: 'Icon', description: 'Optional 10px icon. Left-aligned, matches text color.' },
        { name: 'Label', description: 'Short text. Semibold, uppercase-tracked, mono-sized.' },
      ]}
    />

    <DocVariants
      description="Six variants map to semantic status meanings — from informational neutral to high-emphasis brand."
      variants={[
        { label: 'Neutral', description: 'Default state, inactive, draft.', preview: <Badge variant="neutral">Neutral</Badge> },
        { label: 'Success', description: 'Confirmed, active, complete.', preview: <Badge variant="success">Success</Badge> },
        { label: 'Warning', description: 'Pending, attention required.', preview: <Badge variant="warning">Warning</Badge> },
        { label: 'Error', description: 'Failed, critical, blocked.', preview: <Badge variant="error">Error</Badge> },
        { label: 'Info', description: 'Informational, new, updated.', preview: <Badge variant="info">Info</Badge> },
        { label: 'Brand', description: 'Highlighted, featured, premium.', preview: <Badge variant="brand">Brand</Badge> },
      ]}
    />

    <DocStates
      description="Badges are non-interactive — they render consistently regardless of user input."
      states={[
        { label: 'Pill shape',  colorKey: 'default',  preview: <Badge variant="brand" shape="pill">Label</Badge> },
        { label: 'Rect shape',  colorKey: 'default',  preview: <Badge variant="brand" shape="rect">Label</Badge> },
        { label: 'With dot',    colorKey: 'active',   preview: <Badge variant="success" dot>Active</Badge> },
        { label: 'With icon',   colorKey: 'default',  preview: <Badge variant="info" icon={<StarIcon />}>Featured</Badge> },
        { label: 'Small',       colorKey: 'default',  preview: <Badge variant="neutral" size="sm">SM</Badge> },
        { label: 'Large',       colorKey: 'default',  preview: <Badge variant="neutral" size="lg">LG</Badge> },
      ]}
    />

    <DocGuidelines
      description="Keep badge labels concise and use semantic variants consistently across the product."
      dos={[
        'Use one badge variant consistently per status type across the product',
        'Keep labels to 1–3 words — truncate or abbreviate if necessary',
        'Use dot variant for simple live/active indicators',
        'Pair badge with a label or icon for ambiguous status values',
      ]}
      donts={[
        "Don't use more than 2 badges in the same row — visual noise",
        "Don't use different variants for the same status across screens",
        "Don't combine dot and icon in the same badge — pick one",
        "Don't use badges as interactive elements — they are display-only",
      ]}
    />

    <DocAccessibility
      description="Badges are presentational. Screen readers need context from surrounding content, not just the badge label."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Uses role="status" for live status badges', 'Static badges need no additional ARIA', 'Dot-only badges need aria-label for context'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Badges are not interactive — not focusable', 'Surrounding interactive elements carry focus'] },
        { icon: '◐', title: 'Color Contrast', items: ['All variant text: ≥ 4.5:1 on badge background', 'Border contrast: ≥ 3.0:1 on page background'] },
        { icon: '📢', title: 'Screen Readers', items: ['Provide context via aria-label on the parent', 'Status change announcements via aria-live on the container'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'variant',  type: "'neutral' | 'success' | 'warning' | 'error' | 'info' | 'brand'", default: "'neutral'", description: 'Semantic color variant.' },
        { name: 'size',     type: "'sm' | 'md' | 'lg'",    default: "'md'",    description: 'Controls height and font size.' },
        { name: 'shape',    type: "'pill' | 'rect'",        default: "'pill'",  description: 'Fully rounded (pill) or slightly rounded (rect).' },
        { name: 'dot',      type: 'boolean',                default: 'false',   description: 'Shows a status dot. Mutually exclusive with icon.' },
        { name: 'icon',     type: 'React.ReactNode',        default: '—',       description: 'Icon rendered before the label. Mutually exclusive with dot.' },
        { name: 'children', type: 'React.ReactNode',        required: true, description: 'Badge label text.' },
      ]}
    />

    <DocTokens
      description="All visual properties flow through the three-tier token chain."
      groups={[
        { title: 'Color Tokens', tokens: ['badge/color/{variant}/background', 'badge/color/{variant}/foreground', 'badge/color/{variant}/border'] },
        { title: 'Size Tokens',  tokens: ['badge/size/{size}/height', 'badge/size/{size}/padding-x', 'badge/size/{size}/dot', 'badge/size/{size}/icon'] },
        { title: 'Typography',   tokens: ['badge/typography/{size}/size', 'badge/typography/{size}/line-height', 'badge/typography/font-weight', 'badge/typography/letter-spacing'] },
      ]}
    />

    <DocSpecs
      description="Exact measurements for all Badge sizes."
      sizes={[
        { label: 'Small',  badge: 'SM', rows: [{ label: 'height', value: '18px' }, { label: 'padding-x', value: '6px' }, { label: 'font', value: '10px' }, { label: 'dot', value: '5px' }] },
        { label: 'Medium', badge: 'MD', rows: [{ label: 'height', value: '22px' }, { label: 'padding-x', value: '8px' }, { label: 'font', value: '11px' }, { label: 'dot', value: '6px' }] },
        { label: 'Large',  badge: 'LG', rows: [{ label: 'height', value: '26px' }, { label: 'padding-x', value: '10px' }, { label: 'font', value: '12px' }, { label: 'dot', value: '7px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Button', description: 'For interactive actions — not status display.', href: '#/button' },
      { name: 'Toast',  description: 'For transient status messages with auto-dismiss.', href: '#/toast' },
      { name: 'Avatar', description: 'Can be paired with Badge for user status indicators.', href: '#/avatar' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — 6 variants × 3 sizes × 2 shapes = 36 combinations. Dot and icon support. Full token architecture.' },
    ]} />
  </DocPage>
);

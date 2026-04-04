import React from 'react';
import { DocPage } from '../components/DocPage';
import {
  DocHero, DocOverview, DocPlayground, DocCodeExample, DocAnatomy,
  DocVariants, DocStates, DocGuidelines, DocAccessibility,
  DocProps, DocTokens, DocSpecs, DocRelated, DocChangelog,
} from '../components/sections';
import { Avatar, AvatarGroup, AvatarSize } from '../../components/Avatar/Avatar';
import { SelectControl, TextControl } from '../components/DocPage';

const AvatarPlayground: React.FC = () => {
  const [size, setSize] = React.useState('md');
  const [color, setColor] = React.useState('purple');
  const [initials, setInitials] = React.useState('JD');

  return (
    <DocPlayground
      controls={
        <>
          <SelectControl label="Size" value={size} onChange={setSize}
            options={[
              { value: 'xs', label: 'XS' }, { value: 'sm', label: 'SM' }, { value: 'md', label: 'MD' },
              { value: 'lg', label: 'LG' }, { value: 'xl', label: 'XL' }, { value: '2xl', label: '2XL' },
            ]} />
          <SelectControl label="Color" value={color} onChange={setColor}
            options={[
              { value: 'purple', label: 'Purple' }, { value: 'pink', label: 'Pink' },
              { value: 'red', label: 'Red' }, { value: 'green', label: 'Green' }, { value: 'blue', label: 'Blue' },
            ]} />
          <TextControl label="Initials" value={initials} onChange={setInitials} />
        </>
      }
    >
      <Avatar initials={initials} size={size as AvatarSize} color={color as any} />
    </DocPlayground>
  );
};

export const AvatarPage: React.FC = () => (
  <DocPage>
    <DocHero
      component="Avatar"
      tagline="Visual identity for people and entities at a glance."
      description="Avatar represents a user, team, or entity. Renders an image when available, falls back to initials, then to a generic icon. Available in 6 sizes, 5 color variants, and supports AvatarGroup for stacked collections."
      status="stable"
      version="v1.0"
      stats={[
        { value: 6, label: 'Sizes' },
        { value: 5, label: 'Colors' },
        { value: 3, label: 'Fallback levels' },
        { value: 90, label: 'Combos' },
      ]}
    />

    <DocOverview
      use={[
        { text: 'User identity in nav, comments, assignee fields, and tables' },
        { text: 'Team members list with stacked AvatarGroup' },
        { text: 'Profile headers and account menus' },
        { text: 'Activity feeds — pairing avatar with action text' },
      ]}
      dontUse={[
        { text: 'Illustrative imagery — use an Image component' },
        { text: 'Decorative icons — use an Icon component' },
        { text: 'Company logos — use a Logo or Image component' },
        { text: 'More than 5 stacked without a +N overflow indicator' },
      ]}
    />

    <AvatarPlayground />

    <DocCodeExample code={`import { Avatar, AvatarGroup } from '@ds/components';

// Initials avatar
<Avatar initials="JD" size="md" />

// Image avatar with fallback
<Avatar src="/photo.jpg" alt="Jane Doe" size="lg" />

// Color variant
<Avatar initials="AB" color="pink" size="xl" />

// Stacked group
<AvatarGroup>
  <Avatar initials="AJ" color="purple" />
  <Avatar initials="MK" color="pink" />
  <Avatar initials="RD" color="blue" />
</AvatarGroup>`} />

    <DocAnatomy
      description="Avatar renders one of three layers: image, initials, or fallback icon — in priority order."
      preview={
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Avatar initials="JD" color="purple" size="xl" />
          <Avatar initials="AB" color="blue"   size="xl" />
          <Avatar initials="MK" color="pink"   size="xl" />
        </div>
      }
      callouts={[
        { name: 'Container', description: 'Circular clip with color background. Size drives all dimensions.' },
        { name: 'Image layer', description: 'Rendered first when src is provided. Falls back on error.' },
        { name: 'Initials layer', description: 'Up to 2 letters when no valid image. Semibold, auto-sized.' },
        { name: 'Fallback icon', description: 'Generic person icon when neither image nor initials are present.' },
      ]}
    />

    <DocVariants
      description="Five color variants map to avatar accent colors. All are available at every size."
      variants={[
        { label: 'Purple', description: 'Default. Violet accent.',        preview: <Avatar initials="AB" color="purple" size="lg" /> },
        { label: 'Pink',   description: 'Rose accent.',                   preview: <Avatar initials="CD" color="pink"   size="lg" /> },
        { label: 'Red',    description: 'Tomato accent.',                 preview: <Avatar initials="EF" color="red"    size="lg" /> },
        { label: 'Green',  description: 'Emerald accent.',                preview: <Avatar initials="GH" color="green"  size="lg" /> },
        { label: 'Blue',   description: 'Sky accent.',                    preview: <Avatar initials="IJ" color="blue"   size="lg" /> },
      ]}
    />

    <DocStates
      description="Avatar renders consistently — it has no interactive states. All six sizes shown."
      states={[
        { label: 'XS',      colorKey: 'default', preview: <Avatar initials="XS" size="xs"  color="purple" /> },
        { label: 'SM',      colorKey: 'default', preview: <Avatar initials="SM" size="sm"  color="purple" /> },
        { label: 'MD',      colorKey: 'default', preview: <Avatar initials="MD" size="md"  color="purple" /> },
        { label: 'LG',      colorKey: 'default', preview: <Avatar initials="LG" size="lg"  color="purple" /> },
        { label: 'XL',      colorKey: 'default', preview: <Avatar initials="XL" size="xl"  color="purple" /> },
        { label: '2XL',     colorKey: 'default', preview: <Avatar initials="2X" size="2xl" color="purple" /> },
      ]}
    />

    <DocGuidelines
      description="Use initials consistently across the product. Derive color from user identity — don't let users pick their color."
      dos={[
        'Derive color from user name hash for consistency across sessions',
        'Use AvatarGroup with a +N overflow count for more than 4 stacked avatars',
        'Always pass alt text when using image mode for screen reader support',
        'Use the largest size that context allows for profile headers',
      ]}
      donts={[
        "Don't show more than 5 avatars stacked without a +N indicator",
        "Don't use Avatar as a button without wrapping it in a button/link element",
        "Don't use 2xl Avatar in dense list rows — use sm or xs",
        "Don't mix sizes within the same AvatarGroup — pick one",
      ]}
    />

    <DocAccessibility
      description="Avatar is presentational. Ensure surrounding context communicates the user's name."
      cards={[
        { icon: '♿', title: 'ARIA Roles', items: ['Image mode: img role with alt text', 'Initials mode: aria-label with full name recommended', 'Decorative avatars: aria-hidden on the image', 'AvatarGroup: no ARIA role; parent provides context'] },
        { icon: '⌨', title: 'Keyboard Navigation', items: ['Avatar itself is not focusable', 'Wrap in button/link when clickable', 'Clickable avatar inherits button keyboard behaviour'] },
        { icon: '◐', title: 'Color Contrast', items: ['Initials text: ≥ 4.5:1 on color background', 'All 5 color variants tested against white initials', 'Border ring (when used): ≥ 3.0:1 on page bg'] },
        { icon: '📢', title: 'Screen Readers', items: ['Pass alt or aria-label with the user\'s full name', 'Initials alone are not sufficient for identity', 'AvatarGroup should describe the count in context'] },
      ]}
    />

    <DocProps
      props={[
        { name: 'initials', type: 'string',                                        default: '—',       description: 'Avatar: Up to 2 letters shown when no valid image.' },
        { name: 'src',      type: 'string',                                        default: '—',       description: 'Avatar: Image URL. Falls back to initials on error.' },
        { name: 'alt',      type: 'string',                                        default: "''",      description: 'Avatar: Alt text for the image (required for accessibility).' },
        { name: 'size',     type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",    default: "'md'",    description: 'Avatar: Dimensions of the avatar circle.' },
        { name: 'color',    type: "'purple' | 'pink' | 'red' | 'green' | 'blue'", default: 'derived', description: 'Avatar: Background color for the initials avatar.' },
        { name: 'children', type: 'React.ReactNode', required: true,                                   description: 'AvatarGroup: Avatar components to render in the overlapping stack.' },
      ]}
    />

    <DocTokens
      description="Avatar tokens cover the container, each color variant, and all six sizes."
      groups={[
        { title: 'Color Tokens', tokens: ['avatar/color/{variant}/background', 'avatar/color/{variant}/text', 'avatar/color/{variant}/border'] },
        { title: 'Size Tokens',  tokens: ['avatar/size/xs', 'avatar/size/sm', 'avatar/size/md', 'avatar/size/lg', 'avatar/size/xl', 'avatar/size/2xl'] },
        { title: 'Typography',   tokens: ['avatar/typography/{size}/font-size', 'avatar/typography/font-weight'] },
      ]}
    />

    <DocSpecs
      description="Exact dimensions for all Avatar sizes."
      sizes={[
        { label: 'XS / SM', badge: 'XS', rows: [{ label: 'xs', value: '20px' }, { label: 'sm', value: '24px' }, { label: 'xs-font', value: '9px' }, { label: 'sm-font', value: '10px' }] },
        { label: 'MD / LG', badge: 'MD', rows: [{ label: 'md', value: '32px' }, { label: 'lg', value: '40px' }, { label: 'md-font', value: '12px' }, { label: 'lg-font', value: '14px' }] },
        { label: 'XL / 2XL',badge: 'XL', rows: [{ label: 'xl', value: '48px' }, { label: '2xl', value: '64px' }, { label: 'xl-font', value: '16px' }, { label: '2xl-font', value: '20px' }] },
      ]}
    />

    <DocRelated components={[
      { name: 'Badge',   description: 'Can be overlaid on Avatar for status indicator.',   href: '#/badge' },
      { name: 'Tooltip', description: 'Show full name on hover over a compact avatar.',    href: '#/tooltip' },
      { name: 'Button',  description: 'Wrap Avatar in a button for clickable profiles.',  href: '#/button' },
    ]} />

    <DocChangelog entries={[
      { version: 'v1.0', date: 'Mar 2026', description: 'Initial release — 6 sizes, 5 colors, image/initials/icon fallback chain, AvatarGroup with overlap stacking.' },
    ]} />
  </DocPage>
);

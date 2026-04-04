import React from 'react';
import { DocPage, Section } from '../components/DocPage';
import styles from './SpacingPage.module.css';

const SPACING = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64, 80, 96, 100];
const COMPONENT_SPACING = [
  { name: '2xs', px: 2, token: '--ds-spacing-component-2xs' },
  { name: 'xs',  px: 4, token: '--ds-spacing-component-xs' },
  { name: 'sm',  px: 6, token: '--ds-spacing-component-sm' },
  { name: 'md',  px: 8, token: '--ds-spacing-component-md' },
  { name: 'lg',  px: 12, token: '--ds-spacing-component-lg' },
  { name: 'xl',  px: 16, token: '--ds-spacing-component-xl' },
  { name: '2xl', px: 20, token: '--ds-spacing-component-2xl' },
  { name: '3xl', px: 24, token: '--ds-spacing-component-3xl' },
];
const COMPONENT_SIZES = [
  { name: 'sm', px: 32, token: '--ds-size-component-sm', desc: 'Small buttons, inputs' },
  { name: 'md', px: 40, token: '--ds-size-component-md', desc: 'Default buttons, inputs' },
  { name: 'lg', px: 48, token: '--ds-size-component-lg', desc: 'Large buttons, inputs' },
];
const RADII = [
  { name: 'none', px: 0, token: '--ds-radius-none' },
  { name: 'sm', px: 4, token: '--ds-radius-sm' },
  { name: 'md', px: 8, token: '--ds-radius-md' },
  { name: 'lg', px: 12, token: '--ds-radius-lg' },
  { name: 'xl', px: 16, token: '--ds-radius-xl' },
  { name: '2xl', px: 24, token: '--ds-radius-2xl' },
  { name: '3xl', px: 32, token: '--ds-radius-3xl' },
  { name: 'pill', px: 100, token: '--ds-radius-pill' },
];

export const SpacingPage: React.FC = () => (
  <DocPage title="Spacing & Sizing" description="All spacing, sizing, and radius tokens. Built on a base-2 primitive scale with named semantic aliases.">
    <Section title="Primitive Spacing Scale">
      <div className={styles.scaleBar}>
        {SPACING.map((s) => (
          <div key={s} className={styles.scaleItem}>
            <div className={styles.scaleVis} style={{ height: Math.min(s, 80) }} />
            <span className={styles.scaleValue}>{s}</span>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Component Spacing">
      <div className={styles.tokenTable}>
        {COMPONENT_SPACING.map((s) => (
          <div key={s.name} className={styles.tokenRow}>
            <code className={styles.tokenName}>{s.token}</code>
            <span className={styles.tokenAlias}>{s.name}</span>
            <div className={styles.spacingVis}>
              <div className={styles.spacingBar} style={{ width: s.px * 4 }} />
            </div>
            <span className={styles.tokenPx}>{s.px}px</span>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Component Heights">
      <div className={styles.sizeGrid}>
        {COMPONENT_SIZES.map((s) => (
          <div key={s.name} className={styles.sizeCard}>
            <div className={styles.sizeVis} style={{ height: s.px }}>
              <span className={styles.sizeLabel}>{s.px}px</span>
            </div>
            <code className={styles.tokenName}>{s.token}</code>
            <span className={styles.tokenAlias}>{s.desc}</span>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Border Radius">
      <div className={styles.radiiGrid}>
        {RADII.map((r) => (
          <div key={r.name} className={styles.radiiCard}>
            <div
              className={styles.radiiVis}
              style={{ borderRadius: r.px }}
            />
            <code className={styles.tokenName}>{r.name}</code>
            <span className={styles.tokenPx}>{r.px}px</span>
            <span className={styles.tokenAlias} style={{ fontSize: 9 }}>{r.token}</span>
          </div>
        ))}
      </div>
    </Section>
  </DocPage>
);

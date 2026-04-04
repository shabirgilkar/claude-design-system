import React from 'react';
import { DocPage, Section, CodeBlock } from '../components/DocPage';
import styles from './TokensPage.module.css';

const LAYERS = [
  {
    tier: 'Tier 1',
    name: 'Primitives',
    prefix: '--p-',
    count: 304,
    color: 'var(--ds-color-status-info-fg)',
    desc: 'Raw literal values. Never used directly in components — only referenced by semantic tokens.',
    example: '--p-color-deep-purple-base: #3A1F5D',
    usage: '--p-spacing-8: 8px',
  },
  {
    tier: 'Tier 2',
    name: 'Semantic',
    prefix: '--ds-',
    count: 236,
    color: 'var(--ds-color-status-error-fg)',
    desc: 'Intent-based aliases. Map design intent to primitives. Used directly in component tokens.',
    example: '--ds-color-bg-surface: var(--p-color-deep-purple-800)',
    usage: '--ds-color-border-focus: var(--p-color-crimson-pink-base)',
  },
  {
    tier: 'Tier 3',
    name: 'Components',
    prefix: '--c-{component}-',
    count: 821,
    color: 'var(--ds-color-status-warning-fg)',
    desc: 'Component-scoped tokens. Every component only reads from this tier. Never skips a tier.',
    example: '--c-btn-primary-bg: var(--ds-color-action-primary-bg-default)',
    usage: '--c-input-border-focus: var(--ds-color-border-focus)',
  },
];

export const TokensPage: React.FC = () => (
  <DocPage title="Design Tokens" description="The 3-tier token architecture ensures a clear separation between raw values, design intent, and component implementation.">
    <Section title="Architecture">
      <div className={styles.tierFlow}>
        {LAYERS.map((layer, i) => (
          <React.Fragment key={layer.name}>
            <div className={styles.tierBox}>
              <div className={styles.tierHeader}>
                <span className={styles.tierBadge} style={{ color: layer.color, borderColor: layer.color }}>{layer.tier}</span>
                <span className={styles.tierCount}>{layer.count} vars</span>
              </div>
              <div className={styles.tierName}>{layer.name}</div>
              <p className={styles.tierDesc}>{layer.desc}</p>
              <code className={styles.tierPrefix}>{layer.prefix}</code>
              <div className={styles.tierExample}>{layer.example}</div>
            </div>
            {i < LAYERS.length - 1 && (
              <div className={styles.tierArrow}>↓</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Section>

    <Section title="Usage in CSS">
      <CodeBlock language="css" code={`:root {
  /* Tier 1: Primitive */
  --p-color-deep-purple-base: #3A1F5D;

  /* Tier 2: Semantic — references primitive */
  --ds-color-bg-brand: var(--p-color-deep-purple-base);

  /* Tier 3: Component — references semantic */
  --c-btn-primary-bg: var(--ds-color-action-primary-bg-default);
}

/* Component uses ONLY tier-3 vars */
.button-primary {
  background-color: var(--c-btn-primary-bg);
}`} />
    </Section>

    <Section title="Usage in TypeScript">
      <CodeBlock language="tsx" code={`import { buttonTokens, semanticColor, primitives } from '@ds/tokens';

// Component tokens (resolved)
buttonTokens.color.primary.default.background // '#3A1F5D'

// Semantic aliases
semanticColor.background.surface // '#221236'
semanticColor.action.primary.background.default // '#3A1F5D'

// Primitives
primitives.color.deepPurple.base // '#3A1F5D'`} />
    </Section>

    <Section title="Import in CSS">
      <CodeBlock language="css" code={`/* All layers (recommended) */
@import '@ds/tokens/css';

/* Or individual layers */
@import '@ds/tokens/css/primitives';
@import '@ds/tokens/css/semantic';
@import '@ds/tokens/css/components';`} />
    </Section>

    <Section title="Rules">
      <div className={styles.ruleList}>
        {[
          ['No tier-skipping', 'Components must reference --c-* tokens, not --ds-* or --p-* directly.'],
          ['No hardcoded values', 'No hex codes, px values, or font names in component styles.'],
          ['Semantic intent', 'Semantic tokens convey usage (--ds-color-bg-surface) not appearance (--ds-color-dark-gray).'],
          ['Component scoping', 'Each component has its own --c-{component}-* namespace in the CSS.'],
          ['Dark-first', 'All default values assume a dark background. Light theme overrides would swap semantic tokens.'],
        ].map(([rule, desc]) => (
          <div key={rule as string} className={styles.ruleRow}>
            <span className={styles.ruleIcon}>◆</span>
            <div>
              <div className={styles.ruleName}>{rule}</div>
              <div className={styles.ruleDesc}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  </DocPage>
);

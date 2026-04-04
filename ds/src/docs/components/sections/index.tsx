import React from 'react';
import s from './sections.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────────────────────────────────────

export interface StatBadge {
  value: string | number;
  label: string;
}

export interface OverviewItem {
  text: string;
}

export interface AnatomyCallout {
  name: string;
  description: string;
}

export interface VariantItem {
  label: string;
  description: string;
  preview: React.ReactNode;
}

export interface StateItem {
  label: string;
  colorKey?: string;
  preview: React.ReactNode;
}

export interface A11yCard {
  icon: string;
  title: string;
  items: string[];
}

export interface TokenGroup {
  title: string;
  tokens: string[];
}

export interface SpecSize {
  label: string;
  badge?: string;
  rows: { label: string; value: string }[];
}

export interface RelatedItem {
  name: string;
  description: string;
  href: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  description: string;
}

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section header helper
// ─────────────────────────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ num?: string; title: string }> = ({ num, title }) => (
  <div className={s.sectionHeader}>
    {num && <span className={s.sectionNum}>{num}</span>}
    <h2 className={s.sectionTitle}>{title}</h2>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 1. DocHero
// ─────────────────────────────────────────────────────────────────────────────

interface DocHeroProps {
  component: string;        // "Button"
  tagline: string;          // "The fundamental interaction primitive."
  description: string;
  status?: 'stable' | 'beta';
  version?: string;
  stats: StatBadge[];
}

export const DocHero: React.FC<DocHeroProps> = ({
  component, tagline, description, status = 'stable', version = 'v1.0', stats,
}) => (
  <div className={s.hero}>
    <p className={s.heroBreadcrumb}>
      <span>Design System</span>
      <span className={s.heroBreadcrumbSep}>→</span>
      <span>Components</span>
      <span className={s.heroBreadcrumbSep}>→</span>
      <span>{component}</span>
    </p>
    <div className={s.heroTop}>
      <div />
      <div className={s.heroBadges}>
        <span className={`${s.heroBadge} ${status === 'stable' ? s.heroBadgeStable : s.heroBadgeBeta}`}>
          <span className={s.heroBadgeDot} />
          {status === 'stable' ? 'Stable' : 'Beta'}
        </span>
        <span className={s.heroVersion}>{version}</span>
      </div>
    </div>
    <h1 className={s.heroTitle}>{component}</h1>
    <p className={s.heroTagline}>{tagline}</p>
    <p className={s.heroDescription}>{description}</p>
    <div className={s.heroStats}>
      {stats.map((stat) => (
        <div key={stat.label} className={s.heroStat}>
          <span className={s.heroStatNum}>{stat.value}</span>
          <span className={s.heroStatLabel}>{stat.label}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. DocOverview
// ─────────────────────────────────────────────────────────────────────────────

interface DocOverviewProps {
  use: OverviewItem[];
  dontUse: OverviewItem[];
}

export const DocOverview: React.FC<DocOverviewProps> = ({ use, dontUse }) => (
  <div className={s.section}>
    <SectionHeader num="01" title="Overview" />
    <div className={s.overviewGrid}>
      <div className={`${s.overviewCard} ${s.overviewCardUse}`}>
        <p className={`${s.overviewCardTitle} ${s.overviewCardTitleUse}`}>When to use</p>
        {use.map((item, i) => (
          <div key={i} className={s.overviewItem}>
            <span className={`${s.overviewItemIcon} ${s.overviewItemIconUse}`}>✓</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div className={`${s.overviewCard} ${s.overviewCardDont}`}>
        <p className={`${s.overviewCardTitle} ${s.overviewCardTitleDont}`}>When not to use</p>
        {dontUse.map((item, i) => (
          <div key={i} className={s.overviewItem}>
            <span className={`${s.overviewItemIcon} ${s.overviewItemIconDont}`}>✗</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. DocPlayground
// ─────────────────────────────────────────────────────────────────────────────

interface DocPlaygroundProps {
  /** Storybook story ID — e.g. "button--interactive". When provided, renders an iframe. */
  storyId?: string;
  /** Height of the Storybook iframe in px. Default: 260 */
  iframeHeight?: number;
  /** Fallback: render children + controls directly (used before Storybook is deployed) */
  children?: React.ReactNode;
  controls?: React.ReactNode;
}

const STORYBOOK_URL = import.meta.env.VITE_STORYBOOK_URL ?? 'http://localhost:6006';

export const DocPlayground: React.FC<DocPlaygroundProps> = ({
  storyId, iframeHeight = 260, children, controls,
}) => {
  if (storyId) {
    const src = `${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story&nav=false&panel=false`;
    return (
      <div className={s.section}>
        <SectionHeader num="02" title="Playground" />
        <div className={s.playgroundFrame}>
          <iframe
            src={src}
            className={s.playgroundIframe}
            style={{ height: iframeHeight }}
            title="Component playground"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={s.section}>
      <SectionHeader num="02" title="Playground" />
      <div className={s.playgroundFallback}>
        <div className={s.playgroundCanvas}>{children}</div>
        {controls && <div className={s.playgroundControls}>{controls}</div>}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3b. DocCodeExample
// ─────────────────────────────────────────────────────────────────────────────

interface DocCodeExampleProps {
  code: string;
  language?: string;
}

export const DocCodeExample: React.FC<DocCodeExampleProps> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).catch(() => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={s.section}>
      <SectionHeader title="Code Example" />
      <div className={s.codeBlock}>
        <div className={s.codeHeader}>
          <span className={s.codeLabel}>{language}</span>
          <button className={s.codeCopyBtn} onClick={handleCopy} aria-label="Copy code">
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <div className={s.codeContent}>
          <pre>{code}</pre>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. DocAnatomy
// ─────────────────────────────────────────────────────────────────────────────

interface DocAnatomyProps {
  description: string;
  preview: React.ReactNode;
  callouts: AnatomyCallout[];
}

export const DocAnatomy: React.FC<DocAnatomyProps> = ({ description, preview, callouts }) => (
  <div className={s.section}>
    <SectionHeader num="03" title="Anatomy" />
    <p className={s.sectionLead}>{description}</p>
    <div className={s.anatomyLayout}>
      <div className={s.anatomyPreview}>{preview}</div>
      <div className={s.anatomyCallouts}>
        {callouts.map((c, i) => (
          <div key={i} className={s.anatomyCallout}>
            <div className={s.anatomyCalloutNum}>{i + 1}</div>
            <div className={s.anatomyCalloutContent}>
              <p className={s.anatomyCalloutName}>{c.name}</p>
              <p className={s.anatomyCalloutDesc}>{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 5. DocVariants
// ─────────────────────────────────────────────────────────────────────────────

interface DocVariantsProps {
  description: string;
  variants: VariantItem[];
}

export const DocVariants: React.FC<DocVariantsProps> = ({ description, variants }) => (
  <div className={s.section}>
    <SectionHeader num="04" title="Variants &amp; Properties" />
    <p className={s.sectionLead}>{description}</p>
    <div className={s.variantsGrid}>
      {variants.map((v, i) => (
        <div key={i} className={s.variantCard}>
          <div className={s.variantPreview}>{v.preview}</div>
          <p className={s.variantLabel}>{v.label}</p>
          <p className={s.variantDesc}>{v.description}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 6. DocStates
// ─────────────────────────────────────────────────────────────────────────────

interface DocStatesProps {
  description: string;
  states: StateItem[];
}

const STATE_COLOR_MAP: Record<string, string> = {
  default: 'Default', hover: 'Hover', focused: 'Focused', pressed: 'Pressed',
  disabled: 'Disabled', loading: 'Loading', error: 'Error', checked: 'Checked',
  readonly: 'Readonly', open: 'Open', selected: 'Selected', typing: 'Typing',
  filled: 'Filled', active: 'Active', indeterminate: 'Checked',
};

export const DocStates: React.FC<DocStatesProps> = ({ description, states }) => (
  <div className={s.section}>
    <SectionHeader num="05" title="Interactive States" />
    <p className={s.sectionLead}>{description}</p>
    <div className={s.statesRow}>
      {states.map((st, i) => {
        const key = st.colorKey ?? st.label.toLowerCase();
        const colorClass = (s as Record<string, string>)[`stateLabel${STATE_COLOR_MAP[key] ?? 'Default'}`] ?? s.stateLabelDefault;
        return (
          <div key={i} className={s.stateItem}>
            <div className={s.statePreview}>{st.preview}</div>
            <span className={`${s.stateLabel} ${colorClass}`}>{st.label}</span>
          </div>
        );
      })}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 7. DocGuidelines
// ─────────────────────────────────────────────────────────────────────────────

interface DocGuidelinesProps {
  description: string;
  dos: string[];
  donts: string[];
}

export const DocGuidelines: React.FC<DocGuidelinesProps> = ({ description, dos, donts }) => (
  <div className={s.section}>
    <SectionHeader num="06" title="Usage Guidelines" />
    <p className={s.sectionLead}>{description}</p>
    <div className={s.guidelinesGrid}>
      <div className={`${s.guidelinesCard} ${s.guidelinesCardDo}`}>
        <p className={`${s.guidelinesCardTitle} ${s.guidelinesCardTitleDo}`}>Do — Follow these</p>
        {dos.map((item, i) => (
          <p key={i} className={s.guidelinesItem}>{item}</p>
        ))}
      </div>
      <div className={`${s.guidelinesCard} ${s.guidelinesCardDont}`}>
        <p className={`${s.guidelinesCardTitle} ${s.guidelinesCardTitleDont}`}>Don't — Avoid these</p>
        {donts.map((item, i) => (
          <p key={i} className={s.guidelinesItem}>{item}</p>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 8. DocAccessibility
// ─────────────────────────────────────────────────────────────────────────────

interface DocAccessibilityProps {
  description: string;
  cards: A11yCard[];
}

export const DocAccessibility: React.FC<DocAccessibilityProps> = ({ description, cards }) => (
  <div className={s.section}>
    <SectionHeader num="07" title="Accessibility" />
    <p className={s.sectionLead}>{description}</p>
    <div className={s.a11yGrid}>
      {cards.map((card, i) => (
        <div key={i} className={s.a11yCard}>
          <p className={s.a11yCardTitle}>
            <span className={s.a11yCardIcon}>{card.icon}</span>
            {card.title}
          </p>
          {card.items.map((item, j) => (
            <p key={j} className={s.a11yItem}>{item}</p>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 9. DocProps
// ─────────────────────────────────────────────────────────────────────────────

interface DocPropsProps {
  props: PropRow[];
}

export const DocProps: React.FC<DocPropsProps> = ({ props: rows }) => (
  <div className={s.section}>
    <SectionHeader num="08" title="Props" />
    <div style={{ border: '1px solid var(--ds-color-border-subtle)', borderRadius: 'var(--ds-radius-lg)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <th key={h} style={{
                padding: '10px 16px', textAlign: 'left', fontSize: '11px',
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: 'var(--ds-color-fg-subtle)', background: 'var(--ds-color-bg-overlay)',
                borderBottom: '1px solid var(--ds-color-border-subtle)',
                fontFamily: 'var(--ds-font-family-mono)',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid var(--ds-color-border-subtle)', verticalAlign: 'top' }}>
                <span style={{ fontFamily: 'var(--ds-font-family-mono)', fontSize: '12px', color: 'var(--p-color-crimson-pink-300)' }}>{row.name}</span>
                {row.required && (
                  <span style={{ fontSize: '9px', background: 'var(--ds-color-status-error-bg)', color: 'var(--ds-color-status-error-fg)', border: '1px solid var(--ds-color-status-error-border)', borderRadius: '99px', padding: '0 4px', marginLeft: '5px', fontWeight: 600 }}>required</span>
                )}
              </td>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid var(--ds-color-border-subtle)', verticalAlign: 'top' }}>
                <span style={{ fontFamily: 'var(--ds-font-family-mono)', fontSize: '12px', color: 'var(--p-color-steel-blue-300)' }}>{row.type}</span>
              </td>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid var(--ds-color-border-subtle)', verticalAlign: 'top' }}>
                <span style={{ fontFamily: 'var(--ds-font-family-mono)', fontSize: '12px', color: 'var(--p-color-warm-yellow-400)' }}>{row.default ?? '—'}</span>
              </td>
              <td style={{ padding: '10px 16px', borderBottom: '1px solid var(--ds-color-border-subtle)', fontSize: 'var(--ds-font-size-body)', color: 'var(--ds-color-fg-muted)', verticalAlign: 'top', lineHeight: 1.5 }}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 10. DocTokens
// ─────────────────────────────────────────────────────────────────────────────

interface DocTokensProps {
  description: string;
  groups: TokenGroup[];
}

export const DocTokens: React.FC<DocTokensProps> = ({ description, groups }) => (
  <div className={s.section}>
    <SectionHeader num="09" title="Token Architecture" />
    <p className={s.sectionLead}>{description}</p>
    <div className={s.tokensGrid}>
      {groups.map((g, i) => (
        <div key={i} className={s.tokensCard}>
          <p className={s.tokensCardTitle}>{g.title}</p>
          <div className={s.tokensList}>
            {g.tokens.map((t, j) => (
              <span key={j} className={s.tokenItem}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 11. DocSpecs
// ─────────────────────────────────────────────────────────────────────────────

interface DocSpecsProps {
  description: string;
  sizes: SpecSize[];
}

export const DocSpecs: React.FC<DocSpecsProps> = ({ description, sizes }) => (
  <div className={s.section}>
    <SectionHeader num="10" title="Design Specifications" />
    <p className={s.sectionLead}>{description}</p>
    <div className={s.specsGrid}>
      {sizes.map((sz, i) => (
        <div key={i} className={s.specsCard}>
          <div className={s.specsCardTitle}>
            {sz.label}
            {sz.badge && <span className={s.specsCardBadge}>{sz.badge}</span>}
          </div>
          <div className={s.specsRows}>
            {sz.rows.map((row, j) => (
              <div key={j} className={s.specsRow}>
                <span className={s.specsRowLabel}>{row.label}</span>
                <span className={s.specsRowValue}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 12. DocRelated
// ─────────────────────────────────────────────────────────────────────────────

interface DocRelatedProps {
  components: RelatedItem[];
}

export const DocRelated: React.FC<DocRelatedProps> = ({ components }) => (
  <div className={s.section}>
    <SectionHeader num="11" title="Related Components" />
    <div className={s.relatedGrid}>
      {components.map((c, i) => (
        <a key={i} className={s.relatedCard} href={c.href}>
          <span className={s.relatedCardName}>
            {c.name}
            <span className={s.relatedCardArrow}>→</span>
          </span>
          <span className={s.relatedCardDesc}>{c.description}</span>
        </a>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 13. DocChangelog
// ─────────────────────────────────────────────────────────────────────────────

interface DocChangelogProps {
  entries: ChangelogEntry[];
}

export const DocChangelog: React.FC<DocChangelogProps> = ({ entries }) => (
  <div className={s.section}>
    <SectionHeader num="12" title="Changelog" />
    <div className={s.changelog}>
      {entries.map((e, i) => (
        <div key={i} className={s.changelogEntry}>
          <span className={s.changelogVersion}>{e.version}</span>
          <span className={s.changelogDate}>{e.date}</span>
          <span className={s.changelogDesc}>{e.description}</span>
        </div>
      ))}
    </div>
  </div>
);

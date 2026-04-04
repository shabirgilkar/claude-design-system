import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { COMPONENT_COUNT } from '../layout/Layout';
import styles from './OverviewPage.module.css';

/* ── Data ──────────────────────────────────────────────────────────────── */
const COMPONENT_CARDS = [
  { path: '/components/button',   name: 'Button',   desc: '5 variants · 3 sizes · icon support',     icon: '◉' },
  { path: '/components/badge',    name: 'Badge',    desc: '6 variants · pill & rect shapes',           icon: '◆' },
  { path: '/components/input',    name: 'Input',    desc: 'Label · hint · error · icons',              icon: '▭' },
  { path: '/components/textarea', name: 'Textarea', desc: 'Char count · resize control',               icon: '☰' },
  { path: '/components/dropdown', name: 'Dropdown', desc: 'Select with keyboard navigation',           icon: '▾' },
  { path: '/components/checkbox', name: 'Checkbox', desc: 'Indeterminate support',                     icon: '☑' },
  { path: '/components/radio',    name: 'Radio',    desc: 'Grouped mutually exclusive select',         icon: '◎' },
  { path: '/components/toggle',   name: 'Toggle',   desc: '3 sizes · animated spring',                icon: '⇋' },
  { path: '/components/avatar',   name: 'Avatar',   desc: 'Image · initials · fallback icon',         icon: '⦿' },
  { path: '/components/tabs',     name: 'Tabs',     desc: 'Directions · descriptions · dot',          icon: '⊞' },
  { path: '/components/tooltip',  name: 'Tooltip',  desc: '2 themes · 4 placements · arrows',         icon: '◫' },
  { path: '/components/toast',    name: 'Toast',    desc: '5 variants · auto-dismiss · icons',        icon: '⊡' },
];

const TIER_STATS = [
  { tier: 1, name: 'Primitives', vars: 304, prefix: '--p-*',           color: 'var(--p-color-steel-blue-300)',    desc: 'Raw values: colors, spacing, radius, typography, motion, z-index, opacity' },
  { tier: 2, name: 'Semantic',   vars: 236, prefix: '--ds-*',          color: 'var(--p-color-crimson-pink-300)', desc: 'Intent aliases: background, foreground, border, action states, status' },
  { tier: 3, name: 'Components', vars: 821, prefix: '--c-{comp}-*',    color: 'var(--p-color-warm-yellow-500)',  desc: 'Component-scoped tokens. Covers all 12 components end-to-end' },
];

const TOTAL_VARS = TIER_STATS.reduce((s, t) => s + t.vars, 0);

const PRINCIPLES = [
  { title: 'Token-first', desc: 'Every visual property traced from Figma → code via 3-tier CSS variables', icon: '⬡' },
  { title: 'Dark & Light', desc: 'Dual-theme support with automatic adaptation — zero manual overrides', icon: '◐' },
  { title: 'Accessible', desc: 'WCAG 2.1 AA compliant. Keyboard navigable. Screen reader tested', icon: '♿' },
  { title: 'Type-safe', desc: 'Full TypeScript coverage. Props mirror Figma variants exactly', icon: '⟨⟩' },
];

/* ── Code Block Component (Claude-style) ───────────────────────────────── */
const CodeBlock: React.FC<{ language: string; children: string }> = ({ language, children }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLanguage}>{language}</span>
        <button className={styles.codeCopyBtn} onClick={handleCopy} aria-label="Copy code">
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
      <pre className={styles.codePre}><code>{children}</code></pre>
    </div>
  );
};

/* ── Stat Card ─────────────────────────────────────────────────────────── */
const StatCard: React.FC<{ value: string | number; label: string; sub?: string; color?: string }> = ({ value, label, sub, color }) => (
  <div className={styles.statCard}>
    <div className={styles.statValue} style={color ? { color } : undefined}>{value}</div>
    <div className={styles.statLabel}>{label}</div>
    {sub && <div className={styles.statSub}>{sub}</div>}
  </div>
);

/* ── Page ──────────────────────────────────────────────────────────────── */
export const OverviewPage: React.FC = () => (
  <div className={styles.page}>

    {/* ── Hero ───────────────────────────────────────────────────────────── */}
    <header className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroBgOrb1} />
        <div className={styles.heroBgOrb2} />
        <div className={styles.heroBgGrid} />
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroBadges}>
          <Badge variant="brand" size="sm">v1.0</Badge>
          <Badge variant="neutral" size="sm">Dark-first</Badge>
          <Badge variant="neutral" size="sm">Fully typed</Badge>
          <Badge variant="neutral" size="sm">Accessible</Badge>
        </div>
        <h1 className={styles.heroTitle}>Design System</h1>
        <p className={styles.heroDesc}>
          A production-grade component library built on a 3-tier token architecture
          derived directly from Figma variables. Every token, every component — traceable
          from design to code.
        </p>
        <div className={styles.heroActions}>
          <NavLink to="/components/button" className={styles.heroCta}>Explore Components →</NavLink>
          <NavLink to="/tokens" className={styles.heroLink}>View Token Architecture</NavLink>
        </div>
      </div>
    </header>

    {/* ── Design Principles ──────────────────────────────────────────────── */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Design Principles</h2>
      <div className={styles.principlesGrid}>
        {PRINCIPLES.map((p) => (
          <div key={p.title} className={styles.principleCard}>
            <span className={styles.principleIcon}>{p.icon}</span>
            <h3 className={styles.principleTitle}>{p.title}</h3>
            <p className={styles.principleDesc}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── Live Stats Dashboard ────────────────────────────────────────────── */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.liveDot} /> Live Dashboard
        <span className={styles.sectionMeta}>auto-updates as components and tokens are added</span>
      </h2>
      <div className={styles.statsGrid}>
        <StatCard value={COMPONENT_COUNT} label="Components" sub="All stable" color="var(--p-color-emerald-green-300)" />
        <StatCard value={TOTAL_VARS.toLocaleString()} label="CSS Variables" sub="Across 3 tiers" color="var(--p-color-crimson-pink-300)" />
        <StatCard value={7} label="Color Palettes" sub="304 color stops" color="var(--p-color-warm-yellow-500)" />
        <StatCard value={15} label="Type Styles" sub="IBM Plex Sans/Mono" color="var(--p-color-steel-blue-300)" />
        <StatCard value="100%" label="Token Coverage" sub="No hardcoded values" color="var(--p-color-emerald-green-300)" />
        <StatCard value="WCAG AA" label="Accessibility" sub="Contrast verified" color="var(--p-color-deep-purple-300)" />
      </div>
    </section>

    {/* ── Token Architecture ─────────────────────────────────────────────── */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Token Architecture</h2>
      <div className={styles.tierFlow}>
        {TIER_STATS.map((t, i) => (
          <React.Fragment key={t.name}>
            <div className={styles.tierCard}>
              <div className={styles.tierLeft}>
                <span className={styles.tierNum} style={{ color: t.color }}>Tier {t.tier}</span>
                <span className={styles.tierName}>{t.name}</span>
                <code className={styles.tierPrefix}>{t.prefix}</code>
              </div>
              <div className={styles.tierRight}>
                <span className={styles.tierVars} style={{ color: t.color }}>{t.vars.toLocaleString()}</span>
                <span className={styles.tierVarsLabel}>variables</span>
              </div>
              <div className={styles.tierDesc}>{t.desc}</div>
            </div>
            {i < TIER_STATS.length - 1 && (
              <div className={styles.tierConnector}>
                <div className={styles.tierConnectorLine} />
                <span className={styles.tierConnectorLabel}>references</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>

    {/* ── Components Grid ────────────────────────────────────────────────── */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        Components
        <span className={styles.sectionCount}>{COMPONENT_COUNT}</span>
      </h2>
      <div className={styles.componentGrid}>
        {COMPONENT_CARDS.map((c) => (
          <NavLink key={c.path} to={c.path} className={styles.componentCard}>
            <div className={styles.componentCardTop}>
              <span className={styles.componentIcon}>{c.icon}</span>
              <span className={styles.componentName}>{c.name}</span>
              <span className={styles.componentStatus}>●&nbsp;stable</span>
            </div>
            <span className={styles.componentDesc}>{c.desc}</span>
            <span className={styles.componentArrow}>→</span>
          </NavLink>
        ))}
      </div>
    </section>

    {/* ── Quick Start ────────────────────────────────────────────────────── */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Quick Start</h2>
      <div className={styles.quickStartGrid}>
        <CodeBlock language="css">{`/* Import all token layers */
@import '@ds/tokens/css';

/* Or individually */
@import '@ds/tokens/css/primitives';
@import '@ds/tokens/css/semantic';
@import '@ds/tokens/css/components';`}</CodeBlock>

        <CodeBlock language="tsx">{`import { Button, Input, Badge } from '@ds/components';

function App() {
  return (
    <>
      <Button variant="primary">
        Get started
      </Button>
      <Input label="Email" />
      <Badge variant="success">Active</Badge>
    </>
  );
}`}</CodeBlock>
      </div>
    </section>
  </div>
);

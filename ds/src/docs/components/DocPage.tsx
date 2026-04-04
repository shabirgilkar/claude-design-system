import React from 'react';
import styles from './DocPage.module.css';

// ── DocPage ────────────────────────────────────────────────────────────────
interface DocPageProps {
  category?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const DocPage: React.FC<DocPageProps> = ({ category, title, description, children }) => (
  <div className={styles.page}>
    {title && (
      <header className={styles.header}>
        {category && (
          <p className={styles.breadcrumb}>
            <span>{category}</span>
            <span>›</span>
            <span>{title}</span>
          </p>
        )}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </header>
    )}
    {children}
  </div>
);

// ── Section ────────────────────────────────────────────────────────────────
interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className }) => (
  <section className={`${styles.section} ${className ?? ''}`}>
    {title && <h2 className={styles.sectionTitle}>{title}</h2>}
    {children}
  </section>
);

export const Divider: React.FC = () => <hr className={styles.divider} />;

// ── Playground ─────────────────────────────────────────────────────────────
interface PlaygroundProps {
  children: React.ReactNode;
  controls?: React.ReactNode;
}

export const Playground: React.FC<PlaygroundProps> = ({ children, controls }) => (
  <div className={styles.playground}>
    <div className={styles.playgroundCanvas}>{children}</div>
    {controls && <div className={styles.playgroundControls}>{controls}</div>}
  </div>
);

// ── Control ────────────────────────────────────────────────────────────────
interface SelectControlProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export const SelectControl: React.FC<SelectControlProps> = ({ label, value, options, onChange }) => (
  <div className={styles.controlGroup}>
    <span className={styles.controlLabel}>{label}</span>
    <select
      className={styles.controlSelect}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

interface ToggleControlProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const ToggleControl: React.FC<ToggleControlProps> = ({ label, checked, onChange }) => (
  <div className={styles.controlGroup}>
    <span className={styles.controlLabel}>&nbsp;</span>
    <button
      className={`${styles.controlToggle} ${checked ? styles.controlToggleActive : ''}`}
      onClick={() => onChange(!checked)}
      type="button"
    >
      {label}
    </button>
  </div>
);

interface TextControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextControl: React.FC<TextControlProps> = ({ label, value, onChange, placeholder }) => (
  <div className={styles.controlGroup}>
    <span className={styles.controlLabel}>{label}</span>
    <input
      className={styles.controlInput}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

// ── CodeBlock ──────────────────────────────────────────────────────────────
interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLang}>{language}</span>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
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
      <pre className={styles.codePre}><code>{code}</code></pre>
    </div>
  );
};

// ── PropsTable ─────────────────────────────────────────────────────────────
interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropRow[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props: rows }) => (
  <div style={{ border: '1px solid var(--ds-color-border-subtle)', borderRadius: 'var(--ds-radius-lg)', overflow: 'hidden' }}>
    <table className={styles.propsTable}>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>
              <span className={styles.propName}>{row.name}</span>
              {row.required && <span className={styles.required}>required</span>}
            </td>
            <td><span className={styles.propType}>{row.type}</span></td>
            <td><span className={styles.propDefault}>{row.default ?? '—'}</span></td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Gallery ────────────────────────────────────────────────────────────────
export const Gallery: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.gallery}>{children}</div>
);

export const GalleryItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className={styles.galleryItem}>
    {children}
    <span className={styles.galleryLabel}>{label}</span>
  </div>
);

export const VariantRow: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className={styles.variantRow} style={style}>{children}</div>
);

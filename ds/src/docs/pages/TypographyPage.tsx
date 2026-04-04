import React from 'react';
import { DocPage, Section } from '../components/DocPage';
import styles from './TypographyPage.module.css';

const TYPE_SCALE = [
  { name: 'Display Large',  token: '--ds-font-size-display-large',  size: '48px', lineHeight: '56px', weight: 700, letterSpacing: '-1.5px' },
  { name: 'Display Medium', token: '--ds-font-size-display-medium', size: '40px', lineHeight: '48px', weight: 700, letterSpacing: '-0.4px' },
  { name: 'Display Small',  token: '--ds-font-size-display-small',  size: '32px', lineHeight: '40px', weight: 700, letterSpacing: '-0.4px' },
  { name: 'Title 1',        token: '--ds-font-size-title-1',        size: '28px', lineHeight: '38px', weight: 700, letterSpacing: '-0.4px' },
  { name: 'Title 2',        token: '--ds-font-size-title-2',        size: '24px', lineHeight: '34px', weight: 700, letterSpacing: 'normal' },
  { name: 'Title 3',        token: '--ds-font-size-title-3',        size: '20px', lineHeight: '30px', weight: 600, letterSpacing: 'normal' },
  { name: 'Headline',       token: '--ds-font-size-headline',       size: '18px', lineHeight: '26px', weight: 600, letterSpacing: 'normal' },
  { name: 'Body Large',     token: '--ds-font-size-body-large',     size: '16px', lineHeight: '28px', weight: 400, letterSpacing: 'normal' },
  { name: 'Body',           token: '--ds-font-size-body',           size: '14px', lineHeight: '24px', weight: 400, letterSpacing: 'normal' },
  { name: 'Callout',        token: '--ds-font-size-callout',        size: '13px', lineHeight: '20px', weight: 400, letterSpacing: 'normal' },
  { name: 'Footnote',       token: '--ds-font-size-footnote',       size: '12px', lineHeight: '17px', weight: 400, letterSpacing: 'normal' },
  { name: 'Caption',        token: '--ds-font-size-caption',        size: '11px', lineHeight: '16px', weight: 400, letterSpacing: '0.8px' },
  { name: 'Label Small',    token: '--ds-font-size-label-small',    size: '11px', lineHeight: '18px', weight: 600, letterSpacing: '0.2px' },
  { name: 'Label Medium',   token: '--ds-font-size-label-medium',   size: '13px', lineHeight: '18px', weight: 600, letterSpacing: '0.2px' },
  { name: 'Label Large',    token: '--ds-font-size-label-large',    size: '15px', lineHeight: '18px', weight: 600, letterSpacing: '0.2px' },
];

const WEIGHTS = [
  { name: 'Light',     value: 300, token: '--p-font-weight-light' },
  { name: 'Regular',   value: 400, token: '--p-font-weight-regular' },
  { name: 'Medium',    value: 500, token: '--p-font-weight-medium' },
  { name: 'Semibold',  value: 600, token: '--p-font-weight-semibold' },
  { name: 'Bold',      value: 700, token: '--p-font-weight-bold' },
];

const DEFAULT_PREVIEW = 'The quick brown fox jumps over the lazy dog';
const DEFAULT_PLACEHOLDER = 'Type something to preview…';

export const TypographyPage: React.FC = () => {
  const [preview, setPreview] = React.useState('');
  const [font, setFont] = React.useState<'sans' | 'mono'>('sans');

  const displayText = preview || DEFAULT_PREVIEW;

  return (
    <DocPage
      title="Typography"
      description="IBM Plex Sans for all UI text. IBM Plex Mono for code and tokens. 15-step type scale from 11px caption to 48px display."
    >
      {/* Live preview input */}
      <Section title="Live Preview">
        <div className={styles.previewControls}>
          <input
            className={styles.previewInput}
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            placeholder={DEFAULT_PLACEHOLDER}
            maxLength={120}
          />
          <div className={styles.fontToggle}>
            <button className={`${styles.fontToggleBtn} ${font === 'sans' ? styles.fontToggleActive : ''}`} onClick={() => setFont('sans')}>IBM Plex Sans</button>
            <button className={`${styles.fontToggleBtn} ${font === 'mono' ? styles.fontToggleActive : ''}`} onClick={() => setFont('mono')}>IBM Plex Mono</button>
          </div>
        </div>
        <div className={styles.previewScaleGrid}>
          {TYPE_SCALE.slice(0, 8).map((t) => (
            <div key={t.name} className={styles.previewScaleRow}>
              <span className={styles.previewScaleLabel}>{t.name}<br /><code>{t.size}</code></span>
              <span
                className={styles.previewScaleText}
                style={{
                  fontSize: t.size,
                  lineHeight: t.lineHeight,
                  fontWeight: t.weight,
                  letterSpacing: t.letterSpacing,
                  fontFamily: font === 'mono' ? 'IBM Plex Mono' : 'IBM Plex Sans',
                }}
              >
                {displayText}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Typefaces */}
      <Section title="Typefaces">
        <div className={styles.fontShowcase}>
          {(['IBM Plex Sans', 'IBM Plex Mono'] as const).map((f) => (
            <div key={f} className={styles.fontCard}>
              <div className={styles.fontDisplay} style={{ fontFamily: f }}>Ag</div>
              <div className={styles.fontMeta}>
                <span className={styles.fontName} style={{ fontFamily: f }}>{f}</span>
                <code className={styles.fontToken}>{f === 'IBM Plex Sans' ? '--ds-font-family-sans' : '--ds-font-family-mono'}</code>
                <span className={styles.fontAlpha} style={{ fontFamily: f }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                  abcdefghijklmnopqrstuvwxyz<br />
                  0123456789 !@#$%^&*()
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Full type scale */}
      <Section title="Complete Type Scale">
        <div className={styles.scaleTable}>
          {TYPE_SCALE.map((t) => (
            <div key={t.name} className={styles.scaleRow}>
              <div className={styles.scaleMeta}>
                <span className={styles.scaleName}>{t.name}</span>
                <code className={styles.scaleToken}>{t.token}</code>
                <span className={styles.scaleValues}>{t.size} / {t.lineHeight} / {t.weight}</span>
              </div>
              <div
                className={styles.scaleSample}
                style={{
                  fontSize: t.size,
                  lineHeight: t.lineHeight,
                  fontWeight: t.weight,
                  letterSpacing: t.letterSpacing,
                }}
              >
                {preview || 'The quick brown fox jumps over the lazy dog'}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Font weights */}
      <Section title="Font Weights">
        <div className={styles.weightGrid}>
          {WEIGHTS.map((w) => (
            <div key={w.name} className={styles.weightCard}>
              <div className={styles.weightSample} style={{ fontWeight: w.value }}>Ag</div>
              <span className={styles.weightName}>{w.name}</span>
              <span className={styles.weightValue}>{w.value}</span>
              <code className={styles.weightToken}>{w.token}</code>
            </div>
          ))}
        </div>
      </Section>
    </DocPage>
  );
};

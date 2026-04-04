import React from 'react';
import { DocPage, Section } from '../components/DocPage';
import { useToast } from '../../components/Toast/Toast';
import styles from './ColorsPage.module.css';

// ── Helpers ────────────────────────────────────────────────────────────────
function copyToClipboard(text: string): void {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text: string): void {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch (_) { /* ignore */ }
  document.body.removeChild(ta);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const sRGB = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function getContrast(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function isDark(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

function wcagLevel(ratio: number): { level: string; pass: boolean } {
  if (ratio >= 7) return { level: 'AAA', pass: true };
  if (ratio >= 4.5) return { level: 'AA', pass: true };
  if (ratio >= 3) return { level: 'AA Large', pass: true };
  return { level: 'Fail', pass: false };
}

const CopyIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" width="10" height="10" className={styles.copyIcon}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M1 8V2a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// ── Swatch Card ────────────────────────────────────────────────────────────
const SwatchCard: React.FC<{ label: string; value: string; paletteName: string }> = ({ label, value, paletteName }) => {
  const { addToast } = useToast();
  const { r, g, b } = hexToRgb(value);
  const contrastWhite = getContrast(value, '#ffffff');
  const contrastBlack = getContrast(value, '#000000');
  const wWhite = wcagLevel(contrastWhite);
  const wBlack = wcagLevel(contrastBlack);

  const copyHex = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(value);
    addToast({ variant: 'success', title: `${value.toUpperCase()} copied`, description: `${paletteName} ${label} — HEX`, duration: 2000 });
  };

  const copyRgb = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(`rgb(${r}, ${g}, ${b})`);
    addToast({ variant: 'success', title: `rgb(${r}, ${g}, ${b}) copied`, description: `${paletteName} ${label} — RGB`, duration: 2000 });
  };

  return (
    <div className={styles.swatchCard}>
      {/* Color block */}
      <div className={styles.swatchColor} style={{ backgroundColor: value }}>
        <span className={styles.swatchStop} style={{ color: isDark(value) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)' }}>
          {label}
        </span>
        {/* Hover overlay with copy buttons */}
        <div className={styles.swatchOverlay}>
          <button className={styles.copyBtn} onClick={copyHex}>
            <CopyIcon />
            Copy HEX
          </button>
          <button className={styles.copyBtn} onClick={copyRgb}>
            <CopyIcon />
            Copy RGB
          </button>
        </div>
      </div>

      {/* Meta / info */}
      <div className={styles.swatchMeta}>
        <span className={styles.swatchHexValue}>{value.toUpperCase()}</span>
        <span className={styles.swatchRgbValue}>rgb({r}, {g}, {b})</span>
        <div className={styles.swatchA11y}>
          <span className={`${styles.a11yBadge} ${wWhite.pass ? styles.a11yPass : styles.a11yFail}`}>
            <span className={styles.a11yDot} style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.2)' }} />
            {wWhite.level}
          </span>
          <span className={`${styles.a11yBadge} ${wBlack.pass ? styles.a11yPass : styles.a11yFail}`}>
            <span className={styles.a11yDot} style={{ backgroundColor: '#000000' }} />
            {wBlack.level}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Palettes ───────────────────────────────────────────────────────────────
const PALETTES = [
  {
    name: 'Deep Purple', key: 'deep-purple',
    swatches: [
      { label: '100', value: '#B4AAC1' }, { label: '200', value: '#9586A8' },
      { label: '300', value: '#75628E' }, { label: '400', value: '#5A4377' },
      { label: '500', value: '#442A65' }, { label: 'Base', value: '#3A1F5D' },
      { label: '700', value: '#2D1849' }, { label: '800', value: '#221236' },
      { label: '900', value: '#170C25' }, { label: '1000', value: '#0E0716' },
    ],
  },
  {
    name: 'Crimson Pink', key: 'crimson-pink',
    swatches: [
      { label: '100', value: '#EAB3C3' }, { label: '200', value: '#E192A9' },
      { label: '300', value: '#D87290' }, { label: '400', value: '#D15679' },
      { label: '500', value: '#CB4068' }, { label: 'Base', value: '#C83660' },
      { label: '700', value: '#9C2A4B' }, { label: '800', value: '#741F38' },
      { label: '900', value: '#501626' }, { label: '1000', value: '#300D17' },
    ],
  },
  {
    name: 'Coral Red', key: 'coral-red',
    swatches: [
      { label: '100', value: '#F4BDBA' }, { label: '200', value: '#EFA29D' },
      { label: '300', value: '#EA8680' }, { label: '400', value: '#E66E66' },
      { label: '500', value: '#E25B52' }, { label: 'Base', value: '#E15249' },
      { label: '700', value: '#AF4039' }, { label: '800', value: '#82302A' },
      { label: '900', value: '#5A211D' }, { label: '1000', value: '#361412' },
    ],
  },
  {
    name: 'Warm Yellow', key: 'warm-yellow',
    swatches: [
      { label: '100', value: '#FCEEC4' }, { label: '400', value: '#F7DA7E' },
      { label: '500', value: '#F6D56D' }, { label: 'Base', value: '#F6D365' },
      { label: '700', value: '#C0A54F' }, { label: '900', value: '#625428' },
    ],
  },
  {
    name: 'Emerald Green', key: 'emerald-green',
    swatches: [
      { label: '100', value: '#C6F6D5' }, { label: '200', value: '#9AE6B4' },
      { label: '300', value: '#68D391' }, { label: '400', value: '#48BB78' },
      { label: '500', value: '#38A169' }, { label: 'Base', value: '#38A169' },
      { label: '700', value: '#276749' }, { label: '800', value: '#22543D' },
      { label: '900', value: '#1C4532' }, { label: '1000', value: '#0E2F21' },
    ],
  },
  {
    name: 'Steel Blue', key: 'steel-blue',
    swatches: [
      { label: '100', value: '#BEE3F8' }, { label: '200', value: '#90CDF4' },
      { label: '300', value: '#63B3ED' }, { label: '400', value: '#4299E1' },
      { label: '500', value: '#3182CE' }, { label: 'Base', value: '#3182CE' },
      { label: '600', value: '#2B6CB0' }, { label: '700', value: '#2C5282' },
      { label: '800', value: '#2A4365' }, { label: '900', value: '#1A365D' },
    ],
  },
  {
    name: 'Medium Gray', key: 'medium-gray',
    swatches: [
      { label: '200', value: '#B3B3B3' }, { label: '300', value: '#9D9D9D' },
      { label: '400', value: '#898989' }, { label: '500', value: '#7A7A7A' },
      { label: 'Base', value: '#737373' }, { label: '700', value: '#5A5A5A' },
      { label: '800', value: '#434343' }, { label: '900', value: '#2E2E2E' },
    ],
  },
];

export const ColorsPage: React.FC = () => (
  <DocPage
    title="Color Palette"
    description="7 primitive palettes with full WCAG contrast ratios. Click any swatch to copy HEX or RGB. Hover for scale-up animation."
  >
    {PALETTES.map((palette) => (
      <Section key={palette.key} title={palette.name}>
        <div className={styles.swatchRow}>
          {palette.swatches.map((s) => (
            <SwatchCard key={s.label} {...s} paletteName={palette.name} />
          ))}
        </div>
      </Section>
    ))}

    <Section title="Accessibility Reference">
      <div className={styles.a11yNote}>
        <div className={styles.a11yHeader}>
          <span className={styles.a11yHeaderIcon}>♿</span>
          <div>
            <strong>WCAG 2.1 Contrast Requirements</strong>
            <p>Each swatch shows contrast ratio against white and black backgrounds with WCAG level.</p>
          </div>
        </div>
        <div className={styles.a11yLegend}>
          <div className={styles.a11yLegendItem}>
            <span className={`${styles.a11yBadge} ${styles.a11yPass}`}>AA (4.5:1)</span>
            <span className={styles.a11yLegendText}>Normal text — recommended minimum</span>
          </div>
          <div className={styles.a11yLegendItem}>
            <span className={`${styles.a11yBadge} ${styles.a11yPass}`}>AAA (7:1)</span>
            <span className={styles.a11yLegendText}>Enhanced — for users with low vision</span>
          </div>
          <div className={styles.a11yLegendItem}>
            <span className={`${styles.a11yBadge} ${styles.a11yPass}`}>AA Large (3:1)</span>
            <span className={styles.a11yLegendText}>Large text (≥18pt) or bold (≥14pt)</span>
          </div>
          <div className={styles.a11yLegendItem}>
            <span className={`${styles.a11yBadge} ${styles.a11yFail}`}>Fail</span>
            <span className={styles.a11yLegendText}>Do not use this color for text</span>
          </div>
        </div>
      </div>
    </Section>
  </DocPage>
);

import React from 'react';
import { DocPage, Section } from '../components/DocPage';
import { useToast } from '../../components/Toast/Toast';
import styles from './IconsPage.module.css';

// ── Icon definitions ──────────────────────────────────────────────────────
const ICONS: Record<string, Record<string, string>> = {
  'Navigation': {
    'Home': `<path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><path d="M9 22V12h6v10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
    'Menu': `<path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Close': `<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Arrow Left': `<path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Arrow Right': `<path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Arrow Up': `<path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Arrow Down': `<path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Chevron Left': `<path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Chevron Right': `<path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Chevron Down': `<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Chevron Up': `<path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'External Link': `<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  'Actions': {
    'Search': `<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Plus': `<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Minus': `<path d="M5 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Edit': `<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Trash': `<path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Copy': `<rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    'Download': `<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Upload': `<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Share': `<circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Filter': `<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Sort': `<path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Refresh': `<path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  'Status & Feedback': {
    'Check': `<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Check Circle': `<path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Alert Circle': `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Alert Triangle': `<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Info': `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'X Circle': `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Loader': `<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Star': `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,
    'Heart': `<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,
  },
  'Media & Content': {
    'Image': `<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'File': `<path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M13 2v7h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Folder': `<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,
    'Link': `<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
    'Code': `<polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Layers': `<polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Grid': `<rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    'List': `<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  },
  'People & Communication': {
    'User': `<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    'Users': `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Mail': `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Bell': `<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Message': `<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,
    'Phone': `<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    'Lock': `<rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Unlock': `<rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 11V7a5 5 0 019.9-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  },
  'System': {
    'Settings': `<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    'Sun': `<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Moon': `<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,
    'Eye': `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    'Eye Off': `<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M10.73 10.73A3 3 0 0013.27 13.27M1 1l22 22" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
    'Zap': `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`,
    'Globe': `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    'Map Pin': `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    'Calendar': `<rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Clock': `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    'Database': `<ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M21 5v14c0 1.66-4 3-9 3s-9-1.34-9-3V5" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
    'Package': `<path d="M16.5 9.4L7.55 4.24M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  },
};

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

const CopyIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" width="10" height="10" className={styles.copyIcon}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M1 8V2a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ICON_SIZE = 24;

function makeSvgString(path: string, size = ICON_SIZE): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">${path}</svg>`;
}

async function downloadSvg(name: string, path: string) {
  const svg = makeSvgString(path);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

async function downloadPng(name: string, path: string, size = 64) {
  const svg = makeSvgString(path, size);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.src = url;
  await new Promise<void>((resolve) => { img.onload = () => resolve(); });
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);
  ctx.drawImage(img, 0, 0, size, size);
  URL.revokeObjectURL(url);
  canvas.toBlob((pngBlob) => {
    if (!pngBlob) return;
    const pngUrl = URL.createObjectURL(pngBlob);
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.png`;
    a.click();
    URL.revokeObjectURL(pngUrl);
  }, 'image/png');
}

// ── Icon Card ─────────────────────────────────────────────────────────────
const IconCard: React.FC<{ name: string; path: string; size: number }> = ({ name, path, size }) => {
  const { addToast } = useToast();

  const copySvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    const svg = makeSvgString(path, size);
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(svg).catch(() => fallbackCopy(svg));
    } else {
      fallbackCopy(svg);
    }
    addToast({ variant: 'success', title: `${name} SVG copied`, description: `${size}×${size} · SVG source code`, duration: 2000 });
  };

  return (
    <div className={styles.iconCard}>
      <div className={styles.iconPreview}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          dangerouslySetInnerHTML={{ __html: path }}
        />
      </div>
      <span className={styles.iconName}>{name}</span>
      {/* CSS-only hover overlay — no JS state needed */}
      <div className={styles.iconActions}>
        <button
          className={styles.iconBtn}
          onClick={copySvg}
          title="Copy SVG code"
        >
          <CopyIcon />
          SVG
        </button>
        <button
          className={styles.iconBtn}
          onClick={(e) => { e.stopPropagation(); downloadSvg(name, path); }}
          title="Download as SVG file"
        >
          ↓ SVG
        </button>
        <button
          className={styles.iconBtn}
          onClick={(e) => { e.stopPropagation(); downloadPng(name, path, size * 2); }}
          title="Download as PNG file"
        >
          ↓ PNG
        </button>
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────
export const IconsPage: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [size, setSize] = React.useState(24);
  const totalIcons = Object.values(ICONS).reduce((s, c) => s + Object.keys(c).length, 0);

  const filtered = React.useMemo(() => {
    if (!search.trim()) return ICONS;
    const q = search.toLowerCase();
    const result: typeof ICONS = {};
    for (const [cat, icons] of Object.entries(ICONS)) {
      const matches = Object.fromEntries(
        Object.entries(icons).filter(([name]) => name.toLowerCase().includes(q))
      );
      if (Object.keys(matches).length > 0) result[cat] = matches;
    }
    return result;
  }, [search]);

  return (
    <DocPage
      title="Icons"
      description={`${totalIcons} icons across ${Object.keys(ICONS).length} categories. Hover any icon to copy SVG or download SVG/PNG.`}
    >
      {/* Search + size control */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" width="16" height="16">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            className={styles.searchInput}
            placeholder="Search icons…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')}>×</button>
          )}
        </div>
        <div className={styles.sizeControl}>
          <span className={styles.sizeLabel}>Size</span>
          {[16, 20, 24, 32].map((s) => (
            <button
              key={s}
              className={`${styles.sizeBtn} ${size === s ? styles.sizeBtnActive : ''}`}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(filtered).map(([category, icons]) => (
        <Section key={category} title={`${category} (${Object.keys(icons).length})`}>
          <div className={styles.iconGrid}>
            {Object.entries(icons).map(([name, path]) => (
              <IconCard key={name} name={name} path={path} size={size} />
            ))}
          </div>
        </Section>
      ))}

      {Object.keys(filtered).length === 0 && (
        <div className={styles.empty}>
          <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p>No icons match "{search}"</p>
        </div>
      )}
    </DocPage>
  );
};

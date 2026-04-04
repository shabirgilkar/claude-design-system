/**
 * Semantic Color Tokens
 * Source: Figma › Claude MCP › Variables › Semantic collection (Light mode)
 *
 * Intent-based color names that alias into Primitives.
 * Chain: semantic token → primitive token → hex value
 *
 * RULE: Components must reference these tokens, never primitive colors directly.
 */

import { colorPrimitives as p } from '../primitives/colors';

export const semanticColor = {
  // ─────────────────────────────────────────────────────────────
  // BACKGROUND
  // ─────────────────────────────────────────────────────────────
  background: {
    /** Root page background — darkest layer */
    page: p.deepPurple[1000],
    /** Slightly elevated — sidebar, secondary panels */
    subtle: p.deepPurple[900],
    /** Card / modal surface */
    surface: p.deepPurple[800],
    /** Elevated card — popovers, tooltips bg */
    surfaceRaised: p.deepPurple[700],
    /** Modal scrim / overlay tint */
    overlay: p.deepPurple[900],
    /** Inverse (light) context — used inside dark-on-light scenarios */
    inverse: p.neutral.white,
    /** Brand-filled background (e.g. primary button, active nav item) */
    brand: p.deepPurple.base,
    /** Soft brand tint — badges, tag backgrounds */
    brandSubtle: p.deepPurple[100],
    /** Neutral dark surface — neutral badges, info cards */
    neutral: p.mediumGray[900],
    /** Slightly lighter neutral — hover states on neutral surfaces */
    neutralSubtle: p.mediumGray[800],
  },

  // ─────────────────────────────────────────────────────────────
  // FOREGROUND (text & icons)
  // ─────────────────────────────────────────────────────────────
  foreground: {
    /** Default body text — high contrast on dark backgrounds */
    default: p.neutral.white,
    /** Secondary text — less prominent content */
    muted: p.mediumGray[200],
    /** Tertiary text — metadata, timestamps */
    subtle: p.mediumGray[400],
    /** Input placeholder text */
    placeholder: p.mediumGray[400],
    /** Disabled text */
    disabled: p.mediumGray.base,
    /** Text on inverse (light) backgrounds */
    inverse: p.deepPurple[1000],
    /** Text on brand-filled backgrounds */
    onBrand: p.neutral.white,
    /** Brand-colored text — labels, tags in brand accent */
    brand: p.deepPurple[200],
    /** Keyboard focus outline — WCAG 2.4.7 */
    focusVisible: p.deepPurple[100],

    link: {
      default: p.deepPurple[200],
      hover: p.deepPurple[100],
    },

    status: {
      success: p.emeraldGreen[400],
      warning: p.warmYellow[400],
      error: p.crimsonPink[300],
      info: p.steelBlue[300],
      neutral: p.mediumGray[300],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // BORDER
  // ─────────────────────────────────────────────────────────────
  border: {
    /** Default UI border — inputs, cards, dividers */
    default: p.deepPurple[300],
    /** Stronger border — emphasized sections, table headers */
    strong: p.deepPurple[400],
    /** Subtle border — very low contrast separation */
    subtle: p.deepPurple[800],
    /** Border on inverse (light) backgrounds */
    inverse: p.neutral.white,
    /** Brand border — active tabs, selected state */
    brand: p.deepPurple.base,
    /** Focus ring color — keyboard navigation */
    focus: p.deepPurple[300],
    /** Disabled input border */
    disabled: p.mediumGray.base,

    status: {
      success: p.emeraldGreen[500],
      warning: p.warmYellow[500],
      error: p.crimsonPink.base,
      info: p.steelBlue[500],
      neutral: p.mediumGray[500],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // ACTION — primary (deep-purple filled)
  // ─────────────────────────────────────────────────────────────
  action: {
    primary: {
      background: {
        default: p.deepPurple.base,
        hover: p.deepPurple[500],
        pressed: p.deepPurple[700],
        disabled: p.mediumGray[800],
      },
      foreground: {
        default: p.neutral.white,
        disabled: p.mediumGray[300],
      },
      border: {
        default: p.deepPurple.base,
        focus: p.deepPurple[300],
      },
    },

    // ── secondary (outlined / ghost-fill variant)
    secondary: {
      background: {
        default: p.deepPurple[800],
        hover: p.deepPurple[700],
        pressed: p.deepPurple[900],
        disabled: p.mediumGray[900],
      },
      foreground: {
        default: p.deepPurple[200],
        disabled: p.mediumGray[300],
      },
      border: {
        default: p.deepPurple[500],
        focus: p.deepPurple[300],
      },
    },

    // ── ghost (no background, text-only)
    ghost: {
      background: {
        hover: p.deepPurple[900],
        pressed: p.deepPurple[800],
      },
      foreground: {
        default: p.deepPurple[200],
        hover: p.neutral.white,
        disabled: p.mediumGray[300],
      },
      border: {
        focus: p.deepPurple[300],
      },
    },

    // ── danger / destructive (crimson-pink)
    danger: {
      background: {
        default: p.crimsonPink.base,
        hover: p.crimsonPink[700],
        pressed: p.crimsonPink[800],
        disabled: p.mediumGray[800],
      },
      foreground: {
        default: p.neutral.white,
        disabled: p.mediumGray[300],
      },
      border: {
        default: p.crimsonPink.base,
        focus: p.crimsonPink[300],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // STATUS
  // ─────────────────────────────────────────────────────────────
  status: {
    success: {
      background: p.emeraldGreen[100],
      foreground: p.emeraldGreen[800],
      foregroundOn: p.emeraldGreen[1000],
      icon: p.emeraldGreen[500],
      border: p.emeraldGreen[400],
      filled: p.emeraldGreen.base,
    },
    warning: {
      background: p.warmYellow[100],
      foreground: p.warmYellow[900],
      foregroundOn: p.warmYellow[100],
      icon: p.warmYellow[500],
      border: p.warmYellow[400],
      filled: p.warmYellow.base,
    },
    error: {
      background: p.crimsonPink[100],
      foreground: p.crimsonPink[800],
      foregroundOn: p.neutral.white,
      icon: p.crimsonPink.base,
      border: p.crimsonPink[400],
      filled: p.crimsonPink.base,
    },
    info: {
      background: p.steelBlue[900],
      foreground: p.steelBlue[300],
      foregroundOn: p.steelBlue[100],
      icon: p.steelBlue[400],
      border: p.steelBlue[600],
      filled: p.steelBlue.base,
    },
    neutral: {
      background: p.mediumGray[900],
      foreground: p.mediumGray[200],
      foregroundOn: p.neutral.white,
      icon: p.mediumGray[400],
      border: p.mediumGray[700],
      filled: p.mediumGray[500],
    },
  },

  // ─────────────────────────────────────────────────────────────
  // DATA VISUALIZATION  (5 series colors)
  // ─────────────────────────────────────────────────────────────
  data: {
    1: p.deepPurple.base,
    2: p.crimsonPink.base,
    3: p.coralRed.base,
    4: p.warmYellow.base,
    5: p.mediumGray[500],
    '1Subtle': p.deepPurple[800],
    '2Subtle': p.crimsonPink[800],
    '3Subtle': p.coralRed[800],
    '4Subtle': p.warmYellow[700],
    '5Subtle': p.mediumGray[800],
  },
} as const;

export type SemanticColor = typeof semanticColor;

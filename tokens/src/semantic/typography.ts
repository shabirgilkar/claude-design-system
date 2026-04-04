/**
 * Semantic Typography Tokens
 * Source: Figma › Claude MCP › Variables › Semantic › typography/*
 *
 * Named type scales with resolved size, line-height, letter-spacing, and weight.
 * Each scale entry is self-contained — use it to build a text utility class.
 *
 * Font family: IBM Plex Sans (sans), IBM Plex Mono (mono)
 */

import { sizingPrimitives as s } from '../primitives/sizing';
import { typographyPrimitives as t } from '../primitives/typography';

export const semanticTypography = {
  family: {
    sans: t.fontFamily.sans,
    mono: t.fontFamily.mono,
  },

  weight: {
    display: t.fontWeight.bold,
    title: t.fontWeight.semibold,
    headline: t.fontWeight.semibold,
    body: t.fontWeight.regular,
    bodyEm: t.fontWeight.semibold,
    label: t.fontWeight.semibold,
    caption: t.fontWeight.medium,
  },

  /** Font sizes in px — maps to the sizing primitive scale */
  size: {
    displayLarge: s[52],
    displayMedium: s[44],
    displaySmall: s[36],
    title1: s[32],
    title2: s[28],
    title3: s[24],
    headline: s[20],
    bodyLarge: s[18],
    body: s[16],
    callout: s[14],
    footnote: s[12],
    caption: s[12],
    labelLarge: s[14],
    labelMedium: s[12],
    labelSmall: s[10],
  },

  /** Line heights in px — matched to size scale */
  lineHeight: {
    displayLarge: t.lineHeight.displayLarge,    // 56
    displayMedium: t.lineHeight.displayMedium,  // 48
    displaySmall: t.lineHeight.displaySmall,    // 40
    title1: t.lineHeight.title1,                // 38
    title2: t.lineHeight.title2,                // 34
    title3: t.lineHeight.title3,                // 30
    headline: t.lineHeight.headline,            // 26
    bodyLarge: t.lineHeight.bodyLarge,          // 28
    body: t.lineHeight.body,                    // 24
    callout: t.lineHeight.callout,              // 20
    footnote: t.lineHeight.footnote,            // 17
    caption: t.lineHeight.caption1,             // 16
    label: t.lineHeight.labelLarge,             // 18
  },

  /** Letter spacing in px */
  letterSpacing: {
    display: t.letterSpacing.tightXl,    // -1.5
    title: t.letterSpacing.tightS,       // -0.4
    body: t.letterSpacing.normal,        // 0
    label: t.letterSpacing.wideM,        // 0.8
    caption: t.letterSpacing.wideS,      // 0.2
  },
} as const;

export type SemanticTypography = typeof semanticTypography;

/**
 * Primitive Typography Tokens
 * Source: Figma › Claude MCP › Variables › Primitives › typography/*
 *
 * Includes font families, weights, line-heights, and letter-spacing.
 * Font-size primitives live in sizing.ts (they share the same scale).
 */

export const typographyPrimitives = {
  fontFamily: {
    sans: 'IBM Plex Sans',
    mono: 'IBM Plex Mono',
  },

  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  /** Line heights in px — paired with font-size scale */
  lineHeight: {
    displayLarge: 56,
    displayMedium: 48,
    displaySmall: 40,
    title1: 38,
    title2: 34,
    title3: 30,
    headline: 26,
    bodyLarge: 28,
    body: 24,
    bodyEmphasized: 24,
    callout: 20,
    subheadline: 22,
    footnote: 17,
    caption1: 16,
    caption2: 14,
    labelLarge: 18,
    labelMedium: 18,
    labelSmall: 16,
  },

  /**
   * Letter spacing in px (positive = expanded, negative = condensed).
   * Apply as 'em' in CSS when using relative sizing:
   *   letter-spacing: calc(value / font-size * 1em)
   * Or use raw px for fixed-size text.
   */
  letterSpacing: {
    tightXl: -1.5,
    tightL: -1.0,
    tightM: -0.6,
    tightS: -0.4,
    tightXs: -0.2,
    tightXxs: -0.1,
    tightXxxs: -0.05,
    normal: 0,
    wideXs: 0.1,
    wideS: 0.2,
    wideM: 0.8,
    wideL: 1.2,
  },
} as const;

export type TypographyPrimitives = typeof typographyPrimitives;

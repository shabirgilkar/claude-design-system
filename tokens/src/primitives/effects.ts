/**
 * Primitive Effect Tokens
 * Source: Figma › Claude MCP › Variables › Primitives › shadow/*, z-index/*, opacity/*
 *
 * Raw shadow, z-index, and opacity values.
 * Reference semantic elevation tokens for shadow usage in components.
 */

/**
 * Shadow levels 1–5.
 * Values are CSS box-shadow strings for each elevation step.
 * The design system is dark-first; shadows use deep-purple tones.
 */
export const shadowPrimitives = {
  1: '0px 1px 2px rgba(14, 7, 22, 0.30)',
  2: '0px 2px 4px rgba(14, 7, 22, 0.35)',
  3: '0px 4px 8px rgba(14, 7, 22, 0.40)',
  4: '0px 8px 16px rgba(14, 7, 22, 0.45)',
  5: '0px 16px 32px rgba(14, 7, 22, 0.50)',
} as const;

/** Z-index raw values */
export const zIndexPrimitives = {
  '-1': -1,
  0: 0,
  10: 10,
  100: 100,
  200: 200,
  300: 300,
  400: 400,
  500: 500,
  600: 600,
  700: 700,
} as const;

/** Opacity raw values (0–1 range) */
export const opacityPrimitives = {
  0: 0,
  38: 0.38,
  60: 0.60,
  70: 0.70,
  100: 1,
} as const;

export type ShadowPrimitives = typeof shadowPrimitives;
export type ZIndexPrimitives = typeof zIndexPrimitives;
export type OpacityPrimitives = typeof opacityPrimitives;

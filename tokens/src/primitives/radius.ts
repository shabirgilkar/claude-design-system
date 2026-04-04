/**
 * Primitive Border Radius Tokens
 * Source: Figma › Claude MCP › Variables › Primitives › radius/*
 *
 * Raw radius values in pixels. Reference semantic border-radius tokens.
 */

export const radiusPrimitives = {
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  80: 80,
  100: 100,
} as const;

export type RadiusPrimitives = typeof radiusPrimitives;

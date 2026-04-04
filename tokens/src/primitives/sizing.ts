/**
 * Primitive Sizing Tokens
 * Source: Figma › Claude MCP › Variables › Primitives › sizing/*
 *
 * Used for fixed-dimension values: icon sizes, component heights, avatar sizes.
 * Same 2px cadence as spacing but a distinct category.
 * All values in pixels (number).
 */

export const sizingPrimitives = {
  1: 1,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  14: 14,
  15: 15,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  28: 28,
  30: 30,
  32: 32,
  34: 34,
  36: 36,
  38: 38,
  40: 40,
  42: 42,
  44: 44,
  46: 46,
  48: 48,
  50: 50,
  52: 52,
  54: 54,
  56: 56,
  58: 58,
  60: 60,
  62: 62,
  64: 64,
  66: 66,
  68: 68,
  70: 70,
  72: 72,
  74: 74,
  76: 76,
  78: 78,
  80: 80,
  82: 82,
  84: 84,
  86: 86,
  88: 88,
  90: 90,
  92: 92,
  94: 94,
  96: 96,
  98: 98,
  100: 100,
  112: 112,
  120: 120,
} as const;

export type SizingPrimitives = typeof sizingPrimitives;

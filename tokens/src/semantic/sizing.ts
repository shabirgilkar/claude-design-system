/**
 * Semantic Sizing Tokens
 * Source: Figma › Claude MCP › Variables › Semantic › sizing/*, border/*
 *
 * Named t-shirt sizes for icons, component heights, avatars, and radius.
 * All values in pixels.
 */

import { sizingPrimitives as s } from '../primitives/sizing';
import { radiusPrimitives as r } from '../primitives/radius';

export const semanticSizing = {
  /** Icon dimensions (square) */
  icon: {
    xs: s[12],
    sm: s[16],
    md: s[20],
    lg: s[24],
    xl: s[32],
    '2xl': s[40],
  },

  /** Component fixed heights (buttons, inputs, select triggers) */
  component: {
    '2xs': s[24],
    xs: s[28],
    sm: s[32],
    md: s[40],
    lg: s[48],
    xl: s[56],
    '2xl': s[64],
  },

  /** Avatar / user image sizes */
  avatar: {
    xs: s[24],
    sm: s[32],
    md: s[40],
    lg: s[48],
    xl: s[64],
    '2xl': s[80],
  },
} as const;

export const semanticBorderRadius = {
  none: r[2],
  sm: r[4],
  md: r[8],
  lg: r[12],
  xl: r[16],
  '2xl': r[24],
  '3xl': r[32],
  pill: r[100],
} as const;

export const semanticBorderWidth = {
  thin: 1,
  default: 2,
  thick: 4,
} as const;

export type SemanticSizing = typeof semanticSizing;
export type SemanticBorderRadius = typeof semanticBorderRadius;
export type SemanticBorderWidth = typeof semanticBorderWidth;

/**
 * Semantic Spacing Tokens
 * Source: Figma › Claude MCP › Variables › Semantic › spacing/*
 *
 * Three purposeful groups:
 *  • component — internal padding and gaps within a single UI component
 *  • layout    — structural spacing between sections on a page
 *  • inset     — container-level padding on all sides
 *
 * All values in pixels.
 */

import { spacingPrimitives as p } from '../primitives/spacing';

export const semanticSpacing = {
  /** Internal component spacing (padding, gap between icon and label, etc.) */
  component: {
    '2xs': p[2],
    xs: p[4],
    sm: p[8],
    md: p[12],
    lg: p[16],
    xl: p[24],
    '2xl': p[32],
    '3xl': p[48],
  },

  /** Page-level layout gaps (space between sections, columns, cards) */
  layout: {
    xs: p[16],
    sm: p[24],
    md: p[40],
    lg: p[64],
    xl: p[80],
    '2xl': p[96],
  },

  /** Container inset padding (applied uniformly to all sides) */
  inset: {
    xs: p[4],
    sm: p[8],
    md: p[12],
    lg: p[16],
    xl: p[24],
    '2xl': p[32],
  },
} as const;

export type SemanticSpacing = typeof semanticSpacing;

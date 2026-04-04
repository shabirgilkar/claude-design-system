/**
 * Semantic Elevation Tokens
 * Source: Figma › Claude MCP › Variables › Semantic › elevation/*, z-index/*, opacity/*
 *
 * Maps raw effect primitives to meaningful layer names.
 */

import { shadowPrimitives, zIndexPrimitives, opacityPrimitives } from '../primitives/effects';

/** Named shadow levels — use these on components, not raw shadow primitives */
export const semanticShadow = {
  /** Subtle depth — input fields, list items */
  1: shadowPrimitives[1],
  /** Card elevation */
  2: shadowPrimitives[2],
  /** Dropdown menus, inline panels */
  3: shadowPrimitives[3],
  /** Modals, drawers */
  4: shadowPrimitives[4],
  /** Critical overlays — maximum depth */
  5: shadowPrimitives[5],
} as const;

/** Named z-index layers — every component references one of these */
export const semanticZIndex = {
  below: zIndexPrimitives['-1'],
  base: zIndexPrimitives[0],
  raised: zIndexPrimitives[10],
  dropdown: zIndexPrimitives[100],
  sticky: zIndexPrimitives[200],
  overlay: zIndexPrimitives[300],
  modal: zIndexPrimitives[400],
  popover: zIndexPrimitives[500],
  toast: zIndexPrimitives[600],
  tooltip: zIndexPrimitives[700],
} as const;

/** Named opacity levels */
export const semanticOpacity = {
  /** Disabled UI elements */
  disabled: opacityPrimitives[38],
  /** De-emphasized / secondary content */
  muted: opacityPrimitives[60],
  /** Modal overlay scrim */
  overlay: opacityPrimitives[70],
  /** Fully visible */
  full: opacityPrimitives[100],
} as const;

export type SemanticShadow = typeof semanticShadow;
export type SemanticZIndex = typeof semanticZIndex;
export type SemanticOpacity = typeof semanticOpacity;

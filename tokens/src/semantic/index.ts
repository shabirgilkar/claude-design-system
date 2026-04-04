/**
 * Tier 2 — Semantic Tokens
 *
 * Intent-based tokens that alias Primitives.
 * Chain: Semantic → Primitives → raw value
 *
 * RULE: Components reference semantic tokens only.
 *       Never reach into primitives directly from a component.
 */

export { semanticColor } from './color';
export type { SemanticColor } from './color';

export { semanticSpacing } from './spacing';
export type { SemanticSpacing } from './spacing';

export {
  semanticSizing,
  semanticBorderRadius,
  semanticBorderWidth,
} from './sizing';
export type {
  SemanticSizing,
  SemanticBorderRadius,
  SemanticBorderWidth,
} from './sizing';

export { semanticTypography } from './typography';
export type { SemanticTypography } from './typography';

export { semanticMotion } from './motion';
export type { SemanticMotion } from './motion';

export {
  semanticShadow,
  semanticZIndex,
  semanticOpacity,
} from './elevation';
export type {
  SemanticShadow,
  SemanticZIndex,
  SemanticOpacity,
} from './elevation';

import { semanticColor } from './color';
import { semanticSpacing } from './spacing';
import { semanticSizing, semanticBorderRadius, semanticBorderWidth } from './sizing';
import { semanticTypography } from './typography';
import { semanticMotion } from './motion';
import { semanticShadow, semanticZIndex, semanticOpacity } from './elevation';

export const semantic = {
  color: semanticColor,
  spacing: semanticSpacing,
  sizing: semanticSizing,
  borderRadius: semanticBorderRadius,
  borderWidth: semanticBorderWidth,
  typography: semanticTypography,
  motion: semanticMotion,
  shadow: semanticShadow,
  zIndex: semanticZIndex,
  opacity: semanticOpacity,
} as const;

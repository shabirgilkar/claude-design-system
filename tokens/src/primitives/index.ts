/**
 * Tier 1 — Primitive Tokens
 *
 * Raw, literal design values. No semantic meaning.
 * These are the lowest level of the 3-tier token chain:
 *   Primitives → Semantic → Components
 *
 * Import the `primitives` object for full access, or named sub-objects.
 */

export { colorPrimitives } from './colors';
export type { ColorPrimitives } from './colors';

export { spacingPrimitives } from './spacing';
export type { SpacingPrimitives } from './spacing';

export { sizingPrimitives } from './sizing';
export type { SizingPrimitives } from './sizing';

export { radiusPrimitives } from './radius';
export type { RadiusPrimitives } from './radius';

export { typographyPrimitives } from './typography';
export type { TypographyPrimitives } from './typography';

export { motionPrimitives } from './motion';
export type { MotionPrimitives } from './motion';

export {
  shadowPrimitives,
  zIndexPrimitives,
  opacityPrimitives,
} from './effects';
export type {
  ShadowPrimitives,
  ZIndexPrimitives,
  OpacityPrimitives,
} from './effects';

import { colorPrimitives } from './colors';
import { spacingPrimitives } from './spacing';
import { sizingPrimitives } from './sizing';
import { radiusPrimitives } from './radius';
import { typographyPrimitives } from './typography';
import { motionPrimitives } from './motion';
import { shadowPrimitives, zIndexPrimitives, opacityPrimitives } from './effects';

export const primitives = {
  color: colorPrimitives,
  spacing: spacingPrimitives,
  sizing: sizingPrimitives,
  radius: radiusPrimitives,
  typography: typographyPrimitives,
  motion: motionPrimitives,
  shadow: shadowPrimitives,
  zIndex: zIndexPrimitives,
  opacity: opacityPrimitives,
} as const;

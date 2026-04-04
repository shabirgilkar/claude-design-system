/**
 * @ds/tokens — Design System Token Library
 *
 * 3-tier token architecture:
 *
 *   Primitives  — raw literal values (colors, spacing, sizing, etc.)
 *   Semantic    — intent-based aliases of primitives
 *   Components  — component-specific aliases of semantic tokens
 *
 * Usage:
 *
 *   // Full token tree
 *   import { tokens } from '@ds/tokens';
 *   tokens.semantic.color.background.surface  // '#221236'
 *   tokens.components.button.color.primary.default.background
 *
 *   // Scoped imports (recommended — better tree-shaking)
 *   import { semanticColor } from '@ds/tokens';
 *   import { buttonTokens } from '@ds/tokens';
 *   import { primitives } from '@ds/tokens';
 *
 * CSS custom properties:
 *   import '@ds/tokens/css';  // all layers
 *   import '@ds/tokens/css/primitives';
 *   import '@ds/tokens/css/semantic';
 *   import '@ds/tokens/css/components';
 */

// ── Tier 1 ──────────────────────────────────────────────────────────────────
export { primitives, colorPrimitives, spacingPrimitives, sizingPrimitives, radiusPrimitives, typographyPrimitives, motionPrimitives, shadowPrimitives, zIndexPrimitives, opacityPrimitives } from './primitives';
export type { ColorPrimitives, SpacingPrimitives, SizingPrimitives, RadiusPrimitives, TypographyPrimitives, MotionPrimitives, ShadowPrimitives, ZIndexPrimitives, OpacityPrimitives } from './primitives';

// ── Tier 2 ──────────────────────────────────────────────────────────────────
export { semantic, semanticColor, semanticSpacing, semanticSizing, semanticBorderRadius, semanticBorderWidth, semanticTypography, semanticMotion, semanticShadow, semanticZIndex, semanticOpacity } from './semantic';
export type { SemanticColor, SemanticSpacing, SemanticSizing, SemanticBorderRadius, SemanticBorderWidth, SemanticTypography, SemanticMotion, SemanticShadow, SemanticZIndex, SemanticOpacity } from './semantic';

// ── Tier 3 ──────────────────────────────────────────────────────────────────
export { components, buttonTokens, inputTokens, checkboxTokens, radioTokens, toggleTokens, badgeTokens, avatarTokens, toastTokens, tooltipTokens, tabsTokens, dropdownTokens, textareaTokens } from './components';
export type { ButtonTokens, InputTokens, CheckboxTokens, RadioTokens, ToggleTokens, BadgeTokens, AvatarTokens, ToastTokens, TooltipTokens, TabsTokens, DropdownTokens, TextareaTokens } from './components';

// ── Unified tree ─────────────────────────────────────────────────────────────
import { primitives } from './primitives';
import { semantic } from './semantic';
import { components } from './components';

export const tokens = {
  primitives,
  semantic,
  components,
} as const;

export type Tokens = typeof tokens;

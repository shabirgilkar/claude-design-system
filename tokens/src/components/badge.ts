/**
 * Badge Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › badge/*
 *
 * Variants: neutral, info, success, warning, error, brand
 * Sizes: sm, md, lg
 * Shapes: pill (default), rect (rounded rectangle)
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticSizing as sz } from '../semantic/sizing';
import { semanticBorderRadius as r } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const badgeTokens = {
  color: {
    neutral: {
      background: c.status.neutral.background,
      border: c.status.neutral.border,
      text: c.status.neutral.foreground,
    },
    info: {
      background: c.status.info.background,
      border: c.status.info.border,
      text: c.status.info.foreground,
    },
    success: {
      background: c.status.success.background,
      border: c.status.success.border,
      text: c.status.success.foreground,
    },
    warning: {
      background: c.status.warning.background,
      border: c.status.warning.border,
      text: c.status.warning.foreground,
    },
    error: {
      background: c.status.error.background,
      border: c.status.error.border,
      text: c.status.error.foreground,
    },
    brand: {
      background: c.background.brand,
      border: c.border.brand,
      text: c.foreground.onBrand,
    },
  },

  size: {
    sm: { height: 18, paddingX: sp.component.xs, paddingY: 1, gap: sp.component['2xs'], icon: sz.icon.xs },
    md: { height: 22, paddingX: sp.component.sm, paddingY: 2, gap: sp.component.xs, icon: sz.icon.xs },
    lg: { height: 26, paddingX: sp.component.sm, paddingY: sp.component.xs, gap: sp.component.xs, icon: sz.icon.sm },
  },

  radius: {
    sm: { pill: r.pill, rect: r.sm },
    md: { pill: r.pill, rect: r.sm },
    lg: { pill: r.pill, rect: r.md },
  },

  typography: {
    sm: { size: t.size.labelSmall, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.caption },
    md: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    lg: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
  },
} as const;

export type BadgeTokens = typeof badgeTokens;

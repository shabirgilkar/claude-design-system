/**
 * Avatar Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › avatar/*
 *
 * Sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (64px), 2xl (80px)
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSizing as sz } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const avatarTokens = {
  color: {
    background: c.background.brand,
    text: c.foreground.onBrand,
    border: c.border.default,
    imageBg: c.background.surfaceRaised,
  },

  size: {
    xs: sz.avatar.xs,    // 24px
    sm: sz.avatar.sm,    // 32px
    md: sz.avatar.md,    // 40px
    lg: sz.avatar.lg,    // 48px
    xl: sz.avatar.xl,    // 64px
    '2xl': sz.avatar['2xl'], // 80px
  },

  icon: {
    xs: sz.icon.xs,  // 12px
    sm: sz.icon.sm,  // 16px
    md: sz.icon.md,  // 20px
    lg: sz.icon.lg,  // 24px
    xl: sz.icon.xl,  // 32px
  },

  /** Radius follows size — pill for circular, md for rounded square */
  radius: {
    xs: 9999,
    sm: 9999,
    md: 9999,
    lg: 9999,
    xl: 9999,
  },

  typography: {
    xs: { size: t.size.labelSmall, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    sm: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    md: { size: t.size.labelLarge, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    lg: { size: t.size.headline, lineHeight: t.lineHeight.headline, letterSpacing: t.letterSpacing.body },
    xl: { size: t.size.title3, lineHeight: t.lineHeight.title3, letterSpacing: t.letterSpacing.title },
  },
} as const;

export type AvatarTokens = typeof avatarTokens;

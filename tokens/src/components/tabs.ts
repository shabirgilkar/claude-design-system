/**
 * Tabs Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › tabs/*
 *
 * States: default, hover, active, disabled
 * Sizes: sm, md, lg
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticSizing as sz } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const tabsTokens = {
  color: {
    default: {
      label: c.foreground.subtle,
      icon: c.foreground.subtle,
      indicator: 'transparent',
      description: c.foreground.subtle,
    },
    hover: {
      label: c.foreground.muted,
      icon: c.foreground.muted,
      indicator: c.border.default,
      description: c.foreground.subtle,
    },
    active: {
      label: c.foreground.default,
      icon: c.foreground.default,
      indicator: c.border.brand,
      description: c.foreground.muted,
    },
    disabled: {
      label: c.foreground.disabled,
      icon: c.foreground.disabled,
      indicator: 'transparent',
      description: c.foreground.disabled,
    },
    border: c.border.subtle,
    badgeBg: c.background.brand,
    badgeText: c.foreground.onBrand,
    dot: c.status.error.filled,
  },

  size: {
    sm: { height: sz.component.sm, paddingX: sp.component.sm, gap: sp.component.xs, icon: sz.icon.sm },
    md: { height: sz.component.md, paddingX: sp.component.lg, gap: sp.component.sm, icon: sz.icon.md },
    lg: { height: sz.component.lg, paddingX: sp.component.xl, gap: sp.component.sm, icon: sz.icon.md },
    indicator: 2,    // active indicator bar height in px
    dot: 6,          // notification dot diameter in px
    contentGap: sp.component['2xs'],
  },

  typography: {
    sm: { size: t.size.labelSmall, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    md: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    lg: { size: t.size.labelLarge, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    description: { size: t.size.footnote, lineHeight: t.lineHeight.footnote, letterSpacing: t.letterSpacing.body },
    fontWeight: { active: t.weight.label, default: t.weight.body },
  },
} as const;

export type TabsTokens = typeof tabsTokens;

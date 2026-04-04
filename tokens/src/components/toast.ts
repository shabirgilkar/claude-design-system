/**
 * Toast / Notification Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › toast/*
 *
 * Variants: success, error, warning, info, neutral
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticSizing as sz } from '../semantic/sizing';
import { semanticBorderRadius as r } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const toastTokens = {
  color: {
    success: {
      background: c.background.surface,
      accent: c.status.success.filled,
      icon: c.status.success.icon,
      title: c.foreground.default,
      description: c.foreground.muted,
    },
    error: {
      background: c.background.surface,
      accent: c.status.error.filled,
      icon: c.status.error.icon,
      title: c.foreground.default,
      description: c.foreground.muted,
    },
    warning: {
      background: c.background.surface,
      accent: c.status.warning.filled,
      icon: c.status.warning.icon,
      title: c.foreground.default,
      description: c.foreground.muted,
    },
    info: {
      background: c.background.surface,
      accent: c.status.info.filled,
      icon: c.status.info.icon,
      title: c.foreground.default,
      description: c.foreground.muted,
    },
    neutral: {
      background: c.background.surface,
      accent: c.foreground.subtle,
      icon: c.foreground.subtle,
      title: c.foreground.default,
      description: c.foreground.muted,
    },
    close: c.foreground.subtle,
    action: c.foreground.link.default,
    border: c.border.default,
  },

  size: {
    padding: sp.inset.lg,         // 16px
    gap: sp.component.md,         // 12px
    contentGap: sp.component.xs,  // 4px
    icon: sz.icon.md,             // 20px
    closeIcon: sz.icon.sm,        // 16px
    accentWidth: 4,               // left-side accent bar width
  },

  radius: r.lg, // 12px

  typography: {
    title: {
      size: t.size.labelLarge,
      lineHeight: t.lineHeight.label,
      letterSpacing: t.letterSpacing.label,
      fontWeight: t.weight.label,
    },
    description: {
      size: t.size.body,
      lineHeight: t.lineHeight.body,
      letterSpacing: t.letterSpacing.body,
      fontWeight: t.weight.body,
    },
    action: {
      size: t.size.labelLarge,
      lineHeight: t.lineHeight.label,
      letterSpacing: t.letterSpacing.label,
      fontWeight: t.weight.label,
    },
  },
} as const;

export type ToastTokens = typeof toastTokens;

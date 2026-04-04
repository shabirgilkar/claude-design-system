/**
 * Input Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › input/*
 *
 * Covers text input fields.
 * States: default, hover, focused, typing, filled, error, disabled, readonly
 * Sizes: sm (32px), md (40px), lg (48px)
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticSizing as sz } from '../semantic/sizing';
import { semanticBorderRadius as r } from '../semantic/sizing';
import { semanticBorderWidth as bw } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const inputTokens = {
  color: {
    default: {
      background: c.background.surface,
      border: c.border.default,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
      icon: c.foreground.subtle,
      charCount: c.foreground.subtle,
    },
    hover: {
      background: c.background.surface,
      border: c.border.strong,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
      icon: c.foreground.muted,
      charCount: c.foreground.subtle,
    },
    focused: {
      background: c.background.surface,
      border: c.border.focus,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.default,
      hint: c.foreground.subtle,
      icon: c.foreground.default,
      charCount: c.foreground.subtle,
    },
    typing: {
      background: c.background.surface,
      border: c.border.focus,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.default,
      hint: c.foreground.subtle,
      icon: c.foreground.default,
      charCount: c.foreground.subtle,
    },
    filled: {
      background: c.background.surface,
      border: c.border.default,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
      icon: c.foreground.subtle,
      charCount: c.foreground.subtle,
    },
    error: {
      background: c.background.surface,
      border: c.border.status.error,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.status.error.foreground,
      hint: c.status.error.foreground,
      icon: c.status.error.icon,
      charCount: c.foreground.subtle,
    },
    disabled: {
      background: c.background.neutral,
      border: c.border.disabled,
      text: c.foreground.disabled,
      placeholder: c.foreground.disabled,
      label: c.foreground.disabled,
      hint: c.foreground.disabled,
      icon: c.foreground.disabled,
      charCount: c.foreground.disabled,
    },
    readonly: {
      background: c.background.neutralSubtle,
      border: c.border.subtle,
      text: c.foreground.muted,
      placeholder: c.foreground.placeholder,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
      icon: c.foreground.subtle,
      charCount: c.foreground.subtle,
    },
    asterisk: c.status.error.icon,
    focusRing: c.border.focus,

    hint: {
      warning: c.status.warning.foreground,
      success: c.status.success.foreground,
      info: c.status.info.foreground,
      icon: {
        error: c.status.error.icon,
        warning: c.status.warning.icon,
        success: c.status.success.icon,
        info: c.status.info.icon,
        default: c.foreground.subtle,
      },
    },
  },

  size: {
    sm: { height: sz.component.sm, paddingX: sp.component.md, paddingY: sp.component.xs, gap: sp.component.xs, iconSize: sz.icon.sm },
    md: { height: sz.component.md, paddingX: sp.component.lg, paddingY: sp.component.sm, gap: sp.component.sm, iconSize: sz.icon.md },
    lg: { height: sz.component.lg, paddingX: sp.component.xl, paddingY: sp.component.sm, gap: sp.component.sm, iconSize: sz.icon.md },
  },

  spacing: {
    labelGap: sp.component.xs,
    sectionGap: sp.component.sm,
  },

  border: {
    width: { default: bw.thin, focus: bw.default },
  },

  radius: {
    sm: r.sm,
    md: r.md,
    lg: r.lg,
  },

  typography: {
    fontFamily: t.family.sans,
    weight: { regular: '400', medium: '500', semibold: '600' },
    size: { sm: t.size.labelMedium, md: t.size.body, lg: t.size.body },
    lineHeight: { sm: t.lineHeight.label, md: t.lineHeight.body, lg: t.lineHeight.body },
    letterSpacing: { sm: t.letterSpacing.label, md: t.letterSpacing.body, lg: t.letterSpacing.body },
    label: {
      size: { sm: t.size.labelSmall, md: t.size.labelMedium, lg: t.size.labelMedium },
      lineHeight: t.lineHeight.label,
      letterSpacing: t.letterSpacing.label,
    },
    hint: {
      size: t.size.footnote,
      lineHeight: t.lineHeight.footnote,
      weight: '400',
    },
  },
} as const;

export type InputTokens = typeof inputTokens;

/**
 * Textarea Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › textarea/*
 *
 * States: default, hover, focused, typing, filled, error, disabled, readonly
 * Sizes: sm, md, lg
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticSizing as sz } from '../semantic/sizing';
import { semanticBorderRadius as r } from '../semantic/sizing';
import { semanticBorderWidth as bw } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const textareaTokens = {
  color: {
    default: {
      background: c.background.surface,
      border: c.border.default,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
      charCount: c.foreground.subtle,
    },
    hover: {
      background: c.background.surface,
      border: c.border.strong,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
      charCount: c.foreground.subtle,
    },
    focused: {
      background: c.background.surface,
      border: c.border.focus,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.default,
      hint: c.foreground.subtle,
      charCount: c.foreground.subtle,
    },
    typing: {
      background: c.background.surface,
      border: c.border.focus,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.default,
      hint: c.foreground.subtle,
      charCount: c.foreground.muted,
    },
    filled: {
      background: c.background.surface,
      border: c.border.default,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
      charCount: c.foreground.subtle,
    },
    error: {
      background: c.background.surface,
      border: c.border.status.error,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      label: c.status.error.foreground,
      hint: c.status.error.foreground,
      charCount: c.foreground.subtle,
    },
    disabled: {
      background: c.background.neutral,
      border: c.border.disabled,
      text: c.foreground.disabled,
      placeholder: c.foreground.disabled,
      label: c.foreground.disabled,
      hint: c.foreground.disabled,
      charCount: c.foreground.disabled,
    },
    readonly: {
      background: c.background.neutralSubtle,
      border: c.border.subtle,
      text: c.foreground.muted,
      placeholder: c.foreground.placeholder,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
      charCount: c.foreground.subtle,
    },
    asterisk: c.status.error.icon,
    focusRing: c.border.focus,
    resizeHandle: c.border.default,
    hint: {
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
    sm: { minHeight: 80, footerHeight: 32, paddingX: sp.component.md, paddingY: sp.component.sm, resizeIcon: sz.icon.sm },
    md: { minHeight: 100, footerHeight: 36, paddingX: sp.component.lg, paddingY: sp.component.sm, resizeIcon: sz.icon.sm },
    lg: { minHeight: 120, footerHeight: 40, paddingX: sp.component.xl, paddingY: sp.component.md, resizeIcon: sz.icon.md },
  },

  border: {
    width: { default: bw.thin, focus: bw.default },
  },

  radius: { sm: r.sm, md: r.md, lg: r.lg },

  typography: {
    fontFamily: t.family.sans,
    weight: { regular: t.weight.body },
    sm: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    md: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
    lg: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
    label: {
      size: { sm: t.size.labelSmall, md: t.size.labelMedium, lg: t.size.labelMedium },
      lineHeight: t.lineHeight.label,
      letterSpacing: t.letterSpacing.label,
    },
    hint: { size: t.size.footnote, lineHeight: t.lineHeight.footnote },
    charCount: { size: t.size.footnote, lineHeight: t.lineHeight.footnote, letterSpacing: t.letterSpacing.body },
  },
} as const;

export type TextareaTokens = typeof textareaTokens;

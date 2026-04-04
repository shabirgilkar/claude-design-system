/**
 * Checkbox Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › checkbox/*
 *
 * States: default, hover, focused, checked, indeterminate, error, disabled
 * Sizes: sm, md, lg
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticBorderRadius as r } from '../semantic/sizing';
import { semanticBorderWidth as bw } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const checkboxTokens = {
  color: {
    default: {
      boxBg: c.background.surface,
      boxBorder: c.border.default,
      check: 'transparent',
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    hover: {
      boxBg: c.background.surfaceRaised,
      boxBorder: c.border.strong,
      check: 'transparent',
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    focused: {
      boxBg: c.background.surface,
      boxBorder: c.border.focus,
      check: 'transparent',
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    checked: {
      boxBg: c.background.brand,
      boxBorder: c.background.brand,
      check: c.foreground.onBrand,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    indeterminate: {
      boxBg: c.background.brand,
      boxBorder: c.background.brand,
      check: c.foreground.onBrand,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    error: {
      boxBg: c.background.surface,
      boxBorder: c.border.status.error,
      check: 'transparent',
      label: c.foreground.default,
      hint: c.status.error.foreground,
    },
    disabled: {
      boxBg: c.background.neutral,
      boxBorder: c.border.disabled,
      check: c.foreground.disabled,
      label: c.foreground.disabled,
      hint: c.foreground.disabled,
    },
    focusRing: c.border.focus,
  },

  size: {
    sm: { box: 14, icon: 10, gap: sp.component.xs },
    md: { box: 16, icon: 12, gap: sp.component.sm },
    lg: { box: 20, icon: 14, gap: sp.component.sm },
  },

  radius: { sm: r.sm, md: r.sm, lg: r.md },

  border: {
    width: { default: bw.thin, focus: bw.default },
  },

  typography: {
    sm: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    md: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
    lg: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
  },
} as const;

export type CheckboxTokens = typeof checkboxTokens;

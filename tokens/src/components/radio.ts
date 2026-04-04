/**
 * Radio Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › radio/*
 *
 * States: default, hover, focused, selected, error, disabled
 * Sizes: sm, md, lg
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticBorderWidth as bw } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const radioTokens = {
  color: {
    default: {
      circleBg: c.background.surface,
      circleBorder: c.border.default,
      dot: 'transparent',
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    hover: {
      circleBg: c.background.surfaceRaised,
      circleBorder: c.border.strong,
      dot: 'transparent',
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    focused: {
      circleBg: c.background.surface,
      circleBorder: c.border.focus,
      dot: 'transparent',
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    selected: {
      circleBg: c.background.brand,
      circleBorder: c.background.brand,
      dot: c.foreground.onBrand,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    error: {
      circleBg: c.background.surface,
      circleBorder: c.border.status.error,
      dot: 'transparent',
      label: c.foreground.default,
      hint: c.status.error.foreground,
    },
    disabled: {
      circleBg: c.background.neutral,
      circleBorder: c.border.disabled,
      dot: c.foreground.disabled,
      label: c.foreground.disabled,
      hint: c.foreground.disabled,
    },
    focusRing: c.border.focus,
  },

  size: {
    sm: { circle: 14, dot: 6, gap: sp.component.xs },
    md: { circle: 16, dot: 8, gap: sp.component.sm },
    lg: { circle: 20, dot: 10, gap: sp.component.sm },
  },

  /** Fully circular — always 100% radius */
  radius: { sm: 9999, md: 9999, lg: 9999 },

  border: {
    width: { default: bw.thin, focus: bw.default },
  },

  typography: {
    sm: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    md: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
    lg: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
  },
} as const;

export type RadioTokens = typeof radioTokens;

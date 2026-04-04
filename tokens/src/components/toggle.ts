/**
 * Toggle / Switch Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › toggle/*
 *
 * States: default, hover, focused, active, error, disabled
 * Sizes: sm, md, lg
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticBorderWidth as bw } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const toggleTokens = {
  color: {
    default: {
      track: c.background.neutral,
      thumb: c.foreground.disabled,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    hover: {
      track: c.background.neutralSubtle,
      thumb: c.foreground.muted,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    focused: {
      track: c.background.neutral,
      thumb: c.foreground.muted,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    active: {
      track: c.background.brand,
      thumb: c.foreground.onBrand,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    error: {
      track: c.status.error.background,
      thumb: c.status.error.icon,
      label: c.foreground.default,
      hint: c.status.error.foreground,
    },
    disabled: {
      track: c.background.neutral,
      thumb: c.foreground.disabled,
      label: c.foreground.disabled,
      hint: c.foreground.disabled,
    },
    focusRing: c.border.focus,
  },

  size: {
    sm: { trackWidth: 32, trackHeight: 18, thumb: 14, gap: sp.component.xs, trackPadding: 2 },
    md: { trackWidth: 40, trackHeight: 22, thumb: 18, gap: sp.component.sm, trackPadding: 2 },
    lg: { trackWidth: 48, trackHeight: 26, thumb: 22, gap: sp.component.sm, trackPadding: 2 },
  },

  /** Track radius follows component height to create pill shape */
  radius: { sm: 9999, md: 9999, lg: 9999 },

  border: {
    width: { focus: bw.default },
  },

  typography: {
    sm: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    md: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
    lg: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
  },
} as const;

export type ToggleTokens = typeof toggleTokens;

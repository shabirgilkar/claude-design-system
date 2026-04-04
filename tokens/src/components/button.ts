/**
 * Button Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › button/*
 *
 * Covers 5 variants: primary, secondary, tertiary, destructive, ghost
 * Sizes: sm (32px), md (40px), lg (48px)
 * States: default, hover, focused, pressed, disabled, error, loading
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticSizing as sz } from '../semantic/sizing';
import { semanticBorderRadius as r } from '../semantic/sizing';
import { semanticBorderWidth as bw } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';
import { semanticOpacity as o } from '../semantic/elevation';

export const buttonTokens = {
  // ─── COLORS ────────────────────────────────────────────────
  color: {
    primary: {
      default: {
        background: c.action.primary.background.default,  // #3A1F5D
        foreground: c.action.primary.foreground.default,  // #FFFFFF
        border: c.action.primary.border.default,          // #3A1F5D
      },
      hover: {
        background: c.action.primary.background.hover,    // #442A65
        foreground: c.action.primary.foreground.default,
        border: c.action.primary.border.default,
      },
      focused: {
        background: c.action.primary.background.default,
        foreground: c.action.primary.foreground.default,
        ring: c.action.primary.border.focus,             // #75628E
      },
      pressed: {
        background: c.action.primary.background.pressed,  // #2D1849
        foreground: c.action.primary.foreground.default,
      },
      disabled: {
        background: c.action.primary.background.disabled, // #434343
        foreground: c.action.primary.foreground.disabled, // #9D9D9D
        border: c.action.primary.background.disabled,
      },
      error: {
        background: c.action.danger.background.default,   // #C83660
        foreground: c.action.danger.foreground.default,   // #FFFFFF
        border: c.action.danger.border.default,
      },
      loading: {
        foreground: c.action.primary.foreground.default,
      },
    },

    secondary: {
      default: {
        background: c.background.surface,                 // #221236
        foreground: c.action.secondary.foreground.default,// #9586A8
        border: c.action.secondary.border.default,        // #442A65
      },
      hover: {
        background: c.action.secondary.background.hover,  // #2D1849
        foreground: c.action.secondary.foreground.default,
        border: c.action.secondary.border.default,
      },
      focused: {
        background: c.background.surface,
        foreground: c.action.secondary.foreground.default,
        ring: c.action.secondary.border.focus,            // #75628E
      },
      pressed: {
        background: c.action.secondary.background.pressed,// #170C25
        foreground: c.action.secondary.foreground.default,
      },
      disabled: {
        background: c.action.secondary.background.disabled,// #2E2E2E
        foreground: c.action.secondary.foreground.disabled,// #9D9D9D
        border: c.action.secondary.background.disabled,
      },
      error: {
        background: c.background.surface,
        foreground: c.action.danger.background.default,
        border: c.action.danger.border.default,
      },
      loading: {
        foreground: c.action.secondary.foreground.default,
      },
    },

    tertiary: {
      default: {
        background: 'transparent',
        foreground: c.action.secondary.foreground.default,
      },
      hover: {
        background: c.action.ghost.background.hover,      // #170C25
        foreground: c.action.ghost.foreground.hover,      // #FFFFFF
      },
      focused: {
        background: 'transparent',
        foreground: c.action.secondary.foreground.default,
        ring: c.action.ghost.border.focus,                // #75628E
      },
      pressed: {
        background: c.action.ghost.background.pressed,    // #221236
        foreground: c.action.ghost.foreground.hover,
      },
      disabled: {
        background: 'transparent',
        foreground: c.action.ghost.foreground.disabled,   // #9D9D9D
      },
      error: {
        background: 'transparent',
        foreground: c.action.danger.background.default,
      },
      loading: {
        foreground: c.action.secondary.foreground.default,
      },
    },

    destructive: {
      default: {
        background: c.action.danger.background.default,   // #C83660
        foreground: c.action.danger.foreground.default,   // #FFFFFF
        border: c.action.danger.border.default,
      },
      hover: {
        background: c.action.danger.background.hover,     // #9C2A4B
        foreground: c.action.danger.foreground.default,
      },
      focused: {
        background: c.action.danger.background.default,
        foreground: c.action.danger.foreground.default,
        ring: c.action.danger.border.focus,               // #D87290
      },
      pressed: {
        background: c.action.danger.background.pressed,   // #741F38
        foreground: c.action.danger.foreground.default,
      },
      disabled: {
        background: c.action.danger.background.disabled,  // #434343
        foreground: c.action.danger.foreground.disabled,  // #9D9D9D
      },
      error: {
        background: c.action.danger.background.default,
        foreground: c.action.danger.foreground.default,
        border: c.action.danger.border.default,
      },
      loading: {
        foreground: c.action.danger.foreground.default,
      },
    },

    ghost: {
      default: {
        foreground: c.action.ghost.foreground.default,    // #9586A8
      },
      hover: {
        background: c.action.ghost.background.hover,      // #170C25
        foreground: c.action.ghost.foreground.hover,      // #FFFFFF
      },
      focused: {
        foreground: c.action.ghost.foreground.default,
        ring: c.action.ghost.border.focus,
      },
      pressed: {
        background: c.action.ghost.background.pressed,    // #221236
        foreground: c.action.ghost.foreground.hover,
      },
      disabled: {
        foreground: c.action.ghost.foreground.disabled,   // #9D9D9D
      },
      error: {
        foreground: c.action.danger.background.default,
      },
      loading: {
        foreground: c.action.ghost.foreground.default,
      },
    },

    /** Shared focus ring color (used by all variants) */
    focusRing: c.border.focus,                            // #75628E
  },

  // ─── SIZE ──────────────────────────────────────────────────
  size: {
    height: { sm: sz.component.sm, md: sz.component.md, lg: sz.component.lg },
    iconOnly: { sm: sz.component.sm, md: sz.component.md, lg: sz.component.lg },
    icon: { sm: sz.icon.sm, md: sz.icon.md, lg: sz.icon.lg },
  },

  // ─── SPACING ───────────────────────────────────────────────
  spacing: {
    paddingX: { sm: sp.component.md, md: sp.component.lg, lg: sp.component.xl },
    paddingY: { sm: sp.component.xs, md: sp.component.sm, lg: sp.component.sm },
    gap: { sm: sp.component.xs, md: sp.component.sm, lg: sp.component.sm },
    iconPadding: { sm: sp.component.sm, md: sp.component.sm, lg: sp.component.md },
  },

  // ─── RADIUS ────────────────────────────────────────────────
  radius: {
    sm: r.md,     // 8px
    md: r.lg,     // 12px
    lg: r.lg,     // 12px
    pill: r.pill, // 100px
  },

  // ─── BORDER ────────────────────────────────────────────────
  border: {
    width: { default: bw.thin, focused: bw.default },
  },

  // ─── FOCUS RING ────────────────────────────────────────────
  focusRing: {
    width: bw.default,  // 2px
    offset: sp.component.xs, // 4px
  },

  // ─── TYPOGRAPHY ────────────────────────────────────────────
  typography: {
    fontFamily: t.family.sans,
    fontWeight: t.weight.label,
    fontSize: {
      sm: t.size.labelSmall,   // 10px
      md: t.size.labelMedium,  // 12px
      lg: t.size.labelLarge,   // 14px
    },
    letterSpacing: t.letterSpacing.label, // 0.8px
    lineHeight: {
      sm: t.lineHeight.label,  // 18px
      md: t.lineHeight.label,
      lg: t.lineHeight.label,
    },
  },

  // ─── OPACITY ───────────────────────────────────────────────
  opacity: {
    loading: o.muted,     // 0.60
    disabled: o.disabled, // 0.38
  },
} as const;

export type ButtonTokens = typeof buttonTokens;

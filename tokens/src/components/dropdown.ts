/**
 * Dropdown / Select Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › dropdown/*
 *
 * States: default, hover, focused, open, selected, error, disabled, readonly
 * Sizes: sm, md, lg
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticSizing as sz } from '../semantic/sizing';
import { semanticBorderRadius as r } from '../semantic/sizing';
import { semanticBorderWidth as bw } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const dropdownTokens = {
  /** Trigger field colors — mirrors input states */
  color: {
    default: {
      background: c.background.surface,
      border: c.border.default,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      icon: c.foreground.subtle,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
    },
    hover: {
      background: c.background.surface,
      border: c.border.strong,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      icon: c.foreground.muted,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
    },
    focused: {
      background: c.background.surface,
      border: c.border.focus,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      icon: c.foreground.default,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    open: {
      background: c.background.surface,
      border: c.border.focus,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      icon: c.foreground.default,
      label: c.foreground.default,
      hint: c.foreground.subtle,
    },
    selected: {
      background: c.background.surface,
      border: c.border.default,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      icon: c.foreground.subtle,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
    },
    error: {
      background: c.background.surface,
      border: c.border.status.error,
      text: c.foreground.default,
      placeholder: c.foreground.placeholder,
      icon: c.status.error.icon,
      label: c.status.error.foreground,
      hint: c.status.error.foreground,
    },
    disabled: {
      background: c.background.neutral,
      border: c.border.disabled,
      text: c.foreground.disabled,
      placeholder: c.foreground.disabled,
      icon: c.foreground.disabled,
      label: c.foreground.disabled,
      hint: c.foreground.disabled,
    },
    readonly: {
      background: c.background.neutralSubtle,
      border: c.border.subtle,
      text: c.foreground.muted,
      placeholder: c.foreground.placeholder,
      icon: c.foreground.subtle,
      label: c.foreground.muted,
      hint: c.foreground.subtle,
    },

    /** Dropdown panel */
    panel: {
      background: c.background.surfaceRaised,
      border: c.border.default,
      scrollbar: c.border.subtle,
    },

    /** Option items inside the panel */
    option: {
      default: { background: 'transparent', text: c.foreground.default, meta: c.foreground.subtle, icon: c.foreground.subtle },
      hover: { background: c.background.neutral, text: c.foreground.default, meta: c.foreground.subtle, icon: c.foreground.muted },
      selected: { background: c.background.brand, text: c.foreground.onBrand, meta: c.foreground.onBrand, icon: c.foreground.onBrand },
      disabled: { background: 'transparent', text: c.foreground.disabled, meta: c.foreground.disabled, icon: c.foreground.disabled },
    },
  },

  size: {
    sm: { height: sz.component.sm, paddingX: sp.component.md, gap: sp.component.xs, iconSize: sz.icon.sm },
    md: { height: sz.component.md, paddingX: sp.component.lg, gap: sp.component.sm, iconSize: sz.icon.md },
    lg: { height: sz.component.lg, paddingX: sp.component.xl, gap: sp.component.sm, iconSize: sz.icon.md },
  },

  option: {
    sm: { height: sz.component.sm, paddingX: sp.component.md, iconSize: sz.icon.sm, radius: r.sm },
    md: { height: sz.component.md, paddingX: sp.component.lg, iconSize: sz.icon.md, radius: r.sm },
    lg: { height: sz.component.lg, paddingX: sp.component.xl, iconSize: sz.icon.md, radius: r.sm },
  },

  panel: {
    radius: { sm: r.md, md: r.lg, lg: r.lg },
    padding: sp.component.xs,
    itemSpacing: sp.component['2xs'],
  },

  radius: { sm: r.sm, md: r.md, lg: r.lg },

  border: {
    width: { default: bw.thin, focus: bw.default },
  },

  typography: {
    fontFamily: t.family.sans,
    weight: { regular: t.weight.body, semibold: t.weight.label },
    sm: { size: t.size.labelMedium, lineHeight: t.lineHeight.label, letterSpacing: t.letterSpacing.label },
    md: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
    lg: { size: t.size.body, lineHeight: t.lineHeight.body, letterSpacing: t.letterSpacing.body },
  },
} as const;

export type DropdownTokens = typeof dropdownTokens;

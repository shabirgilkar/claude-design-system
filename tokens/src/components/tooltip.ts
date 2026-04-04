/**
 * Tooltip Component Tokens
 * Source: Figma › Claude MCP › Variables › Components › tooltip/*
 *
 * Themes: dark (default), light
 */

import { semanticColor as c } from '../semantic/color';
import { semanticSpacing as sp } from '../semantic/spacing';
import { semanticBorderRadius as r } from '../semantic/sizing';
import { semanticTypography as t } from '../semantic/typography';

export const tooltipTokens = {
  color: {
    dark: {
      background: c.background.inverse,  // white bg on dark tooltip
      text: c.foreground.inverse,        // dark text
      title: c.foreground.inverse,
      description: c.foreground.inverse,
    },
    light: {
      background: c.background.surfaceRaised, // #2D1849
      text: c.foreground.default,
      title: c.foreground.default,
      description: c.foreground.muted,
      border: c.border.default,
    },
  },

  size: {
    paddingX: sp.component.md,     // 12px
    paddingY: sp.component.sm,     // 8px
    arrow: 6,                      // arrow size in px
    contentGap: sp.component.xs,   // 4px gap between title and description
  },

  radius: r.md, // 8px

  typography: {
    text: {
      size: t.size.footnote,
      lineHeight: t.lineHeight.footnote,
      letterSpacing: t.letterSpacing.body,
      fontWeight: t.weight.body,
    },
    title: {
      size: t.size.labelMedium,
      lineHeight: t.lineHeight.label,
      letterSpacing: t.letterSpacing.label,
      fontWeight: t.weight.label,
    },
  },
} as const;

export type TooltipTokens = typeof tooltipTokens;

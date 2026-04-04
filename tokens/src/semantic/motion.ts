/**
 * Semantic Motion Tokens
 * Source: Figma › Claude MCP › Variables › Semantic › motion/*
 *
 * Named durations and easing curves for UI transitions.
 * Honor prefers-reduced-motion by referencing `reduced` duration.
 */

import { motionPrimitives as m } from '../primitives/motion';

export const semanticMotion = {
  duration: {
    /** No animation — immediate state switch */
    instant: m.duration[0],
    /** Micro-interactions — hover, focus ring */
    fast: m.duration[100],
    /** Standard transitions — expand/collapse, fade */
    normal: m.duration[200],
    /** Deliberate transitions — slide-in panels, modals */
    slow: m.duration[300],
    /** Complex orchestration — multi-step sequences */
    slower: m.duration[500],
    /**
     * Accessibility: use when respecting prefers-reduced-motion.
     * Set to 0ms in CSS via media query; this value signals intent to the component.
     */
    reduced: m.duration[0],
  },

  easing: {
    linear: m.easing.linear,
    /** Elements entering the viewport */
    easeIn: m.easing.easeIn,
    /** Elements leaving the viewport */
    easeOut: m.easing.easeOut,
    /** Elements staying in viewport but changing position/size */
    easeInOut: m.easing.easeInOut,
    /** Bouncy / playful interactions */
    spring: m.easing.spring,
  },
} as const;

export type SemanticMotion = typeof semanticMotion;

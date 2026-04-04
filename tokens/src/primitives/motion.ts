/**
 * Primitive Motion Tokens
 * Source: Figma › Claude MCP › Variables › Primitives › motion/*
 *
 * Raw duration (ms) and easing curve values.
 */

export const motionPrimitives = {
  /** Duration in milliseconds */
  duration: {
    0: 0,
    100: 100,
    200: 200,
    300: 300,
    500: 500,
  },

  /** CSS easing functions */
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const;

export type MotionPrimitives = typeof motionPrimitives;
